'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-48 pb-32 px-6 sm:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <Typography variant="small" className="text-primary font-bold">Nuestra Historia</Typography>
          <Typography variant="h1" className="text-5xl sm:text-7xl">Gonzales <span className="text-accent font-light">& CIA SAS</span></Typography>
          <Typography variant="body" className="text-lg font-light text-secondary leading-relaxed">
            Nacidos en el corazón de Nariño, somos una casa de moda dedicada a la preservación de la elegancia atemporal y la excelencia artesanal.
          </Typography>
        </motion.div>
      </section>

      {/* Image & Text Blocks */}
      <section className="space-y-32 pb-32">
        {/* Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-square lg:aspect-auto">
            <Image 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop" 
              alt="Artesanía" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-12 sm:p-24 lg:p-32 space-y-8">
            <Typography variant="h2" className="text-4xl">La Maestría del Detalle</Typography>
            <Typography variant="body" className="text-secondary leading-relaxed font-light">
              Cada puntada en nuestras prendas es el resultado de décadas de tradición. Trabajamos con maestros sastres y costureros locales que ven en cada tela una oportunidad para crear algo eterno. No creemos en la moda rápida; creemos en la moda que se hereda.
            </Typography>
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-12 sm:p-24 lg:p-32 space-y-8 lg:order-1 order-2">
            <Typography variant="h2" className="text-4xl">Sostenibilidad Ética</Typography>
            <Typography variant="body" className="text-secondary leading-relaxed font-light">
              Nuestra responsabilidad va más allá del estilo. Seleccionamos materiales de fuentes certificadas y promovemos un comercio justo que empodera a nuestras comunidades. En Gonzales & CIA SAS, el lujo solo es real si es respetuoso con el entorno y con las personas que lo hacen posible.
            </Typography>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:order-2 order-1">
            <Image 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop" 
              alt="Sostenibilidad" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-neutral-900 text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-12">
            <Typography variant="h2" className="text-primary italic font-serif">&ldquo;No vestimos cuerpos, vestimos personalidades.&rdquo;</Typography>
            <div className="space-y-4">
               <Typography variant="body" className="text-white/60 font-light tracking-widest text-sm uppercase">Misión</Typography>
               <Typography variant="body" className="text-lg">Elevar el estándar de la moda colombiana a nivel internacional, manteniendo nuestras raíces profundas en la calidad y la distinción.</Typography>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
