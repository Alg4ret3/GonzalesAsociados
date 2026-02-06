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
      
      <div className="pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[9px] tracking-widest uppercase text-neutral-400 mb-16">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-primary transition-colors">Tienda</Link>
          <ChevronRight size={10} />
          <span className="text-foreground tracking-widest">{PRODUCT.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Gallery Side */}
          <div className="flex flex-col gap-8">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="relative aspect-[3/4] bg-muted overflow-hidden"
            >
              <Image 
                src={PRODUCT.images[activeImage]} 
                alt={PRODUCT.name} 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-6">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square overflow-hidden border transition-all duration-300 ${
                    activeImage === idx ? 'border-primary' : 'border-transparent hover:border-foreground/20'
                  }`}
                >
                  <Image src={img} alt={`${PRODUCT.name} view ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-primary">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <Typography variant="small" className="text-[9px]">4.9 (42 Reseñas)</Typography>
              </div>
              <Typography variant="small" className="text-primary font-bold">{PRODUCT.category}</Typography>
              <Typography variant="h1" className="text-4xl sm:text-6xl">{PRODUCT.name}</Typography>
              <Typography variant="h3" className="text-2xl font-light">${PRODUCT.price.toLocaleString()}</Typography>
            </div>

            <Typography variant="body" className="text-secondary leading-relaxed font-light text-lg">
              {PRODUCT.description}
            </Typography>

            <div className="flex flex-col gap-8 py-12 border-y border-border">
              {/* Size Selection */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <Typography variant="small">Seleccionar Talla</Typography>
                  <button className="text-[9px] uppercase tracking-widest text-neutral-400 underline underline-offset-4">Guía de tallas</button>
                </div>
                <div className="flex gap-4">
                  {PRODUCT.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center text-[10px] tracking-widest font-bold border transition-all duration-300 ${
                        selectedSize === size ? 'bg-primary text-white border-primary' : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <Typography variant="small" className="text-neutral-400">Ref: {PRODUCT.sku}</Typography>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-6 text-[10px] tracking-[0.4em] font-bold uppercase hover:bg-black transition-all duration-500 flex items-center justify-center gap-4 group"
                  >
                    Añadir a la bolsa <ShoppingBag size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 border border-border hover:border-red-500 hover:text-red-500 transition-all duration-500 group">
                    <Star size={18} strokeWidth={1.5} className="group-hover:fill-current" />
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
