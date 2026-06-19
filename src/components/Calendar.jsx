import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  return (
    <div style={{ padding: '16px' }}>
      <div className="card" style={{ border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>October 2026</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '8px' }}><ChevronLeft size={24} /></button>
            <button style={{ padding: '8px' }}><ChevronRight size={24} /></button>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <CalendarGrid />
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Upcoming Deadlines</h3>
          <ScheduleItem time="Oct 24" title="Product Brainstorming" location="Milestone 1" />
          <div style={{ height: '12px' }}></div>
          <ScheduleItem time="Oct 28" title="Strategy Sync" location="Milestone 2" isActive />
        </div>
      </div>
    </div>
  );
};

const CalendarGrid = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const grid = [];
  
  // Starting day: Thursday
  let dayCounter = 1;
  for (let row = 0; row < 6; row++) {
    const rowCells = [];
    for (let col = 0; col < 7; col++) {
      if ((row === 0 && col < 4) || dayCounter > 31) {
        rowCells.push('');
      } else {
        rowCells.push(dayCounter++);
      }
    }
    grid.push(rowCells);
    if (dayCounter > 31) break;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        {daysOfWeek.map((day, idx) => (
          <div key={idx} style={{ flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'gray' }}>{day}</div>
        ))}
      </div>
      
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', justifyContent: 'space-between' }}>
          {row.map((day, colIdx) => {
            const isToday = day === 24;
            const hasEvent = [10, 15, 24, 28].includes(day);
            return (
              <div key={colIdx} style={{ flex: 1, padding: '2px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {day !== '' && (
                  <div style={{ 
                    position: 'relative',
                    width: '100%', height: '100%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: isToday ? 'var(--md-sys-color-primary)' : 'transparent',
                    borderRadius: '50%',
                    color: isToday ? 'white' : 'var(--md-sys-color-on-background)',
                    fontSize: '14px'
                  }}>
                    {day}
                    {hasEvent && (
                      <div style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isToday ? 'white' : 'var(--md-sys-color-primary)' }}></div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const ScheduleItem = ({ time, title, location, isActive }) => {
  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', padding: '12px', 
      backgroundColor: isActive ? 'var(--md-sys-color-surface)' : 'transparent', 
      borderRadius: '12px' 
    }}>
      <div style={{ width: '70px', fontSize: '14px', fontWeight: 700, color: isActive ? 'var(--md-sys-color-primary)' : 'gray' }}>{time}</div>
      <div style={{ marginLeft: '16px' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--md-sys-color-on-background)' }}>{title}</div>
        <div style={{ fontSize: '12px', color: 'gray' }}>{location}</div>
      </div>
    </div>
  );
};

export default Calendar;
