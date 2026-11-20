import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, dir } = useLanguage();

  return (
    <section id="education" className="relative py-20 md:py-32" dir={dir}>
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
            {t('education.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('education.sectionSubtitle')}</p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-bl-full" />

            {/* Timeline dot */}
            <div className="flex items-start gap-6">
              <div className="hidden md:flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center">
                  <GraduationCap size={24} className="text-gold-500" />
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-gold-500/30 to-transparent mt-4" />
              </div>

              <div className="flex-1 relative">
                {/* Status */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-mono mb-4"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {t('education.status')}
                </motion.div>

                {/* University Name */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl font-heading font-bold text-white mb-2"
                >
                  {t('education.university')}
                </motion.h3>

                {/* Arabic name */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55 }}
                  className="text-gold-500/70 font-arabic text-xl mb-4"
                  dir="rtl"
                >
                  {t('education.universityAr')}
                </motion.p>

                {/* Info items */}
                <div className="space-y-3 mt-6">
                  <motion.div
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <Award size={18} className="text-gold-500 shrink-0" />
                    <span className="text-gray-300">{t('education.program')}</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-3"
                  >
                    <BookOpen size={18} className="text-blue-400 shrink-0" />
                    <span className="text-gray-300">{t('education.field')}</span>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="text-gray-400 text-sm leading-relaxed mt-6 border-t border-gray-800 pt-6"
                >
                  {t('education.description')}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Section (inline) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="glass rounded-2xl p-8 text-center">
            <h3 className="text-xl font-heading font-semibold text-white mb-3">
              {t('experience.sectionTitle')}
            </h3>
            <p className="text-gold-500 font-mono text-sm mb-4">
              {t('experience.noExperience')}
            </p>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mb-6">
              {t('experience.description')}
            </p>

            <div className="text-start max-w-md mx-auto">
              <p className="text-gray-500 text-xs font-mono mb-3">
                {t('experience.focusAreas')}
              </p>
              <ul className="space-y-2">
                {t('experience.areas').map((area, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 10 : -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-2 text-gray-400 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                    {area}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
