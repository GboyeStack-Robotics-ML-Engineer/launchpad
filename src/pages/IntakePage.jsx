import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntakePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    sessionStorage.setItem('launchpad_intake_prompt', prompt.trim());
    navigate('/builder');
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#F8FAFC',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflowX: 'hidden'
    }}>
      {/* Top Left Header Logo */}
      <div 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '32px',
          left: '48px',
          fontSize: '1.4rem',
          letterSpacing: '-0.04em',
          fontWeight: 800,
          color: '#0F0F0F',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        LaunchPad<span style={{ color: '#FF5A36' }}>.</span>
      </div>

      {/* Main Intake Form Container */}
      <form 
        onSubmit={handleContinue}
        style={{
          width: '100%',
          maxWidth: '680px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Stage Indicator */}
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#4F46E5',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'monospace'
        }}>
          Stage 01 / Idea Intake
        </div>

        {/* Large Heading */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          margin: 0,
          maxWidth: '560px'
        }}>
          Tell me what you’re trying to build or do.
        </h1>

        {/* Centered Input & Button Wrap */}
        <div style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '16px',
          marginTop: '12px'
        }}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I'm trying to..."
            autoFocus
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '1.05rem',
              color: '#0F172A',
              background: '#FFFFFF',
              border: '1.5px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              outline: 'none',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02), inset 0 2px 4px rgba(0, 0, 0, 0.01)',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4F46E5';
              e.target.style.boxShadow = '0 12px 40px rgba(79, 70, 229, 0.06), inset 0 2px 4px rgba(0, 0, 0, 0.01)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
              e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.02), inset 0 2px 4px rgba(0, 0, 0, 0.01)';
            }}
          />

          <button
            type="submit"
            disabled={!prompt.trim()}
            className="btn-primary"
            style={{
              alignSelf: 'flex-end',
              padding: '14px 28px',
              fontSize: '0.95rem',
              borderRadius: '12px',
              background: prompt.trim() ? '#4F46E5' : '#D1D5DB',
              color: '#FFFFFF',
              boxShadow: prompt.trim() ? '0 10px 25px rgba(79, 70, 229, 0.25)' : 'none',
              cursor: prompt.trim() ? 'pointer' : 'not-allowed',
              transform: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (prompt.trim()) {
                e.currentTarget.style.background = '#4338CA';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (prompt.trim()) {
                e.currentTarget.style.background = '#4F46E5';
                e.currentTarget.style.transform = 'none';
              }
            }}
          >
            Continue &rarr;
          </button>
        </div>

        {/* Footer info text */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748B',
          marginTop: '16px',
          fontWeight: 500
        }}>
          No forms. No options. Just tell us.
        </div>
      </form>
    </div>
  );
};

export default IntakePage;
