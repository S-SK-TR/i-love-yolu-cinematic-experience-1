import { useSceneStore } from '@/store/sceneStore';
import { useCallback } from 'react';

interface TransitionOptions {
  duration?: number;
  ease?: string | number[];
  delay?: number;
}

export function useSceneTransition() {
  const { setTransitioning } = useSceneStore();

  const transitionScene = useCallback((options: TransitionOptions = {}) => {
    const { duration = 0.8, ease = [0.4, 0, 0.2, 1], delay = 0 } = options;

    setTransitioning(true);

    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: {
        duration,
        ease,
        delay
      },
      onAnimationComplete: () => setTransitioning(false)
    };
  }, [setTransitioning]);

  return { transitionScene };
}