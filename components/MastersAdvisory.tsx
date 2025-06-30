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
  GraduationCap, 
  Globe, 
  BookOpen, 
  MapPin, 
  Star,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle
} from 'lucide-react';
import { MastersAdvisoryInput, CountryRecommendation } from '../types';

export function MastersAdvisory() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MastersAdvisoryInput>({
    academicBackground: '',
    currentDegree: '',
    gpa: '',
    studyGoals: [],
    preferredCountries: [],
    budgetRange: '',
    programInterests: [],
    workExperience: ''
  });
  const [recommendations, setRecommendations] = useState<CountryRecommendation[]>([]);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const studyGoalOptions = [
    'Research & PhD Preparation',
    'Industry Career Advancement',
    'Entrepreneurship',
    'Academic Career',
    'Skill Enhancement',
    'Career Change'
  ];

  const programOptions = [
    'Computer Science',
    'Data Science',
    'Business Administration',
    'Engineering',
    'Medicine',
    'Law',
    'Arts & Humanities',
    'Social Sciences'
  ];

  const countryOptions = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'Netherlands',
    'Sweden',
    'Singapore'
  ];

  const faqCategories = [
    {
      id: 'visa',
      title: 'Visa Requirements',
      questions: [
        {
          q: 'What documents do I need for a student visa?',
          a: 'Typically you need: passport, acceptance letter, financial proof, academic transcripts, English proficiency test scores, and health insurance.'
        },
        {
          q: 'How long does visa processing take?',
          a: 'Processing times vary by country: US (2-3 months), UK (3 weeks), Canada (4-6 weeks), Australia (1-4 months).'
        }
      ]
    },
    {
      id: 'courses',
      title: 'Course Selection',
      questions: [
        {
          q: 'How do I choose the right program?',
          a: 'Consider your career goals, academic background, research interests, and future plans. Look at curriculum, faculty, and industry connections.'
        },
        {
          q: 'What\'s the difference between coursework and research programs?',
          a: 'Coursework programs focus on classes and practical skills. Research programs emphasize independent research and thesis writing.'
        }
      ]
    },
    {
      id: 'scholarships',
      title: 'Scholarship Options',
      questions: [
        {
          q: 'What scholarships are available for international students?',
          a: 'Merit-based scholarships, need-based aid, research assistantships, and country-specific programs like Fulbright, Chevening, etc.'
        },
        {
          q: 'When should I apply for scholarships?',
          a: 'Start 12-18 months before your intended start date. Many deadlines are 6-12 months before the academic year begins.'
        }
      ]
    }
  ];

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      studyGoals: prev.studyGoals.includes(goal)
        ? prev.studyGoals.filter(g => g !== goal)
        : [...prev.studyGoals, goal]
    }));
  };

  const handleProgramToggle = (program: string) => {
    setFormData(prev => ({
      ...prev,
      programInterests: prev.programInterests.includes(program)
        ? prev.programInterests.filter(p => p !== program)
        : [...prev.programInterests, program]
    }));
  };

  const handleCountryToggle = (country: string) => {
    setFormData(prev => ({
      ...prev,
      preferredCountries: prev.preferredCountries.includes(country)
        ? prev.preferredCountries.filter(c => c !== country)
        : [...prev.preferredCountries, country]
    }));
  };

  const generateRecommendations = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockRecommendations: CountryRecommendation[] = [
        {
          country: 'United States',
          flag: '🇺🇸',
          score: 92,
          reasons: [
            'Strong research opportunities in your field',
            'Excellent industry connections',
            'High post-graduation employment rates'
          ],
          visaRequirements: [
            'F-1 Student Visa required',
            'SEVIS fee: $350',
            'Financial proof: $50,000+ annually',
            'English proficiency: TOEFL/IELTS'
          ],
          averageCost: '$40,000 - $70,000/year',
          topUniversities: ['MIT', 'Stanford', 'Harvard', 'Carnegie Mellon'],
          careerOpportunities: [
            'Tech industry leadership',
            'Research positions',
            'Startup ecosystem access'
          ]
        },
        {
          country: 'Canada',
          flag: '🇨🇦',
          score: 88,
          reasons: [
            'Post-graduation work permit opportunities',
            'Pathway to permanent residency',
            'Lower tuition costs than US'
          ],
          visaRequirements: [
            'Study Permit required',
            'Biometrics: $85',
            'Financial proof: $20,000+ annually',
            'Medical exam may be required'
          ],
          averageCost: '$25,000 - $45,000/year',
          topUniversities: ['University of Toronto', 'UBC', 'McGill', 'Waterloo'],
          careerOpportunities: [
            'Tech hub opportunities',
            'Government research roles',
            'Immigration-friendly policies'
          ]
        },
        {
          country: 'Germany',
          flag: '🇩🇪',
          score: 85,
          reasons: [
            'Low or no tuition fees',
            'Strong engineering programs',
            'EU market access'
          ],
          visaRequirements: [
            'Student Visa required',
            'Blocked account: €11,208',
            'Health insurance mandatory',
            'German language proficiency helpful'
          ],
          averageCost: '€500 - €3,000/year tuition',
          topUniversities: ['TUM', 'RWTH Aachen', 'KIT', 'TU Berlin'],
          careerOpportunities: [
            'Engineering excellence',
            'Automotive industry',
            'Research institutions'
          ]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
      setCurrentStep(3);
    }, 2000);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Academic Background</h2>
        <p className="text-gray-600">Tell us about your educational journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700 font-medium">Current Degree Level</Label>
          <Select value={formData.currentDegree} onValueChange={(value) => setFormData({...formData, currentDegree: value})}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-400">
              <SelectValue placeholder="Select your current degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="diploma">Diploma/Certificate</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-700 font-medium">Academic Performance (GPA/Percentage)</Label>
          <Input
            value={formData.gpa}
            onChange={(e) => setFormData({...formData, gpa: e.target.value})}
            placeholder="e.g., 3.8/4.0 or 85%"
            className="h-12 border-2 border-gray-200 focus:border-purple-400"
          />
        </div>

        <div className="md:col-span-2">
          <Label className="text-gray-700 font-medium">Academic Background/Major</Label>
          <Input
            value={formData.academicBackground}
            onChange={(e) => setFormData({...formData, academicBackground: e.target.value})}
            placeholder="e.g., Computer Science, Business, Engineering"
            className="h-12 border-2 border-gray-200 focus:border-purple-400"
          />
        </div>

        <div className="md:col-span-2">
          <Label className="text-gray-700 font-medium">Work Experience</Label>
          <Select value={formData.workExperience} onValueChange={(value) => setFormData({...formData, workExperience: value})}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-400">
              <SelectValue placeholder="Select your work experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No work experience</SelectItem>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="2-5">2-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Study Preferences</h2>
        <p className="text-gray-600">Help us understand your goals and preferences</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 font-medium mb-3 block">Study Goals (Select all that apply)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {studyGoalOptions.map((goal) => (
              <motion.button
                key={goal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGoalToggle(goal)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  formData.studyGoals.includes(goal)
                    ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-sm'
                }`}
              >
                {goal}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium mb-3 block">Program Interests</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {programOptions.map((program) => (
              <motion.button
                key={program}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProgramToggle(program)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  formData.programInterests.includes(program)
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                {program}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium mb-3 block">Preferred Countries</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {countryOptions.map((country) => (
              <motion.button
                key={country}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCountryToggle(country)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  formData.preferredCountries.includes(country)
                    ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-sm'
                }`}
              >
                {country}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium">Budget Range (Annual)</Label>
          <Select value={formData.budgetRange} onValueChange={(value) => setFormData({...formData, budgetRange: value})}>
            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-400">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-20k">Under $20,000</SelectItem>
              <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
              <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
              <SelectItem value="60k-80k">$60,000 - $80,000</SelectItem>
              <SelectItem value="over-80k">Over $80,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Recommendations</h2>
        <p className="text-gray-600">Based on your profile, here are the best countries for your masters</p>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{rec.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{rec.country}</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-purple-600">{rec.score}% Match</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">{rec.averageCost}</div>
                    <div className="text-sm text-gray-500">Annual Cost</div>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress value={rec.score} className="h-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Why This Country?
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {rec.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Globe className="w-4 h-4 text-blue-500 mr-2" />
                      Visa Requirements
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {rec.visaRequirements.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <GraduationCap className="w-4 h-4 text-purple-500 mr-2" />
                      Top Universities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.topUniversities.map((uni) => (
                        <Badge key={uni} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {uni}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 text-green-500 mr-2" />
                      Career Opportunities
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {rec.careerOpportunities.map((opp, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {opp}
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
    </motion.div>
  );

  const renderFAQ = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h3>
        <p className="text-gray-600">Get answers to common questions about studying abroad</p>
      </div>

      <div className="space-y-4">
        {faqCategories.map((category) => (
          <Card key={category.id} className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 text-purple-500 mr-2" />
                {category.title}
              </h4>
              <div className="space-y-3">
                {category.questions.map((qa, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === `${category.id}-${index}` ? null : `${category.id}-${index}`)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                        expandedFAQ === `${category.id}-${index}`
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }`}
                    >
                      <span className="font-medium">{qa.q}</span>
                      {expandedFAQ === `${category.id}-${index}` ? 
                        <ChevronUp className="w-4 h-4 text-white" /> : 
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      }
                    </button>
                    {expandedFAQ === `${category.id}-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 bg-purple-50 rounded-lg"
                      >
                        <p className="text-gray-700 text-sm">{qa.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Masters Program Advisory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get personalized recommendations for your masters program based on your academic background and career goals.
            </p>
          </div>

          {/* Progress Indicator */}
          {currentStep < 3 && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 2 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-purple-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-500">
                Step {currentStep} of 2
              </div>
            </div>
          )}

          {/* Form Content */}
          <Card className="bg-white border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    Previous
                  </Button>
                  
                  {currentStep === 2 ? (
                    <Button
                      onClick={generateRecommendations}
                      disabled={isAnalyzing || formData.studyGoals.length === 0}
                      className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {isAnalyzing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : null}
                      {isAnalyzing ? 'Analyzing...' : 'Get Recommendations'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!formData.academicBackground || !formData.currentDegree}
                      className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      Next
                    </Button>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => {
                      setCurrentStep(1);
                      setRecommendations([]);
                      setFormData({
                        academicBackground: '',
                        currentDegree: '',
                        gpa: '',
                        studyGoals: [],
                        preferredCountries: [],
                        budgetRange: '',
                        programInterests: [],
                        workExperience: ''
                      });
                    }}
                    variant="outline"
                    className="px-6"
                  >
                    Start New Analysis
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          {renderFAQ()}
        </motion.div>
      </div>
    </div>
  );
}