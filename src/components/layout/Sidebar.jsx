import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight Strategy if on workspace, Calendar if on calendar
  const getActiveTab = () => {
    if (location.pathname === '/calendar') return 'calendar';
    if (location.pathname === '/workspace') return 'strategy';
    return 'strategy'; // Default/active fallback
  };

  const activeTab = getActiveTab();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/workspace',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/workspace',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      id: 'strategy',
      label: 'Strategy',
      path: '/workspace',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        </svg>
      )
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/calendar',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      id: 'teams',
      label: 'Teams',
      path: '/workspace',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/workspace',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/workspace',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    }
  ];

  return (
    <div style={{
      width: collapsed ? '72px' : '260px',
      height: '100vh',
      background: '#FFFFFF',
      borderRight: '1px solid #ECEFF2',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Sidebar Header: Text Logo & Toggle */}
      <div style={{
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        minHeight: '80px',
        borderBottom: '1px solid #FAFBFB',
        justifyContent: collapsed ? 'center' : 'space-between',
        flexDirection: collapsed ? 'column' : 'row',
        gap: collapsed ? '12px' : '0'
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span style={{
            fontSize: collapsed ? '1.5rem' : '1.8rem',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.04em',
            userSelect: 'none'
          }}>
            {collapsed ? 'L' : 'LaunchPad'}
            <span style={{ color: '#FF5A36' }}>.</span>
          </span>
        </div>

        <button
          onClick={onCollapse}
          style={{
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            color: '#64748B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
          onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <span style={{ fontSize: '10px' }}>{collapsed ? '▶' : '◀'}</span>
        </button>
      </div>

      {/* Menu Navigation Items */}
      <nav style={{
        flex: 1,
        padding: '24px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        overflowY: 'auto'
      }}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const iconColor = isActive ? '#4F46E5' : '#64748B';
          const textColor = isActive ? '#4F46E5' : '#475569';
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                background: isActive ? 'rgba(79, 70, 229, 0.07)' : 'transparent',
                color: textColor,
                fontSize: '0.92rem',
                fontWeight: isActive ? 700 : 500,
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                justifyContent: collapsed ? 'center' : 'flex-start'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.color = '#0F172A';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = textColor;
                }
              }}
              title={collapsed ? item.label : ''}
            >
              {item.icon(iconColor)}
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer: MY PROJECT Info Box */}
      {!collapsed && (
        <div style={{
          padding: '20px',
          borderTop: '1px solid #F1F5F9'
        }}>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #ECEFF2',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              My Project
            </span>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1E293B'
            }}>
              Q4 Product Launch
            </span>
            <span style={{
              fontSize: '0.74rem',
              color: '#64748B',
              fontWeight: 500
            }}>
              LaunchPad workspace
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
