import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCarousel3D from '../components/ui/TaskCarousel3D';
import MindMap from '../components/ui/MindMap';
import ThemeToggle from '../components/ui/ThemeToggle';

const VIEWS = [
  { id: 'calendar', label: 'Calendar', icon: '◈' },
  { id: 'mindmap', label: 'Mind Map', icon: '✦' },
  { id: 'timeline', label: 'Timeline', icon: '━' },
  { id: 'carousel', label: '3D View', icon: '⟳' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const tasksData = {
  10: [{ label: 'Market Research', color: '#3B9EFF', duration: '1w' }],
  15: [{ label: 'Strategy Session', color: '#7C5CFC', duration: '3d' }],
  18: [{ label: 'MVP Sprint Start', color: '#2BDFB0', duration: '4w' }],
  24: [{ label: 'User Testing', color: '#FFB547', duration: '1w' }, { label: 'Design Review', color: '#FF6B9D', duration: '2d' }],
  28: [{ label: 'Launch Prep', color: '#FF6B9D', duration: '5d' }],
};

const timelineItems = [
  { label: 'Market Research', start: 0, end: 15, color: '#3B9EFF', icon: '🔬' },
  { label: 'Strategy Map', start: 12, end: 25, color: '#7C5CFC', icon: '🗺️' },
  { label: 'MVP Build', start: 20, end: 60, color: '#2BDFB0', icon: '⚡' },
  { label: 'User Testing', start: 50, end: 70, color: '#FFB547', icon: '👥' },
  { label: 'Marketing', start: 60, end: 85, color: '#FF6B9D', icon: '📣' },
  { label: 'Launch', start: 80, end: 100, color: '#FF6B9D', icon: '🚀' },
];

const CalendarPage = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [view, setView] = useState('calendar');
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calGrid = [];
  let dayCount = 1;
  for (let r = 0; r < 6; r++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      if ((r === 0 && c < firstDay) || dayCount > daysInMonth) row.push(null);
      else row.push(dayCount++);
    }
    calGrid.push(row);
    if (dayCount > daysInMonth) break;
  }

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--lp-void)', overflow: 'hidden' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '64px', flexShrink: 0,
        borderBottom: '1px solid var(--lp-border)',
        background: 'var(--lp-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/')} style={{
            color: 'var(--lp-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px',
            cursor: 'pointer', padding: '6px 10px', borderRadius: '8px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--lp-surface-2)'; e.currentTarget.style.color = 'var(--lp-text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lp-muted)'; }}
          >← Home</button>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--lp-text)' }}>
            Calendar & Tasks
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* View switcher */}
          <div style={{
            display: 'flex', gap: '4px', padding: '4px',
            background: 'var(--lp-surface-2)', border: '1px solid var(--lp-border)',
            borderRadius: '999px',
          }}>
            {VIEWS.map(v => (
              <button
                key={v.id}
                id={`view-${v.id}`}
                onClick={() => setView(v.id)}
                style={{
                  padding: '6px 14px', borderRadius: '999px',
                  background: view === v.id ? 'var(--lp-accent)' : 'transparent',
                  color: view === v.id ? 'white' : 'var(--lp-text-2)',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                <span>{v.icon}</span> {v.label}
              </button>
            ))}
          </div>
          <ThemeToggle compact />
          <button
            onClick={() => navigate('/workspace')}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >+ New Task</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>

        {/* ── CALENDAR VIEW ── */}
        {view === 'calendar' && (
          <div style={{ display: 'flex', gap: '20px', height: '100%', minHeight: 0 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Month nav */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--lp-text)' }}>
                  {MONTHS[month]} {year}
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button id="cal-prev" onClick={prevMonth} style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--lp-surface-2)', border: '1px solid var(--lp-border)',
                    color: 'var(--lp-text)', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lp-accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--lp-border)'}
                  >‹</button>
                  <button id="cal-next" onClick={nextMonth} style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--lp-surface-2)', border: '1px solid var(--lp-border)',
                    color: 'var(--lp-text)', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lp-accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--lp-border)'}
                  >›</button>
                </div>
              </div>

              {/* Day headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
                {DAYS.map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: 'var(--lp-muted)', padding: '6px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {calGrid.flat().map((day, i) => {
                  const isToday = day === today && month === now.getMonth() && year === now.getFullYear();
                  const isSelected = day === selectedDay;
                  const dayTasks = tasksData[day] || [];
                  const hasTasks = dayTasks.length > 0;

                  return (
                    <div
                      key={i}
                      id={day ? `cal-day-${day}` : undefined}
                      onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                      style={{
                        minHeight: '72px', borderRadius: '12px',
                        background: isSelected ? 'rgba(124,92,252,0.12)' : day ? 'var(--lp-surface)' : 'transparent',
                        border: isToday ? '1px solid var(--lp-accent)' : isSelected ? '1px solid rgba(124,92,252,0.4)' : '1px solid var(--lp-border)',
                        padding: '8px',
                        cursor: day ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: isToday ? '0 0 16px rgba(124,92,252,0.2)' : 'none',
                      }}
                      onMouseEnter={e => { if (day && !isSelected) e.currentTarget.style.borderColor = 'var(--lp-border-hover)'; }}
                      onMouseLeave={e => { if (day && !isSelected && !isToday) e.currentTarget.style.borderColor = 'var(--lp-border)'; }}
                    >
                      {day && (
                        <>
                          <div style={{
                            fontSize: '0.82rem', fontWeight: isToday ? 700 : 500,
                            color: isToday ? 'var(--lp-accent)' : 'var(--lp-text)',
                            marginBottom: '4px',
                          }}>{day}</div>
                          {dayTasks.slice(0, 2).map((t, ti) => (
                            <div key={ti} style={{
                              fontSize: '0.65rem', padding: '2px 5px', borderRadius: '4px',
                              background: `${t.color}20`, color: t.color, fontWeight: 600,
                              marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>{t.label}</div>
                          ))}
                          {dayTasks.length > 2 && (
                            <div style={{ fontSize: '0.6rem', color: 'var(--lp-muted)' }}>+{dayTasks.length - 2} more</div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Day detail panel */}
            {selectedDay && (
              <div style={{
                width: '280px', flexShrink: 0,
                background: 'var(--lp-surface)', border: '1px solid var(--lp-border)',
                borderRadius: '20px', padding: '20px',
                animation: 'slide-in-right 0.3s ease',
                overflowY: 'auto',
              }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--lp-text)', marginBottom: '4px' }}>
                  {MONTHS[month]} {selectedDay}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--lp-muted)', marginBottom: '20px' }}>
                  {(tasksData[selectedDay] || []).length} task{(tasksData[selectedDay] || []).length !== 1 ? 's' : ''} scheduled
                </div>

                {(tasksData[selectedDay] || []).length > 0 ? (
                  (tasksData[selectedDay]).map((task, i) => (
                    <div key={i} 
                         onClick={() => navigate('/workspace', { state: { highlightTask: task.label } })}
                         style={{
                           padding: '14px', borderRadius: '14px',
                           background: `${task.color}10`, border: `1px solid ${task.color}30`,
                           marginBottom: '10px', animation: `fade-up 0.3s ease ${i * 0.08}s both`,
                           cursor: 'pointer', transition: 'transform 0.2s'
                         }}
                         onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                         onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                         title={`View breakdown for ${task.label}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: task.color }} />
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--lp-text)' }}>{task.label}</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--lp-muted)' }}>Duration: {task.duration}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--lp-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>○</div>
                    <div style={{ fontSize: '0.85rem' }}>No tasks for this day</div>
                    <button onClick={() => navigate('/workspace')} style={{
                      marginTop: '12px', padding: '8px 16px', fontSize: '0.8rem',
                      background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.3)',
                      borderRadius: '999px', color: 'var(--lp-accent)', cursor: 'pointer',
                    }}>+ Add Task</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MIND MAP VIEW ── */}
        {view === 'mindmap' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--lp-text)', marginBottom: '4px' }}>
                Strategy Mind Map
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--lp-muted)' }}>Click branches to expand sub-tasks</p>
            </div>
            <div style={{ background: 'var(--lp-surface)', border: '1px solid var(--lp-border)', borderRadius: '20px', padding: '32px' }}>
              <MindMap />
            </div>
          </div>
        )}

        {/* ── TIMELINE VIEW ── */}
        {view === 'timeline' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--lp-text)', marginBottom: '4px' }}>
                Project Timeline
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--lp-muted)' }}>Click any bar to see task details</p>
            </div>
            <div style={{ background: 'var(--lp-surface)', border: '1px solid var(--lp-border)', borderRadius: '20px', padding: '28px', overflowX: 'auto' }}>
              {/* Week headers */}
              <div style={{ display: 'flex', marginBottom: '16px', paddingLeft: '160px' }}>
                {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'].map((w, i) => (
                  <div key={i} style={{
                    flex: 1, fontSize: '0.65rem', color: 'var(--lp-muted)', fontWeight: 600,
                    textAlign: 'center', letterSpacing: '0.05em',
                  }}>{w}</div>
                ))}
              </div>

              {/* Gantt rows */}
              {timelineItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', animation: `fade-up 0.4s ease ${i * 0.07}s both` }}>
                  <div style={{ width: '150px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px' }}>
                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--lp-text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                  </div>
                  <div style={{ flex: 1, position: 'relative', height: '32px', background: 'var(--lp-surface-2)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute',
                      left: `${item.start}%`,
                      width: `${item.end - item.start}%`,
                      top: 0, bottom: 0,
                      background: `linear-gradient(90deg, ${item.color}CC, ${item.color}88)`,
                      borderRadius: '6px',
                      display: 'flex', alignItems: 'center', paddingLeft: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
                      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                    >
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 3D CAROUSEL VIEW ── */}
        {view === 'carousel' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--lp-text)', marginBottom: '4px' }}>
                3D Task Navigator
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--lp-muted)' }}>Drag to rotate • Click a task to activate</p>
            </div>
            <div style={{
              background: 'var(--lp-surface)', border: '1px solid var(--lp-border)', borderRadius: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: '520px', position: 'relative', overflow: 'hidden',
            }}>
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,92,252,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <TaskCarousel3D />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
