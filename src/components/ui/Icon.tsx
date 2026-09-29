import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  className?: string;
}

export function Icon({ name, size = 24, color, className }: IconProps) {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon '${name}' not found in LucideIcons`);
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={className}
    >
      <LucideIcon size={size} color={color} />
    </motion.div>
  );
}