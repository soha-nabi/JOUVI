import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Heart, 
  Star,
  Mail,
  Github,
  Linkedin,
  Globe,
  Target,
  Zap
} from 'lucide-react';

export function About() {
  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Framer Motion', icon: '✨' }
  ];

  return (
    <div 
      className="min-h-screen pt-24 pb-12 font-['Inter',sans-serif]"
      style={{
        background: 'linear-gradient(135deg, #FFE5EC 0%, #E6E6FA 100%)'
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold mb-4"
            >
              Empowering Your Career Journey
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl leading-relaxed max-w-4xl mx-auto mb-8"
            >
              AI-powered guidance for career exploration, job market insights, and international education opportunities
            </motion.p>
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-16"
          >
            <Card 
              className="border-0 shadow-lg"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <CardContent style={{ padding: '2rem' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                
                <p 
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: '#4A4A4A', lineHeight: '1.6' }}
                >
                  At Jouvi, we believe every student deserves personalized, intelligent career guidance. Our platform combines cutting-edge AI technology with comprehensive market insights to transform how students navigate their professional futures.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Globe,
                      title: 'Career Navigation',
                      description: 'Personalized roadmaps tailored to your unique skills and aspirations',
                      color: 'from-blue-400 to-cyan-500'
                    },
                    {
                      icon: Zap,
                      title: 'Job Market Predictions',
                      description: 'Real-time insights into emerging opportunities and industry trends',
                      color: 'from-purple-400 to-pink-500'
                    },
                    {
                      icon: Rocket,
                      title: 'Study-Abroad Pathways',
                      description: 'Comprehensive guidance for international education opportunities',
                      color: 'from-green-400 to-teal-500'
                    }
                  ].map((pillar) => (
                    <motion.div
                      key={pillar.title}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3, ease: 'easeInOut' }
                      }}
                      className="text-center p-4 rounded-lg bg-white/50"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${pillar.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <pillar.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{pillar.title}</h3>
                      <p className="text-sm">{pillar.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Founder Card */}
              <Card 
                className="border-0 shadow-lg h-full"
                style={{ 
                  backgroundColor: '#F8F5FF',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <CardContent style={{ padding: '2rem' }}>
                  <h3 className="text-xl font-bold mb-6">Meet Our Founder</h3>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                      <img
                        src="/1.png"
                        alt="Soha"
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Soha</h4>
                      <p className="text-purple-600 font-medium">Lead Developer, Designer & Founder</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">Key Accomplishments:</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                          Full-stack development expertise across modern web technologies
                        </li>
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                          UI/UX design with focus on accessibility and user experience
                        </li>
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                          Product vision and strategic roadmap development
                        </li>
                        <li className="flex items-start">
                          <Star className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                          AI algorithm implementation for career matching
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contributor Card */}
              <Card 
                className="border-0 shadow-lg h-full"
                style={{ 
                  backgroundColor: '#F0FFF4',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <CardContent style={{ padding: '2rem' }}>
                  <h3 className="text-xl font-bold mb-6">Research Contributor</h3>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-green-400 to-teal-500 p-1">
                      <img
                        src="/2.png"
                        alt="Musuku Bhuvana"
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Musuku Bhuvana</h4>
                      <p className="text-green-600 font-medium">Research Contributor</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A', lineHeight: '1.6' }}>
                      Bhuvana has been instrumental in providing valuable research insights and user feedback that have shaped Jouvi's development. Her contributions in market analysis and user experience testing have been crucial to our platform's success.
                    </p>
                    
                    <div className="bg-white/50 p-3 rounded-lg">
                      <p className="text-sm italic" style={{ color: '#4A4A4A' }}>
                        "Collaboration drives innovation. Together, we're building something that truly makes a difference."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-16"
          >
            <Card 
              className="border-0 shadow-lg"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <CardContent style={{ padding: '2rem' }}>
                <div 
                  className="text-center mb-8 p-4 rounded-lg"
                  style={{ backgroundColor: '#E0FFF0' }}
                >
                  <h2 className="text-2xl font-bold mb-2">Technology Stack</h2>
                  <p>Built with modern, cutting-edge technologies</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {techStack.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.3, ease: 'easeInOut' }
                      }}
                      className="text-center p-4 rounded-lg bg-white shadow-sm cursor-pointer"
                    >
                      <div className="text-3xl mb-2">{tech.icon}</div>
                      <p className="font-medium">{tech.name}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center"
          >
            <Card 
              className="border-0 shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #FFE5EC, #E6E6FA)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <CardContent style={{ padding: '2rem' }}>
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Heart className="w-8 h-8 text-purple-600" />
                  <h2 className="text-3xl font-bold">Join Our Journey</h2>
                </div>
                
                <p 
                  className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed"
                  style={{ color: '#4A4A4A', lineHeight: '1.6' }}
                >
                  We're committed to continuous innovation and creating meaningful impact in the education technology space. 
                  Join thousands of students who are already transforming their career journeys with Jouvi.
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-lg font-medium text-white"
                    style={{
                      background: 'linear-gradient(135deg, #FFE5EC, #E6E6FA)',
                      borderRadius: '24px',
                      padding: '12px 24px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Explore Jouvi
                  </Button>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    className="bg-white/20 border-white/30 hover:bg-white/30"
                    onClick={() => window.open('mailto:hello@jouvi.com', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="bg-white/20 border-white/30 hover:bg-white/30"
                    onClick={() => window.open('https://linkedin.com/in/soha-nabi123/', '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="bg-white/20 border-white/30 hover:bg-white/30"
                    onClick={() => window.open('https://github.com/jouvi', '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}