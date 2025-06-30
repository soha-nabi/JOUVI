import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, ExternalLink, CheckCircle, Circle, Trophy } from 'lucide-react';
import { RoadmapSection, RoadmapItem } from '../types';

interface RoadmapCardProps {
  section: RoadmapSection;
  isUnlocked: boolean;
  completedItems: string[];
  onItemComplete: (itemId: string) => void;
  onItemUndo: (itemId: string) => void;
}

export function RoadmapCard({ section, isUnlocked, completedItems, onItemComplete, onItemUndo }: RoadmapCardProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const completedCount = section.items.filter(item => completedItems.includes(item.id)).length;
  const progress = (completedCount / section.items.length) * 100;
  const isCompleted = completedCount === section.items.length;
  
  const getSectionColor = (type: string) => {
    switch (type) {
      case 'learn': return 'from-blue-400 to-indigo-500';
      case 'tools': return 'from-green-400 to-teal-500';
      case 'practice': return 'from-purple-400 to-pink-500';
      case 'apply': return 'from-orange-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${!isUnlocked ? 'opacity-60' : ''}`}
    >
      <Card className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-400' : ''
      }`}>
        <CardContent className="p-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getSectionColor(section.type)} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  {section.title}
                  {isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
                </h3>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">+{section.xpReward} XP</div>
              <div className="text-sm text-gray-500">{completedCount}/{section.items.length} completed</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {section.items.map((item, index) => {
              const isItemCompleted = completedItems.includes(item.id);
              const isExpanded = expandedItems.includes(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg transition-all duration-200 ${
                    isItemCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleItemExpansion(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isItemCompleted) {
                              onItemUndo(item.id);
                            } else {
                              onItemComplete(item.id);
                            }
                          }}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isItemCompleted
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {isItemCompleted && <CheckCircle className="w-4 h-4" />}
                        </button>
                        
                        <div className="flex-1">
                          <h4 className={`font-medium ${isItemCompleted ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                            {item.title}
                          </h4>
                          <p className={`text-sm ${isItemCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.estimatedHours}h
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t bg-white px-4 py-3"
                    >
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                          Learn more about {item.title.toLowerCase()} and how it fits into your career journey.
                        </p>
                        
                        {item.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.link, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Resource
                          </Button>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Type: {item.type}</span>
                          <span>Estimated time: {item.estimatedHours} hours</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}