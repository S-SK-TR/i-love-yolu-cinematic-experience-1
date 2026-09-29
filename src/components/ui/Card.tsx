import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 sm:p-5 md:p-6",
        className
      )}
      {...props}
      role="article"
      aria-label="Content card"
    >
      {children}
    </motion.div>
  );
}