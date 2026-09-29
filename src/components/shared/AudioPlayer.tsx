import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface AudioPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export function AudioPlayer({ src, title, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    isPlaying,
    volume,
    togglePlay,
    setVolume,
    mute,
    isMuted
  } = useAudioPlayer(audioRef);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className={`glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg ${className}`}>
      <audio ref={audioRef} src={src} />
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isPlaying ? <Pause size={16} className="sm:hidden" /> : <Play size={16} className="sm:hidden" />}
          {isPlaying ? <Pause size={20} className="hidden sm:block" /> : <Play size={20} className="hidden sm:block" />}
        </motion.button>

        <div className="flex-1">
          {title && (
            <p className="text-xs sm:text-sm font-medium text-white/80">{title}</p>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <motion.button
            onClick={mute}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isMuted ? <VolumeX size={14} className="sm:hidden" /> : <Volume2 size={14} className="sm:hidden" />}
            {isMuted ? <VolumeX size={18} className="hidden sm:block" /> : <Volume2 size={18} className="hidden sm:block" />}
          </motion.button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 sm:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}