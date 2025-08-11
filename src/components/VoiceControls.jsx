import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Square } from 'lucide-react';

const VoiceControls = ({
  isListening,
  isSpeaking,
  isConnected,
  onStart,
  onStop,
  onClear,
  onSendMessage
}) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textMessage.trim()) {
      onSendMessage(textMessage);
      setTextMessage('');
      setShowTextInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Voice Control */}
      <div className="flex justify-center">
        <button
          onClick={isConnected ? onStop : onStart}
          disabled={isSpeaking}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isConnected
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg'
          } ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isConnected ? (
            <Square className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
          
          {/* Pulse animation when listening */}
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></div>
          )}
        </button>
      </div>

      {/* Status Indicators */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-gray-400'
          }`}></div>
          <span className={isConnected ? 'text-green-600' : 'text-gray-500'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {isListening ? (
            <>
              <Mic className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600">Listening...</span>
            </>
          ) : isSpeaking ? (
            <>
              <Volume2 className="w-4 h-4 text-purple-500" />
              <span className="text-purple-600">Speaking...</span>
            </>
          ) : (
            <>
              <MicOff className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">Idle</span>
            </>
          )}
        </div>
      </div>

      {/* Text Input Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className="btn-secondary text-sm"
        >
          {showTextInput ? 'Hide Text Input' : 'Add Text Input'}
        </button>
      </div>

      {/* Text Input */}
      {showTextInput && (
        <form onSubmit={handleTextSubmit} className="space-y-2">
          <input
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!textMessage.trim()}
            className="btn-primary w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Message
          </button>
        </form>
      )}

      {/* Clear History Button */}
      <div className="flex justify-center">
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Clear Conversation History
        </button>
      </div>
    </div>
  );
};

export default VoiceControls;
