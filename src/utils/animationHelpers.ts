import { Transition, Variants } from 'framer-motion';

/**
 * Animasyon geçiş özelliklerini oluşturur
 * @param duration Animasyon süresi (varsayılan: 0.5)
 * @param ease Easing fonksiyonu (varsayılan: 'easeInOut')
 * @returns Framer Motion geçiş objesi
 */
export function getTransitionProps(duration: number = 0.5, ease: string = 'easeInOut'): Transition {
  return {
    duration,
    ease,
    type: 'spring',
    stiffness: 100,
    damping: 10
  };
}

/**
 * Staggered animasyon için özellikler oluşturur
 * @param staggerChildren Çocuk öğeler arasındaki gecikme süresi
 * @param staggerDirection Animasyon yönü ('forward' veya 'reverse')
 * @returns Framer Motion variants objesi
 */
export function getStaggeredProps(staggerChildren: number = 0.1, staggerDirection: number = 1): Variants {
  return {
    animate: {
      transition: {
        staggerChildren,
        staggerDirection
      }
    }
  };
}

/**
 * Buton için hover animasyonu özellikleri
 * @returns Framer Motion variants objesi
 */
export function getButtonHoverProps(): Variants {
  return {
    hover: {
      scale: 1.02,
      transition: getTransitionProps(0.2)
    },
    tap: {
      scale: 0.98
    }
  };
}

/**
 * Yükleme animasyonu için döndürme özellikleri
 * @returns Framer Motion variants objesi
 */
export function getSpinnerProps(): Variants {
  return {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };
}

/**
 * Gül yaprağı animasyonu için geçiş özellikleri
 * @param duration Animasyon süresi
 * @returns Framer Motion geçiş objesi
 */
export function getPetalTransitionProps(duration: number): Transition {
  return {
    duration,
    ease: 'easeIn',
    type: 'tween'
  };
}