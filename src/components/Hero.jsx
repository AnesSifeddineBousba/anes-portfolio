import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Send, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t, dir } = useLanguage();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      dir={dir}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/95 to-dark-900 z-[1]" />

      {/* Radial gradient */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex lg:hidden justify-center items-center pb-16"
          >
            <TiltPhoto size="small" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center lg:text-start"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="w-12 h-[2px] bg-gold-500" />
              <span className="text-gold-500 font-mono text-sm md:text-base tracking-wider">
                {t('hero.greeting')}
              </span>
            </motion.div>

            {/* Name — Magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <MagneticName text={t('hero.name')} />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 font-light"
            >
              {t('hero.title')}
            </motion.h2>

            {/* Animated Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="font-mono text-gold-500/80 text-sm md:text-base"
            >
              <span className="text-gray-500">&gt; </span>
              <TypeWriter text={t('hero.tagline')} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              {t('hero.description')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollTo('projects')}
                className="group px-6 py-3 bg-gold-500 text-dark-900 font-semibold rounded-lg flex items-center gap-2 hover:bg-gold-400 transition-all duration-300 glow-gold-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                {t('hero.viewProjects')}
              </motion.button>

              <motion.button
                onClick={() => scrollTo('contact')}
                className="group px-6 py-3 border border-gold-500/50 text-gold-500 font-semibold rounded-lg flex items-center gap-2 hover:bg-gold-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
                {t('hero.contactMe')}
              </motion.button>

              <motion.a
                href="/cv.pdf"
                download
                className="group px-6 py-3 border border-gray-700 text-gray-400 font-semibold rounded-lg flex items-center gap-2 hover:border-gold-500/30 hover:text-gold-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                {t('hero.downloadCV')}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Desktop Avatar — 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex justify-center items-center"
          >
            <TiltPhoto size="large" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-gold-500/50" size={24} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3D Tilt Photo ───────────────────────────────────────────────
function TiltPhoto({ size = 'large' }) {
  const containerRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const sRotateX = useSpring(rotateX, springConfig);
  const sRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const maxTilt = 15;
    const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;

    if (isFinite(tiltX) && isFinite(tiltY)) {
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }

    // Glare position (clamped 0 to 100)
    const gx = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const gy = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    glareX.set(gx);
    glareY.set(gy);
    glareOpacity.set(0.25);
  }, [rotateX, rotateY, glareX, glareY, glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }, [rotateX, rotateY, glareOpacity]);

  const sizeClasses = size === 'large'
    ? 'w-72 h-72 xl:w-80 xl:h-80'
    : 'w-48 h-48 sm:w-56 sm:h-56';

  const outerInset = size === 'large' ? '-inset-4' : '-inset-3';

  return (
    <div
      ref={containerRef}
      className="relative cursor-none select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      data-cursor-hover
    >
      <motion.div
        style={{
          rotateX: sRotateX,
          rotateY: sRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
       {/* Rotating border */}
<motion.div
  className={`absolute ${outerInset} rounded-full`}
  style={{
    background: 'conic-gradient(from 0deg, transparent, #D4A843, transparent, #D4A843, transparent)',
    opacity: 0.3,
  }}
  animate={{ rotate: 360 }}
  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
/>

{/* Photo container */}
<div className={relative ${sizeClasses} rounded-full bg-gradient-to-br from-dark-200 to-dark-500 border-2 border-gold-500/30 flex items-center justify-center overflow-hidden shadow-2xl shadow-gold-500/10}>
  {/* Profile Photo */}
  <motion.img
    src={${import.meta.env.BASE_URL}profile.jpg}
    alt="Anes Sif Eddine Bousba"
    className="w-full h-full object-cover object-[center_20%] scale-125 pointer-events-none"
    style={{
      transform: useTransform(
        [sRotateX, sRotateY],
        ([rx, ry]) => scale(1.25) translate(${ry * 0.5}px, ${-rx * 0.5}px)
      ),
    }}
  />

  {/* Glare effect */}
  <motion.div
    className="absolute inset-0 rounded-full pointer-events-none"
    style={{
      opacity: glareOpacity,
      background: useTransform(
        [glareX, glareY],
        ([gx, gy]) => radial-gradient(circle at ${gx}% ${gy}%, rgba(212,168,67,0.35) 0%, transparent 60%)
      ),
    }}
  />
          {/* Edge ring */}
          <div className="absolute inset-0 rounded-full ring-2 ring-gold-500/20 ring-inset pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating elements (3D depth without backdrop-blur to avoid GPU shader conflicts inside preserve-3d) */}
        <motion.div
          className="absolute -top-6 -right-6 w-12 h-12 rounded-lg bg-dark-200/90 border border-gold-500/20 flex items-center justify-center shadow-md shadow-black/40"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="text-gold-500 font-mono text-xs">{'{}'}</span>
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4 w-10 h-10 rounded-lg bg-dark-200/90 border border-gold-500/20 flex items-center justify-center shadow-md shadow-black/40"
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="text-gold-500 font-mono text-xs">{'</>'}</span>
        </motion.div>

        <motion.div
          className="absolute top-1/2 -left-10 w-8 h-8 rounded-full bg-dark-200/90 border border-gold-500/20 flex items-center justify-center shadow-md shadow-black/40"
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ transform: 'translateZ(50px)' }}
        >
          <span className="text-gold-500 text-xs">AI</span>
        </motion.div>

        {/* صَلِّ عَلى اَلْحَبِيبْ ﷺ — typewriter (Responsive: under photo on mobile, beside photo on desktop) */}
        <motion.div
          className="absolute pointer-events-none select-none flex flex-col items-center gap-1 z-20 whitespace-nowrap"
          dir="rtl"
          style={
            size === 'small'
              ? {
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '-4.5rem',
                  top: 'auto',
                  right: 'auto',
                }
              : {
                  right: '-8.5rem',
                  top: '42%',
                  transform: 'translateY(-50%)',
                  left: 'auto',
                  bottom: 'auto',
                }
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SallaTypeWriter />
        </motion.div>

      </motion.div>
    </div>
  );
}

