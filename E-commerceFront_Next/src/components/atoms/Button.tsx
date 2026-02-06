import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-10 py-5 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500 relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-primary text-white border border-primary hover:bg-black hover:border-black',
    outline: 'bg-transparent text-foreground border border-foreground/20 hover:border-foreground',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
  };

  const content = (
    <>
      <span className="relative z-10">{label}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};
