import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check } from 'lucide-react';
import { quizQuestions, careers } from '../data/careerRoadmaps';
import { Career } from '../types';

interface QuizProps {
  onBack: () => void;
  onQuizComplete: (recommendedCareer: Career) => void;
}

export function Quiz({ onBack, onQuizComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => ({ ...prev, [question.id]: selectedOption }));
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption('');
      } else {
        // Calculate results
        const finalAnswers = { ...answers, [question.id]: selectedOption };
        const careerScores: { [careerId: string]: number } = {};
        
        // Initialize scores
        careers.forEach(career => {
          careerScores[career.id] = 0;
        });
        
        // Calculate scores based on answers
        Object.values(finalAnswers).forEach(answerId => {
          quizQuestions.forEach(q => {
            const option = q.options.find(opt => opt.id === answerId);
            if (option) {
              Object.entries(option.careerWeights).forEach(([careerId, weight]) => {
                careerScores[careerId] += weight;
              });
            }
          });
        });
        
        // Find the career with the highest score
        const recommendedCareerId = Object.entries(careerScores).reduce((a, b) => 
          careerScores[a[0]] > careerScores[b[0]] ? a : b
        )[0];
        
        const recommendedCareer = careers.find(c => c.id === recommendedCareerId);
        if (recommendedCareer) {
          onQuizComplete(recommendedCareer);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Restore previous answer
      const prevQuestion = quizQuestions[currentQuestion - 1];
      setSelectedOption(answers[prevQuestion.id] || '');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="outline"
              onClick={onBack}
              className="absolute left-6 top-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Personality Quiz
            </h2>
            <p className="text-gray-600 mb-6">
              Answer a few questions to discover your ideal career path
            </p>
            
            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto">
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    {question.question}
                  </h3>
                  
                  <div className="space-y-4">
                    {question.options.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedOption === option.id
                            ? 'border-teal-400 bg-teal-50 shadow-md'
                            : 'border-gray-200 hover:border-teal-300 hover:bg-teal-25'
                        }`}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === option.id
                              ? 'border-teal-400 bg-teal-400'
                              : 'border-gray-300'
                          }`}>
                            {selectedOption === option.id && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <p className="text-gray-700 font-medium flex-1">
                            {option.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="px-6 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Get Results' : 'Next'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}