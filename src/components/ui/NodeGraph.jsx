import React, { useRef, useEffect } from 'react';

const NodeGraph = ({ interactive = true }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const labels = [
      'Strategy', 'Market Fit', 'Roadmap', 'Milestones',
      'Launch', 'Funding', 'Team', 'Product', 'Growth', 'Users',
      'Revenue', 'Brand', 'Tech Stack', 'MVP',
    ];

    const colors = ['#7C5CFC', '#2BDFB0', '#FF6B9D', '#3B9EFF', '#FFB547'];

    const initNodes = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodesRef.current = labels.map((label, i) => ({
        x: w * 0.15 + Math.random() * w * 0.7,
        y: h * 0.1 + Math.random() * h * 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 5 + Math.random() * 5,
        color: colors[i % colors.length],
        label,
        phase: Math.random() * Math.PI * 2,
        mass: 0.5 + Math.random() * 0.5,
      }));
    };

    const drawLine = (x1, y1, x2, y2, alpha, color) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${color}00`);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      timeRef.current += 0.008;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions
      nodes.forEach((node, i) => {
        // Gentle float
        node.x += node.vx + Math.sin(t + node.phase) * 0.15;
        node.y += node.vy + Math.cos(t * 0.7 + node.phase) * 0.12;

        // Mouse repulsion
        if (interactive) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 1.5;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }

        // Boundary bounce
        if (node.x < 30 || node.x > w - 30) node.vx *= -1;
        if (node.y < 30 || node.y > h - 30) node.vy *= -1;
        node.x = Math.max(30, Math.min(w - 30, node.x));
        node.y = Math.max(30, Math.min(h - 30, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.5;
            drawLine(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, alpha, nodes[i].color);
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = 1 + Math.sin(t * 2 + node.phase) * 0.15;
        const r = node.radius * pulse;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        glow.addColorStop(0, `${node.color}40`);
        glow.addColorStop(1, `${node.color}00`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(node.x - r * 0.25, node.y - r * 0.25, r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fill();

        // Label
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = `${node.color}CC`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + r + 14);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resize();
    window.addEventListener('resize', resize);
    if (interactive) canvas.addEventListener('mousemove', handleMouse);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) canvas.removeEventListener('mousemove', handleMouse);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="node-graph-canvas"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default NodeGraph;
