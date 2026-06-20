import React, { useEffect, useRef } from 'react';

const MorphBlob = ({ isActive = false, isListening = false, isSpeaking = false, color = '#3B9EFF' }) => {
  const blobRef = useRef(null);
  const barsRef = useRef([]);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const bars = barsRef.current;
    let frame;

    const animate = () => {
      timeRef.current += 0.05;
      const t = timeRef.current;

      bars.forEach((bar, i) => {
        if (!bar) return;
        let height;
        if (isListening) {
          height = 20 + Math.abs(Math.sin(t * (2 + i * 0.5) + i)) * 40;
        } else if (isSpeaking) {
          height = 15 + Math.abs(Math.sin(t * (1.5 + i * 0.3) + i * 0.8)) * 30;
        } else if (isActive) {
          height = 8 + Math.abs(Math.sin(t * 0.8 + i * 0.5)) * 12;
        } else {
          height = 4 + Math.abs(Math.sin(t * 0.3 + i)) * 6;
        }
        bar.style.height = `${height}px`;
        bar.style.opacity = isActive ? '0.9' : '0.4';
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [isActive, isListening, isSpeaking]);

  const barCount = 12;
  const speed = isListening ? '4s' : isSpeaking ? '6s' : isActive ? '10s' : '16s';

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '200px', height: '200px' }}>
      {/* Outer ring */}
      <div style={{
        position: 'absolute',
        width: '200px', height: '200px',
        borderRadius: '50%',
        border: `1px solid ${color}30`,
        animation: `spin ${isActive ? '8s' : '20s'} linear infinite`,
      }} />
      <div style={{
        position: 'absolute',
        width: '170px', height: '170px',
        borderRadius: '50%',
        border: `1px solid ${color}20`,
        animation: `counter-spin ${isActive ? '12s' : '25s'} linear infinite`,
      }} />

      {/* Morphing blob */}
      <div
        ref={blobRef}
        style={{
          width: '130px', height: '130px',
          background: `radial-gradient(circle at 40% 35%, ${color}CC, ${color}66)`,
          animation: `blob-morph ${speed} ease-in-out infinite`,
          boxShadow: isActive
            ? `0 0 40px ${color}60, 0 0 80px ${color}30`
            : `0 0 20px ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'box-shadow 0.5s ease',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Waveform bars inside blob */}
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '60px' }}>
          {Array.from({ length: barCount }).map((_, i) => (
            <div
              key={i}
              ref={el => barsRef.current[i] = el}
              style={{
                width: '3px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.85)',
                transformOrigin: 'center',
                transition: 'height 0.08s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorphBlob;
