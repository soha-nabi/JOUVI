import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Download, Share2 } from 'lucide-react';
import { Career, UserProgress } from '../types';
import { RoadmapCard } from './RoadmapCard';
import { ProgressBar } from './ProgressBar';
import { MentorSection } from './MentorSection';
import { EncouragementNudge } from './EncouragementNudge';
import { AltPathGenerator } from './AltPathGenerator';

interface RoadmapProps {
  career: Career;
  onBack: () => void;
  onRestart: () => void;
}

export function Roadmap({ career, onBack, onRestart }: RoadmapProps) {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    selectedCareer: career.id,
    completedItems: [],
    currentXP: 0,
    level: 1,
    alternativeCareer: undefined
  });

  const [compareCareer, setCompareCareer] = useState<Career | null>(null);

  const totalItems = career.roadmap.reduce((acc, section) => acc + section.items.length, 0);
  const completedCount = userProgress.completedItems.length;
  const totalXP = career.roadmap.reduce((acc, section) => acc + section.xpReward, 0);

  const handleItemComplete = (itemId: string) => {
    if (!userProgress.completedItems.includes(itemId)) {
      // Find the section and item to get XP reward
      const section = career.roadmap.find(s => s.items.some(i => i.id === itemId));
      const item = section?.items.find(i => i.id === itemId);
      
      setUserProgress(prev => {
        const newCompletedItems = [...prev.completedItems, itemId];
        const newXP = prev.currentXP + (item?.estimatedHours || 0) * 5; // 5 XP per hour
        const newLevel = Math.floor(newXP / 250) + 1; // Level up every 250 XP
        
        return {
          ...prev,
          completedItems: newCompletedItems,
          currentXP: newXP,
          level: newLevel
        };
      });
    }
  };

  const handleItemUndo = (itemId: string) => {
    setUserProgress(prev => {
      const section = career.roadmap.find(s => s.items.some(i => i.id === itemId));
      const item = section?.items.find(i => i.id === itemId);
      const xpToRemove = (item?.estimatedHours || 0) * 5;
      
      const newCompletedItems = prev.completedItems.filter(id => id !== itemId);
      const newXP = Math.max(0, prev.currentXP - xpToRemove);
      const newLevel = Math.floor(newXP / 250) + 1;
      
      return {
        ...prev,
        completedItems: newCompletedItems,
        currentXP: newXP,
        level: newLevel
      };
    });
  };

  const isUnlocked = (sectionIndex: number) => {
    if (sectionIndex === 0) return true;
    
    const previousSection = career.roadmap[sectionIndex - 1];
    const previousSectionCompleted = previousSection.items.every(item => 
      userProgress.completedItems.includes(item.id)
    );
    
    return previousSectionCompleted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div className="mb-6 lg:mb-0">
              <Button
                variant="outline"
                onClick={onBack}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Selection
              </Button>
              
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl">{career.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {career.title} Roadmap
                  </h1>
                  <p className="text-gray-600">{career.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>⏱️ {career.timeToMaster}</span>
                <span>💰 {career.averageSalary}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  career.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  career.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {career.difficulty}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onRestart}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigator.share?.({ 
                  title: `My ${career.title} Learning Path`, 
                  url: window.location.href 
                })}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <ProgressBar
                currentXP={userProgress.currentXP}
                totalXP={totalXP}
                level={userProgress.level}
              />
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium">{completedCount}/{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-medium">{Math.round((completedCount / totalItems) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{userProgress.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alt Path Generator */}
          <AltPathGenerator
            currentCareer={career}
            onCompareCareer={setCompareCareer}
            compareCareer={compareCareer}
          />

          {/* Roadmap Sections */}
          <div className="space-y-8 mb-12">
            {career.roadmap.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <RoadmapCard
                  section={section}
                  isUnlocked={isUnlocked(index)}
                  completedItems={userProgress.completedItems}
                  onItemComplete={handleItemComplete}
                  onItemUndo={handleItemUndo}
                />
              </motion.div>
            ))}
          </div>

          {/* Mentor Section */}
          <MentorSection career={career} />

          {/* Encouragement Nudge */}
          <EncouragementNudge
            completedItemsCount={completedCount}
            totalItems={totalItems}
            careerTitle={career.title}
          />
        </motion.div>
      </div>
    </div>
  );
}