// src/types/global.d.ts

// Sahne türleri için global tip tanımları
type SceneType = 'intro' | 'discovery' | 'reflection' | 'interaction' | 'finale';

export interface AnimationProps {
  initial?: boolean;
  animate?: boolean;
  exit?: boolean;
  transition?: {
    duration?: number;
    ease?: string | number[];
    delay?: number;
  };
  variants?: {
    initial: object;
    animate: object;
    exit?: object;
  };
}

export interface SceneProps {
  onNext?: () => void;
  onPrevious?: () => void;
  isActive?: boolean;
  animationProps?: AnimationProps;
}

export interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume?: number;
  loop?: boolean;
}

export interface ParticleConfig {
  count: number;
  size: number;
  speed: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

export interface BentoGridItemProps {
  title: string;
  description: string;
  imageUrl?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
}

export interface CompatibilityTestResult {
  browser: string;
  version: string;
  isSupported: boolean;
  missingFeatures: string[];
}
