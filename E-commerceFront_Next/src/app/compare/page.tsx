'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { useCompare } from '@/context/CompareContext';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { XIcon as X, ArrowLeftRight, Check, ChevronRight, ShieldCheck } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  const features = [
    { key: 'price', label: 'Inversión' },
    { key: 'vendor', label: 'Manufactura' },
    { key: 'category', label: 'Departamento' },
    { key: 'rating', label: 'Calificación Industrial' },
  ];

  if (compareItems.length === 0) {
    return (
      <main className="min-h-screen bg-background font-sans">
        <Navbar />
        <section className="pt-60 pb-40 px-6 text-center space-y-8 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-muted rounded-[40px] flex items-center justify-center mx-auto text-foreground/20">
             <ArrowLeftRight size={48} />
          </div>
          <div className="space-y-4">
             <Typography variant="h2" className="text-4xl font-black text-foreground tracking-tighter uppercase">Comparativa Vacía</Typography>
             <Typography variant="body" className="text-foreground/60 font-light">Seleccione hasta 4 referencias industriales para realizar un análisis técnico comparativo.</Typography>
          </div>
          <Button label="Explorar Catálogo" href="/shop" variant="primary" className="rounded-xl px-10 py-5 bg-primary uppercase text-[10px] font-bold tracking-widest" />
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-accent/20">
      <Navbar />

      <div className="pt-32 sm:pt-48 pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-border pb-12">
          <div className="space-y-4">
            <Typography variant="small" className="text-accent font-bold uppercase tracking-[0.3em] text-[10px]">Análisis Técnico</Typography>
            <Typography variant="h1" className="text-5xl font-black text-foreground tracking-tighter">Comparativa de Referencias</Typography>
          </div>
          <button 
            onClick={clearCompare}
            className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2"
          >
            <X size={14} /> Reiniciar Análisis
          </button>
        </header>

        {/* Corporate Table - Sticky Header on Desktop */}
        <div className="bg-background rounded-[40px] border border-border shadow-[0_12px_24px_-4px_rgba(42,37,32,0.12)] overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-10 text-left w-64 bg-muted border-r border-border">
                    <Typography variant="small" className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Especificaciones</Typography>
                  </th>
                  {compareItems.map(item => (
                    <th key={item.id} className="p-10 min-w-[280px] relative group border-r border-border last:border-0">
                      <button 
                         onClick={() => removeFromCompare(item.id)}
                         className="absolute top-4 right-4 p-2 bg-muted text-foreground/40 hover:text-accent hover:bg-muted rounded-full transition-all opacity-0 group-hover:opacity-100"
                      >
                         <X size={14} />
                      </button>
                      <div className="space-y-6">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-sm">
                           <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="space-y-2 text-left">
                           <Typography variant="small" className="text-[10px] font-bold text-accent uppercase tracking-widest">{item.vendor}</Typography>
                           <Typography variant="h3" className="text-sm font-black text-foreground uppercase leading-tight">{item.name}</Typography>
                        </div>
                        <Button label="Ver Detalles" href={`/product/${item.slug}`} variant="outline" className="w-full rounded-xl py-3 text-[9px] font-bold uppercase tracking-widest border-border" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={feature.key} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    <td className="p-8 border-r border-border font-bold text-[10px] text-foreground uppercase tracking-widest">
                      {feature.label}
                    </td>
                    {compareItems.map(item => (
                      <td key={`${item.id}-${feature.key}`} className="p-8 text-center border-r border-border last:border-0">
                        {feature.key === 'price' ? (
                          <Typography variant="h4" className="text-lg font-black text-foreground tracking-tighter">
                            ${(item[feature.key as keyof typeof item] as number).toLocaleString()}
                          </Typography>
                        ) : feature.key === 'rating' ? (
                          <div className="flex items-center justify-center gap-2">
                             <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                             <Typography variant="body" className="text-sm font-bold text-foreground">{item.rating || 'N/A'}</Typography>
                          </div>
                        ) : (
                          <Typography variant="body" className="text-sm text-foreground/60 font-medium">
                            {String(item[feature.key as keyof typeof item])}
                          </Typography>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Fixed CTA Row */}
                <tr>
                   <td className="p-8 border-r border-border bg-primary">
                      <Typography variant="small" className="text-[10px] font-bold text-white uppercase tracking-widest">Acción Industrial</Typography>
                   </td>
                   {compareItems.map(item => (
                     <td key={`cta-${item.id}`} className="p-8 bg-primary">
                        <Button label="Añadir a Proyectos" variant="primary" className="w-full rounded-xl py-4 bg-accent font-bold uppercase text-[9px] tracking-widest" />
                     </td>
                   ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Corporate Trust Badge Overlay */}
        <div className="mt-12 flex items-center justify-center gap-12 bg-background/50 backdrop-blur p-8 rounded-[32px] border border-border">
           <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-accent" />
              <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-widest">Garantía de Origen Certificada</Typography>
           </div>
           <div className="h-8 w-px bg-border" />
           <div className="flex items-center gap-3">
              <Check size={20} className="text-accent" />
              <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-widest">Control de Calidad B2B</Typography>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
