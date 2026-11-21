import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const trailSpring = { damping: 35, stiffness: 180, mass: 0.8 };
  const trailX = useSpring(cursorX, trailSpring);
  const trailY = useSpring(cursorY, trailSpring);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Honor reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let hasMoved = false;

    const moveCursor = (e) => {
      if (typeof e.clientX !== 'number' || typeof e.clientY !== 'number') return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!hasMoved) {
        hasMoved = true;
        setVisible(true);
      }
    };

    const handleOver = (e) => {
      const target = e.target?.closest?.('a, button, [data-cursor-hover], input, textarea, select');
      if (target) setHoveringInteractive(true);
    };

    const handleOut = (e) => {
      const target = e.target?.closest?.('a, button, [data-cursor-hover], input, textarea, select');
      if (target) setHoveringInteractive(false);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => {
      if (hasMoved) setVisible(true);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden" aria-hidden="true">
      {/* Slower trail glow (GPU-safe standard alpha blending without mix-blend-mode) */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: hoveringInteractive ? 70 : 44,
            height: hoveringInteractive ? 70 : 44,
            opacity: hoveringInteractive ? 0.35 : 0.18,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'radial-gradient(circle, rgba(212,168,67,0.5) 0%, rgba(212,168,67,0.15) 40%, rgba(212,168,67,0) 70%)',
            transform: 'translateZ(0)',
          }}
        />
      </motion.div>

      {/* Main cursor dot and halo */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
      >
        {/* Outer subtle glow */}
        <motion.div
          className="rounded-full"
          animate={{
            width: hoveringInteractive ? 40 : 26,
            height: hoveringInteractive ? 40 : 26,
            opacity: hoveringInteractive ? 0.5 : 0.3,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'radial-gradient(circle, rgba(253,224,71,0.6) 0%, rgba(212,168,67,0.2) 50%, rgba(212,168,67,0) 70%)',
            transform: 'translateZ(0)',
          }}
        />
        {/* Inner bright golden dot */}
        <motion.div
          className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: hoveringInteractive ? 8 : 5,
            height: hoveringInteractive ? 8 : 5,
          }}
          transition={{ duration: 0.15 }}
          style={{
            background: '#D4A843',
            boxShadow: '0 0 8px rgba(212,168,67,0.9), 0 0 16px rgba(212,168,67,0.5)',
            transform: 'translate(-50%, -50%) translateZ(0)',
          }}
        />
      </motion.div>
    </div>
  );
}
