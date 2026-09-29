import { useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface PerformanceOptimizerOptions {
  willChange?: boolean;
  animationFrameRate?: number;
  reduceMotion?: boolean;
}

export function usePerformanceOptimizer(options: PerformanceOptimizerOptions = {}) {
  const { willChange = true, animationFrameRate = 60, reduceMotion = false } = options;
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || reduceMotion) {
      // Animasyonları devre dışı bırak
      document.documentElement.style.setProperty('--reduce-motion', 'true');
      return;
    }

    // will-change optimizasyonu
    if (willChange) {
      document.documentElement.style.setProperty('--will-change', 'transform, opacity');
    }

    // Animasyon kare hızını ayarla
    document.documentElement.style.setProperty('--animation-frame-rate', `${animationFrameRate}ms`);

    return () => {
      document.documentElement.style.removeProperty('--reduce-motion');
      document.documentElement.style.removeProperty('--will-change');
      document.documentElement.style.removeProperty('--animation-frame-rate');
    };
  }, [prefersReducedMotion, willChange, animationFrameRate, reduceMotion]);
}
