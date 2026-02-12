'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { Instagram, Mail, MapPin, Phone, WhatsApp } from '@/components/icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted border-t border-border pt-12 sm:pt-24 pb-6 sm:pb-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 md:gap-16 lg:gap-24 mb-12 sm:mb-24">
        {/* Brand */}
        <div className="flex flex-col gap-4 sm:gap-8 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img src="/assets/logo.svg" alt="Gonzales & CIA SAS" className="w-full h-full object-contain" />
            </div>
            <Typography variant="h4" className="text-base sm:text-lg md:text-xl text-primary font-black">
              Gonzales <span className="text-accent font-black">&</span> CIA <span className="text-foreground">SAS</span>
            </Typography>
          </div>
          <Typography variant="body" className="text-xs sm:text-sm leading-relaxed text-secondary italic">
            &ldquo;Redefiniendo el lujo contemporáneo.&rdquo;
          </Typography>
          <div className="flex gap-4 sm:gap-6 text-foreground/40">
            <a href="https://instagram.com/gonzalesciasas" target="_blank" rel="noopener noreferrer"><Instagram size={16} className="sm:size-18 hover:text-accent cursor-pointer transition-colors" /></a>
            <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer"><WhatsApp size={16} className="sm:size-18 hover:text-accent cursor-pointer transition-colors" /></a>
            <a href="mailto:hola@gonzales.com"><Mail size={16} className="sm:size-18 hover:text-accent cursor-pointer transition-colors" /></a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 sm:gap-8">
          <Typography variant="small" className="text-[8px] sm:text-[10px]">Tienda</Typography>
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link href="/shop" className="text-[7px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors line-clamp-1">Todos</Link>
            <Link href="/collections" className="text-[7px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors line-clamp-1">Colecciones</Link>
            <Link href="/new-arrivals" className="text-[7px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors line-clamp-1">Novedades</Link>
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4 sm:gap-8">
          <Typography variant="small" className="text-[8px] sm:text-[10px]">Soporte</Typography>
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link href="/contact" className="text-[7px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors line-clamp-1">Contacto</Link>
            <Link href="/faq" className="text-[7px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors line-clamp-1">FAQ</Link>
            <Link href="/returns" className="text-[7px] sm:text-xs uppercase tracking-widest hover:text-accent transition-colors line-clamp-1">Devoluciones</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4 sm:gap-8">
          <Typography variant="small" className="text-[8px] sm:text-[10px]">Contacto</Typography>
          <div className="flex flex-col gap-3 sm:gap-4 text-[7px] sm:text-xs tracking-widest text-secondary">
            <div className="flex items-start gap-2">
              <Mail size={14} className="flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">hola@gonzales.com</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={14} className="flex-shrink-0 mt-0.5" />
              <span>+57 300 1234567</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="flex-shrink-0 mt-0.5" />
              <span>Pasto, Nariño</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 sm:pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
        <p className="text-[7px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-foreground/40 text-center sm:text-left">
          © 2026 Gonzales & CIA SAS. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 sm:gap-8 text-[7px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-foreground/40">
          <Link href="/privacy" className="hover:text-foreground whitespace-nowrap">Privacidad</Link>
          <Link href="/terms" className="hover:text-foreground whitespace-nowrap">Términos</Link>
        </div>
      </div>
    </footer>
  );
};
