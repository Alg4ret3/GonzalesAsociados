'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from '@/components/icons';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-48 pb-32 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          {/* Contact Info */}
          <div className="space-y-16">
            <div className="space-y-6">
              <Typography variant="small" className="text-foreground font-bold">Contacto</Typography>
              <Typography variant="h1" className="text-5xl sm:text-7xl">Estamos para <br /> servirte</Typography>
              <Typography variant="body" className="text-secondary text-lg font-light leading-relaxed">
                ¿Tienes alguna duda sobre nuestras colecciones o necesitas un servicio personalizado? Nuestro equipo de conserjería está listo para atenderte.
              </Typography>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={18} strokeWidth={1} />
                </div>
                <div>
                  <Typography variant="small" className="text-neutral-400 block mb-1">Escríbenos</Typography>
                  <Typography variant="h4" className="text-sm font-medium">hola@gonzalesasociados.com</Typography>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} strokeWidth={1} />
                </div>
                <div>
                  <Typography variant="small" className="text-neutral-400 block mb-1">Llámanos</Typography>
                  <Typography variant="h4" className="text-sm font-medium">+57 (300) 123 4567</Typography>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={18} strokeWidth={1} />
                </div>
                <div>
                  <Typography variant="small" className="text-neutral-400 block mb-1">Visítanos</Typography>
                  <Typography variant="h4" className="text-sm font-medium">Pasto, Nariño, Colombia</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-50 dark:bg-neutral-900 p-8 sm:p-16 border border-border">
            <form className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <Typography variant="small" className="text-[10px]">Nombre</Typography>
                  <input className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="small" className="text-[10px]">Apellido</Typography>
                  <input className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Typography variant="small" className="text-[10px]">Correo Electrónico</Typography>
                <input type="email" className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm" />
              </div>

              <div className="flex flex-col gap-2">
                <Typography variant="small" className="text-[10px]">Mensaje</Typography>
                <textarea rows={4} className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm resize-none" />
              </div>

              <Button label="Enviar Mensaje" variant="primary" className="w-full" />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
