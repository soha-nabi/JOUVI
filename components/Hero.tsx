import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-teal-200 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full opacity-20"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="w-full px-6 text-center relative z-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-6xl mx-auto"
        >
          {/* Main headline - shifted down */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-gray-800 dark:text-gray-100 leading-tight mt-16"
          >
            Your Career Journey
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Starts Here
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Discover your perfect career path with our gamified roadmap generator. 
            Get personalized learning paths, track your progress, and level up your skills.
          </motion.p>

          {/* Features preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Personalized Roadmaps</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>XP & Leveling System</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Expert Mentors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Career Comparisons</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-8"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats or social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="pt-12 text-center"
          >
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Trusted by students worldwide</p>
            <div className="flex justify-center space-x-8 text-gray-500 dark:text-gray-400">
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10K+</div>
                <div className="text-xs">Career Paths Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">50+</div>
                <div className="text-xs">Expert Mentors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">95%</div>
                <div className="text-xs">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}