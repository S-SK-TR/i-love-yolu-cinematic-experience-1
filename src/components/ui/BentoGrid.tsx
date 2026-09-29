import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4",
      "auto-rows-[minmax(150px,auto)] sm:auto-rows-[minmax(200px,auto)]",
      className
    )}>
      {children}
    </div>
  );
}