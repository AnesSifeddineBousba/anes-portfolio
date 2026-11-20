import { useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Sound manager
let audioContext = null;

function playClickSound() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gain.gain.value = 0.05;
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch {
    // Silently fail
  }
}

export function useSoundEffect() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playSound = useCallback(() => {
    if (soundEnabled) {
      playClickSound();
    }
  }, [soundEnabled]);

  return { soundEnabled, setSoundEnabled, playSound };
}

export default function SoundToggle({ soundEnabled, setSoundEnabled }) {
  const { t } = useLanguage();

  return (
    <motion.button
      onClick={() => setSoundEnabled(!soundEnabled)}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 glass rounded-lg text-xs text-gray-500 hover:text-gold-500 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={soundEnabled ? t('sound.on') : t('sound.off')}
    >
      {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </motion.button>
  );
}
