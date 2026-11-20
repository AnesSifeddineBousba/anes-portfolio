import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Clock, Lightbulb, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, dir } = useLanguage();

  const futureProjects = t('projects.futureProjects');

  return (
    <section id="projects" className="relative py-20 md:py-32" dir={dir}>
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
            {t('projects.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('projects.sectionSubtitle')}</p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Completed Projects Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-12 text-center mb-12 border border-dashed border-gray-700"
        >
          <Plus size={48} className="text-gold-500/30 mx-auto mb-4" />
          <p className="text-gray-400 font-mono text-sm">{t('projects.addProjectHint')}</p>
        </motion.div>

        {/* Future Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Rocket className="text-gold-500" size={24} />
            <h3 className="text-2xl font-heading font-bold text-white">
              {t('projects.futureTitle')}
            </h3>
          </div>
          <p className="text-gray-500 mb-8">{t('projects.futureSubtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(futureProjects) &&
            futureProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15 }}
                whileHover={{ y: -5 }}
                className="group glass rounded-xl p-6 hover:border-gold-500/20 transition-all duration-300 relative overflow-hidden"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-xs font-mono">
                    <Clock size={12} />
                    {project.status}
                  </span>
                  <Lightbulb
                    size={16}
                    className="text-gold-500/30 group-hover:text-gold-500/70 transition-colors"
                  />
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-gold-500 transition-colors">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-dark-400 text-gray-400 text-xs font-mono border border-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
