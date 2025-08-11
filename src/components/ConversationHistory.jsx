import React from 'react';
import { MessageCircle, User, Bot } from 'lucide-react';

const ConversationHistory = ({ conversationHistory, currentMessage, currentUserInput }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (conversationHistory.length === 0 && !currentMessage && !currentUserInput) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">No conversation yet</p>
        <p className="text-sm text-gray-400">Start talking to begin your interview practice!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {conversationHistory.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            message.role === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'user'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {message.role === 'user' ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>
          
          <div
            className={`max-w-[280px] sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary-600 text-white ml-auto'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <p className={`text-xs mt-1 ${
              message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
            }`}>
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      ))}
      
      {currentUserInput && (
        <div className="flex items-start gap-3 flex-row-reverse">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="max-w-[280px] sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 rounded-lg bg-primary-600 text-white ml-auto">
            <p className="text-sm">{currentUserInput}</p>
            <p className="text-xs mt-1 text-primary-100">
              {formatTime(new Date().toISOString())}
            </p>
          </div>
        </div>
      )}
      
      {currentMessage && (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div className="max-w-[280px] sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
            <p className="text-sm">{currentMessage}</p>
            <p className="text-xs mt-1 text-gray-500">
              {formatTime(new Date().toISOString())}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;
