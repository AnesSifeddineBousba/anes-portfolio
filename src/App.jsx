import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';
import ParticlesBackground from './components/ParticlesBackground';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import CareerInterests from './components/CareerInterests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SoundToggle, { useSoundEffect } from './components/SoundToggle';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { dir } = useLanguage();
  const { soundEnabled, setSoundEnabled } = useSoundEffect();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div dir={dir} className="relative min-h-screen bg-dark-900 text-white">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Particles Background */}
      <ParticlesBackground />

      {/* Main Content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />

          <main className="relative z-10">
            <Hero />

            {/* Subtle section separators */}
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            </div>

            <About />

            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            </div>

            <Skills />

            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            </div>

            <Projects />

            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            </div>

            <Education />

            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            </div>

            <CareerInterests />

            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
            </div>

            <Contact />
          </main>

          <Footer />
          <BackToTop />
          <SoundToggle
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
          />
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
