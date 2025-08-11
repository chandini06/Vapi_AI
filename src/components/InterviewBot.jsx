import React, { useState } from 'react';
import { useVapiVoice } from '../hooks/useVapiVoice';
import VoiceControls from './VoiceControls';
import ConversationHistory from './ConversationHistory';
import InterviewTips from './InterviewTips';
import { MessageSquare, X, Menu } from 'lucide-react';

const InterviewBot = () => {
  const {
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
    clearHistory
  } = useVapiVoice();

           const [showTips, setShowTips] = useState(true);
         const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Interview Voice Bot
              </h1>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Voice Controls & Tips */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6 order-2 xl:order-1">
            {/* Voice Controls */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Voice Controls
              </h2>
                                   <VoiceControls
                       isListening={isListening}
                       isSpeaking={isSpeaking}
                       isConnected={isConnected}
                       onStart={startConversation}
                       onStop={stopConversation}
                       onClear={clearHistory}
                       onSendMessage={sendMessage}
                     />
            </div>

            {/* Interview Tips - Desktop */}
            <div className="hidden xl:block">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Interview Tips
                  </h2>
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {showTips && <InterviewTips />}
              </div>
            </div>
          </div>

          {/* Right Column - Conversation */}
          <div className="xl:col-span-2 order-1 xl:order-2">
            <div className="card h-full min-h-[500px]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                  Interview Conversation
                </h2>
                <div className="flex items-center gap-2">
                  {conversationHistory.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {conversationHistory.length} messages
                    </span>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              )}

              {/* Conversation History */}
              <div className="flex-1 min-h-[400px]">
                <ConversationHistory
                  conversationHistory={conversationHistory}
                  currentMessage={currentMessage}
                  currentUserInput={currentUserInput}
                />
              </div>

              {/* Quick Actions */}
              {conversationHistory.length === 0 && (
                <div className="mt-8 text-center">
                  <p className="text-gray-500 mb-4">
                    Ready to start your interview practice?
                  </p>
                  <button
                    onClick={startConversation}
                    className="btn-primary"
                  >
                    Start Interview Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Tips Section */}
        {showMobileMenu && (
          <div className="xl:hidden mt-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Interview Tips
                </h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <InterviewTips />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InterviewBot;
