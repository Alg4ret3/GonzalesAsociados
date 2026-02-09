'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { ChevronRight, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for a single product
const PRODUCT = {
  id: "2",
  name: "Vestido Seda Medianoche",
  price: 890000,
  images: [
    "https://images.unsplash.com/photo-1539109132314-d4959a531295?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
  ],
  category: "Gala",
  description: "Un vestido etéreo confeccionado en seda natural de la más alta calidad. Su caída fluida y el brillo sutil capturan la esencia de la noche. Diseñado para eventos de alta gala, cada costura refleja la dedicación artesanal de GonzalesAsociados.",
  sizes: ["XS", "S", "M", "L"],
  sku: "VSE-MED-002",
  slug: "vestido-seda-medianoche"
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }
    addToCart({ 
      ...PRODUCT, 
      image: PRODUCT.images[0], 
      quantity: 1, 
      size: selectedSize 
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[9px] tracking-widest uppercase text-foreground/40 mb-8 sm:mb-12 md:mb-16">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <ChevronRight size={8} className="sm:size-2.5 md:size-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Tienda</Link>
          <ChevronRight size={8} className="sm:size-2.5 md:size-3" />
          <span className="text-foreground tracking-widest line-clamp-1">{PRODUCT.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 lg:gap-32">
          {/* Gallery Side */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="relative aspect-[3/4] bg-muted overflow-hidden rounded-lg sm:rounded-xl"
            >
              <Image 
                src={PRODUCT.images[activeImage]} 
                alt={PRODUCT.name} 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square overflow-hidden border rounded-lg transition-all duration-300 ${
                    activeImage === idx ? 'border-accent' : 'border-transparent hover:border-foreground/20'
                  }`}
                >
                  <Image src={img} alt={`${PRODUCT.name} view ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-accent">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className="sm:size-3 md:size-3.5" fill="currentColor" />)}
                </div>
                <Typography variant="small" className="text-[8px] sm:text-[9px] md:text-[10px]">4.9 (42)</Typography>
              </div>
              <Typography variant="small" className="text-accent font-bold text-[9px] sm:text-xs md:text-sm">{PRODUCT.category}</Typography>
              <Typography variant="h1" className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">{PRODUCT.name}</Typography>
              <Typography variant="h3" className="text-lg sm:text-2xl md:text-3xl font-light">${PRODUCT.price.toLocaleString()}</Typography>
            </div>

            <Typography variant="body" className="text-secondary leading-relaxed font-light text-xs sm:text-sm md:text-base">
              {PRODUCT.description}
            </Typography>

            <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 py-8 sm:py-10 md:py-12 border-y border-border">
              {/* Size Selection */}
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <div className="flex justify-between items-center">
                  <Typography variant="small" className="text-[9px] sm:text-xs md:text-sm">Seleccionar Talla</Typography>
                  <button className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest text-foreground/40 underline underline-offset-4">Guía</button>
                </div>
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                  {PRODUCT.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 sm:w-11 md:w-12 lg:w-14 sm:h-11 md:h-12 lg:h-14 flex items-center justify-center text-[8px] sm:text-[9px] md:text-[10px] tracking-widest font-bold border transition-all duration-300 rounded-lg ${
                        selectedSize === size ? 'bg-accent text-white border-accent' : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <Typography variant="small" className="text-foreground/40 text-[8px] sm:text-[9px] md:text-[10px]">Ref: {PRODUCT.sku}</Typography>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-6">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-foreground text-background py-3 sm:py-4 md:py-5 lg:py-6 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase hover:opacity-90 transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 group rounded-lg"
                  >
                    Añadir <ShoppingBag size={10} className="sm:size-3 md:size-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 border border-border hover:border-accent hover:text-accent transition-all duration-500 group rounded-lg flex items-center justify-center">
                    <Star size={14} className="sm:size-4 md:size-4.5 group-hover:fill-current" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
               <div className="flex flex-col gap-3">
                 <Truck size={20} strokeWidth={1} className="text-primary" />
                 <Typography variant="small" className="text-[9px]">Envío Exprés</Typography>
                 <Typography variant="body" className="text-[9px] text-neutral-500 uppercase tracking-tighter">Gratis en órdenes +$500k</Typography>
               </div>
               <div className="flex flex-col gap-3">
                 <RotateCcw size={20} strokeWidth={1} className="text-primary" />
                 <Typography variant="small" className="text-[9px]">Cambios Fáciles</Typography>
                 <Typography variant="body" className="text-[9px] text-neutral-500 uppercase tracking-tighter">30 días de garantía</Typography>
               </div>
               <div className="flex flex-col gap-3">
                 <ShieldCheck size={20} strokeWidth={1} className="text-primary" />
                 <Typography variant="small" className="text-[9px]">Pago Seguro</Typography>
                 <Typography variant="body" className="text-[9px] text-neutral-500 uppercase tracking-tighter">Encriptación Premium</Typography>
               </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
