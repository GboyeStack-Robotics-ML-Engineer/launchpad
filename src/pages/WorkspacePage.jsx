import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MorphBlob from '../components/ui/MorphBlob';
import FlowChart from '../components/ui/FlowChart';

const MODES = [
  { id: 'text', label: 'Text', icon: '✦', color: '#7C5CFC', glow: 'rgba(124,92,252,0.25)' },
  { id: 'audio', label: 'Audio', icon: '◎', color: '#3B9EFF', glow: 'rgba(59,158,255,0.25)' },
  { id: 'image', label: 'Image', icon: '◈', color: '#2BDFB0', glow: 'rgba(43,223,176,0.25)' },
  { id: 'video', label: 'Video', icon: '⬡', color: '#FF6B9D', glow: 'rgba(255,107,157,0.25)' },
];

const VOICE_STATES = { IDLE: 'idle', LISTENING: 'listening', PROCESSING: 'processing', SPEAKING: 'speaking' };

const mockResponses = [
  { id: 1, role: 'ai', text: 'Hello! Share your idea — type it out, speak it, or upload an image or video. I\'ll turn it into a clear, actionable strategy.', ts: '2:31 PM' },
];

const WorkspacePage = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('text');
  const [messages, setMessages] = useState(mockResponses);
  const [inputText, setInputText] = useState('');
  const [voiceState, setVoiceState] = useState(VOICE_STATES.IDLE);
  const [showStrategy, setShowStrategy] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [sidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const currentMode = MODES.find(m => m.id === activeMode);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text, ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setTimeout(() => {
      setShowStrategy(true);
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: '✦ Strategy generated! I\'ve analyzed your idea and created a structured action plan. Here\'s your roadmap:',
        strategy: true,
        ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 1200);
  };

  const handleVoiceToggle = () => {
    if (voiceState === VOICE_STATES.IDLE) {
      setVoiceState(VOICE_STATES.LISTENING);
      setTimeout(() => {
        setVoiceState(VOICE_STATES.PROCESSING);
        setTimeout(() => {
          setVoiceState(VOICE_STATES.SPEAKING);
          sendMessage('I want to build a SaaS platform for project management');
          setTimeout(() => setVoiceState(VOICE_STATES.IDLE), 3000);
        }, 1500);
      }, 3000);
    } else {
      setVoiceState(VOICE_STATES.IDLE);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files[0] || e.target?.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--lp-void)', overflow: 'hidden' }}>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: '64px', flexShrink: 0,
          borderBottom: '1px solid var(--lp-border)',
          background: 'var(--lp-surface)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => navigate('/')} style={{
              color: 'var(--lp-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
              padding: '6px 10px', borderRadius: '8px', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--lp-surface-2)'; e.currentTarget.style.color = 'var(--lp-text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--lp-muted)'; }}
            >← Home</button>
            <span style={{ color: 'var(--lp-border)', fontSize: '1rem' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2BDFB0', animation: 'pulse-glow 2s infinite' }} />
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--lp-text)' }}>New Session</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {showStrategy && (
              <button
                id="view-calendar"
                onClick={() => navigate('/calendar')}
                style={{
                  padding: '8px 16px', background: 'rgba(43,223,176,0.12)', border: '1px solid rgba(43,223,176,0.3)',
                  borderRadius: '999px', color: '#2BDFB0', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >◈ View in Calendar</button>
            )}
          </div>
        </div>

        {/* Content split */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Chat area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Mode visual indicator (audio) */}
              {activeMode === 'audio' && (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '48px 0', gap: '24px',
                }}>
                  <MorphBlob
                    isActive={voiceState !== VOICE_STATES.IDLE}
                    isListening={voiceState === VOICE_STATES.LISTENING}
                    isSpeaking={voiceState === VOICE_STATES.SPEAKING}
                    color="#3B9EFF"
                  />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--lp-text)', marginBottom: '8px',
                    }}>
                      {voiceState === VOICE_STATES.IDLE && 'Tap to speak'}
                      {voiceState === VOICE_STATES.LISTENING && 'Listening...'}
                      {voiceState === VOICE_STATES.PROCESSING && 'Thinking...'}
                      {voiceState === VOICE_STATES.SPEAKING && 'Responding...'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--lp-muted)' }}>
                      {voiceState === VOICE_STATES.IDLE ? 'Describe your idea out loud' : 'Voice interaction active'}
                    </div>
                  </div>
                  <button
                    id="voice-toggle-btn"
                    onClick={handleVoiceToggle}
                    style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: voiceState !== VOICE_STATES.IDLE
                        ? 'rgba(255,59,59,0.2)' : 'rgba(59,158,255,0.15)',
                      border: `2px solid ${voiceState !== VOICE_STATES.IDLE ? '#FF3B3B' : '#3B9EFF'}`,
                      color: voiceState !== VOICE_STATES.IDLE ? '#FF3B3B' : '#3B9EFF',
                      fontSize: '1.8rem', cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: voiceState !== VOICE_STATES.IDLE ? '0 0 30px rgba(255,59,59,0.3)' : '0 0 20px rgba(59,158,255,0.2)',
                    }}
                  >
                    {voiceState === VOICE_STATES.IDLE ? '◎' : '◼'}
                  </button>
                </div>
              )}

              {/* Image drop zone */}
              {activeMode === 'image' && !uploadedImage && (
                <div
                  onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragOver ? '#2BDFB0' : 'var(--lp-border)'}`,
                    borderRadius: '20px', padding: '48px', textAlign: 'center',
                    background: isDragOver ? 'rgba(43,223,176,0.05)' : 'transparent',
                    transition: 'all 0.2s ease', cursor: 'pointer',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>◈</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--lp-text)', marginBottom: '8px' }}>
                    Drop your sketch or image here
                  </div>
                  <div style={{ color: 'var(--lp-muted)', fontSize: '0.85rem' }}>
                    PNG, JPG, or wireframe — AI will extract your idea
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileDrop} />
                </div>
              )}

              {uploadedImage && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '300px', borderRadius: '16px', border: '1px solid var(--lp-border)' }} />
                  <button onClick={() => setUploadedImage(null)} style={{
                    position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px',
                    borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '14px',
                  }}>×</button>
                </div>
              )}

              {/* Messages */}
              {(activeMode === 'text' || messages.length > 1) && messages.map(msg => (
                <div key={msg.id} style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  gap: '12px', alignItems: 'flex-start',
                  animation: 'fade-up 0.4s ease',
                }}>
                  {msg.role === 'ai' && (
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #7C5CFC, #2BDFB0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
                    }}>✦</div>
                  )}
                  <div style={{ maxWidth: '75%' }}>
                    <div style={{
                      padding: '14px 18px',
                      background: msg.role === 'user' ? 'rgba(124,92,252,0.15)' : 'var(--lp-surface-2)',
                      border: `1px solid ${msg.role === 'user' ? 'rgba(124,92,252,0.3)' : 'var(--lp-border)'}`,
                      borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      color: 'var(--lp-text)', fontSize: '0.9rem', lineHeight: 1.6,
                    }}>
                      {msg.text}
                    </div>
                    {msg.strategy && (
                      <div style={{
                        marginTop: '16px', padding: '20px',
                        background: 'var(--lp-surface-2)', border: '1px solid var(--lp-border)',
                        borderRadius: '16px',
                      }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--lp-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                          ✦ Generated Strategy
                        </div>
                        <FlowChart animated={true} />
                      </div>
                    )}
                    <div style={{ fontSize: '0.7rem', color: 'var(--lp-muted)', marginTop: '6px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                      {msg.ts}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div style={{
              padding: '16px 24px 24px',
              background: 'var(--lp-surface)',
              borderTop: '1px solid var(--lp-border)',
            }}>
              {/* Mode pills */}
              <div style={{
                display: 'flex', gap: '6px', marginBottom: '12px',
                padding: '4px', background: 'var(--lp-surface-2)',
                border: '1px solid var(--lp-border)', borderRadius: '999px',
                width: 'fit-content',
              }}>
                {MODES.map(mode => (
                  <button
                    key={mode.id}
                    id={`mode-${mode.id}`}
                    onClick={() => setActiveMode(mode.id)}
                    style={{
                      padding: '7px 16px', borderRadius: '999px',
                      background: activeMode === mode.id ? `${mode.color}20` : 'transparent',
                      border: `1px solid ${activeMode === mode.id ? mode.color + '50' : 'transparent'}`,
                      color: activeMode === mode.id ? mode.color : 'var(--lp-muted)',
                      fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      display: 'flex', alignItems: 'center', gap: '5px',
                    }}
                  >
                    <span>{mode.icon}</span> {mode.label}
                  </button>
                ))}
              </div>

              {/* Text input */}
              {activeMode === 'text' && (
                <div style={{
                  display: 'flex', gap: '10px', alignItems: 'flex-end',
                  background: 'var(--lp-surface-2)',
                  border: `1px solid ${inputText ? currentMode.color + '50' : 'var(--lp-border)'}`,
                  borderRadius: '20px', padding: '12px 12px 12px 20px',
                  transition: 'border-color 0.2s ease',
                  boxShadow: inputText ? `0 0 20px ${currentMode.glow}` : 'none',
                }}>
                  <textarea
                    id="workspace-text-input"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputText); }}}
                    placeholder="Describe your idea, project, or goal..."
                    rows={1}
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      color: 'var(--lp-text)', fontSize: '0.95rem', resize: 'none',
                      fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
                      maxHeight: '150px', overflowY: 'auto',
                    }}
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                    }}
                  />
                  <button
                    id="workspace-send-btn"
                    onClick={() => sendMessage(inputText)}
                    disabled={!inputText.trim()}
                    style={{
                      width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                      background: inputText.trim() ? 'var(--lp-accent)' : 'var(--lp-surface-3)',
                      color: 'white', fontSize: '1rem', cursor: inputText.trim() ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >→</button>
                </div>
              )}

              {activeMode === 'image' && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      flex: 1, padding: '14px', background: 'var(--lp-surface-2)',
                      border: '1px solid var(--lp-border)', borderRadius: '16px',
                      color: 'var(--lp-muted)', fontSize: '0.9rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}
                  >
                    <span style={{ color: '#2BDFB0' }}>◈</span>
                    {uploadedImage ? 'Image uploaded — describe what to do with it' : 'Click to upload image or sketch'}
                  </button>
                  {uploadedImage && (
                    <button
                      onClick={() => sendMessage('Analyze this image and create a strategy')}
                      className="btn-primary"
                      style={{ flexShrink: 0, padding: '14px 24px' }}
                    >Analyze →</button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileDrop} />
                </div>
              )}

              {activeMode === 'video' && (
                <div style={{
                  display: 'flex', gap: '10px', alignItems: 'center',
                  padding: '16px 20px',
                  background: 'var(--lp-surface-2)', border: '1px solid rgba(255,107,157,0.2)',
                  borderRadius: '16px',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>⬡</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--lp-text)', marginBottom: '2px' }}>Video Mode</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--lp-muted)' }}>Record or upload a video explaining your idea</div>
                  </div>
                  <button className="btn-primary" style={{ background: '#FF6B9D', padding: '10px 20px', fontSize: '0.85rem', flexShrink: 0 }}>
                    ⏺ Record
                  </button>
                </div>
              )}

              {activeMode === 'audio' && (
                <div style={{ textAlign: 'center', color: 'var(--lp-muted)', fontSize: '0.85rem', padding: '8px 0' }}>
                  Use the microphone above to record your idea
                </div>
              )}
            </div>
          </div>

          {/* Right panel — Strategy summary */}
          {showStrategy && (
            <div style={{
              width: '300px', flexShrink: 0,
              borderLeft: '1px solid var(--lp-border)',
              background: 'var(--lp-surface)',
              padding: '20px', overflowY: 'auto',
              animation: 'slide-in-right 0.4s ease',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--lp-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                ✦ Strategy Summary
              </div>
              {[
                { icon: '🔬', label: 'Market Research', time: '1 week', color: '#3B9EFF' },
                { icon: '🗺️', label: 'Define Strategy', time: '3 days', color: '#7C5CFC' },
                { icon: '⚡', label: 'Build MVP', time: '4 weeks', color: '#2BDFB0' },
                { icon: '👥', label: 'User Testing', time: '1 week', color: '#FFB547' },
                { icon: '🚀', label: 'Launch', time: '1 week', color: '#FF6B9D' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px', borderRadius: '12px',
                  background: 'var(--lp-surface-2)', border: '1px solid var(--lp-border)',
                  marginBottom: '8px',
                  animation: `fade-up 0.4s ease ${i * 0.08}s both`,
                }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--lp-text)' }}>{item.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--lp-muted)' }}>{item.time}</div>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                </div>
              ))}
              <button
                onClick={() => navigate('/calendar')}
                style={{
                  width: '100%', marginTop: '12px', padding: '12px',
                  background: 'rgba(43,223,176,0.1)', border: '1px solid rgba(43,223,176,0.25)',
                  borderRadius: '12px', color: '#2BDFB0', fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(43,223,176,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(43,223,176,0.1)'}
              >
                Open in Calendar →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
