import React from 'react';
import { Lightbulb, Target, Users, Code, Brain, Heart } from 'lucide-react';
import { VAPI_CONFIG } from '../config/vapi';

const InterviewTips = () => {
  const tips = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "General Questions",
      description: "Common interview questions about your background, experience, and career goals."
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Technical Questions",
      description: "Problem-solving scenarios and technical knowledge assessments."
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Behavioral Questions",
      description: "Questions about how you handle specific situations and challenges."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Problem Solving",
      description: "Analytical thinking and creative problem-solving approaches."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Culture Fit",
      description: "Questions about your work style, values, and team collaboration."
    }
  ];

  const bestPractices = [
    "Speak clearly and at a moderate pace",
    "Use the STAR method for behavioral questions",
    "Provide specific examples from your experience",
    "Ask thoughtful questions about the role",
    "Show enthusiasm and genuine interest"
  ];

  return (
    <div className="space-y-6">
      {/* Interview Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          Interview Question Categories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-primary-600">
                  {tip.icon}
                </div>
                <h4 className="font-medium text-gray-800">{tip.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Interview Best Practices
        </h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
          <ul className="space-y-2">
            {bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-yellow-600 font-medium">•</span>
                {practice}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          How to Use This Interview Bot
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              Click the microphone button to start your interview session
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              Speak clearly when answering questions or asking for help
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              The bot will ask relevant questions and provide feedback
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              Use the conversation history to review your responses
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default InterviewTips;
