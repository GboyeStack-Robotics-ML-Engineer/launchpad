import React, { useState, useEffect } from 'react';

const flowData = {
  nodes: [
    { id: 'start', label: 'Your Idea', x: 20, y: 60, color: '#7C5CFC' },
    { id: 'research', label: 'Market Research', x: 180, y: 20, color: '#3B9EFF' },
    { id: 'strategy', label: 'Strategy Map', x: 180, y: 100, color: '#7C5CFC' },
    { id: 'mvp', label: 'MVP Definition', x: 360, y: 10, color: '#2BDFB0' },
    { id: 'roadmap', label: 'Roadmap', x: 360, y: 60, color: '#2BDFB0' },
    { id: 'team', label: 'Team Setup', x: 360, y: 110, color: '#FFB547' },
    { id: 'launch', label: '🚀 Launch', x: 530, y: 60, color: '#FF6B9D' },
  ],
  edges: [
    { from: 'start', to: 'research' },
    { from: 'start', to: 'strategy' },
    { from: 'research', to: 'mvp' },
    { from: 'strategy', to: 'roadmap' },
    { from: 'strategy', to: 'team' },
    { from: 'mvp', to: 'launch' },
    { from: 'roadmap', to: 'launch' },
    { from: 'team', to: 'launch' },
  ],
};

const FlowChart = ({ animated = true }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!animated) { setStep(999); return; }
    let s = 0;
    const total = flowData.nodes.length + flowData.edges.length;
    const timer = setInterval(() => {
      s++;
      setStep(s);
      if (s >= total) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, [animated]);

  const getNode = (id) => flowData.nodes.find(n => n.id === id);

  const svgW = 660;
  const svgH = 140;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ width: '100%', minWidth: '380px', height: 'auto', overflow: 'visible' }}
      >
        {/* Edges */}
        {flowData.edges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          if (!from || !to) return null;
          const isVisible = step >= flowData.nodes.length + i;
          const fx = from.x + 110, fy = from.y + 14;
          const tx = to.x, ty = to.y + 14;
          const mx = (fx + tx) / 2;
          return (
            <path
              key={`e-${i}`}
              d={`M ${fx} ${fy} C ${mx} ${fy}, ${mx} ${ty}, ${tx} ${ty}`}
              fill="none"
              stroke={from.color}
              strokeWidth="1.5"
              strokeOpacity={isVisible ? 0.5 : 0}
              style={{ transition: 'stroke-opacity 0.4s ease' }}
            />
          );
        })}

        {/* Nodes */}
        {flowData.nodes.map((node, i) => {
          const isVisible = step > i;
          return (
            <g
              key={node.id}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translate(${node.x}px, ${node.y}px) scale(${isVisible ? 1 : 0.7})`,
                transformOrigin: `${node.x + 55}px ${node.y + 14}px`,
                transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <rect
                x={node.x} y={node.y}
                width="110" height="28" rx="14"
                fill={`${node.color}20`}
                stroke={node.color}
                strokeWidth="1"
              />
              <text
                x={node.x + 55} y={node.y + 18}
                textAnchor="middle"
                fill={node.color}
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >{node.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FlowChart;
