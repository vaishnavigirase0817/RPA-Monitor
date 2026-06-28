import { useEffect, useRef } from 'react';

/**
 * AnimatedBackground — Renders mesh gradient, floating blobs, particles, radial highlight, and grid.
 * All layers use compositor-only animations (transform/opacity) for zero layout thrashing.
 * Positioned fixed behind all other layout elements.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  // Lightweight particle system on <canvas>
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize 25 particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        life: Math.random() * 1000,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        // Wrap around
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 149, 122, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="animated-bg-container" aria-hidden="true">
      {/* Mesh gradient layer */}
      <div className="absolute inset-0 bg-animated-mesh" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle" />

      {/* Floating blobs */}
      <div className="floating-blob blob-1" />
      <div className="floating-blob blob-2" />
      <div className="floating-blob blob-3" />

      {/* Radial highlight */}
      <div className="radial-highlight" style={{ top: '15%', right: '20%' }} />
      <div className="radial-highlight" style={{ bottom: '20%', left: '10%', animationDelay: '4s' }} />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
}
