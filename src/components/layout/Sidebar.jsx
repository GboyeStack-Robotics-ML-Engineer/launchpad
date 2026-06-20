import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{
      width: '32px', height: '32px',
      background: 'linear-gradient(135deg, #7C5CFC, #2BDFB0)',
      borderRadius: '10px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '16px',
      boxShadow: '0 4px 16px rgba(124,92,252,0.4)',
    }}>🚀</div>
    <span style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 800,
      fontSize: '1.15rem',
      background: 'linear-gradient(135deg, #7C5CFC, #2BDFB0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>LaunchPad</span>
  </div>
);

const navItems = [
  { path: '/workspace', icon: '✦', label: 'Workspace', color: '#7C5CFC' },
  { path: '/calendar', icon: '◈', label: 'Calendar', color: '#3B9EFF' },
];

const recentProjects = [
  { label: 'E-Commerce App', time: '2h ago' },
  { label: 'SaaS Landing Page', time: 'Yesterday' },
  { label: 'Mobile App MVP', time: '3d ago' },
];

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      id="app-sidebar"
      style={{
        width: collapsed ? '64px' : '240px',
        height: '100vh',
        background: 'var(--lp-surface)',
        borderRight: '1px solid var(--lp-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--lp-border)', minHeight: '64px' }}>
        {!collapsed && <Logo />}
        {collapsed && (
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #7C5CFC, #2BDFB0)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', margin: '0 auto',
          }}>🚀</div>
        )}
        {!collapsed && (
          <button
            onClick={onCollapse}
            style={{ color: 'var(--lp-muted)', padding: '4px', borderRadius: '6px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--lp-text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--lp-muted)'}
          >
            ◀
          </button>
        )}
        {collapsed && (
          <button
            onClick={onCollapse}
            style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--lp-muted)', padding: '4px', borderRadius: '6px',
              fontSize: '10px',
            }}
          >▶</button>
        )}
      </div>

      {/* New Project */}
      {!collapsed && (
        <div style={{ padding: '12px 16px' }}>
          <button
            id="sidebar-new-project"
            onClick={() => navigate('/workspace')}
            style={{
              width: '100%', padding: '10px 14px',
              background: 'linear-gradient(135deg, rgba(124,92,252,0.2), rgba(43,223,176,0.1))',
              border: '1px solid rgba(124,92,252,0.3)',
              borderRadius: '12px', color: 'var(--lp-accent)',
              fontSize: '0.85rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s ease', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,252,0.3), rgba(43,223,176,0.15))'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,252,0.2), rgba(43,223,176,0.1))'}
          >
            <span>+</span> New Project
          </button>
        </div>
      )}

      {/* Nav */}
      <nav style={{ padding: '8px 8px', flex: 1, overflow: 'hidden auto' }}>
        {!collapsed && (
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--lp-muted)', textTransform: 'uppercase', padding: '8px 8px 6px' }}>
            Navigation
          </div>
        )}
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              id={`sidebar-nav-${item.label.toLowerCase()}`}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 8px',
                borderRadius: '10px',
                marginBottom: '2px',
                background: isActive ? `${item.color}15` : 'transparent',
                border: isActive ? `1px solid ${item.color}30` : '1px solid transparent',
                color: isActive ? item.color : 'var(--lp-text-2)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--lp-surface-2)'; e.currentTarget.style.color = 'var(--lp-text)'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lp-text-2)'; }}}
              title={collapsed ? item.label : ''}
            >
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Recent */}
        {!collapsed && (
          <>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--lp-muted)', textTransform: 'uppercase', padding: '16px 8px 6px' }}>
              Recent Projects
            </div>
            {recentProjects.map((p, i) => (
              <button
                key={i}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 8px', borderRadius: '8px', marginBottom: '2px',
                  background: 'transparent', color: 'var(--lp-text-2)', fontSize: '0.8rem',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--lp-surface-2)'; e.currentTarget.style.color = 'var(--lp-text)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lp-text-2)'; }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, textAlign: 'left' }}>{p.label}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--lp-muted)', flexShrink: 0, marginLeft: '8px' }}>{p.time}</span>
              </button>
            ))}
          </>
        )}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--lp-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {!collapsed && <ThemeToggle />}
        {collapsed && (
          <button
            onClick={() => {}}
            style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--lp-surface-2)', border: '1px solid var(--lp-border)', color: 'var(--lp-text-2)', fontSize: '1rem', margin: '0 auto' }}
          >☀</button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: collapsed ? '0' : '4px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #7C5CFC, #FF6B9D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', color: 'white', fontWeight: 700,
            margin: collapsed ? '0 auto' : '0',
          }}>A</div>
          {!collapsed && (
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--lp-text)' }}>Alex</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--lp-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>alex@launchpad.ai</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
