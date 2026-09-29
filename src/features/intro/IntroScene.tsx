import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { SceneWrapper } from '@/components/layout/SceneWrapper';
import { useSceneStore } from '@/store/sceneStore';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
};

export function IntroScene() {
  const setScene = useSceneStore(state => state.setScene);
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  const handleStartJourney = () => {
    setScene('discovery');
  };

  return (
    <SceneWrapper sceneKey="intro">
      <motion.div
        className="flex flex-col items-center justify-center h-full text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ willChange: 'transform, opacity' }}
        role="region"
        aria-label="Giriş sahnesi"
      >
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            I Love Yolu
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 max-w-2xl">
          <Typography variant="body" className="text-lg sm:text-xl md:text-2xl text-gray-200">
            A cinematic journey through love and nature
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartJourney}
            className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold"
            aria-label="Yolculuğa başla"
          >
            Start Journey
          </Button>
        </motion.div>
      </motion.div>
    </SceneWrapper>
  );
}