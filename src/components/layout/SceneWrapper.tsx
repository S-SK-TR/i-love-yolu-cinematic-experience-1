import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneTransition } from '@/hooks/useSceneTransition';
import { useSceneStore } from '@/store/sceneStore';

interface SceneWrapperProps {
  children: React.ReactNode;
  sceneKey: string;
}

export function SceneWrapper({ children, sceneKey }: SceneWrapperProps) {
  const { transitionScene } = useSceneTransition();
  const { currentScene, transitionState } = useSceneStore();

  const transition = transitionScene({
    duration: 1.2,
    ease: [0.6, -0.05, 0.01, 0.99]
  });

  return (
    <AnimatePresence mode="wait">
      {currentScene === sceneKey && (
        <motion.div
          key={sceneKey}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
          onAnimationStart={() => {
            useSceneStore.getState().setTransitionState({
              from: transitionState.to,
              to: sceneKey,
              progress: 0
            });
          }}
          onAnimationComplete={() => {
            useSceneStore.getState().setTransitionState({
              progress: 1
            });
          }}
          className="min-h-screen w-full p-3 sm:p-4 md:p-6"
          role="region"
          aria-label={`Scene: ${sceneKey}`}
          aria-live="polite"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}