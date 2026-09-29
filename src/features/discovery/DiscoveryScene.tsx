import React from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper } from '@/components/layout/SceneWrapper';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSceneStore } from '@/store/sceneStore';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';

const staggeredAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const discoveryContent = [
  { id: 1, title: 'Gülün Gücü', description: 'Güllerin doğal güzelliği ve iyileştirici etkileri hakkında keşif yapın.', image: '/images/rose1.jpg' },
  { id: 2, title: 'Aşkın Dili', description: 'Güllerin aşk ve romantizmi ile ilgili hikayeler ve mitler.', image: '/images/rose2.jpg' },
  { id: 3, title: 'Gül Bahçeleri', description: 'Dünya çapındaki en güzel gül bahçelerini keşfedin.', image: '/images/rose3.jpg' },
  { id: 4, title: 'Gül Kültürü', description: 'Gül yetiştiriciliği ve gül sanatının tarihi.', image: '/images/rose4.jpg' }
];

const DiscoveryScene = () => {
  const setScene = useSceneStore(state => state.setScene);
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  const handleContinue = () => {
    setScene('reflection');
  };

  return (
    <SceneWrapper sceneKey="discovery">
      <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto" role="region" aria-label="Keşif sahnesi">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-white"
          style={{ willChange: 'transform, opacity' }}
          aria-label="Gülün Sırlarını Keşfedin"
        >
          Gülün Sırlarını Keşfedin
        </motion.h1>

        <BentoGrid className="mb-6 sm:mb-8">
          {discoveryContent.map((item, index) => (
            <BentoGridItem key={item.id} colSpan={index % 2 === 0 ? 1 : 2}>
              <motion.div
                variants={staggeredAnimation}
                initial="hidden"
                animate="visible"
                custom={index}
                style={{ willChange: 'transform, opacity' }}
                role="article"
                aria-label={`Keşif öğesi: ${item.title}`}
              >
                <Card className="h-full">
                  <div className="relative h-32 sm:h-48 md:h-64 rounded-lg overflow-hidden mb-3 sm:mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{item.description}</p>
                </Card>
              </motion.div>
            </BentoGridItem>
          ))}
        </BentoGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
          style={{ willChange: 'transform, opacity' }}
        >
          <Button
            onClick={handleContinue}
            variant="primary"
            size="lg"
            className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium"
            aria-label="Devam et"
          >
            Devam Et
          </Button>
        </motion.div>
      </div>
    </SceneWrapper>
  );
};

export default DiscoveryScene;