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
import { ArrowRight, ShieldCheck, Trophy, Target, TrendingUp, Globe, Briefcase, ChevronRight } from 'lucide-react';

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
    rating: 4.9
  },
  {
    id: "i1",
    name: "Informe de Tendencias 2026",
    price: 450000,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000&auto=format&fit=crop",
    category: "Trends",
    slug: "informe-tendencias-2026",
    vendor: "Inexmoda",
    rating: 5.0
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />
      
      {/* Corporate Hero - Sophisticated & Sturdy */}
      <section className="pt-48 pb-24 px-6 sm:px-12 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-full">
               <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
               <Typography variant="small" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Plataforma B2B & B2C Certificada</Typography>
            </div>
            <Typography variant="h1" className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tighter">
              Infraestructura <br /> <span className="text-blue-500">Digital</span> para la moda.
            </Typography>
            <Typography variant="body" className="text-lg sm:text-xl text-slate-400 font-light max-w-xl leading-relaxed">
              Conectamos fabricantes líderes como Babalu.co y centros de inteligencia como Inexmoda con el mercado global. Eficiencia, seguridad y curaduría industrial.
            </Typography>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button label="Directorio de Ateliers" href="/shop" variant="primary" className="rounded-xl px-10 py-5 bg-blue-600 hover:bg-blue-700 font-bold uppercase tracking-widest text-[11px]" />
              <Button label="Servicios Corporativos" href="/contact" variant="outline" className="rounded-xl px-10 py-5 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-[11px]" />
            </div>
          </div>
          <div className="hidden lg:block relative">
             <div className="relative aspect-square bg-slate-900 rounded-[60px] overflow-hidden border border-white/10">
                <Image 
                   src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
                   alt="Corporate Fashion" 
                   fill 
                   className="object-cover opacity-80"
                />
             </div>
             {/* Floating Badge */}
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl space-y-4 max-w-[280px]">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Trophy size={24} /></div>
                   <Typography variant="h4" className="text-xs font-black uppercase text-slate-950">Líder en Exportación</Typography>
                </div>
                <Typography variant="body" className="text-[11px] text-slate-500 leading-relaxed font-medium">Validado por estándares internacionales de logística de moda.</Typography>
             </div>
          </div>
        </div>
      </section>

      {/* Industrial Alliances Section (Babalu, Inexmoda) */}
      <section className="py-32 px-6 sm:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-slate-100 pb-10">
           <div className="space-y-4">
              <Typography variant="small" className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Alianzas Estratégicas</Typography>
              <Typography variant="h2" className="text-4xl font-black text-slate-950 tracking-tighter">Multivendedor Corporate</Typography>
           </div>
           <Typography variant="body" className="text-slate-500 max-w-md text-sm leading-relaxed font-light">
             Descubra las operativas de nuestros aliados principales. Desde manufactura deportiva hasta inteligencia de mercados.
           </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {FEATURED_VENDORS.map((vendor) => (
            <div key={vendor.name} className="group relative bg-slate-50 rounded-[40px] p-10 flex flex-col sm:flex-row gap-10 hover:bg-white hover:shadow-2xl transition-all duration-700 border border-transparent hover:border-slate-100 overflow-hidden">
               <div className="relative w-full sm:w-48 aspect-square flex-shrink-0 rounded-3xl overflow-hidden border border-slate-200">
                  <Image src={vendor.image} alt={vendor.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>
               <div className="flex flex-col justify-between py-2 space-y-6">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-sm tracking-tighter">{vendor.logo}</div>
                        <Typography variant="h3" className="text-2xl font-black text-slate-950">{vendor.name}</Typography>
                     </div>
                     <Typography variant="body" className="text-slate-500 text-sm leading-relaxed font-light">{vendor.description}</Typography>
                  </div>
                  <div className="flex flex-wrap gap-4">
                     <div className="bg-white px-4 py-2 rounded-xl border border-slate-200">
                        <Typography variant="small" className="text-[10px] font-bold text-slate-900 uppercase">{vendor.specialty}</Typography>
                     </div>
                     <div className="bg-blue-600 px-4 py-2 rounded-xl">
                        <Typography variant="small" className="text-[10px] font-bold text-white uppercase">{vendor.stats}</Typography>
                     </div>
                  </div>
                  <Link href={`/shop?vendor=${vendor.name}`} className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:translate-x-2 transition-transform pt-4">Explorar Referencias <ChevronRight size={14} /></Link>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured References (References from Babalu/Inexmoda) */}
      <section className="py-32 px-6 sm:px-12 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-16 flex justify-between items-end">
             <Typography variant="h2" className="text-3xl font-black text-slate-950 tracking-tighter">Últimas Referencias</Typography>
             <Link href="/shop" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">Portafolio Completo</Link>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {RECENT_REFERENCES.map(ref => (
               <ProductCard key={ref.id} {...ref} />
             ))}
             {/* Dynamic placeholders for others */}
             <div className="hidden lg:flex bg-white/40 border-2 border-dashed border-slate-200 rounded-3xl items-center justify-center p-10 flex-col gap-6 text-center group hover:bg-white transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-300 group-hover:text-blue-600 transition-colors"><Target size={32} /></div>
                <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ver Nuevas Colecciones</Typography>
             </div>
             <div className="hidden lg:flex bg-slate-900 rounded-3xl p-10 flex-col justify-end gap-6 text-white relative overflow-hidden">
                <div className="space-y-2 relative z-10">
                   <Typography variant="h4" className="text-xl font-bold tracking-tight">Acceso Mayorista</Typography>
                   <Typography variant="body" className="text-[10px] text-slate-400 uppercase tracking-widest">Catálogo Volumétrico</Typography>
                </div>
                <Button label="Solicitar Registro" href="/seller-onboarding" variant="primary" className="w-full rounded-xl py-4 bg-blue-600 text-[10px] relative z-10" />
                <Briefcase className="absolute -top-10 -right-10 text-white/5" size={240} />
             </div>
          </div>
        </div>
      </section>

      {/* Business Stats Section */}
      <section className="py-32 px-6 sm:px-12 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
           {CORPORATE_STATS.map(stat => (
             <div key={stat.label} className="space-y-4 text-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600"><stat.icon size={26} /></div>
                <div className="space-y-1">
                   <Typography variant="h3" className="text-4xl font-black text-slate-950 tracking-tighter">{stat.value}</Typography>
                   <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</Typography>
                </div>
             </div>
           ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
