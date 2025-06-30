import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

interface ProgressBarProps {
  currentXP: number;
  totalXP: number;
  level: number;
  className?: string;
}

export function ProgressBar({ currentXP, totalXP, level, className }: ProgressBarProps) {
  const progress = (currentXP / totalXP) * 100;
  const nextLevelXP = (level + 1) * 250; // Each level requires more XP
  const currentLevelXP = level * 250;
  const progressInCurrentLevel = ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Level {level}</h3>
            <p className="text-sm text-gray-600">{currentXP} / {nextLevelXP} XP</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < level % 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(progressInCurrentLevel, 5)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Level {level}</span>
          <span>Level {level + 1}</span>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600">
          {nextLevelXP - currentXP} XP to next level!
        </p>
      </motion.div>
    </div>
  );
}