import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { AuthModal } from './components/AuthModal';
import { Hero } from './components/Hero';
import { CareerSelection } from './components/CareerSelection';
import { Quiz } from './components/Quiz';
import { Roadmap } from './components/Roadmap';
import { MastersAdvisory } from './components/MastersAdvisory';
import { CareerAnalyzer } from './components/CareerAnalyzer';
import { About } from './components/About';
import { MentorProfiles } from './components/MentorProfiles';
import { ThemeProvider } from './contexts/ThemeContext';
import { Career, User } from './types';
import './App.css';

type AppState = 'hero' | 'selection' | 'quiz' | 'roadmap';
type PageState = 'home' | 'advisory' | 'analyzer' | 'about' | 'mentors';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGetStarted = () => {
    setCurrentState('selection');
  };

  const handleBack = () => {
    if (currentState === 'selection') {
      setCurrentState('hero');
    } else if (currentState === 'quiz') {
      setCurrentState('selection');
    } else if (currentState === 'roadmap') {
      setCurrentState('selection');
    }
  };

  const handleCareerSelect = (career: Career) => {
    setSelectedCareer(career);
    setCurrentState('roadmap');
  };

  const handleTakeQuiz = () => {
    setCurrentState('quiz');
  };

  const handleQuizComplete = (recommendedCareer: Career) => {
    setSelectedCareer(recommendedCareer);
    setCurrentState('roadmap');
  };

  const handleRestart = () => {
    setSelectedCareer(null);
    setCurrentState('hero');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page as PageState);
    if (page === 'home') {
      setCurrentState('hero');
      setSelectedCareer(null);
    }
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
  };

  const renderHomePage = () => {
    return (
      <div className="App">
        {currentState === 'hero' && (
          <Hero onGetStarted={handleGetStarted} />
        )}
        
        {currentState === 'selection' && (
          <CareerSelection
            onBack={handleBack}
            onCareerSelect={handleCareerSelect}
            onTakeQuiz={handleTakeQuiz}
          />
        )}
        
        {currentState === 'quiz' && (
          <Quiz
            onBack={handleBack}
            onQuizComplete={handleQuizComplete}
          />
        )}
        
        {currentState === 'roadmap' && selectedCareer && (
          <Roadmap
            career={selectedCareer}
            onBack={handleBack}
            onRestart={handleRestart}
          />
        )}
      </div>
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'advisory':
        return <MastersAdvisory />;
      case 'analyzer':
        return <CareerAnalyzer />;
      case 'about':
        return <About />;
      case 'mentors':
        return <MentorProfiles />;
      default:
        return renderHomePage();
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navigation
          currentPage={currentPage}
          onPageChange={handlePageChange}
          user={user}
          onAuthClick={() => setShowAuthModal(true)}
        />
        
        {renderCurrentPage()}
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;