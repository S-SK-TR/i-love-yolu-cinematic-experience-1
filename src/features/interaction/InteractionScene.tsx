import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/layout/SceneWrapper';
import { useSceneStore } from '@/store/sceneStore';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';

interface Petal {
  id: string;
  x: number;
  y: number;
}

export function InteractionScene() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const { setScene } = useSceneStore();
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  const handleDragEnd = (e: React.DragEvent, id: string) => {
    const newPetals = petals.map(petal =>
      petal.id === id ? { ...petal, x: e.clientX, y: e.clientY } : petal
    );
    setPetals(newPetals);
  };

  const handleFinish = () => {
    setScene('finale');
  };

  return (
    <SceneWrapper sceneKey="interaction">
      <div className="relative h-full w-full overflow-hidden" role="region" aria-label="Etkileşim sahnesi">
        {/* Gül yaprakları */}
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute w-6 sm:w-8 h-6 sm:h-8 bg-pink-200 rounded-full cursor-move"
            style={{ x: petal.x, y: petal.y, willChange: 'transform' }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(e) => handleDragEnd(e, petal.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Gül yaprağı ${petal.id}`}
          />
        ))}

        {/* Finish butonu */}
        <motion.button
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 px-5 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-full font-medium shadow-lg text-sm sm:text-base"
          onClick={handleFinish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ willChange: 'transform' }}
          aria-label="Bitir"
        >
          Finish
        </motion.button>
      </div>
    </SceneWrapper>
  );
}