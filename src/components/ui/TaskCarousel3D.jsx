import React, { useState, useRef, useEffect } from 'react';

const tasks = [
  { id: 1, label: 'Market Research', icon: '🔬', color: '#3B9EFF', status: 'Complete' },
  { id: 2, label: 'Product Strategy', icon: '🗺️', color: '#7C5CFC', status: 'Active' },
  { id: 3, label: 'MVP Build', icon: '⚡', color: '#2BDFB0', status: 'In Progress' },
  { id: 4, label: 'User Testing', icon: '👥', color: '#FFB547', status: 'Pending' },
  { id: 5, label: 'Launch Plan', icon: '🚀', color: '#FF6B9D', status: 'Upcoming' },
  { id: 6, label: 'Marketing', icon: '📣', color: '#FF6B9D', status: 'Upcoming' },
];

const TaskCarousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const containerRef = useRef(null);
  const autoRef = useRef(null);

  const n = tasks.length;
  const angleStep = 360 / n;

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % n);
    }, 3000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    setRotationY(-activeIndex * angleStep);
  }, [activeIndex, angleStep]);

  const handlePointerDown = (e) => {
    clearInterval(autoRef.current);
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = currentX - startX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) setActiveIndex(prev => (prev + 1) % n);
      else setActiveIndex(prev => (prev - 1 + n) % n);
      setStartX(currentX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    startAuto();
  };

  const radius = 220;

  return (
    <div
      style={{
        width: '100%',
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Central ring glow */}
      <div style={{
        position: 'absolute',
        width: '440px', height: '440px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Active task label */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: tasks[activeIndex].color,
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>ACTIVE</div>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--lp-text)',
          maxWidth: '120px',
          lineHeight: 1.2,
        }}>{tasks[activeIndex].label}</div>
        <div style={{
          marginTop: '6px',
          fontSize: '0.7rem',
          color: tasks[activeIndex].color,
          background: `${tasks[activeIndex].color}20`,
          padding: '2px 10px',
          borderRadius: '999px',
          border: `1px solid ${tasks[activeIndex].color}40`,
        }}>{tasks[activeIndex].status}</div>
      </div>

      {/* 3D Stage */}
      <div
        ref={containerRef}
        id="task-carousel-3d"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{
          width: `${radius * 2 + 160}px`,
          height: '380px',
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab',
          perspective: '900px',
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotationY}deg)`,
          transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          transformOrigin: 'center center',
        }}>
          {tasks.map((task, i) => {
            const angle = i * angleStep;
            const isActive = i === activeIndex;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius;

            return (
              <div
                key={task.id}
                onClick={() => { if (!isDragging) { clearInterval(autoRef.current); setActiveIndex(i); startAuto(); }}}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '130px',
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px)`,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${task.color}30, ${task.color}15)`
                    : 'var(--lp-surface-2)',
                  border: `1px solid ${isActive ? task.color : 'var(--lp-border)'}`,
                  borderRadius: '20px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  boxShadow: isActive
                    ? `0 0 30px ${task.color}50, 0 8px 32px rgba(0,0,0,0.4)`
                    : '0 4px 20px rgba(0,0,0,0.3)',
                  transform: isActive ? 'scale(1.15)' : 'scale(0.9)',
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  opacity: isActive ? 1 : 0.6,
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{task.icon}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isActive ? task.color : 'var(--lp-muted)',
                    lineHeight: 1.3,
                  }}>{task.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orbit ring visual */}
      <div style={{
        position: 'absolute',
        width: '460px', height: '460px',
        border: '1px solid rgba(124,92,252,0.15)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'spin 40s linear infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '380px', height: '380px',
        border: '1px dashed rgba(43,223,176,0.1)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'counter-spin 30s linear infinite',
      }} />

      {/* Dot nav */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', position: 'relative', zIndex: 5 }}>
        {tasks.map((task, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(autoRef.current); setActiveIndex(i); startAuto(); }}
            style={{
              width: i === activeIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '999px',
              background: i === activeIndex ? task.color : 'var(--lp-border)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCarousel3D;
