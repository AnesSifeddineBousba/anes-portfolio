import { Github, Linkedin, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import DigitalClock from './DigitalClock';

const GITHUB = 'https://github.com/AnesSifeddineBousba';
const LINKEDIN = 'https://www.linkedin.com/in/αиєs-вσusba-835727448';

export default function Footer() {
  const { t, dir } = useLanguage();

  return (
    <footer className="relative py-8 border-t border-gray-800/50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo & copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-lg font-heading font-bold gold-gradient">ANES BOUSBA</span>
            <p className="text-gray-600 text-xs">
              {t('footer.madeWith')}{' '}
              <Heart size={12} className="inline text-gold-500 mx-1" />
              Anes Bousba &copy; {new Date().getFullYear()}. {t('footer.rights')}
            </p>
          </div>

          {/* Center: Clock */}
          <DigitalClock />

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-dark-200 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-dark-200 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
