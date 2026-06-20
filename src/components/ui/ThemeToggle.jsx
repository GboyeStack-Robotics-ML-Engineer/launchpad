import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ThemeToggle = ({ compact = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: compact ? '6px' : '8px 14px',
        background: 'var(--lp-surface-2)',
        border: '1px solid var(--lp-border)',
        borderRadius: 'var(--radius-full)',
        color: 'var(--lp-text-2)',
        fontSize: '0.8rem',
        fontWeight: 500,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--lp-border-hover)';
        e.currentTarget.style.color = 'var(--lp-text)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--lp-border)';
        e.currentTarget.style.color = 'var(--lp-text-2)';
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      {!compact && <span>{theme === 'dark' ? 'Day Mode' : 'Night Mode'}</span>}
    </button>
  );
};

export default ThemeToggle;
