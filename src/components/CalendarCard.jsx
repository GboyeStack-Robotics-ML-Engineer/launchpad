import React from 'react';

const CalendarCard = () => {
  return (
    <div className="card" style={{ border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-sys-color-primary)', letterSpacing: '1px' }}>UPCOMING CALENDAR</span>
        </div>
        <button style={{ backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-primary)', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 500 }}>
          View All
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <div style={{ width: '56px', height: '56px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <span style={{ fontSize: '12px', fontWeight: 500 }}>Oct</span>
          <span style={{ fontSize: '18px', fontWeight: 700 }}>24</span>
        </div>
        
        <div style={{ marginLeft: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--md-sys-color-on-background)' }}>Strategy Sync</div>
          <div style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>2:30 PM - 3:30 PM • Zoom</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
