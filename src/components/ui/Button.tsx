import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getButtonHoverProps } from '@/utils/animationHelpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      variants={getButtonHoverProps()}
      whileHover="hover"
      whileTap="tap"
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </motion.button>
  );
}

export default Button;