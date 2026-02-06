'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  videoUrl: string;
  title: string;
  subtitle: string;
}

export const Hero: React.FC<HeroProps> = ({ videoUrl, title, subtitle }) => {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover brightness-[0.4] scale-105"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="max-w-4xl"
        >
          <Typography variant="small" className="text-white mb-6 tracking-[0.5em]">
            Nueva Colección 2026
          </Typography>
          <Typography variant="h1" className="text-white mb-8 leading-[1.1]">
            {title}
          </Typography>
          <Typography variant="body" className="text-white/80 max-w-2xl mx-auto mb-12 text-lg font-light">
            {subtitle}
          </Typography>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button label="Explorar Tienda" href="/shop" variant="primary" />
            <Button label="Nuestra Historia" href="/nosotros" variant="outline" className="text-white border-white/20 hover:border-white" />
          </div>
        </motion.div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
