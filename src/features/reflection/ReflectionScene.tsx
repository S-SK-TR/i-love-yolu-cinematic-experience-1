import React from 'react';
import { SceneWrapper } from '@/components/layout/SceneWrapper';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useSceneStore } from '@/store/sceneStore';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';

interface ReflectionSceneProps {
  onNext: () => void;
}

export function ReflectionScene({ onNext }: ReflectionSceneProps) {
  const { setScene } = useSceneStore();
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  const handleNext = () => {
    setScene('interaction');
    onNext();
  };

  return (
    <SceneWrapper sceneKey="reflection" className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-center"
        style={{ willChange: 'transform, opacity' }}
        role="region"
        aria-label="Yansıma sahnesi"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Reflections</h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8">
          As the petals of the rose unfold, I find myself reflecting on the journey we've shared.
        </p>
        <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12">
          Each moment with you has been a beautiful chapter in this story of love.
        </p>
        <Button
          onClick={handleNext}
          className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium"
          aria-label="Sonraki"
        >
          Next
        </Button>
      </motion.div>
    </SceneWrapper>
  );
}