import { useState, useRef, useEffect, useCallback } from 'react';

export const VoiceState = {
  IDLE: 'IDLE',
  LISTENING: 'LISTENING',
  PROCESSING: 'PROCESSING',
  SPEAKING: 'SPEAKING',
  ERROR: 'ERROR'
};

export function useVoiceInteraction() {
  const [voiceState, setVoiceState] = useState(VoiceState.IDLE);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setVoiceState(VoiceState.LISTENING);
        setTranscript('Listening...');
      };

      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        sendToGemini(text);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error !== 'no-speech') {
          setVoiceState(VoiceState.ERROR);
          setTranscript(`Error listening: ${event.error}`);
        } else {
          setVoiceState(VoiceState.IDLE);
          setTranscript('Tap the purple button to speak');
        }
      };

      recognitionRef.current.onend = () => {
        setVoiceState((prev) => {
          if (prev === VoiceState.LISTENING) return VoiceState.IDLE;
          return prev;
        });
      };
    } else {
      setVoiceState(VoiceState.ERROR);
      setTranscript('Speech recognition not available on this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      synthRef.current.cancel();
    };
  }, []);

  const sendToGemini = async (prompt) => {
    setVoiceState(VoiceState.PROCESSING);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setVoiceState(VoiceState.ERROR);
        setTranscript('VITE_GEMINI_API_KEY is not set in .env');
        return;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are an AI assistant for LaunchPad, a decision support platform. Respond concisely and helpfully. User said: ${prompt}` }]
          }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const text = data.candidates[0].content.parts[0].text;
        setTranscript(text);
        speakText(text);
      } else {
        setVoiceState(VoiceState.ERROR);
        setTranscript("Couldn't understand Gemini response.");
      }
    } catch (e) {
      console.error(e);
      setVoiceState(VoiceState.ERROR);
      setTranscript(`Error: ${e.message}`);
    }
  };

  const speakText = (text) => {
    setVoiceState(VoiceState.SPEAKING);
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    
    utterance.onend = () => {
      setVoiceState(VoiceState.IDLE);
    };

    utterance.onerror = () => {
      setVoiceState(VoiceState.ERROR);
    };

    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const toggleVoice = useCallback(() => {
    switch (voiceState) {
      case VoiceState.IDLE:
      case VoiceState.ERROR:
        startListening();
        break;
      case VoiceState.LISTENING:
        stopListening();
        break;
      case VoiceState.SPEAKING:
        synthRef.current.cancel();
        setVoiceState(VoiceState.IDLE);
        break;
      case VoiceState.PROCESSING:
        break;
    }
  }, [voiceState]);

  return { voiceState, transcript, toggleVoice };
}
