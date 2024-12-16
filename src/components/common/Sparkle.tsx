import React from 'react';
import clsx from 'clsx';

interface SparkleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
}

export const Sparkle: React.FC<SparkleProps> = ({
  className,
  size = 'md',
  position = 'top-right'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const positionClasses = {
    'top-right': '-top-2 -right-2',
    'top-left': '-top-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
    'bottom-left': '-bottom-2 -left-2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div
      className={clsx(
        'absolute',
        'animate-spin-slow',
        sizeClasses[size],
        positionClasses[position],
        className
      )}
    >
      <img
        src="/images/sparkle.svg"
        alt=""
        className="w-full h-full"
      />
    </div>
  );
};