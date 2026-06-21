import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BuilderPage = () => {
  const navigate = useNavigate();
  
  // App settings & configuration state
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState('balanced');
  const [engineVersion, setEngineVersion] = useState('gpt-3.5');
  const [showResourceLink, setShowResourceLink] = useState(true);
  const [showProposedPrompt, setShowProposedPrompt] = useState(true);
  
  // Chat / Interaction state
  const [intakePrompt, setIntakePrompt] = useState('Generate CV file for full stack developer');
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([]);

  // Retrieve prompt from intake stage
  useEffect(() => {
    const savedPrompt = sessionStorage.getItem('launchpad_intake_prompt');
    if (savedPrompt) {
      setIntakePrompt(savedPrompt);
    }
  }, []);

  // Initialize initial message log
  useEffect(() => {
    setChatLog([
      {
        id: 'init-user',
        role: 'user',
        text: intakePrompt,
        time: '2:03 PM, 15 Nov'
      },
      {
        id: 'init-ai',
        role: 'ai',
        text: "Sure! I've read your project outline and generated a complete LaunchPad Blueprint containing structured milestones, task breakdowns, and dependency graphs. You can download the PDF outline below or click 'Launch Workspace' to begin editing the interactive strategy mindmap and calendar.",
        time: '2:03 PM, 15 Nov',
        hasAttachment: true,
        fileName: 'LaunchPad Strategy Blueprint.pdf',
        fileSize: '2.5 MB'
      }
    ]);
  }, [intakePrompt]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLog(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiReply = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: `Understood. I am refining your strategy outline in ${selectedMode} mode using ${engineVersion}. I have updated the milestones to incorporate your feedback. Let me know if you would like to proceed or explore alternative timelines.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatLog(prev => [...prev, aiReply]);
    }, 1000);
  };

  // Color tokens based on dark/light mode
  const theme = {
    bg: darkMode ? '#0F172A' : '#FAFBFC',
    sidebarBg: darkMode ? '#1E293B' : '#FFFFFF',
    sidebarBorder: darkMode ? '#334155' : '#EAEDF0',
    sidebarText: darkMode ? '#F1F5F9' : '#0F172A',
    mutedText: darkMode ? '#94A3B8' : '#64748B',
    chatBg: darkMode ? '#0F172A' : '#FAFBFC',
    mainText: darkMode ? '#F8FAFC' : '#1E293B',
    cardBg: darkMode ? '#1E293B' : '#FFFFFF',
    cardBorder: darkMode ? '#334155' : '#EAEDF0',
    userBubbleBg: darkMode ? 'rgba(79, 70, 229, 0.2)' : '#EEF2FF',
    userBubbleBorder: darkMode ? 'rgba(79, 70, 229, 0.4)' : '#DBEAFE',
    aiBubbleBg: darkMode ? '#1E293B' : '#FFFFFF',
    aiBubbleBorder: darkMode ? '#334155' : '#E2E8F0',
    accent: '#4F46E5',
    accentHover: '#4338CA'
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: theme.bg,
      color: theme.mainText,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflow: 'hidden',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      
      {/* ── LEFT SIDEBAR ── */}
      <aside style={{
        width: '320px',
        background: theme.sidebarBg,
        borderRight: `1px solid ${theme.sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
        zIndex: 10,
        transition: 'background 0.3s ease, border-color 0.3s ease'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: `1px solid ${theme.sidebarBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: 0,
            color: theme.sidebarText
          }}>
            Main
          </h2>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'rgba(79, 70, 229, 0.1)',
            color: '#4F46E5',
            padding: '4px 8px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Config
          </span>
        </div>

        {/* Configurations List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Mode Selection */}
          <div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: theme.sidebarText,
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Mode
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Creative Mode Card */}
              <div 
                onClick={() => setSelectedMode('creative')}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: selectedMode === 'creative' ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                  border: `1.5px solid ${selectedMode === 'creative' ? '#4F46E5' : theme.sidebarBorder}`,
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedMode === 'creative' ? '#4F46E5' : theme.mutedText}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}>
                  {selectedMode === 'creative' && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.sidebarText }}>Creative mode</div>
                  <div style={{ fontSize: '0.72rem', color: theme.mutedText, lineHeight: 1.4, marginTop: '3px' }}>
                    designed to assist and inspire creativity, suggest ideas, or generate exploratory layouts.
                  </div>
                </div>
              </div>

              {/* Balanced Mode Card */}
              <div 
                onClick={() => setSelectedMode('balanced')}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: selectedMode === 'balanced' ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                  border: `1.5px solid ${selectedMode === 'balanced' ? '#4F46E5' : theme.sidebarBorder}`,
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedMode === 'balanced' ? '#4F46E5' : theme.mutedText}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}>
                  {selectedMode === 'balanced' && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.sidebarText }}>Balanced mode</div>
                  <div style={{ fontSize: '0.72rem', color: theme.mutedText, lineHeight: 1.4, marginTop: '3px' }}>
                    strikes a balance between providing helpful responses and maintaining structured plans.
                  </div>
                </div>
              </div>

              {/* Strict Mode Card */}
              <div 
                onClick={() => setSelectedMode('strict')}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: selectedMode === 'strict' ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                  border: `1.5px solid ${selectedMode === 'strict' ? '#4F46E5' : theme.sidebarBorder}`,
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: `1.5px solid ${selectedMode === 'strict' ? '#4F46E5' : theme.mutedText}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  flexShrink: 0
                }}>
                  {selectedMode === 'strict' && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4F46E5' }} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.sidebarText }}>Strict mode</div>
                  <div style={{ fontSize: '0.72rem', color: theme.mutedText, lineHeight: 1.4, marginTop: '3px' }}>
                    strictly adheres to project parameters, timelines, and predefined roadmap boundaries.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Selection Dropdown */}
          <div>
            <label style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: theme.sidebarText,
              display: 'block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Engine Version
            </label>
            <select 
              value={engineVersion}
              onChange={(e) => setEngineVersion(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '0.85rem',
                color: theme.sidebarText,
                background: theme.cardBg,
                border: `1.5px solid ${theme.sidebarBorder}`,
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="gpt-3.5">LaunchPad Engine v1.0 (GPT 3.5)</option>
              <option value="gpt-4">LaunchPad Engine v2.0-Pro (GPT 4o)</option>
              <option value="custom">LaunchPad Custom Tuned</option>
            </select>
          </div>

          {/* Configuration Checkboxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: theme.sidebarText, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={showResourceLink}
                onChange={(e) => setShowResourceLink(e.target.checked)}
                style={{ width: '15px', height: '15px', accentColor: '#4F46E5' }} 
              />
              Show resource-link
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: theme.sidebarText, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={showProposedPrompt}
                onChange={(e) => setShowProposedPrompt(e.target.checked)}
                style={{ width: '15px', height: '15px', accentColor: '#4F46E5' }} 
              />
              Show proposed prompt
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: theme.sidebarText, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                style={{ width: '15px', height: '15px', accentColor: '#4F46E5' }} 
              />
              Dark mode
            </label>
          </div>
        </div>

        {/* Sidebar Footer Tabs */}
        <div style={{
          padding: '16px',
          borderTop: `1px solid ${theme.sidebarBorder}`,
          display: 'flex',
          gap: '8px'
        }}>
          <button style={{
            flex: 1,
            padding: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            borderRadius: '8px',
            border: `1.5px solid ${theme.sidebarBorder}`,
            color: theme.sidebarText,
            textAlign: 'center',
            cursor: 'default'
          }}>
            History
          </button>
          <button style={{
            flex: 1,
            padding: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: '8px',
            background: '#0F172A',
            color: '#FFFFFF',
            textAlign: 'center',
            cursor: 'default'
          }}>
            Main
          </button>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE PANEL ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: theme.chatBg,
        position: 'relative'
      }}>
        {/* Top Navbar Header */}
        <header style={{
          height: '64px',
          borderBottom: `1px solid ${theme.sidebarBorder}`,
          background: theme.sidebarBg,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          {/* Active plan pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F46E5, #2BDFB0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              color: '#fff',
              fontWeight: 700
            }}>
              L
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.sidebarText }}>Standard plan</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', marginLeft: '8px', fontWeight: 600 }}>
                &bull; Active 35,000 people
              </span>
            </div>
          </div>

          {/* Action links & user avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="#" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Upgrade Plan ⚡
            </a>
            <a href="#" style={{ fontSize: '0.8rem', fontWeight: 600, color: theme.mutedText }}>
              Help ⓘ
            </a>
            <a href="#" style={{ fontSize: '0.8rem', fontWeight: 600, color: theme.mutedText }}>
              API 🔗
            </a>
            
            {/* User profile widget */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              borderRadius: '8px',
              border: `1px solid ${theme.sidebarBorder}`,
              background: theme.chatBg
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                background: '#4F46E5',
                color: 'white',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                GG
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: theme.sidebarText }}>Greg Gregor</span>
            </div>
          </div>
        </header>

        {/* Chat Logs Window */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {chatLog.map((msg) => (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              gap: '12px',
              alignItems: 'flex-start',
              width: '100%'
            }}>
              {/* Profile/System Avatar */}
              {msg.role === 'ai' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  ✦
                </div>
              )}
              {msg.role === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme.sidebarBorder,
                  color: theme.sidebarText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  GG
                </div>
              )}

              {/* Message Bubble Container */}
              <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Bubble Text */}
                <div style={{
                  padding: '16px 20px',
                  background: msg.role === 'user' ? theme.userBubbleBg : theme.aiBubbleBg,
                  border: `1px solid ${msg.role === 'user' ? theme.userBubbleBorder : theme.aiBubbleBorder}`,
                  borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: theme.sidebarText,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                }}>
                  {/* User query decoration icons */}
                  {msg.role === 'user' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: theme.mutedText, fontFamily: 'monospace' }}>
                        {msg.time}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button title="Edit" style={{ color: theme.mutedText, fontSize: '0.8rem' }}>✏</button>
                        <button title="Pin" style={{ color: theme.mutedText, fontSize: '0.8rem' }}>📌</button>
                      </div>
                    </div>
                  )}

                  {msg.text}

                  {/* AI Download Card attachment */}
                  {msg.hasAttachment && (
                    <div style={{
                      marginTop: '16px',
                      padding: '14px 18px',
                      background: theme.chatBg,
                      border: `1.5px solid ${theme.sidebarBorder}`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.6rem' }}>📄</span>
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: theme.sidebarText }}>{msg.fileName}</div>
                          <div style={{ fontSize: '0.72rem', color: theme.mutedText }}>{msg.fileSize}</div>
                        </div>
                      </div>
                      <button 
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: theme.sidebarBorder,
                          color: theme.sidebarText,
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onClick={() => alert('Downloading Blueprint...')}
                      >
                        📥 Download
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Launch Workspace Button in AI response */}
                {msg.role === 'ai' && msg.hasAttachment && (
                  <button 
                    onClick={() => navigate('/workspace')}
                    style={{
                      background: theme.accent,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 28px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(79, 70, 229, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: 'fit-content',
                      marginTop: '4px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = theme.accentHover}
                    onMouseLeave={e => e.currentTarget.style.background = theme.accent}
                  >
                    Launch Workspace &rarr;
                  </button>
                )}

                {/* Bubble Timestamp */}
                {msg.role === 'ai' && (
                  <span style={{ fontSize: '0.72rem', color: theme.mutedText, fontFamily: 'monospace', paddingLeft: '4px' }}>
                    {msg.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input & Control Console */}
        <footer style={{
          padding: '16px 24px 24px',
          background: theme.sidebarBg,
          borderTop: `1px solid ${theme.sidebarBorder}`,
          flexShrink: 0
        }}>
          {/* Action Pills */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '14px',
            flexWrap: 'wrap'
          }}>
            {['Translate', 'Improve', 'Make longer', 'Make shorter'].map((pill) => (
              <button 
                key={pill}
                onClick={() => setInputText(prev => prev ? `${prev} - ${pill.toLowerCase()}` : pill)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: theme.chatBg,
                  border: `1px solid ${theme.sidebarBorder}`,
                  color: theme.sidebarText,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Interactive input box */}
          <form 
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px 8px 18px',
              background: theme.chatBg,
              border: `1.5px solid ${inputText.trim() ? theme.accent : theme.sidebarBorder}`,
              borderRadius: '16px',
              boxShadow: inputText.trim() ? '0 0 20px rgba(79, 70, 229, 0.04)' : 'none',
              transition: 'border-color 0.2s ease'
            }}
          >
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Generate message..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.92rem',
                color: theme.sidebarText,
                padding: '8px 0'
              }}
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: inputText.trim() ? theme.accent : theme.sidebarBorder,
                color: inputText.trim() ? 'white' : theme.mutedText,
                border: 'none',
                cursor: inputText.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: 700
              }}
            >
              &uarr;
            </button>
          </form>

          {/* Cancel note */}
          <div style={{
            textAlign: 'right',
            fontSize: '0.68rem',
            color: theme.mutedText,
            marginTop: '6px',
            paddingRight: '6px'
          }}>
            ESC or Click to cancel
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BuilderPage;
