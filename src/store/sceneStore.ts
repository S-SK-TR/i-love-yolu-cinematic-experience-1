import { create } from 'zustand'

interface SceneState {
  currentScene: 'intro' | 'discovery' | 'reflection' | 'interaction' | 'finale' | 'pwa-test';
  transitioning: boolean;
  interactionComplete: boolean;
  transitionState: {
    from: string;
    to: string;
    progress: number;
  };
}

interface SceneActions {
  setScene: (scene: SceneState['currentScene']) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setInteractionComplete: (complete: boolean) => void;
  setTransitionState: (state: Partial<SceneState['transitionState']>) => void;
}

export const useSceneStore = create<SceneState & SceneActions>((set) => ({
  currentScene: 'intro',
  transitioning: false,
  interactionComplete: false,
  transitionState: {
    from: '',
    to: '',
    progress: 0
  },
  setScene: (scene) => set({ currentScene: scene }),
  setTransitioning: (isTransitioning) => set({ transitioning: isTransitioning }),
  setInteractionComplete: (complete) => set({ interactionComplete: complete }),
  setTransitionState: (state) => set((prev) => ({
    transitionState: { ...prev.transitionState, ...state }
  })),
}));
