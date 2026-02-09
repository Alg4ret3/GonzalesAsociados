'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeftRight, Heart, XIcon as X } from '@/components/icons';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import type { CompareItem } from '@/context/CompareContext';
import { Typography } from '@/components/atoms/Typography';
import { AddToCartModal } from '@/components/organisms/AddToCartModal';
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
  color?: string;
  colors?: string[];
  sizes?: string[];
  productType?: string;
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
  isWholesale = false,
  color,
  colors,
  sizes,
  productType
}) => {
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const alreadyInCompare = isInCompare(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="group bg-background border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_rgba(42,37,32,0.12)] transition-all duration-500 flex flex-col h-full font-sans">
      {/* Visual Workspace */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quality/Type Badge */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
           {isWholesale && (
             <span className="bg-primary text-white text-[7px] sm:text-[9px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-widest shadow-lg">Mayorista</span>
           )}
           <span className="bg-background/90 backdrop-blur text-foreground text-[7px] sm:text-[9px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-widest shadow-sm border border-border">{category}</span>
        </div>

        {/* Quick Interaction Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
        {alreadyInCompare && (
          <button
            onClick={() => removeFromCompare(id)}
            className="absolute top-2 right-2 sm:hidden bg-background text-foreground/60 p-1.5 rounded-full shadow-md z-20"
            aria-label="Eliminar de comparación"
          >
            <X size={14} />
          </button>
        )}
        
        <div className="absolute bottom-3 sm:bottom-6 inset-x-3 sm:inset-x-6 translate-y-0 opacity-100 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 flex gap-1 sm:gap-2">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex-1 bg-foreground text-background text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl hover:bg-accent transition-all flex items-center justify-center gap-1 sm:gap-2"
           >
             <ShoppingBag size={12} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Añadir</span>
           </button>
           <button
             onClick={() => {
               const compareItem: CompareItem = { id, name, price, image, category, slug, vendor: vendor ?? 'Gonzales Market', rating };
               if (alreadyInCompare) {
                 removeFromCompare(id);
               } else {
                 addToCompare(compareItem);
               }
             }}
             className={`p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-2xl transition-all ${alreadyInCompare ? 'bg-accent text-white' : 'bg-background text-foreground hover:bg-muted'}`}
           >
             <ArrowLeftRight size={12} className="sm:w-4 sm:h-4" />
           </button>
        </div>
      </div>

      {/* Corporate Metadata */}
      <div className="p-3 sm:p-6 flex flex-col flex-1 justify-between gap-3 sm:gap-4">
        <div className="space-y-2 sm:space-y-3">
           <div className="flex items-center justify-between gap-2">
              <span className="text-[8px] sm:text-[10px] font-bold text-accent uppercase tracking-widest bg-muted px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">{vendor}</span>
              <div className="flex items-center gap-0.5 sm:gap-1 text-foreground/40 flex-shrink-0">
                 <Star size={10} fill="currentColor" className="text-accent" />
                 <span className="text-[8px] sm:text-[10px] font-bold text-foreground">{rating}</span>
              </div>
           </div>
           <Link href={`/product/${slug}`}>
              <Typography variant="h3" className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                {name}
              </Typography>
           </Link>
        </div>
        
        <div className="pt-2 sm:pt-4 border-t border-border flex items-center justify-between gap-2">
          <Typography variant="h3" className="text-base sm:text-lg font-black text-foreground tracking-tighter">
            ${price.toLocaleString()}
          </Typography>
          <div className="text-[7px] sm:text-[9px] text-foreground/40 font-bold uppercase tracking-widest whitespace-nowrap">
            Disponible
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          id,
          name,
          price,
          image,
          slug,
          category,
          vendor,
          color,
          colors,
          sizes
        }}
      />
    </div>
  );
};
