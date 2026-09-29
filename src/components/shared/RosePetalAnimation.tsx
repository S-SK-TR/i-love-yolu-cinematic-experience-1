import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';
import { getPetalTransitionProps } from '@/utils/animationHelpers';

interface PetalProps {
  id: number;
  left: number;
  duration: number;
  delay: number;
}

const RosePetalAnimation: React.FC = () => {
  const [petals, setPetals] = useState<PetalProps[]>([]);
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newPetal: PetalProps = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 2
      };
      setPetals(prev => [...prev, newPetal]);
      setTimeout(() => {
        setPetals(prev => prev.filter(petal => petal.id !== newPetal.id));
      }, newPetal.duration * 1000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            className="absolute w-6 h-6 bg-pink-500 rounded-full opacity-70"
            style={{ left: `${petal.left}%`, willChange: 'transform, opacity' }}
            initial={{ y: -20, opacity: 0, rotate: 0 }}
            animate={{ y: '100vh', opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={getPetalTransitionProps(petal.duration)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RosePetalAnimation;