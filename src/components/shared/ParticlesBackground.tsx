import React, { useEffect, useRef } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { prefersReducedMotion } = useSettingsStore();
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gül rengi paleti
    const colors = [
      'rgba(255, 192, 203, 0.8)', // Pembe
      'rgba(255, 105, 180, 0.8)', // Sıcak pembe
      'rgba(255, 20, 147, 0.8)', // Derin pembe
      'rgba(255, 0, 0, 0.8)', // Kırmızı
      'rgba(255, 69, 0, 0.8)', // Turuncu kırmızı
      'rgba(255, 165, 0, 0.8)' // Turuncu
    ];

    // Parçacıklar oluştur
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animasyon döngüsü
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Hareket
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Kenarlara çarpma
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Çiz
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ willChange: 'transform, opacity' }}
    />
  );
}