import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className = '',
  as,
}) => {
  const variants = {
    h1: 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tighter',
    h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tighter',
    h3: 'text-lg sm:text-xl md:text-2xl font-sans font-bold tracking-tight',
    h4: 'text-sm sm:text-base font-sans font-semibold tracking-wider uppercase',
    body: 'text-sm sm:text-base font-sans font-light leading-relaxed',
    small: 'text-[9px] sm:text-[10px] md:text-xs font-sans font-medium tracking-[0.3em] uppercase',
  };

  const Component = as || (variant.startsWith('h') ? variant : variant === 'small' ? 'span' : 'p');

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};
