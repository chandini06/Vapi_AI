import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { VAPI_CONFIG } from '../config/vapi';

export const useVapiVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentUserInput, setCurrentUserInput] = useState('');
  const [error, setError] = useState(null);
  const vapiRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      vapiRef.current = new Vapi(VAPI_CONFIG.API_KEY);

      vapiRef.current.on('call-start', () => {
        setIsConnected(true);
        setIsListening(true);
      });

      vapiRef.current.on('call-end', () => {
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      });

      vapiRef.current.on('speech-start', () => {
        setIsSpeaking(true);
        setIsListening(false);
      });

      vapiRef.current.on('speech-end', () => {
        setIsSpeaking(false);
        setIsListening(true);
      });

      vapiRef.current.on('message', (message) => {
        // Handle different message types
        if (message.type === 'transcript') {
          if (message.role === 'user') {
            // User's partial transcript - update currentUserInput (temporary display)
            setCurrentUserInput(message.transcript);
          } else if (message.role === 'assistant') {
            // Bot's partial transcript - update currentMessage (temporary display)
            setCurrentMessage(message.transcript);
          }
        } else if (message.type === 'voice-input') {
          // Final processed user input - RIGHT SIDE (blue)
          setConversationHistory(prev => [...prev, {
            role: 'user',
            content: message.input,
            timestamp: new Date().toISOString()
          }]);
          setCurrentUserInput(''); // Clear any partial user input
        } else if (message.type === 'model-output') {
          // Bot's response being generated - LEFT SIDE (gray)
          if (message.output) {
            setCurrentMessage(prev => prev + message.output);
          }
        } else if (message.type === 'speech-update') {
          // Handle speech updates to detect when speech stops for each role
          if (message.status === 'stopped' && message.role === 'assistant' && currentMessage) {
            // Bot speech stopped - add final message to conversation history
            setConversationHistory(prev => [...prev, {
              role: 'assistant',
              content: currentMessage,
              timestamp: new Date().toISOString()
            }]);
            setCurrentMessage(''); // Clear current message
          } else if (message.status === 'stopped' && message.role === 'user' && currentUserInput) {
            // User speech stopped - add final message to conversation history
            setConversationHistory(prev => [...prev, {
              role: 'user',
              content: currentUserInput,
              timestamp: new Date().toISOString()
            }]);
            setCurrentUserInput(''); // Clear current user input
          }
        }
      });

      vapiRef.current.on('error', (error) => {
        setError(error.message);
        setIsListening(false);
        setIsSpeaking(false);
      });
    }

    return () => {
      if (vapiRef.current) {
        // Clean up event listeners and stop any active conversation
        try {
          vapiRef.current.stop();
        } catch (err) {
          // Silent cleanup error
        }
        vapiRef.current = null;
      }
    };
  }, []);

  // Start conversation
  const startConversation = useCallback(async () => {
    try {
      setError(null);
      setConversationHistory([]);
      setCurrentMessage('');
      setCurrentUserInput('');
      
      if (vapiRef.current) {
        await vapiRef.current.start(VAPI_CONFIG.ASSISTANT_ID);
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Stop conversation
  const stopConversation = useCallback(async () => {
    try {
      if (vapiRef.current) {
        await vapiRef.current.stop();
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Send a message (for text input as fallback)
  const sendMessage = useCallback(async (message) => {
    if (!vapiRef.current || !isConnected) return;
    
         try {
       await vapiRef.current.send({
         message: {
           role: 'user',
           content: message
         }
       });
      
      setConversationHistory(prev => [...prev, {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setError(err.message);
    }
  }, [isConnected]);

       // Clear conversation history
  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setCurrentMessage('');
    setCurrentUserInput('');
    setError(null);
  }, []);

  // Debug function to log conversation state
  const logConversationState = useCallback(() => {
    // Silent debug function - removed console logs
  }, [conversationHistory, currentMessage]);

  return {
    isListening,
    isSpeaking,
    isConnected,
    conversationHistory,
    currentMessage,
    currentUserInput,
    error,
    startConversation,
    stopConversation,
    sendMessage,
    clearHistory,
    logConversationState
  };
};
