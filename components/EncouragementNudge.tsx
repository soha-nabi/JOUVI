import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Heart, Lightbulb, Target, Zap } from 'lucide-react';
import { VoiceButton } from './VoiceButton';

interface EncouragementNudgeProps {
  completedItemsCount: number;
  totalItems: number;
  careerTitle: string;
}

const encouragementMessages = [
  {
    icon: Heart,
    title: "You're doing amazing!",
    message: "90% of beginners struggle with the first few steps — you're already ahead!",
    color: "from-pink-400 to-red-400",
    voiceText: "You're doing amazing! 90% of beginners struggle with the first few steps, but you're already ahead of the curve. Keep up the fantastic work!"
  },
  {
    icon: Lightbulb,
    title: "Pro tip!",
    message: "The best developers learned by building. Keep practicing with real projects!",
    color: "from-yellow-400 to-orange-400",
    voiceText: "Here's a pro tip! The best developers learned by building real projects. Keep practicing and applying what you learn - that's the secret to mastering your craft!"
  },
  {
    icon: Target,
    title: "Stay focused!",
    message: "Consistency beats perfection. Even 30 minutes daily makes a huge difference!",
    color: "from-blue-400 to-purple-400",
    voiceText: "Stay focused on your goals! Remember, consistency beats perfection every time. Even just 30 minutes of daily practice makes a huge difference in your progress!"
  },
  {
    icon: Zap,
    title: "You're on fire!",
    message: "Your dedication is inspiring. Each completed task gets you closer to your goal!",
    color: "from-green-400 to-teal-400",
    voiceText: "You're absolutely on fire! Your dedication is truly inspiring. Each task you complete brings you one step closer to achieving your career goals!"
  }
];

export function EncouragementNudge({ completedItemsCount, totalItems, careerTitle }: EncouragementNudgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    // Show encouragement after completing a few items
    if (completedItemsCount > 0 && completedItemsCount % 3 === 0) {
      setCurrentMessage(Math.floor(Math.random() * encouragementMessages.length));
      setIsVisible(true);
      
      // Auto hide after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [completedItemsCount]);

  const message = encouragementMessages[currentMessage];
  const Icon = message.icon;
  const progress = (completedItemsCount / totalItems) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className={`bg-gradient-to-r ${message.color} p-1 rounded-2xl shadow-2xl`}>
            <div className="bg-white rounded-xl p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <VoiceButton 
                  text={message.voiceText}
                  context="encouragement"
                  size="sm"
                />
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${message.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">
                    {message.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Your {careerTitle} Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${message.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  {completedItemsCount} of {totalItems} tasks completed
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}