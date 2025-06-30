import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitBranch, X, GitCompare as Compare } from 'lucide-react';
import { careers } from '../data/careerRoadmaps';
import { Career } from '../types';

interface AltPathGeneratorProps {
  currentCareer: Career;
  onCompareCareer: (career: Career | null) => void;
  compareCareer: Career | null;
}

export function AltPathGenerator({ currentCareer, onCompareCareer, compareCareer }: AltPathGeneratorProps) {
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const availableCareers = careers.filter(c => c.id !== currentCareer.id);

  const handleCompare = () => {
    const career = careers.find(c => c.id === selectedCareerId);
    if (career) {
      onCompareCareer(career);
    }
  };

  const handleRemoveComparison = () => {
    onCompareCareer(null);
    setSelectedCareerId('');
    setIsExpanded(false);
  };

  if (compareCareer) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Compare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Comparing Career Paths</h3>
                  <p className="text-sm text-gray-600">
                    {currentCareer.title} vs {compareCareer.title}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveComparison}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Career */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl">{currentCareer.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{currentCareer.title}</h4>
                    <p className="text-sm text-green-600">Current Path</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time to Master:</span>
                    <span className="font-medium">{currentCareer.timeToMaster}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Range:</span>
                    <span className="font-medium">{currentCareer.averageSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`font-medium ${
                      currentCareer.difficulty === 'Beginner' ? 'text-green-600' :
                      currentCareer.difficulty === 'Intermediate' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {currentCareer.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Alternative Career */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="text-2xl">{compareCareer.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{compareCareer.title}</h4>
                    <p className="text-sm text-purple-600">Alternative Path</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time to Master:</span>
                    <span className="font-medium">{compareCareer.timeToMaster}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Range:</span>
                    <span className="font-medium">{compareCareer.averageSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`font-medium ${
                      compareCareer.difficulty === 'Beginner' ? 'text-green-600' :
                      compareCareer.difficulty === 'Intermediate' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {compareCareer.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Key Differences:</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• {currentCareer.title} focuses on {currentCareer.description.toLowerCase()}</p>
                <p>• {compareCareer.title} focuses on {compareCareer.description.toLowerCase()}</p>
                <p>• Consider your interests, aptitude, and long-term career goals when choosing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-6">
          {!isExpanded ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Explore Alternative Paths</h3>
              <p className="text-gray-600 mb-4">
                Compare {currentCareer.title} with other career options to make an informed decision
              </p>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Compare Careers
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Select a career to compare</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Select value={selectedCareerId} onValueChange={setSelectedCareerId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose an alternative career path" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCareers.map((career) => (
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
                  onClick={handleCompare}
                  disabled={!selectedCareerId}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                >
                  Compare Paths
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}