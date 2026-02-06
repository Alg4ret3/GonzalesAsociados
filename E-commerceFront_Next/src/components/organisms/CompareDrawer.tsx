'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight, Trash2, ChevronRight } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { Typography } from '@/components/atoms/Typography';
import Image from 'next/image';
import Link from 'next/link';

export const CompareDrawer: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 pointer-events-none font-sans">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 pointer-events-auto"
      >
        <div className="flex items-center gap-4 border-r border-slate-100 pr-6 mr-2 hidden md:flex">
          <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center">
             <ArrowLeftRight size={20} />
          </div>
          <div>
            <Typography variant="h4" className="text-[11px] font-bold text-slate-900">Comparar Productos</Typography>
            <Typography variant="small" className="text-[9px] text-slate-400">{compareItems.length} seleccionados</Typography>
          </div>
        </div>

        <div className="flex-1 flex gap-3 overflow-x-auto no-scrollbar py-1">
          {compareItems.map(item => (
            <div key={item.id} className="relative w-14 h-14 flex-shrink-0 bg-slate-50 rounded-lg border border-slate-100 group">
               <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
               <button 
                 onClick={() => removeFromCompare(item.id)}
                 className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-red-500 shadow-sm border border-slate-100 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <X size={10} />
               </button>
            </div>
          ))}
          {[...Array(4 - compareItems.length)].map((_, i) => (
            <div key={i} className="w-14 h-14 border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center text-slate-200">
               <span className="text-[20px]">+</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
          <button 
            onClick={clearCompare}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500"
          >
            Limpiar
          </button>
          <Link href="/compare">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all">
               Comparar Ahora <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
