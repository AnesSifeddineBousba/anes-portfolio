import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, dir } = useLanguage();

  const infoCards = [
    { icon: GraduationCap, label: t('about.degree'), color: 'text-gold-500' },
    { icon: BookOpen, label: t('about.year'), color: 'text-blue-400' },
    { icon: MapPin, label: t('about.location'), color: 'text-green-400' },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gold-gradient mb-4">
            {t('about.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('about.sectionSubtitle')}</p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Status Badge */}
            <div className="glass rounded-xl p-6 glow-gold-hover transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 font-mono text-sm">{t('about.status')}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{t('about.university')}</h3>
              <p className="text-gray-400 text-sm">{t('about.degree')}</p>
              <p className="text-gray-500 text-sm mt-1">{t('about.year')}</p>
            </div>

            {infoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-4 hover:border-gold-500/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-dark-300 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                  <card.icon size={22} className={card.color} />
                </div>
                <span className="text-gray-300 text-sm">{card.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-gray-600 font-mono text-xs ms-3">about.md</span>
              </div>

              <div className="space-y-4">
                {t('about.content')
                  .split('\n\n')
                  .map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-gray-300 leading-relaxed text-sm md:text-base"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </div>

              {/* Passion indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                className="mt-6 pt-4 border-t border-gray-800 flex items-center gap-2 text-gold-500"
              >
                <Sparkles size={16} />
                <span className="font-mono text-xs">
                  passion.level = &quot;maximum&quot;;
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
