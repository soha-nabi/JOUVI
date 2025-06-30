import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  DollarSign
} from 'lucide-react';
import { CareerAnalysisInput, CareerRecommendation } from '../types';

export function CareerAnalyzer() {
  const [formData, setFormData] = useState<CareerAnalysisInput>({
    technicalSkills: [],
    academicPerformance: {
      gpa: '',
      degree: '',
      major: ''
    },
    interests: [],
    workExperience: ''
  });
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const technicalSkillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'MongoDB',
    'Machine Learning', 'Data Analysis', 'Cloud Computing', 'DevOps',
    'Mobile Development', 'UI/UX Design', 'Cybersecurity', 'Blockchain',
    'AI/ML', 'Data Science', 'Web Development', 'Game Development'
  ];

  const interestOptions = [
    'Problem Solving', 'Creative Design', 'Data Analysis', 'Team Leadership',
    'Research', 'Innovation', 'Teaching', 'Entrepreneurship', 'Writing',
    'Public Speaking', 'Project Management', 'Strategy', 'Technology'
  ];

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(skill)
        ? prev.technicalSkills.filter(s => s !== skill)
        : [...prev.technicalSkills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const analyzeCareerPath = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockRecommendations: CareerRecommendation[] = [
        {
          role: 'Full Stack Developer',
          matchPercentage: 94,
          description: 'Build end-to-end web applications using modern technologies',
          requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
          missingSkills: ['Docker', 'AWS', 'TypeScript'],
          salaryRange: '$70,000 - $120,000',
          growthPotential: 'High - 22% growth expected',
          roadmap: [
            'Master TypeScript and advanced React patterns',
            'Learn cloud deployment with AWS/Azure',
            'Build 3-5 full-stack projects',
            'Contribute to open source projects',
            'Apply for junior developer positions'
          ]
        },
        {
          role: 'Data Scientist',
          matchPercentage: 87,
          description: 'Extract insights from data to drive business decisions',
          requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
          missingSkills: ['R', 'Tableau', 'Deep Learning', 'Big Data'],
          salaryRange: '$85,000 - $140,000',
          growthPotential: 'Very High - 31% growth expected',
          roadmap: [
            'Strengthen statistics and mathematics foundation',
            'Learn R and advanced ML algorithms',
            'Complete data science projects with real datasets',
            'Build a portfolio showcasing data insights',
            'Network with data science professionals'
          ]
        },
        {
          role: 'Product Manager',
          matchPercentage: 78,
          description: 'Guide product development from conception to launch',
          requiredSkills: ['Strategy', 'Analytics', 'Communication', 'Leadership'],
          missingSkills: ['Market Research', 'A/B Testing', 'Agile', 'Roadmapping'],
          salaryRange: '$90,000 - $150,000',
          growthPotential: 'High - 19% growth expected',
          roadmap: [
            'Develop product management fundamentals',
            'Learn agile methodologies and tools',
            'Practice with product case studies',
            'Build cross-functional collaboration skills',
            'Seek product management internships'
          ]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setRecommendations([]);
    setFormData({
      technicalSkills: [],
      academicPerformance: {
        gpa: '',
        degree: '',
        major: ''
      },
      interests: [],
      workExperience: ''
    });
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Your Career Analysis Results
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Based on your skills and interests, here are the best career paths for you
              </p>
            </div>

            {/* Results */}
            <div className="space-y-8 mb-12">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            rec.matchPercentage >= 90 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                            rec.matchPercentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                            'bg-gradient-to-r from-purple-400 to-pink-500'
                          }`}>
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{rec.role}</h3>
                            <p className="text-gray-600">{rec.description}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">{rec.matchPercentage}%</div>
                          <div className="text-sm text-gray-500">Match Score</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <Progress value={rec.matchPercentage} className="h-3" />
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-gray-800">Salary Range</span>
                          </div>
                          <p className="text-green-700 font-medium">{rec.salaryRange}</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-800">Growth</span>
                          </div>
                          <p className="text-blue-700 font-medium">{rec.growthPotential}</p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-gray-800">Your Skills</span>
                          </div>
                          <p className="text-purple-700 font-medium">{rec.requiredSkills.length} matches</p>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                            <span className="font-semibold text-gray-800">To Learn</span>
                          </div>
                          <p className="text-orange-700 font-medium">{rec.missingSkills.length} skills</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            Skills You Have
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {rec.requiredSkills.map((skill) => (
                              <Badge key={skill} className="bg-green-100 text-green-700 border-green-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                            Skills to Develop
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {rec.missingSkills.map((skill) => (
                              <Badge key={skill} variant="outline" className="border-orange-200 text-orange-700">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Lightbulb className="w-4 h-4 text-blue-500 mr-2" />
                            Next Steps
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {rec.roadmap.slice(0, 3).map((step, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <Button
                onClick={resetAnalysis}
                variant="outline"
                className="px-8 py-3"
              >
                Analyze Again
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Career Path Analyzer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect career path based on your skills, interests, and academic background.
            </p>
          </div>

          {/* Form */}
          <Card className="bg-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Technical Skills */}
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block text-lg">
                    Technical Skills
                  </Label>
                  <p className="text-gray-600 mb-4">Select all the technical skills you have experience with</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {technicalSkillOptions.map((skill) => (
                      <motion.button
                        key={skill}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSkillToggle(skill)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          formData.technicalSkills.includes(skill)
                            ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white border-transparent shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-sm'
                        }`}
                      >
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Academic Performance */}
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block text-lg">
                    Academic Background
                  </Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-600 mb-2 block">Degree Level</Label>
                      <Select 
                        value={formData.academicPerformance.degree} 
                        onValueChange={(value) => setFormData({
                          ...formData, 
                          academicPerformance: {...formData.academicPerformance, degree: value}
                        })}
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-green-400">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's</SelectItem>
                          <SelectItem value="masters">Master's</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-600 mb-2 block">Major/Field</Label>
                      <Input
                        value={formData.academicPerformance.major}
                        onChange={(e) => setFormData({
                          ...formData,
                          academicPerformance: {...formData.academicPerformance, major: e.target.value}
                        })}
                        placeholder="e.g., Computer Science"
                        className="h-12 border-2 border-gray-200 focus:border-green-400"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-600 mb-2 block">GPA/Grade</Label>
                      <Input
                        value={formData.academicPerformance.gpa}
                        onChange={(e) => setFormData({
                          ...formData,
                          academicPerformance: {...formData.academicPerformance, gpa: e.target.value}
                        })}
                        placeholder="e.g., 3.8/4.0"
                        className="h-12 border-2 border-gray-200 focus:border-green-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block text-lg">
                    Interests & Strengths
                  </Label>
                  <p className="text-gray-600 mb-4">What activities and areas do you enjoy most?</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <motion.button
                        key={interest}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          formData.interests.includes(interest)
                            ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white border-transparent shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-sm'
                        }`}
                      >
                        {interest}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <Label className="text-gray-700 font-medium mb-4 block text-lg">
                    Work Experience
                  </Label>
                  <Select 
                    value={formData.workExperience} 
                    onValueChange={(value) => setFormData({...formData, workExperience: value})}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-green-400">
                      <SelectValue placeholder="Select your work experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No work experience</SelectItem>
                      <SelectItem value="internship">Internship experience</SelectItem>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Analyze Button */}
                <div className="text-center pt-6">
                  <Button
                    onClick={analyzeCareerPath}
                    disabled={isAnalyzing || formData.technicalSkills.length === 0 || formData.interests.length === 0}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg rounded-lg font-medium disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                        />
                        Analyzing Your Profile...
                      </>
                    ) : (
                      <>
                        <Target className="w-5 h-5 mr-2" />
                        Analyze My Career Path
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}