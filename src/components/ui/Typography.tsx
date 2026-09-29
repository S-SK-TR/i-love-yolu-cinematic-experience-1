import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  variant?: 'heading' | 'subheading' | 'body' | 'caption';
  className?: string;
}

export function Typography({ variant = 'body', className, children, ...props }: TypographyProps) {
  const baseClasses = 'font-sans';

  const variantClasses = {
    heading: 'font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
    subheading: 'font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug tracking-normal',
    body: 'font-inter text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-normal',
    caption: 'font-inter text-xs sm:text-sm md:text-base lg:text-lg leading-normal tracking-wide text-gray-500'
  };

  return React.createElement(
    variant === 'heading' ? 'h1' : variant === 'subheading' ? 'h2' : variant === 'caption' ? 'p' : 'p',
    {
      className: cn(baseClasses, variantClasses[variant], className),
      ...props,
      'aria-label': typeof children === 'string' ? children : undefined
    },
    children
  );
}

export default Typography;