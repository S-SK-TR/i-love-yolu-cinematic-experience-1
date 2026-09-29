import { create } from 'zustand'

interface SettingsState {
  prefersReducedMotion: boolean;
  audioEnabled: boolean;
  audioVolume: number;
  pwaInstallPrompt: any;
  backgroundMusicEnabled: boolean;
  soundEffectsEnabled: boolean;
}

interface SettingsActions {
  setPrefersReducedMotion: (prefers: boolean) => void;
  toggleReducedMotion: () => void;
  setAudioEnabled: (enabled: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setPwaInstallPrompt: (prompt: any) => void;
  setBackgroundMusicEnabled: (enabled: boolean) => void;
  setSoundEffectsEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>((set) => ({
  prefersReducedMotion: false,
  audioEnabled: true,
  audioVolume: 0.7,
  pwaInstallPrompt: null,
  backgroundMusicEnabled: true,
  soundEffectsEnabled: true,
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
  toggleReducedMotion: () => set((state) => ({
    prefersReducedMotion: !state.prefersReducedMotion
  })),
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  setAudioVolume: (volume) => set({ audioVolume: volume }),
  setPwaInstallPrompt: (prompt) => set({ pwaInstallPrompt: prompt }),
  setBackgroundMusicEnabled: (enabled) => set({ backgroundMusicEnabled: enabled }),
  setSoundEffectsEnabled: (enabled) => set({ soundEffectsEnabled: enabled })
}));