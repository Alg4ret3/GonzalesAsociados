'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeftRight, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { Typography } from '@/components/atoms/Typography';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  vendor?: string;
  rating?: number;
  isWholesale?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
  slug,
  vendor = "Gonzales Market",
  rating = 4.8,
  isWholesale = false
}) => {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useCompare();
  const alreadyInCompare = isInCompare(id);

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full font-sans">
      {/* Visual Workspace */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quality/Type Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {isWholesale && (
             <span className="bg-slate-900 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Mayorista</span>
           )}
           <span className="bg-white/90 backdrop-blur text-slate-950 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm border border-slate-100">{category}</span>
        </div>

        {/* Quick Interaction Overlay */}
        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors duration-500" />
        
        <div className="absolute bottom-6 inset-x-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
           <button 
             onClick={() => addToCart({ id, name, price, image, quantity: 1, slug, category, vendor })}
             className="flex-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-xl shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
           >
             <ShoppingBag size={14} /> Añadir
           </button>
           <button 
             onClick={() => addToCompare({ id, name, price, image, category, vendor, slug, rating })}
             className={`p-4 rounded-xl shadow-2xl transition-all ${alreadyInCompare ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
           >
             <ArrowLeftRight size={14} />
           </button>
        </div>
      </div>

      {/* Corporate Metadata */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-3">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">{vendor}</span>
              <div className="flex items-center gap-1 text-slate-400">
                 <Star size={10} fill="currentColor" className="text-blue-500" />
                 <span className="text-[10px] font-bold text-slate-900">{rating}</span>
              </div>
           </div>
           <Link href={`/product/${slug}`}>
              <Typography variant="h3" className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                {name}
              </Typography>
           </Link>
        </div>
        
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <Typography variant="h3" className="text-lg font-black text-slate-950 tracking-tighter">
            ${price.toLocaleString()}
          </Typography>
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            Disponibilidad Inmediata
          </div>
        </div>
      </div>
    </div>
  );
};
