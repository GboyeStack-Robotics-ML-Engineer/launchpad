import React from 'react';

const BrowserChrome = ({ children, title }) => (
  <div style={{
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 15px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--lp-surface-1)',
    overflow: 'hidden',
    border: '1px solid var(--lp-surface-2)',
  }}>
    <div style={{
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '12px',
      background: 'var(--lp-surface-0)',
      borderBottom: '1px solid var(--lp-surface-1)',
    }}>
      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></span>
      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></span>
      <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></span>
    </div>
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <MainHeader title={title} />
        <div style={{ flexGrow: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const items = ['Dashboard', 'Projects', 'Strategy', 'Teams', 'Analytics', 'Settings'];
  return (
    <div style={{
      width: 'clamp(120px, 25%, 180px)',
      background: 'var(--lp-surface-0)',
      padding: 'clamp(12px, 2vw, 24px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(16px, 3vh, 24px)',
      borderRight: '1px solid var(--lp-surface-1)',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px' }}>
        <div style={{
          width: 'clamp(24px, 4vw, 32px)',
          height: 'clamp(24px, 4vw, 32px)',
          background: '#6A5ACD',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--lp-text)' }}>Launch Pad</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vh, 18px)' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: 'clamp(6px, 1vw, 10px) clamp(8px, 1.5vw, 12px)',
            borderRadius: '6px',
            background: item === 'Strategy' ? 'var(--lp-surface-2)' : 'transparent',
            color: item === 'Strategy' ? 'var(--lp-text)' : 'var(--lp-text-secondary)',
            fontWeight: 500,
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            cursor: 'pointer',
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const MainHeader = ({ title }) => (
  <div style={{
    padding: 'clamp(12px, 2vw, 20px) clamp(16px, 3vw, 32px)',
    borderBottom: '1px solid var(--lp-surface-1)',
    background: 'var(--lp-surface-0)',
    flexShrink: 0,
  }}>
    <p style={{ margin: 0, fontSize: 'clamp(12px, 1.8vw, 14px)', color: 'var(--lp-text-secondary)' }}>
      Projects &gt; Q4 Product Launch
    </p>
    <h1 style={{ margin: '4px 0 0', fontSize: 'clamp(20px, 3vw, 28px)', color: 'var(--lp-text)', fontWeight: 700 }}>
      {title}
    </h1>
    <div style={{ marginTop: 'clamp(12px, 2vh, 16px)', display: 'flex', gap: 'clamp(8px, 1.5vw, 12px)', flexWrap: 'wrap' }}>
      {['Overview', 'Tasks', 'Timeline', 'Files', 'Team'].map((tab, i) => (
        <button key={i} style={{
          padding: 'clamp(4px, 1vw, 8px) clamp(10px, 2vw, 16px)',
          borderRadius: '8px',
          border: '1px solid transparent',
          background: tab === 'Timeline' ? 'var(--lp-surface-2)' : 'var(--lp-surface-1)',
          color: 'var(--lp-text)',
          fontSize: 'clamp(12px, 1.8vw, 14px)',
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const StrategyCanvas = () => (
  <div style={{
    padding: 'clamp(8px, 2vw, 24px)',
    background: 'var(--lp-surface-0)',
    borderRadius: '0 0 12px 12px',
    border: '1px solid var(--lp-surface-1)',
    borderTop: 'none',
    fontFamily: "'Inter', sans-serif",
    color: 'var(--lp-text)',
    height: '100%',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      transform: 'scale(0.9)', // Scale down the entire canvas
      transformOrigin: 'top left',
    }}>
      {/* Central Node */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        padding: 'clamp(4px, 1vw, 8px) clamp(8px, 1.5vw, 16px)',
        background: '#4A55FF',
        color: 'white',
        borderRadius: '8px',
        fontSize: 'clamp(10px, 1.5vw, 14px)',
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        Project Strategy
      </div>

      {/* Surrounding Nodes */}
      {([
        { top: '15%', left: '55%', text: 'Research & Discovery', color: '#34D399', width: '150px' },
        { top: '45%', left: '75%', text: 'Product Development', color: '#FBBF24', width: '150px' },
        { top: '75%', left: '65%', text: 'Launch & Growth', color: '#A78BFA', width: '140px' },
        { top: '65%', left: '20%', text: 'Strategy & Planning', color: '#60A5FA', width: '150px' },
      ]).map((node, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: node.top,
          left: node.left,
          transform: 'translate(-50%, -50%)',
          padding: 'clamp(4px, 1vw, 8px) clamp(8px, 1.5vw, 12px)',
          background: 'var(--lp-surface-1)',
          border: `1px solid ${node.color}`,
          borderRadius: '8px',
          fontSize: 'clamp(9px, 1.2vw, 12px)',
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: node.width,
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: node.color, flexShrink: 0 }}></span>
          <span>{node.text}</span>
        </div>
      ))}
      
      {/* Connectors - Simplified SVG */}
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--lp-surface-3)" />
          </marker>
        </defs>
        {/* From Center to Research */}
        <path d="M 95 110 C 120 110, 130 70, 160 70" stroke="var(--lp-surface-3)" strokeWidth="1.5" fill="none" />
        {/* From Center to Planning */}
        <path d="M 80 130 C 60 150, 60 160, 80 170" stroke="var(--lp-surface-3)" strokeWidth="1.5" fill="none" />
        {/* From Center to Development */}
        <path d="M 110 120 C 150 120, 180 110, 210 115" stroke="var(--lp-surface-3)" strokeWidth="1.5" fill="none" />
        {/* From Center to Launch */}
        <path d="M 100 130 C 120 160, 150 180, 180 190" stroke="var(--lp-surface-3)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  </div>
);

const TimelineCanvas = () => {
  const tasks = [
    { name: 'Research', status: '8d', color: '#A78BFA', offset: 0.1, width: 0.2 },
    { name: 'Wireframing', status: '5d', color: '#60A5FA', offset: 0.3, width: 0.15 },
    { name: 'Design', status: '10d', color: '#34D399', offset: 0.45, width: 0.25 },
    { name: 'Development', status: '12d', color: '#4A55FF', offset: 0.7, width: 0.28 },
  ];

  return (
    <div style={{
      padding: 'clamp(8px, 2vw, 16px)',
      background: 'var(--lp-surface-0)',
      borderRadius: '0 0 12px 12px',
      border: '1px solid var(--lp-surface-1)',
      borderTop: 'none',
      fontFamily: "'Inter', sans-serif",
      color: 'var(--lp-text)',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(8px, 1.5vh, 12px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 clamp(8px, 2vw, 12px)' }}>
        <span style={{ fontSize: 'clamp(10px, 1.8vw, 14px)', fontWeight: 600 }}>Task</span>
        <span style={{ fontSize: 'clamp(10px, 1.8vw, 14px)', fontWeight: 600, color: 'var(--lp-text-secondary)' }}>Status</span>
      </div>
      <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(6px, 1vh, 10px)', position: 'relative' }}>
        {/* Background grid lines */}
        <div style={{ position: 'absolute', top: 0, left: '35%', right: 0, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', zIndex: 0 }}>
          <div style={{ borderLeft: '1px dashed var(--lp-surface-2)' }}></div>
          <div style={{ borderLeft: '1px dashed var(--lp-surface-2)' }}></div>
          <div style={{ borderLeft: '1px dashed var(--lp-surface-2)' }}></div>
          <div style={{ borderLeft: '1px dashed var(--lp-surface-2)' }}></div>
        </div>
        
        {tasks.map((task, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '35% 65%',
            alignItems: 'center',
            fontSize: 'clamp(10px, 1.5vw, 13px)',
            fontWeight: 500,
            padding: '0 clamp(8px, 2vw, 12px)',
            zIndex: 1,
          }}>
            <span>{task.name}</span>
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{
                position: 'absolute',
                left: `${task.offset * 100}%`,
                width: `${task.width * 100}%`,
                height: '70%',
                background: task.color,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '8px',
                color: 'white',
                fontSize: 'clamp(8px, 1vw, 10px)',
                overflow: 'hidden',
              }}>
                {task.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const LaunchPadMockup = ({ variant }) => {
  const isStrategy = variant === 'strategy';
  const title = isStrategy ? 'Q4 Product Launch Strategy' : 'Q4 Product Launch';

  return (
    <BrowserChrome title={title}>
      {isStrategy ? <StrategyCanvas /> : <TimelineCanvas />}
    </BrowserChrome>
  );
};

export default LaunchPadMockup;