// ─── Salla TypeWriter (type line1 → type line2 → erase all → repeat) ──
function SallaTypeWriter() {
  const line1 = 'صَلِّ عَلى اَلْحَبِيبْ';
  const line2 = 'ﷺ';
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [phase, setPhase] = useState('type1'); // type1 → type2 → pause → erase2 → erase1 → wait → type1

  useEffect(() => {
    let timer;

    if (phase === 'type1') {
      if (text1.length < line1.length) {
        timer = setTimeout(() => setText1(line1.substring(0, text1.length + 1)), 100);
      } else {
        timer = setTimeout(() => setPhase('type2'), 300);
      }
    } else if (phase === 'type2') {
      if (text2.length < line2.length) {
        timer = setTimeout(() => setText2(line2.substring(0, text2.length + 1)), 150);
      } else {
        timer = setTimeout(() => setPhase('pause'), 2500);
      }
    } else if (phase === 'pause') {
      setPhase('erase2');
    } else if (phase === 'erase2') {
      if (text2.length > 0) {
        timer = setTimeout(() => setText2(text2.substring(0, text2.length - 1)), 80);
      } else {
        timer = setTimeout(() => setPhase('erase1'), 200);
      }
    } else if (phase === 'erase1') {
      if (text1.length > 0) {
        timer = setTimeout(() => setText1(text1.substring(0, text1.length - 1)), 50);
      } else {
        timer = setTimeout(() => setPhase('wait'), 1500);
      }
    } else if (phase === 'wait') {
      setPhase('type1');
    }

    return () => clearTimeout(timer);
  }, [phase, text1, text2]);

  return (
    <>
      <span
        className="text-gold-500/90 text-sm font-arabic whitespace-nowrap tracking-wide block text-center min-h-[1.5em]"
        style={{ textShadow: '0 0 15px rgba(212,168,67,0.4)' }}
      >
        {text1}
        {(phase === 'type1' || phase === 'erase1') && <span className="cursor-blink" />}
      </span>
      <span
        className="text-gold-500 text-2xl block text-center min-h-[1.5em]"
        style={{
          textShadow: '0 0 15px rgba(212,168,67,0.4), 0 0 30px rgba(212,168,67,0.2)',
          lineHeight: 1.2,
        }}
      >
        {text2}
        {(phase === 'type2' || phase === 'erase2') && <span className="cursor-blink" />}
      </span>
    </>
  );
}

// ─── Magnetic Name ────────────────────────────────────────────────
function MagneticName({ text }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    if (isFinite(dx) && isFinite(dy)) {
      x.set(dx * 0.15);
      y.set(dy * 0.2);
    }
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.h1
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight cursor-none relative group"
      style={{ x: springX, y: springY }}
      data-cursor-hover
    >
      <span
        className="relative inline-block"
        style={{
          background: 'linear-gradient(135deg, #D4A843 0%, #fde047 50%, #D4A843 100%)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      >
        {text}
      </span>
      {/* Subtle glow behind text on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gold-500/10 rounded-lg pointer-events-none" />
    </motion.h1>
  );
}

// ─── TypeWriter ──────────────────────────────────────────────────
function TypeWriter({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (index < text.length) {
            setDisplayed(text.substring(0, index + 1));
            setIndex(index + 1);
          } else {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          if (index > 0) {
            setDisplayed(text.substring(0, index - 1));
            setIndex(index - 1);
          } else {
            setDeleting(false);
          }
        }
      },
      deleting ? 50 : 100
    );
    return () => clearTimeout(timer);
  }, [index, deleting, text]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}
