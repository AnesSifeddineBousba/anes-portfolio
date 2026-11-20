import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover], input, textarea, select');
      if (target) setHoveringInteractive(true);
    };

    const handleOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover], input, textarea, select');
      if (target) setHoveringInteractive(false);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="rounded-full"
          animate={{
            width: hoveringInteractive ? 50 : 30,
            height: hoveringInteractive ? 50 : 30,
            opacity: hoveringInteractive ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'radial-gradient(circle, rgba(212,168,67,0.6) 0%, rgba(212,168,67,0) 70%)',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        />
        {/* Inner dot */}
        <motion.div
          className="rounded-full absolute top-1/2 left-1/2"
          animate={{
            width: hoveringInteractive ? 8 : 5,
            height: hoveringInteractive ? 8 : 5,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: '#D4A843',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(212,168,67,0.8), 0 0 20px rgba(212,168,67,0.4)',
          }}
        />
      </motion.div>

      {/* Trail glow (larger, slower) */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 150, mass: 1 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 150, mass: 1 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: hoveringInteractive ? 80 : 50,
            height: hoveringInteractive ? 80 : 50,
            opacity: hoveringInteractive ? 0.15 : 0.08,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle, rgba(212,168,67,0.4) 0%, rgba(212,168,67,0) 70%)',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        />
      </motion.div>
    </>
  );
}
