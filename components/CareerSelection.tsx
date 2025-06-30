import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Brain, Target } from 'lucide-react';
import { careers } from '../data/careerRoadmaps';
import { Career } from '../types';

interface CareerSelectionProps {
  onBack: () => void;
  onCareerSelect: (career: Career) => void;
  onTakeQuiz: () => void;
}

export function CareerSelection({ onBack, onCareerSelect, onTakeQuiz }: CareerSelectionProps) {
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');

  const handleCareerSelect = () => {
    const career = careers.find(c => c.id === selectedCareerId);
    if (career) {
      onCareerSelect(career);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900 py-20">
      <div className="w-full px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12 relative">
            <Button
              variant="outline"
              onClick={onBack}
              className="absolute left-0 top-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select a career path you're interested in, or take our quick quiz to get a personalized recommendation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Direct Career Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      I Know What I Want
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Choose from our curated career paths and get started immediately.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Select value={selectedCareerId} onValueChange={setSelectedCareerId}>
                      <SelectTrigger className="w-full h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400">
                        <SelectValue placeholder="Select a career path" />
                      </SelectTrigger>
                      <SelectContent>
                        {careers.map((career) => (
                          <SelectItem key={career.id} value={career.id}>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{career.icon}</span>
                              <div>
                                <div className="font-medium">{career.title}</div>
                                <div className="text-sm text-gray-500">{career.difficulty} • {career.timeToMaster}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={handleCareerSelect}
                      disabled={!selectedCareerId}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      Start Learning Path
                    </Button>
                  </div>

                  {/* Career previews */}
                  <div className="mt-6 space-y-3">
                    {careers.map((career) => (
                      <motion.div
                        key={career.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedCareerId === career.id
                            ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                        }`}
                        onClick={() => setSelectedCareerId(career.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{career.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 dark:text-gray-100">{career.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{career.averageSalary}</div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            career.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            career.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {career.difficulty}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quiz Option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Help Me Decide
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Take our personality quiz to discover the perfect career path for you.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">What you'll discover:</h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Your personality type and work style</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span>Careers that match your interests</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span>Personalized learning recommendations</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span>Skills gap analysis</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      onClick={onTakeQuiz}
                      className="w-full h-12 bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-600 hover:to-orange-700 text-white rounded-lg font-medium"
                    >
                      Take Personality Quiz
                    </Button>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      <p>⏱️ Takes only 2 minutes</p>
                      <p>✨ Get instant results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}