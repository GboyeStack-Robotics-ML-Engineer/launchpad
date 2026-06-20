import React from 'react';

/* ═══════════════════════════════════════════════════
   LAUNCHPAD MOCKUP — Crisp DOM-rendered UI
   No images. Everything is native HTML/SVG.
   ═══════════════════════════════════════════════════ */

/* ── Browser Chrome Shell ── */
const BrowserChrome = ({ children }) => (
  <div style={{
    width: '100%',
    background: '#FFFFFF',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 25px 60px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
  }}>
    {/* Title Bar */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '12px 16px',
      background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)',
      borderBottom: '1px solid #E8E8E8',
      flexShrink: 0,
    }}>
      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FF5F57' }} />
      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#FFBD2E' }} />
      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28C840' }} />
      <div style={{
        marginLeft: '16px', flex: 1,
        background: '#FFFFFF', borderRadius: '6px',
        padding: '5px 12px', fontSize: '11px', color: '#999',
        border: '1px solid #E0E0E0',
        maxWidth: '300px',
      }}>
        launchpad.io/dashboard
      </div>
    </div>
    {/* Body */}
    <div style={{ display: 'flex', flexGrow: 1, minHeight: 0 }}>
      {children}
    </div>
  </div>
);

/* ── Sidebar ── */
const Sidebar = ({ activeItem = 'Strategy' }) => {
  const items = [
    { icon: '⊞', label: 'Dashboard' },
    { icon: '📁', label: 'Projects' },
    { icon: '◈', label: 'Strategy' },
    { icon: '◇', label: 'Teams' },
    { icon: '△', label: 'Analytics' },
    { icon: '⚙', label: 'Settings' },
  ];

  return (
    <div style={{
      width: '130px', minWidth: '120px',
      background: '#FAFBFC',
      borderRight: '1px solid #EAEDF0',
      padding: '16px 10px',
      display: 'flex', flexDirection: 'column', gap: '2px',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '4px 6px', marginBottom: '14px',
      }}>
        <div style={{
          width: '22px', height: '22px', borderRadius: '6px',
          background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '11px',
        }}>🚀</div>
        <span style={{
          fontWeight: 700, fontSize: '12px', color: '#1A1A2E',
          letterSpacing: '-0.02em',
        }}>LaunchPad</span>
      </div>

      {/* Nav Items */}
      {items.map((item, i) => {
        const isActive = item.label === activeItem;
        return (
          <div key={i} style={{
            padding: '6px 8px', borderRadius: '6px',
            background: isActive ? '#EEF2FF' : 'transparent',
            color: isActive ? '#4F46E5' : '#64748B',
            fontWeight: isActive ? 600 : 500,
            fontSize: '11px',
            display: 'flex', alignItems: 'center', gap: '6px',
            cursor: 'default',
          }}>
            <span style={{ fontSize: '11px', opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
            {item.label}
          </div>
        );
      })}

      {/* Bottom Project Info */}
      <div style={{
        marginTop: 'auto', padding: '10px 8px',
        background: '#F1F5F9', borderRadius: '8px',
      }}>
        <div style={{ color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '8px', marginBottom: '4px' }}>MY PROJECT</div>
        <div style={{ color: '#1E293B', fontWeight: 600, fontSize: '10px' }}>Q4 Product Launch</div>
        <div style={{ color: '#94A3B8', fontSize: '9px', marginTop: '1px' }}>LaunchPad workspace</div>
      </div>
    </div>
  );
};

/* ── Strategy Header ── */
const StrategyHeader = () => (
  <div style={{
    padding: '14px 20px 12px',
    borderBottom: '1px solid #EAEDF0',
    background: '#FFFFFF',
    flexShrink: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '2px', whiteSpace: 'nowrap' }}>
          Project Strategy › Q4 Product Launch
        </div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
          Q4 Product Launch Strategy
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {['+ Add Node', 'Connect', 'Share', 'Save'].map((btn, i) => (
          <button key={i} style={{
            padding: '4px 10px', borderRadius: '6px',
            border: i === 0 ? 'none' : '1px solid #E2E8F0',
            background: i === 0 ? '#4F46E5' : '#FFFFFF',
            color: i === 0 ? '#FFFFFF' : '#475569',
            fontSize: '10px', fontWeight: 600,
            cursor: 'default', whiteSpace: 'nowrap',
          }}>{btn}</button>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   STRATEGY MINDMAP CANVAS
   Uses absolute positioning with pixel-based layout
   and SVG paths that actually connect to node centers
   ═══════════════════════════════════════════ */
const StrategyCanvas = () => (
  <div style={{
    flexGrow: 1, position: 'relative',
    background: '#FAFBFC',
    overflow: 'hidden',
    minHeight: '380px',
  }}>
    {/* SVG Connectors */}
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      {/* Center → Research & Discovery (up-right curve) */}
      <path d="M 170 210 C 200 210, 250 80, 320 80" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Center → Strategy & Planning (right curve) */}
      <path d="M 190 220 C 240 230, 270 240, 310 240" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.35" />
      {/* Strategy & Planning → Product Development (arrow) */}
      <path d="M 440 240 L 500 240" stroke="#CBD5E1" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" />
      {/* Product Development → Launch & Growth (arrow) */}
      <path d="M 630 240 L 690 240" stroke="#CBD5E1" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" />
      {/* Center → bottom left bend */}
      <path d="M 160 230 C 160 280, 300 290, 320 260" stroke="#94A3B8" strokeWidth="1.5" fill="none" opacity="0.3" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#CBD5E1" />
        </marker>
      </defs>
    </svg>

    {/* ── Central Node ── */}
    <div style={{
      position: 'absolute',
      left: '80px', top: '195px',
      padding: '8px 16px',
      background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
      color: '#FFFFFF',
      borderRadius: '10px',
      fontSize: '12px', fontWeight: 700,
      boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
      whiteSpace: 'nowrap', zIndex: 2,
    }}>
      🎯 Project Strategy
    </div>

    {/* ── Research & Discovery ── */}
    <div style={{
      position: 'absolute', left: '280px', top: '30px',
      background: '#FFFFFF', border: '2px solid #D1FAE5', borderRadius: '12px',
      padding: '12px 14px', minWidth: '150px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)', zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #D1FAE5' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>Research & Discovery</span>
      </div>
      {['Market Research', 'Competitor Analysis', 'User Interviews'].map((item, j) => (
        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B', fontWeight: 500, marginBottom: '3px' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10B981', opacity: 0.5 }} />
          {item}
        </div>
      ))}
    </div>

    {/* ── Strategy & Planning ── */}
    <div style={{
      position: 'absolute', left: '280px', top: '175px',
      background: '#FFFFFF', border: '2px solid #DBEAFE', borderRadius: '12px',
      padding: '12px 14px', minWidth: '150px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)', zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #DBEAFE' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3B82F6' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>Strategy & Planning</span>
      </div>
      {['Define Objectives', 'Target Audience', 'MVP Features', 'Roadmap'].map((item, j) => (
        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B', fontWeight: 500, marginBottom: '3px' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3B82F6', opacity: 0.5 }} />
          {item}
        </div>
      ))}
    </div>

    {/* ── Product Development ── */}
    <div style={{
      position: 'absolute', left: '475px', top: '175px',
      background: '#FFFFFF', border: '2px solid #FEF3C7', borderRadius: '12px',
      padding: '12px 14px', minWidth: '150px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)', zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #FEF3C7' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F59E0B' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>Product Development</span>
      </div>
      {['Sprint 1 (Design)', 'Sprint 2 (Build)', 'QA Testing', 'Beta Release'].map((item, j) => (
        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B', fontWeight: 500, marginBottom: '3px' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F59E0B', opacity: 0.5 }} />
          {item}
        </div>
      ))}
    </div>

    {/* ── Launch & Growth ── */}
    <div style={{
      position: 'absolute', left: '665px', top: '175px',
      background: '#FFFFFF', border: '2px solid #F3E8FF', borderRadius: '12px',
      padding: '12px 14px', minWidth: '150px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)', zIndex: 2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #F3E8FF' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#A855F7' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>Launch & Growth</span>
      </div>
      {['Marketing Campaign', 'Launch Day', 'Post-Launch Support', 'Data Analysis'].map((item, j) => (
        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B', fontWeight: 500, marginBottom: '3px' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#A855F7', opacity: 0.5 }} />
          {item}
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   TIMELINE / GANTT CANVAS
   ═══════════════════════════════════════════ */
const TimelineHeader = () => (
  <div style={{
    padding: '14px 20px 12px',
    borderBottom: '1px solid #EAEDF0',
    background: '#FFFFFF',
    flexShrink: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '2px', whiteSpace: 'nowrap' }}>
          Projects › Q4 Product Launch
        </div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
          Q4 Product Launch
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {['Today', 'Filter', 'Share'].map((btn, i) => (
          <button key={i} style={{
            padding: '4px 10px', borderRadius: '6px',
            border: '1px solid #E2E8F0',
            background: '#FFFFFF',
            color: '#475569',
            fontSize: '10px', fontWeight: 500,
            cursor: 'default', whiteSpace: 'nowrap',
          }}>{btn}</button>
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', gap: '3px', marginTop: '10px' }}>
      {['Overview', 'Tasks', 'Timeline', 'Files', 'Team'].map((tab, i) => (
        <button key={i} style={{
          padding: '5px 12px', borderRadius: '6px',
          border: 'none',
          background: tab === 'Timeline' ? '#EEF2FF' : 'transparent',
          color: tab === 'Timeline' ? '#4F46E5' : '#64748B',
          fontSize: '11px', fontWeight: tab === 'Timeline' ? 600 : 500,
          cursor: 'default',
        }}>{tab}</button>
      ))}
    </div>
  </div>
);

const TimelineCanvas = () => {
  const weeks = Array.from({ length: 14 }, (_, i) => 37 + i);
  
  const tasks = [
    { name: 'Q4 Product Launch', dates: 'Sept 11 - Dec 15', status: null, color: '#3B82F6', start: 0, width: 100, isParent: true },
    { name: 'Research', dates: 'Sept 11 - Sept 25', status: 'Todo', statusColor: '#F59E0B', color: '#EC4899', start: 0, width: 18 },
    { name: 'Wireframing', dates: 'Sept 25 - Oct 9', status: 'In Progress', statusColor: '#8B5CF6', color: '#8B5CF6', start: 15, width: 20 },
    { name: 'UI Design', dates: 'Oct 9 - Oct 30', status: 'Review', statusColor: '#F59E0B', color: '#6366F1', start: 35, width: 22 },
    { name: 'Development', dates: 'Oct 30 - Dec 4', status: 'Review', statusColor: '#F59E0B', color: '#3B82F6', start: 50, width: 32 },
    { name: 'Beta Testing', dates: 'Dec 4 - Dec 15', status: 'Done', statusColor: '#10B981', color: '#A855F7', start: 78, width: 18 },
    { name: 'Marketing Prep', dates: 'Dec 4 - Dec 15', status: 'Done', statusColor: '#10B981', color: '#EC4899', start: 82, width: 14 },
  ];

  return (
    <div style={{
      flexGrow: 1, display: 'flex', flexDirection: 'column',
      background: '#FFFFFF', overflow: 'hidden',
    }}>
      {/* Week Headers */}
      <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
        <div style={{ width: '170px', minWidth: '170px', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex' }}>
          {weeks.map((w, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center', padding: '8px 0',
              fontSize: '9px', color: '#CBD5E1', fontWeight: 500,
              borderLeft: '1px solid #F8FAFC',
            }}>Wk {w}</div>
          ))}
        </div>
      </div>

      {/* Task Rows */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tasks.map((task, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            borderBottom: '1px solid #F8FAFC',
            height: task.isParent ? '34px' : '40px',
            background: task.isParent ? '#FAFBFC' : '#FFFFFF',
          }}>
            {/* Task Info */}
            <div style={{
              width: '170px', minWidth: '170px', flexShrink: 0,
              padding: '0 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderRight: '1px solid #F1F5F9',
            }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: task.isParent ? 700 : 600, color: '#1E293B' }}>{task.name}</div>
                <div style={{ fontSize: '8px', color: '#94A3B8', marginTop: '1px' }}>{task.dates}</div>
              </div>
              {task.status && (
                <span style={{
                  padding: '1px 6px', borderRadius: '4px',
                  background: `${task.statusColor}18`,
                  color: task.statusColor,
                  fontSize: '8px', fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>{task.status}</span>
              )}
            </div>

            {/* Gantt Bar */}
            <div style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
              <div style={{
                position: 'absolute',
                left: `${task.start}%`, width: `${task.width}%`,
                height: task.isParent ? '5px' : '22px',
                background: task.isParent
                  ? `linear-gradient(90deg, ${task.color}, ${task.color}88)`
                  : `linear-gradient(135deg, ${task.color}, ${task.color}CC)`,
                borderRadius: task.isParent ? '3px' : '6px',
                boxShadow: task.isParent ? 'none' : `0 2px 6px ${task.color}33`,
                display: 'flex', alignItems: 'center',
                paddingLeft: '8px', paddingRight: '6px',
                overflow: 'hidden',
              }}>
                {!task.isParent && (
                  <span style={{
                    fontSize: '9px', fontWeight: 600, color: '#FFFFFF',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{task.name}</span>
                )}
                {!task.isParent && (
                  <div style={{ marginLeft: 'auto', display: 'flex' }}>
                    {[0, 1].map(j => (
                      <div key={j} style={{
                        width: '14px', height: '14px', borderRadius: '50%',
                        background: `hsl(${(i * 60 + j * 120) % 360}, 65%, 75%)`,
                        border: '1.5px solid #FFFFFF',
                        marginLeft: j > 0 ? '-4px' : '3px',
                      }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */
const LaunchPadMockup = ({ variant = 'strategy', style = {} }) => {
  const isStrategy = variant === 'strategy';

  return (
    <div style={{ width: '100%', ...style }}>
      <BrowserChrome>
        <Sidebar activeItem={isStrategy ? 'Strategy' : 'Projects'} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {isStrategy ? <StrategyHeader /> : <TimelineHeader />}
          {isStrategy ? <StrategyCanvas /> : <TimelineCanvas />}
        </div>
      </BrowserChrome>
    </div>
  );
};

export default LaunchPadMockup;