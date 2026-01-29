
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const FireCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
      
      // Spawn multiple particles per move for a denser flame
      for (let i = 0; i < 3; i++) {
        spawnParticle(e.clientX, e.clientY);
      }
    };

    const spawnParticle = (x: number, y: number) => {
      const colors = [
        'rgba(255, 69, 0, ',   // Red Orange
        'rgba(255, 140, 0, ',  // Dark Orange
        'rgba(255, 215, 0, ',  // Gold/Yellow
        'rgba(255, 0, 0, '     // Red
      ];
      
      const maxLife = 20 + Math.random() * 30;
      particles.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 1, // Upward movement
        life: maxLife,
        maxLife,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Use additive blending for "glow" effect
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const opacity = p.life / p.maxLife;
        const currentSize = p.size * opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color + opacity + ')';
        ctx.fill();

        // Add a slight blur/glow to each particle
        ctx.shadowBlur = 10 * opacity;
        ctx.shadowColor = p.color + '0.5)';
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default FireCursor;
