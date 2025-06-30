import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { VoiceButton } from './VoiceButton';
import { mentors } from '../data/careerRoadmaps';
import { Career } from '../types';

interface MentorSectionProps {
  career: Career;
}

export function MentorSection({ career }: MentorSectionProps) {
  // Find mentors relevant to the selected career
  const relevantMentors = mentors.filter(mentor => {
    if (career.id === 'frontend-developer') {
      return mentor.id === 'sarah-chen';
    } else if (career.id === 'ux-designer') {
      return mentor.id === 'marcus-rodriguez';
    } else if (career.id === 'ml-engineer') {
      return mentor.id === 'dr-aisha-patel';
    }
    return false;
  });

  if (relevantMentors.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Meet Your Mentor
        </h2>
        <p className="text-gray-600">
          Get guidance from industry experts who've walked this path
        </p>
      </div>

      <div className="grid gap-6">
        {relevantMentors.map((mentor, index) => {
          const mentorIntro = `Hi! I'm ${mentor.name}, ${mentor.title} at ${mentor.company}. ${mentor.bio}`;
          const encouragementQuote = `Every expert was once a beginner. The key to success in ${career.title.toLowerCase()} is consistent practice and never stop learning. You've got this!`;
          
          return (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 p-1">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {mentor.name}
                        </h3>
                        <VoiceButton 
                          text={mentorIntro}
                          context="mentor"
                          size="sm"
                        />
                      </div>
                      <p className="text-purple-600 font-medium mb-1">
                        {mentor.title}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {mentor.company} • {mentor.experience} experience
                      </p>
                      
                      <p className="text-gray-700 mb-4">
                        {mentor.bio}
                      </p>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        {mentor.expertise.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-purple-100 text-purple-700 border-purple-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <Button
                          variant="outline"
                          onClick={() => window.open(`mailto:mentor@jouvi.com?subject=Career guidance for ${career.title}`, '_blank')}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        
                        {mentor.linkedIn && (
                          <Button
                            variant="outline"
                            onClick={() => window.open(mentor.linkedIn, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            LinkedIn
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Encouragement Quote */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-400"
                  >
                    <div className="flex items-start space-x-3">
                      <p className="text-gray-700 italic flex-1">
                        "Every expert was once a beginner. The key to success in {career.title.toLowerCase()} is consistent practice and never stop learning. You've got this! 🚀"
                      </p>
                      <VoiceButton 
                        text={encouragementQuote}
                        context="encouragement"
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">— {mentor.name}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}