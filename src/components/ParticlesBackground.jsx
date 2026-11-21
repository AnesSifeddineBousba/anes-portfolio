import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resize = () => {
      const w = window.innerWidth || document.documentElement.clientWidth || 800;
      const h = window.innerHeight || document.documentElement.clientHeight || 600;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e) => {
      if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        const w = canvas.width || 800;
        const h = canvas.height || 600;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.golden = Math.random() > 0.7;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction with safe division
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120 && distance > 0.1) {
            const force = (120 - distance) / 120;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }

        // Safety fallback if coordinate is NaN
        if (isNaN(this.x) || isNaN(this.y)) {
          this.reset();
          return;
        }

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (isNaN(this.x) || isNaN(this.y)) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.golden) {
          ctx.fillStyle = `rgba(212, 168, 67, ${this.opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        }
        ctx.fill();
      }
    }

    // Create particles based on viewport
    const area = (canvas.width || 800) * (canvas.height || 600);
    const particleCount = Math.min(80, Math.max(25, Math.floor(area / 16000)));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        if (isNaN(p1.x) || isNaN(p1.y)) continue;
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          if (isNaN(p2.x) || isNaN(p2.y)) continue;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140 && distance > 0.1) {
            const opacity = (1 - distance / 140) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 168, 67, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
