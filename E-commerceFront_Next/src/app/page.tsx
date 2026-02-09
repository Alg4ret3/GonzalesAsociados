'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ProductCard } from '@/components/molecules/ProductCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Trophy, Target, TrendingUp, Globe, Briefcase, ChevronRight } from '@/components/icons';

const FEATURED_VENDORS = [
  {
    name: "Babalu.co",
    logo: "BB",
    description: "Líder regional en activewear y moda fitness de alto rendimiento.",
    specialty: "Fitness & Wellness",
    stats: "2.4k Ref",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Inexmoda",
    logo: "IM",
    description: "Instituto para la exportación y la moda. Conectando la industria con el mundo.",
    specialty: "Fashion Institute",
    stats: "Trend Hub",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
  }
];

const CORPORATE_STATS = [
  { label: "Transacciones Seguras", value: "100%", icon: ShieldCheck },
  { label: "Aliados Industriales", value: "85+", icon: Briefcase },
  { label: "Alcance Global", value: "24", icon: Globe },
  { label: "Crecimiento Anual", value: "+12%", icon: TrendingUp }
];

const RECENT_REFERENCES = [
  {
    id: "b1",
    name: "Leggins Pro-Compression",
    price: 185000,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
    category: "Activewear",
    slug: "leggins-pro-compression",
    vendor: "Babalu.co",
    rating: 4.9,
    isWholesale: true,
    color: "Negro",
    sizes: ["XS", "S", "M", "L", "XL"],
    productType: "Pantalones"
  },
  {
    id: "i1",
    name: "Informe de Tendencias 2026",
    price: 450000,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000&auto=format&fit=crop",
    category: "Trends",
    slug: "informe-tendencias-2026",
    vendor: "Inexmoda",
    rating: 5.0,
    color: "Multicolor",
    sizes: ["Único"],
    productType: "Libros"
  },
  {
    id: "1",
    name: "Gabardina Velvet Imperial",
    price: 450000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    category: "Alta Costura",
    slug: "gabardina-velvet-imperial",
    vendor: "Atelier Paris",
    rating: 4.9,
    color: "Gris",
    sizes: ["34", "36", "38", "40", "42"],
    productType: "Abrigos"
  },
  {
    id: "2",
    name: "Vestido Seda Medianoche",
    price: 890000,
    image: "https://images.unsplash.com/photo-1539109132314-d4959a531295?q=80&w=1000&auto=format&fit=crop",
    category: "Gala",
    slug: "vestido-seda-medianoche",
    vendor: "Luxe Couture",
    rating: 5.0,
    color: "Negro",
    sizes: ["34", "36", "38", "40"],
    productType: "Vestidos"
  },
  {
    id: "3",
    name: "Conjunto Lino Arena",
    price: 380000,
    image: "https://images.unsplash.com/photo-1523381235212-d7224779518d?q=80&w=1000&auto=format&fit=crop",
    category: "Verano",
    slug: "conjunto-lino-arena",
    vendor: "Nativa Design",
    rating: 4.7,
    color: "Beige",
    sizes: ["XS", "S", "M", "L"],
    productType: "Conjuntos"
  },
  {
    id: "4",
    name: "Blazer Noir Premium",
    price: 520000,
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1000&auto=format&fit=crop",
    category: "Sastrería",
    slug: "blazer-noir-premium",
    vendor: "Atelier Paris",
    rating: 4.8,
    color: "Negro",
    sizes: ["36", "38", "40", "42", "44"],
    productType: "Blazers"
  },
  {
    id: "5",
    name: "Pantalón Sastre Gris",
    price: 280000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    category: "Sastrería",
    slug: "pantalon-sastre-gris",
    vendor: "Studio 10",
    rating: 4.5,
    color: "Gris",
    sizes: ["34", "36", "38", "40", "42", "44"],
    productType: "Pantalones"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans selection:bg-accent/20">
      <Navbar />

      {/* Professional Hero Banner with Video */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://videos.pexels.com/video-files/3394650/3394650-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/50" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5 bg-accent z-0" />

        <div className="max-w-[1400px] mx-auto relative z-10 w-full px-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* New Collection Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 bg-red-500/90 backdrop-blur px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-red-400/50 shadow-lg"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <Typography variant="small" className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white">
                  Nueva Colección Esperada
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] md:leading-[1.15] text-white tracking-tighter">
                  Próximamente: Nueva Colección
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography variant="body" className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-light">
                  Diseñada por los mejores artesanos del continente. Materiales premium, sostenibilidad comprometida y un toque de innovación en cada prenda.
                </Typography>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-3 gap-4 pt-4 md:pt-8"
              >
                <div className="flex flex-col gap-1">
                  <Typography variant="h3" className="text-2xl sm:text-3xl md:text-3xl font-black text-white">
                    Feb 14
                  </Typography>
                  <Typography variant="small" className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/70">
                    Fecha Lanzamiento
                  </Typography>
                </div>
                <div className="flex flex-col gap-1">
                  <Typography variant="h3" className="text-2xl sm:text-3xl md:text-3xl font-black text-white">
                    250+
                  </Typography>
                  <Typography variant="small" className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/70">
                    Nuevas Piezas
                  </Typography>
                </div>
                <div className="flex flex-col gap-1">
                  <Typography variant="h3" className="text-2xl sm:text-3xl md:text-3xl font-black text-white">
                    Limited
                  </Typography>
                  <Typography variant="small" className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-white/70">
                    Edición
                  </Typography>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-8"
              >
                <Button 
                  label="Explorar Catálogo" 
                  href="/shop" 
                  variant="primary" 
                  className="rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-[11px] sm:text-[12px] md:text-[13px]" 
                />
                <Link 
                  href="/multivendor" 
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-foreground/20 dark:border-white/20 rounded-xl text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-wider hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Mayoristas <ChevronRight size={14} className="ml-2" />
                </Link>
              </motion.div>
            </div>

            {/* Right Visual - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <div className="relative w-full aspect-square max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
                {/* Decorative Frame */}
                <div className="absolute inset-0 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] border-2 border-foreground/10 dark:border-white/10" />
                
                {/* Main Image */}
                <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl sm:shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop&crop=faces" 
                    alt="Professional marketplace" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 dark:from-black/40 to-transparent" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-primary/20"
                >
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-accent/80 border border-white/20 flex items-center justify-center text-[10px] font-bold">+</div>
                    <div className="w-6 h-6 rounded-full bg-foreground/20 border border-white/20" />
                  </div>
                  <Typography variant="small" className="text-[10px] font-bold whitespace-nowrap">85+ Aliados</Typography>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS SECTION - PRIORITY SALES */}
      <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 bg-gradient-to-b from-background via-background to-muted">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header with Strong CTA */}
          <div className="mb-12 sm:mb-16 md:mb-20 space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex mx-auto items-center gap-2 bg-accent/10 px-4 py-2 rounded-full border border-accent/20"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">🔥 Lo Más Vendido</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography variant="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter">
                Productos Bestseller
              </Typography>
              <Typography variant="body" className="text-foreground/60 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Descubre las referencias más buscadas y compradas por profesionales de la industria textil.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 text-accent font-bold text-[13px] uppercase tracking-wider hover:gap-3 transition-all"
              >
                Ver Todo el Catálogo <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {RECENT_REFERENCES.map((ref, idx) => (
              <ProductCard key={ref.id} {...ref} />
            ))}
          </motion.div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 md:mt-20 p-8 sm:p-12 md:p-16 bg-primary text-white rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8"
          >
            <div className="space-y-3 flex-1">
              <Typography variant="h3" className="text-2xl sm:text-3xl font-black tracking-tight">
                ¿Buscas Stock Mayorista?
              </Typography>
              <Typography variant="body" className="text-white/80 text-sm sm:text-base">
                Accede a nuestro catálogo de compras volumétricas con precios especiales para distribuidores.
              </Typography>
            </div>
            <Link 
              href="/multivendor?filter=mayorista"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary font-bold text-[11px] sm:text-[12px] uppercase tracking-wider rounded-lg sm:rounded-xl hover:bg-accent hover:text-white transition-all flex-shrink-0"
            >
              Acceso Mayorista <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industrial Alliances Section (Babalu, Inexmoda) */}
      <section className="py-20 px-4 sm:px-8 md:px-12 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-border pb-10">
           <div className="space-y-4">
              <Typography variant="small" className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">Alianzas Estratégicas</Typography>
              <Typography variant="h2" className="text-4xl font-black text-foreground tracking-tighter">Multivendedor Corporate</Typography>
           </div>
           <Typography variant="body" className="text-foreground/60 max-w-md text-sm leading-relaxed font-light">
             Descubra las operativas de nuestros aliados principales. Desde manufactura deportiva hasta inteligencia de mercados.
           </Typography>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {FEATURED_VENDORS.map((vendor) => (
            <div key={vendor.name} className="group relative bg-muted rounded-2xl p-6 flex flex-col sm:flex-row gap-6 hover:bg-background hover:shadow-lg transition-all border border-transparent hover:border-border overflow-hidden">
              <div className="relative w-full sm:w-44 aspect-square flex-shrink-0 rounded-xl overflow-hidden border border-border">
                <Image src={vendor.image} alt={vendor.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-between py-2 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center font-bold text-sm tracking-tighter">{vendor.logo}</div>
                    <Typography variant="h3" className="text-xl font-black text-foreground">{vendor.name}</Typography>
                  </div>
                  <Typography variant="body" className="text-foreground/60 text-sm leading-relaxed font-light">{vendor.description}</Typography>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-background px-3 py-1 rounded-lg border border-border">
                    <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase">{vendor.specialty}</Typography>
                  </div>
                  <div className="bg-foreground px-3 py-1 rounded-lg">
                    <Typography variant="small" className="text-[10px] font-bold text-background uppercase">{vendor.stats}</Typography>
                  </div>
                </div>
                <Link href={`/shop?vendor=${vendor.name}`} className="inline-flex items-center gap-2 text-[13px] font-bold text-accent hover:underline pt-2">Ver catálogo</Link>
              </div>
            </div>
           ))}
          </div>
      </section>

      {/* New Collections Video Banner */}
      <section className="relative w-full h-screen min-h-[600px] sm:min-h-[700px] md:min-h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://videos.pexels.com/video-files/3394650/3394650-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">✨ Colecciones 2026</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-white tracking-tighter">
                    Descubre Nuestras Nuevas Colecciones
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Typography variant="body" className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-light">
                    Diseños de vanguardia, materiales premium y sostenibilidad. Cada pieza cuenta una historia de craftsmanship profesional.
                  </Typography>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-white text-foreground font-bold text-[11px] sm:text-[12px] uppercase tracking-wider rounded-xl hover:bg-accent hover:text-white transition-all duration-300 shadow-2xl"
                >
                  Explorar Colecciones <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-white/10 backdrop-blur text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-wider rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Consultar Catálogo
                </Link>
              </motion.div>

              {/* Stats Under CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex gap-8 sm:gap-12 pt-4 sm:pt-8"
              >
                <div>
                  <Typography variant="h3" className="text-2xl sm:text-3xl font-black text-white">
                    250+
                  </Typography>
                  <Typography variant="small" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70 mt-1">
                    Nuevas Piezas
                  </Typography>
                </div>
                <div>
                  <Typography variant="h3" className="text-2xl sm:text-3xl font-black text-white">
                    12
                  </Typography>
                  <Typography variant="small" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70 mt-1">
                    Diseñadores
                  </Typography>
                </div>
              </motion.div>
            </motion.div>

            {/* Right QR / Highlight */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
                  <div className="w-40 h-40 bg-white/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Typography variant="small" className="text-white font-bold text-[11px] uppercase tracking-widest mb-3 block">
                        Código QR
                      </Typography>
                      <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                        <Typography variant="body" className="text-[10px] text-foreground font-bold uppercase">
                          Catálogo Digital
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 text-center">
                  <Typography variant="small" className="text-white/90 text-[11px] font-medium">
                    Escanea para ver nuestro catálogo interactivo en 3D
                  </Typography>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
