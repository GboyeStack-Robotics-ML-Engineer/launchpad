import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IntakePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  
  // Audio popup states
  const [showAudioPopup, setShowAudioPopup] = useState(false);
  const [audioPhase, setAudioPhase] = useState('listening'); // 'listening', 'processing', 'speaking', 'paused'
  const [isMicActive, setIsMicActive] = useState(true);
  const [elapsedActiveTime, setElapsedActiveTime] = useState(0);
  const [aiResponse, setAiResponse] = useState('');

  const fileInputRef = useRef(null);

  const handleContinue = (e) => {
    e?.preventDefault();
    if (!prompt.trim() && !attachedFile) return;

    let finalPrompt = prompt.trim();
    if (attachedFile) {
      finalPrompt = `[Attached: ${attachedFile.name}] ${finalPrompt}`;
    }

    sessionStorage.setItem('launchpad_intake_prompt', finalPrompt);
    navigate('/builder');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startAudioSession = () => {
    setShowAudioPopup(true);
    setIsMicActive(true);
    setElapsedActiveTime(0);
    setAudioPhase('listening');
    setAiResponse('');
  };

  const closeAudioSession = () => {
    setShowAudioPopup(false);
    setIsMicActive(false);
  };

  // State machine loop based on elapsed active time of mic
  useEffect(() => {
    if (!showAudioPopup || !isMicActive) {
      if (showAudioPopup && !isMicActive) {
        setAudioPhase('paused');
      }
      return;
    }

    const interval = setInterval(() => {
      setElapsedActiveTime(prev => {
        const next = prev + 100;
        
        if (next < 3000) {
          setAudioPhase('listening');
        } else if (next < 4500) {
          setAudioPhase('processing');
        } else if (next < 6500) {
          setAudioPhase('speaking');
          setAiResponse("Got it! Mapped your robotics launch objectives. Initializing workspace builder...");
        } else {
          clearInterval(interval);
          sessionStorage.setItem('launchpad_intake_prompt', "Create a launch strategy for a robotics startup");
          navigate('/builder');
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showAudioPopup, isMicActive, navigate]);

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
      {/* Dynamic CSS Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob-morph {
          0%, 100% { border-radius: 60% 40% 55% 45% / 40% 50% 50% 60%; }
          25% { border-radius: 48% 52% 43% 57% / 50% 62% 38% 50%; }
          50% { border-radius: 40% 60% 65% 35% / 60% 40% 65% 35%; }
          75% { border-radius: 55% 45% 48% 52% / 45% 48% 58% 42%; }
        }
        @keyframes blob-pulse-listening {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(236, 72, 153, 0.2);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 80px rgba(139, 92, 246, 0.7), 0 0 150px rgba(236, 72, 153, 0.5);
          }
        }
        @keyframes blob-pulse-speaking {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.2);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 0 70px rgba(59, 130, 246, 0.6), 0 0 120px rgba(139, 92, 246, 0.4);
          }
        }
        @keyframes blob-pulse-processing {
          0%, 100% {
            transform: scale(1);
            opacity: 0.85;
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
          }
          50% {
            transform: scale(0.96);
            opacity: 0.65;
            box-shadow: 0 0 50px rgba(139, 92, 246, 0.4);
          }
        }
        .mic-btn-hover:hover {
          background: rgba(79, 70, 229, 0.08) !important;
          color: #4F46E5 !important;
        }
        .upload-btn-hover:hover {
          background: rgba(0, 0, 0, 0.04) !important;
          color: #0F172A !important;
        }
      `}} />

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

        {/* File Attachment Badge */}
        {attachedFile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '0.82rem',
            color: '#334155',
            fontWeight: 600
          }}>
            <span>📎 Attached: {attachedFile.name}</span>
            <button 
              type="button" 
              onClick={removeAttachment}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '0 2px'
              }}
            >
              &times;
            </button>
          </div>
        )}

        {/* Input & Integrated Action Buttons Wrap */}
        <div style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '16px',
          marginTop: '12px'
        }}>
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="I'm trying to..."
              autoFocus
              style={{
                width: '100%',
                padding: '18px 105px 18px 24px',
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

            {/* Inline Action Buttons at Extreme Right */}
            <div style={{
              position: 'absolute',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {/* Upload Button */}
              <button
                type="button"
                onClick={handleUploadClick}
                className="upload-btn-hover"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                  background: 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                title="Attach sketch/image"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }}
              />

              {/* Microphone Button */}
              <button
                type="button"
                onClick={startAudioSession}
                className="mic-btn-hover"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                  background: 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                title="Speak to LaunchPad"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!prompt.trim() && !attachedFile}
            className="btn-primary"
            style={{
              alignSelf: 'flex-end',
              padding: '14px 28px',
              fontSize: '0.95rem',
              borderRadius: '12px',
              background: (prompt.trim() || attachedFile) ? '#4F46E5' : '#D1D5DB',
              color: '#FFFFFF',
              boxShadow: (prompt.trim() || attachedFile) ? '0 10px 25px rgba(79, 70, 229, 0.25)' : 'none',
              cursor: (prompt.trim() || attachedFile) ? 'pointer' : 'not-allowed',
              transform: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (prompt.trim() || attachedFile) {
                e.currentTarget.style.background = '#4338CA';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (prompt.trim() || attachedFile) {
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

      {/* ── LIVE AUDIO CONVERSATION FULL-SCREEN OVERLAY ── */}
      {showAudioPopup && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100000,
          background: 'rgba(15, 23, 42, 0.72)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          transition: 'all 0.5s ease',
          animation: 'fadeIn 0.3s ease'
        }}>
          
          {/* Close/Cancel Button */}
          <button
            onClick={closeAudioSession}
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            &times;
          </button>

          {/* Morphing 3D Gradient Conversation Ball */}
          <div style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px'
          }}>
            {/* The main organic pulsing gradient blob */}
            <div style={{
              width: '220px',
              height: '220px',
              background: 'radial-gradient(circle at 35% 30%, #3B82F6 10%, #8B5CF6 50%, #EC4899 90%)',
              animation: `
                blob-morph 6s ease-in-out infinite,
                ${audioPhase === 'listening' ? 'blob-pulse-listening' : audioPhase === 'speaking' ? 'blob-pulse-speaking' : audioPhase === 'processing' ? 'blob-pulse-processing' : 'blob-morph 20s ease-in-out infinite'} 1.8s ease-in-out infinite
              `,
              transition: 'all 0.5s ease',
              filter: 'contrast(1.1)',
              opacity: audioPhase === 'paused' ? 0.45 : 1
            }} />
          </div>

          {/* Microphone Toggle & Caption Area */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            
            {/* Microphone Toggle Button */}
            <button
              onClick={() => setIsMicActive(prev => !prev)}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: isMicActive ? '#4F46E5' : 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                boxShadow: isMicActive ? '0 0 25px rgba(79, 70, 229, 0.5)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
              title={isMicActive ? 'Mute microphone' : 'Unmute microphone'}
            >
              {isMicActive ? (
                // Active Mic Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              ) : (
                // Muted/Slashed Mic Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" x2="22" y1="2" y2="22" />
                  <path d="M18.89 13.23A7.12 7.12 0 0 1 12 18a7 7 0 0 1-5-2.06" />
                  <path d="M5 10v1a7 7 0 0 0 2.22 5.1" />
                  <path d="M19 10v1a7.22 7.22 0 0 1-.22 1.79" />
                  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                  <path d="M9 9v3a3 3 0 0 0 3.75 2.9" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              )}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default IntakePage;
