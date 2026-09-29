import { useState, useEffect, useCallback } from 'react';
import { useSettingsStore } from '@/store';

interface UseAudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export function useAudioPlayer({ audioRef }: UseAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const { prefersReducedMotion } = useSettingsStore();

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  }, [audioRef, isPlaying]);

  const mute = useCallback(() => {
    if (!audioRef.current) return;
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  }, [audioRef, isMuted]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [prefersReducedMotion, audioRef]);

  return {
    isPlaying,
    volume,
    isMuted,
    togglePlay,
    setVolume,
    mute
  };
}
