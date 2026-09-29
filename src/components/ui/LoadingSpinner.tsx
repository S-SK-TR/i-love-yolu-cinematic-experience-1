import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { getSpinnerProps } from '@/utils/animationHelpers';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 20,
    md: 28,
    lg: 36
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        variants={getSpinnerProps()}
        animate="animate"
      >
        <HelpCircle
          size={sizeMap[size]}
          className="text-primary animate-pulse"
        />
      </motion.div>
    </motion.div>
  );
}