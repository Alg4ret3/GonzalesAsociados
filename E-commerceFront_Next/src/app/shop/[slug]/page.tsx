'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { ChevronRight, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Building2, Ruler } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for a single product (Ideally this would come from a database based on slug)
const PRODUCT = {
  id: "2",
  name: "Vestido Seda Medianoche",
  price: 890000,
  vendor: "Atelier Paris",
  images: [
    "https://images.unsplash.com/photo-1539109132314-d4959a531295?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
  ],
  category: "Alta Costura",
  description: "Un vestido etéreo confeccionado en seda natural de la más alta calidad. Su caída fluida y el brillo sutil capturan la esencia de la noche. Diseñado para eventos de alta gala, cada costura refleja la dedicación artesanal de Gonzales & Asociados.",
  specifications: [
    { label: "Composición", value: "100% Seda Natural" },
    { label: "Manufactura", value: "Artesanal - Atelier Paris" },
    { label: "Cuidado", value: "Lavado en seco especializado" },
    { label: "Garantía", value: "Exclusividad Certificada" }
  ],
  sizes: ["XS", "S", "M", "L"],
  sku: "VSE-MED-002",
  slug: "vestido-seda-medianoche",
  rating: 4.9,
  reviewsCount: 42
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
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <Navbar />
      
      <div className="pt-32 sm:pt-48 pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] sm:text-[10px] tracking-widest uppercase text-slate-400 font-bold mb-16">
          <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-blue-600 transition-colors">Catálogo</Link>
          <ChevronRight size={10} />
          <span className="text-slate-900">{PRODUCT.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Gallery Side */}
          <div className="flex flex-col gap-8">
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }} 
               className="relative aspect-[4/5] bg-white overflow-hidden rounded-[40px] shadow-2xl border border-slate-100"
            >
              <Image 
                src={PRODUCT.images[activeImage]} 
                alt={PRODUCT.name} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute top-8 left-8">
                 <div className="bg-slate-950 text-white text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-xl">
                    Referencia de Autor
                 </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-3 gap-6">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-500 shadow-sm ${
                    activeImage === idx ? 'border-blue-600 scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${PRODUCT.name} view ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <Typography variant="small" className="text-[10px] font-black">4.9 ({PRODUCT.reviewsCount} Evaluaciones)</Typography>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                   <Building2 size={14} />
                   <Typography variant="small" className="text-[10px] font-black uppercase tracking-widest">{PRODUCT.vendor}</Typography>
                </div>
              </div>

              <div className="space-y-2">
                 <Typography variant="small" className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em]">{PRODUCT.category}</Typography>
                 <Typography variant="h1" className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9]">{PRODUCT.name}</Typography>
              </div>
              
              <div className="flex items-baseline gap-4">
                 <Typography variant="h2" className="text-4xl font-black text-slate-950">${PRODUCT.price.toLocaleString()}</Typography>
                 <Typography variant="body" className="text-slate-400 text-sm line-through">$1,250,000</Typography>
              </div>
            </div>

            <Typography variant="body" className="text-slate-500 leading-relaxed font-light text-base">
              {PRODUCT.description}
            </Typography>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-y-6 py-10 border-y border-slate-100">
               {PRODUCT.specifications.map(spec => (
                 <div key={spec.label} className="space-y-1">
                    <Typography variant="small" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{spec.label}</Typography>
                    <Typography variant="body" className="text-sm font-bold text-slate-900">{spec.value}</Typography>
                 </div>
               ))}
            </div>

            <div className="space-y-12">
              {/* Size Selection */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Typography variant="small" className="text-[10px] font-bold text-slate-950 uppercase tracking-widest">Configuración de Talla</Typography>
                  <button className="text-[9px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                     <Ruler size={14} /> Tabla de Medidas
                  </button>
                </div>
                <div className="flex gap-4">
                  {PRODUCT.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 flex items-center justify-center text-[11px] font-black border-2 transition-all duration-500 rounded-2xl ${
                        selectedSize === size 
                          ? 'bg-slate-950 text-white border-slate-950 shadow-2xl scale-110' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-slate-900 hover:text-slate-900 shadow-sm'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-6">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-[3] bg-blue-600 text-white py-6 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all duration-500 flex items-center justify-center gap-4 group rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                    Formalizar Pedido <ShoppingBag size={14} className="group-hover:rotate-12 transition-transform" />
                  </button>
                  <button className="flex-1 border-2 border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all duration-500 group rounded-2xl flex items-center justify-center bg-white shadow-sm">
                    <Star size={20} className="group-hover:scale-125 transition-transform" strokeWidth={2} />
                  </button>
                </div>
                <Typography variant="small" className="text-slate-400 text-[10px] text-center font-bold uppercase tracking-widest">Identificación Técnica: {PRODUCT.sku}</Typography>
              </div>
            </div>

            {/* Corporate Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 bg-white/50 p-8 rounded-[32px] border border-slate-100">
               <div className="space-y-3">
                 <Truck size={24} className="text-blue-600" />
                 <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest">Logística Industrial</Typography>
                 <Typography variant="body" className="text-[9px] text-slate-500 uppercase font-light">Despacho Nacional Certificado</Typography>
               </div>
               <div className="space-y-3">
                 <RotateCcw size={24} className="text-blue-600" />
                 <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest">Garantía Corporativa</Typography>
                 <Typography variant="body" className="text-[9px] text-slate-500 uppercase font-light">30 días de respaldo técnico</Typography>
               </div>
               <div className="space-y-3">
                 <ShieldCheck size={24} className="text-blue-600" />
                 <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest">Seguridad B2B</Typography>
                 <Typography variant="body" className="text-[9px] text-slate-500 uppercase font-light">Transacción Protegida SSL</Typography>
               </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
