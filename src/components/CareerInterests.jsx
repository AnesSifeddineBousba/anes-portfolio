import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Brain, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  code: Code,
  brain: Brain,
  shield: Shield,
};

export default function CareerInterests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, dir } = useLanguage();

  const interests = t('careerInterests.interests');

  return (
    <section className="relative py-20 md:py-32" dir={dir}>
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
            {t('careerInterests.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('careerInterests.sectionSubtitle')}</p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Interest Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {Array.isArray(interests) &&
            interests.map((interest, index) => {
              const IconComponent = iconMap[interest.icon] || Code;
              const isHighlighted = interest.highlighted;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative rounded-2xl p-8 transition-all duration-500 overflow-hidden ${
                    isHighlighted
                      ? 'glass border-gold-500/20 hover:border-gold-500/40'
                      : 'glass hover:border-gold-500/20'
                  }`}
                >
                  {/* Background gradient for highlighted */}
                  {isHighlighted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-gold-500/10 group-hover:bg-gold-500/20'
                        : 'bg-dark-300 group-hover:bg-gold-500/10'
                    }`}
                  >
                    <IconComponent
                      size={28}
                      className={`transition-colors duration-300 ${
                        isHighlighted
                          ? 'text-gold-500'
                          : 'text-gray-400 group-hover:text-gold-500'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-gold-500 transition-colors">
                    {interest.title}
                    {isHighlighted && (
                      <Sparkles
                        size={14}
                        className="inline-block ms-2 text-gold-500 animate-pulse"
                      />
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {interest.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-gold-500/0 group-hover:text-gold-500/70 transition-all duration-300">
                    <span className="text-xs font-mono">
                      explore
                    </span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 border border-gold-500/5 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
