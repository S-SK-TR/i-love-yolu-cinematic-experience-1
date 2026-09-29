import React from 'react';
import { SceneWrapper } from '@/components/layout/SceneWrapper';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSceneStore } from '@/store/sceneStore';
import { Share2, RotateCcw } from 'lucide-react';
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer';

interface FinaleSceneProps {
  onRestart?: () => void;
}

export function FinaleScene({ onRestart }: FinaleSceneProps) {
  const navigate = useNavigate();
  const { setCurrentScene } = useSceneStore();
  usePerformanceOptimizer({ willChange: true, animationFrameRate: 60 });

  const handleRestart = () => {
    setCurrentScene('intro');
    navigate('/');
    if (onRestart) onRestart();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I Love Yolu Cinematic Experience',
        text: 'Check out this beautiful cinematic experience!',
        url: window.location.href
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this device');
    }
  };

  return (
    <SceneWrapper sceneKey="finale" className="flex flex-col items-center justify-center">
      {/* Gül yaprakları animasyonu */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 sm:w-6 h-4 sm:h-6 bg-pink-200 rounded-full opacity-70"
          initial={{ y: -100, x: Math.random() * 100 - 50, opacity: 0 }}
          animate={{ y: '100vh', x: Math.random() * 100 - 50, opacity: [0, 0.7, 0] }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: 'loop'
          }}
          style={{ willChange: 'transform, opacity' }}
          aria-hidden="true"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto px-4"
        style={{ willChange: 'transform, opacity' }}
        role="region"
        aria-label="Final sahnesi"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">The End</h1>
        <p className="text-lg sm:text-xl text-pink-100 mb-6 sm:mb-8">Thank you for experiencing this beautiful journey. We hope it brought you joy and inspiration.</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRestart}
            icon={RotateCcw}
            className="px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            aria-label="Yolculuğu yeniden başlat"
          >
            Restart Journey
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleShare}
            icon={Share2}
            className="px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            aria-label="Deneyimi paylaş"
          >
            Share Experience
          </Button>
        </div>
      </motion.div>
    </SceneWrapper>
  );
}

export default FinaleScene;