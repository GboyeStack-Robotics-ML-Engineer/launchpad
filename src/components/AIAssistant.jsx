import React from 'react';
import { X, Mic, MoreVertical, Loader2, Square } from 'lucide-react';
import { useVoiceInteraction, VoiceState } from '../hooks/useVoiceInteraction';

const AIAssistant = ({ onClose }) => {
  const { voiceState, transcript, toggleVoice } = useVoiceInteraction();

  const isListeningOrSpeaking = voiceState === VoiceState.LISTENING || voiceState === VoiceState.SPEAKING;

  return (
    <div className="ai-assistant-container">
      <div className="ai-bg-glow"></div>
      
      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Top Chip */}
        <div style={{ 
          display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', 
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '6px 12px' 
        }}>
          <div style={{ 
            width: '6px', height: '6px', backgroundColor: '#34D399', borderRadius: '50%', 
            marginRight: '8px', animation: 'pulse 2s infinite' 
          }}></div>
          <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
            ENCRYPTED SESSION ACTIVE
          </span>
        </div>

        {/* Center Visuals */}
        <div style={{ position: 'relative', width: '192px', height: '192px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '192px', height: '192px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
          
          <div style={{ 
            width: '128px', height: '128px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #6750A4, #D0BCFF, #381E72)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', gap: '4px', height: '48px', alignItems: 'center' }}>
              <div style={{ width: '6px', height: isListeningOrSpeaking ? '24px' : '8px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '4px', transition: 'height 0.4s ease' }}></div>
              <div style={{ width: '6px', height: isListeningOrSpeaking ? '32px' : '12px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '4px', transition: 'height 0.6s ease' }}></div>
              <div style={{ width: '6px', height: isListeningOrSpeaking ? '48px' : '16px', backgroundColor: 'white', borderRadius: '4px', transition: 'height 0.5s ease' }}></div>
              <div style={{ width: '6px', height: isListeningOrSpeaking ? '36px' : '12px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '4px', transition: 'height 0.45s ease' }}></div>
              <div style={{ width: '6px', height: isListeningOrSpeaking ? '20px' : '8px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '4px', transition: 'height 0.55s ease' }}></div>
            </div>
          </div>
        </div>

        {/* Texts */}
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>
            {voiceState === VoiceState.IDLE && "Gemini Live"}
            {voiceState === VoiceState.LISTENING && "Listening..."}
            {voiceState === VoiceState.PROCESSING && "Thinking..."}
            {voiceState === VoiceState.SPEAKING && "Gemini is speaking..."}
            {voiceState === VoiceState.ERROR && "Error"}
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '300px', margin: '0 auto', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {transcript || "Tap the purple button to speak"}
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: '16px' }}>
          <button onClick={onClose} style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <X size={24} />
          </button>
          
          <button onClick={toggleVoice} style={{ 
            width: '56px', height: '56px', borderRadius: '50%', 
            backgroundColor: voiceState === VoiceState.LISTENING ? 'rgba(255,0,0,0.8)' : '#E8DEF8', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: voiceState === VoiceState.LISTENING ? 'white' : '#21005D' 
          }}>
            {voiceState === VoiceState.LISTENING ? (
              <Square size={20} fill="currentColor" />
            ) : voiceState === VoiceState.PROCESSING || voiceState === VoiceState.SPEAKING ? (
              <Loader2 size={24} className="spin-animation" />
            ) : (
              <Mic size={24} />
            )}
          </button>
          
          <button style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <MoreVertical size={24} />
          </button>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
