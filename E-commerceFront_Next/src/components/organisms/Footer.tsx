'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-border pt-24 pb-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
        {/* Brand */}
        <div className="flex flex-col gap-8">
          <Typography variant="h4" className="text-xl text-primary">
            Gonzales<span className="text-foreground">Asociados</span>
          </Typography>
          <Typography variant="body" className="text-sm leading-relaxed text-secondary italic">
            &ldquo;Redefiniendo el lujo contemporáneo a través de la exclusividad y la artesanía impecable.&rdquo;
          </Typography>
          <div className="flex gap-6 text-neutral-400">
            <Instagram size={18} strokeWidth={1.5} className="hover:text-primary cursor-pointer transition-colors" />
            <Facebook size={18} strokeWidth={1.5} className="hover:text-primary cursor-pointer transition-colors" />
            <Twitter size={18} strokeWidth={1.5} className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-8">
          <Typography variant="small">Tienda</Typography>
          <div className="flex flex-col gap-4">
            <Link href="/shop" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">Todos los productos</Link>
            <Link href="/collections" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">Colecciones</Link>
            <Link href="/new-arrivals" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">Novedades</Link>
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-8">
          <Typography variant="small">Soporte</Typography>
          <div className="flex flex-col gap-4">
            <Link href="/contact" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">Contacto</Link>
            <Link href="/faq" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">Preguntas Frecuentes</Link>
            <Link href="/returns" className="text-xs uppercase tracking-widest hover:text-primary transition-colors">Cambios y Devoluciones</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-8">
          <Typography variant="small">Contacto</Typography>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xs tracking-widest text-secondary">
              <Mail size={16} strokeWidth={1} />
              hola@gonzalesasociados.com
            </div>
            <div className="flex items-center gap-4 text-xs tracking-widest text-secondary">
              <Phone size={16} strokeWidth={1} />
              +57 (300) 123 4567
            </div>
            <div className="flex items-center gap-4 text-xs tracking-widest text-secondary">
              <MapPin size={16} strokeWidth={1} />
              Pasto, Nariño, Colombia
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          © 2026 GonzalesAsociados. Todos los derechos reservados.
        </p>
        <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/privacy" className="hover:text-foreground">Privacidad</Link>
          <Link href="/terms" className="hover:text-foreground">Términos</Link>
        </div>
      </div>
    </footer>
  );
};
