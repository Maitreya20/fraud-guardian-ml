
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'default' | 'subtle' | 'gradient';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className,
  variant = 'default' 
}) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {variant === 'default' && (
        <>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-subtle opacity-70" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-subtle opacity-40 animation-delay-2000" />
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-subtle opacity-50 animation-delay-4000" />
        </>
      )}

      {variant === 'subtle' && (
        <>
          <div className="absolute inset-0 bg-slate-50 dot-pattern" />
          <div className="absolute top-20 -left-20 w-72 h-72 bg-cyan-200/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/10 rounded-full filter blur-3xl" />
        </>
      )}

      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/20 animate-gradient-move" />
      )}
    </div>
  );
};

export default AnimatedBackground;
