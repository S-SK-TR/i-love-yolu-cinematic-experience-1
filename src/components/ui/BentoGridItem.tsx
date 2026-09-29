import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoGridItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  return (
    <div className={cn(
      "glass-card",
      "rounded-xl p-3 sm:p-4 md:p-5 lg:p-6",
      "flex flex-col justify-between",
      {
        "sm:col-span-2": colSpan === 2,
        "md:col-span-3": colSpan === 3,
        "md:row-span-2": rowSpan === 2,
      },
      className
    )}>
      {children}
    </div>
  );
}