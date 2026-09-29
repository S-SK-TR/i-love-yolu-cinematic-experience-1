export type SceneType = 'intro' | 'discovery' | 'reflection' | 'interaction' | 'finale' | 'pwa-test';

export interface SceneConfig {
  type: SceneType;
  title: string;
  description: string;
  duration?: number; // seconds
  requiresInteraction?: boolean;
  backgroundImage?: string;
  audioTrack?: string;
  nextScene?: SceneType;
  accessibilityFeatures?: {
    ariaLabels: boolean;
    keyboardNavigation: boolean;
    contrastRatios: boolean;
  };
}

export const SCENE_TYPES: Record<SceneType, SceneConfig> = {
  intro: {
    type: 'intro',
    title: 'Giriş',
    description: 'Uygulama başlangıcı ve karşılama',
    duration: 10,
    backgroundImage: '/images/intro-bg.webp',
    audioTrack: '/audio/intro-music.mp3',
    nextScene: 'discovery',
    accessibilityFeatures: {
      ariaLabels: true,
      keyboardNavigation: true,
      contrastRatios: true
    }
  },
  discovery: {
    type: 'discovery',
    title: 'Keşif',
    description: 'İçerik keşfi ve hikaye anlatımı',
    requiresInteraction: true,
    backgroundImage: '/images/discovery-bg.webp',
    audioTrack: '/audio/discovery-ambient.mp3',
    nextScene: 'reflection',
    accessibilityFeatures: {
      ariaLabels: true,
      keyboardNavigation: true,
      contrastRatios: true
    }
  },
  reflection: {
    type: 'reflection',
    title: 'Yansıma',
    description: 'Duygusal derinlik ve metin animasyonları',
    duration: 15,
    backgroundImage: '/images/reflection-bg.webp',
    audioTrack: '/audio/reflection-piano.mp3',
    nextScene: 'interaction',
    accessibilityFeatures: {
      ariaLabels: true,
      keyboardNavigation: true,
      contrastRatios: true
    }
  },
  interaction: {
    type: 'interaction',
    title: 'Etkileşim',
    description: 'Kullanıcı ile etkileşimli deneyim',
    requiresInteraction: true,
    backgroundImage: '/images/interaction-bg.webp',
    audioTrack: '/audio/interaction-soundscape.mp3',
    nextScene: 'finale',
    accessibilityFeatures: {
      ariaLabels: true,
      keyboardNavigation: true,
      contrastRatios: true
    }
  },
  finale: {
    type: 'finale',
    title: 'Final',
    description: 'Kapanış mesajı ve paylaşım seçenekleri',
    duration: 20,
    backgroundImage: '/images/finale-bg.webp',
    audioTrack: '/audio/finale-music.mp3',
    accessibilityFeatures: {
      ariaLabels: true,
      keyboardNavigation: true,
      contrastRatios: true
    }
  },
  'pwa-test': {
    type: 'pwa-test',
    title: 'PWA Testi',
    description: 'Service worker ve PWA özelliklerini test et',
    requiresInteraction: true,
    backgroundImage: '/images/pwa-test-bg.webp',
    audioTrack: '/audio/pwa-test-sound.mp3',
    nextScene: 'discovery',
    accessibilityFeatures: {
      ariaLabels: true,
      keyboardNavigation: true,
      contrastRatios: true
    }
  }
};
