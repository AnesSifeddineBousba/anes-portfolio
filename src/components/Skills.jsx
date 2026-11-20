import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Terminal, Coffee, Code, FileCode, Palette, Braces,
  Server, Database, GitBranch, Monitor, Shield, Brain,
} from 'lucide-react';
import { skillsData } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  terminal: Terminal,
  coffee: Coffee,
  code: Code,
  'file-code': FileCode,
  palette: Palette,
  braces: Braces,
  server: Server,
  database: Database,
  'git-branch': GitBranch,
  monitor: Monitor,
  shield: Shield,
  brain: Brain,
};

const categories = [
  { key: 'all', label: 'All' },
  { key: 'languages', label: 'Languages' },
  { key: 'web', label: 'Web' },
  { key: 'tools', label: 'Tools' },
  { key: 'interests', label: 'Interests' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');
  const { t, dir, language } = useLanguage();

  const filteredSkills =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  const getLevelLabel = (level) => {
    const map = {
      Beginner: t('skills.levels.beginner'),
      'Pre-Intermediate': t('skills.levels.preIntermediate'),
      Intermediate: t('skills.levels.intermediate'),
    };
    return map[level] || level;
  };

  return (
    <section id="skills" className="relative py-20 md:py-32" dir={dir}>
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
            {t('skills.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('skills.sectionSubtitle')}</p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass rounded-t-xl p-4 border-b border-gray-800 mb-0"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-gray-600 font-mono text-xs ms-3">
              {t('skills.terminal.title')}
            </span>
          </div>
          <div className="font-mono text-sm text-green-400">
            <span className="text-gold-500">$ </span>
            {t('skills.terminal.command')}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="glass rounded-none p-4 flex flex-wrap gap-2 border-b border-gray-800"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent hover:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="glass rounded-b-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Code;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative bg-dark-300/50 rounded-xl p-5 border border-gray-800/50 hover:border-gold-500/20 transition-all duration-300"
                >
                  {/* Icon and Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: `${skill.color}15` }}
                    >
                      <IconComponent
                        size={20}
                        style={{ color: skill.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-gray-500 font-mono">
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-dark-500 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                        }}
                        initial={{ width: '0%' }}
                        animate={isInView ? { width: `${skill.percentage}%` } : { width: '0%' }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-gray-600 font-mono">0%</span>
                      <span
                        className="text-[10px] font-mono font-semibold"
                        style={{ color: skill.color }}
                      >
                        {skill.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 30px ${skill.color}08, 0 0 15px ${skill.color}05`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
