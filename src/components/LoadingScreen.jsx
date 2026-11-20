import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // loading -> welcome -> done
  const { t } = useLanguage();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPhase('welcome');
    }, 2000);

    const welcomeTimer = setTimeout(() => {
      setPhase('done');
      setTimeout(onComplete, 500);
    }, 4000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(welcomeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loading-overlay"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(212,168,67,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Logo */}
                <motion.div
                  className="text-4xl md:text-5xl font-heading font-bold gold-gradient"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(212,168,67,0.3)',
                      '0 0 30px rgba(212,168,67,0.5)',
                      '0 0 10px rgba(212,168,67,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ANES BOUSBA
                </motion.div>

                {/* Loading bar */}
                <div className="w-64 h-1 bg-dark-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #D4A843, #fde047, #D4A843)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                  />
                </div>

                <motion.p
                  className="text-gray-500 font-mono text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {t('loading.loading')}
                </motion.p>
              </motion.div>
            )}

            {phase === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-heading font-bold gold-gradient"
                  initial={{ letterSpacing: '0.5em', opacity: 0 }}
                  animate={{ letterSpacing: '0.1em', opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  {t('loading.welcome')}
                </motion.h1>

                {/* Decorative line */}
                <motion.div
                  className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 200 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
