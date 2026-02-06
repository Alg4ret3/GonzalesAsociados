'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Search, Filter, X, ChevronRight, SlidersHorizontal, LayoutGrid, List, ArrowRight, Tag, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const PRODUCTS = [
  {
    id: "b1",
    name: "Leggins Pro-Compression",
    price: 185000,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
    category: "Activewear",
    slug: "leggins-pro-compression",
    vendor: "Babalu.co",
    rating: 4.9,
    isWholesale: true
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
  },
  {
    id: "1",
    name: "Gabardina Velvet Imperial",
    price: 450000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    category: "Alta Costura",
    slug: "gabardina-velvet-imperial",
    vendor: "Atelier Paris",
    rating: 4.9
  },
  {
    id: "2",
    name: "Vestido Seda Medianoche",
    price: 890000,
    image: "https://images.unsplash.com/photo-1539109132314-d4959a531295?q=80&w=1000&auto=format&fit=crop",
    category: "Gala",
    slug: "vestido-seda-medianoche",
    vendor: "Luxe Couture",
    rating: 5.0
  },
  {
    id: "3",
    name: "Conjunto Lino Arena",
    price: 380000,
    image: "https://images.unsplash.com/photo-1523381235212-d7224779518d?q=80&w=1000&auto=format&fit=crop",
    category: "Verano",
    slug: "conjunto-lino-arena",
    vendor: "Nativa Design",
    rating: 4.7
  },
  {
    id: "4",
    name: "Blazer Noir Premium",
    price: 520000,
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1000&auto=format&fit=crop",
    category: "Sastrería",
    slug: "blazer-noir-premium",
    vendor: "Atelier Paris",
    rating: 4.8
  },
  {
    id: "5",
    name: "Pantalón Sastre Gris",
    price: 280000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    category: "Sastrería",
    slug: "pantalon-sastre-gris",
    vendor: "Studio 10",
    rating: 4.5
  }
];

const CATEGORIES = ["Todos", "Activewear", "Trends", "Alta Costura", "Gala", "Verano", "Sastrería", "Accesorios"];
const VENDORS = ["Babalu.co", "Inexmoda", "Atelier Paris", "Luxe Couture", "Nativa Design"];

interface FiltersContentProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onFilterApplied?: () => void;
}

const FiltersContent: React.FC<FiltersContentProps> = ({ selectedCategory, setSelectedCategory, onFilterApplied }) => (
  <div className="space-y-10 group">
    <div className="flex items-center justify-between">
       <Typography variant="h4" className="text-sm font-extrabold flex items-center gap-2">
         <SlidersHorizontal size={16} /> Filtros Corporativos
       </Typography>
       <button onClick={() => setSelectedCategory('Todos')} className="text-[10px] text-blue-600 font-bold uppercase hover:underline">Limpiar</button>
    </div>

    <div className="space-y-6">
      <Typography variant="small" className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Departamentos</Typography>
      <div className="flex flex-col gap-3">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            onClick={() => { setSelectedCategory(cat); onFilterApplied?.(); }}
            className={`text-sm flex justify-between items-center transition-colors py-1 ${
              selectedCategory === cat ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {cat}
            <span className="text-[9px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-bold">12</span>
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-6 pt-6 border-t border-slate-100">
      <Typography variant="small" className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Rango de Precio</Typography>
      <div className="space-y-4">
         <input type="range" className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
         <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span>$0</span>
            <span>$2.000.000+</span>
         </div>
      </div>
    </div>

    <div className="space-y-6 pt-6 border-t border-slate-100">
      <Typography variant="small" className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em]">Aliados Industriales</Typography>
      <div className="flex flex-col gap-3">
         {VENDORS.map(vendor => (
           <label key={vendor} className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer hover:text-blue-600 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-600" />
               {vendor}
           </label>
         ))}
      </div>
    </div>
  </div>
);

function ShopContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');
  const vendorParam = searchParams.get('vendor');
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "Todos");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Corporate Filter Logic
  const filteredProducts = PRODUCTS.filter(p => {
    // Category Filter
    if (selectedCategory !== "Todos" && p.category !== selectedCategory) return false;
    
    // Vendor Filter
    if (vendorParam && p.vendor !== vendorParam) return false;

    // Filter Badges (New, Wholesale, Outlet)
    if (filterParam === 'wholesale' && !p.isWholesale) return false;
    // Note: Add 'isOutlet' or 'isNew' to mock data later if needed, 
    // for now we'll just filter what we have.
    
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <Navbar />
      
      <div className="pt-32 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-12 max-w-[1400px] mx-auto">
        <header className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          <nav className="flex items-center gap-2 text-[9px] sm:text-[10px] tracking-widest uppercase text-slate-400 font-bold">
            <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <ChevronRight size={10} />
            <span className="text-slate-900">Catálogo Corporativo</span>
            {(vendorParam || filterParam) && (
              <>
                <ChevronRight size={10} />
                <span className="text-blue-600">{vendorParam || filterParam}</span>
              </>
            )}
          </nav>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 border-b border-slate-100 pb-10">
            <div className="space-y-2">
               <Typography variant="h2" className="text-4xl font-black text-slate-950 tracking-tighter">Explorar Portafolio</Typography>
               <Typography variant="body" className="text-sm text-slate-500 font-light">Acceso directo a referencias industriales y colecciones de autor.</Typography>
            </div>
            <Typography variant="body" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filteredProducts.length} Referencias Disponibles</Typography>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm sticky top-48">
                <FiltersContent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
             </div>
          </aside>

          {/* Product Feed */}
          <section className="lg:col-span-9 space-y-8">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
               <div className="flex gap-3">
                  <button 
                    onClick={() => setIsFilterDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg"
                  >
                    <SlidersHorizontal size={14} /> Filtrar
                  </button>
                  
                  <select className="bg-slate-50 border-none rounded-xl text-[10px] font-bold text-slate-600 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-600/10 cursor-pointer">
                     <option>Ordenar por: Relevancia</option>
                     <option>Precio: Menor a Mayor</option>
                     <option>Precio: Mayor a Menor</option>
                     <option>Más Recientes</option>
                  </select>
               </div>
               
               <div className="hidden xs:flex items-center gap-2 border-l border-slate-100 pl-6">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    <List size={18} />
                  </button>
               </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            
            {/* Paging / Load More - Professional Style */}
            <div className="pt-20 text-center">
               <button className="bg-white border border-slate-200 text-slate-950 px-12 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                  Cargar Más Referencias
               </button>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsFilterDrawerOpen(false)}
               className="fixed inset-0 bg-slate-900 z-[80]"
            />
            <motion.div
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 200 }}
               className="fixed inset-x-0 bottom-0 top-[10%] bg-white z-[90] rounded-t-[48px] shadow-2xl overflow-hidden flex flex-col"
            >
               <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                  <Typography variant="h3" className="text-xl font-black text-slate-950 uppercase tracking-tighter">Parámetros de Búsqueda</Typography>
                  <button onClick={() => setIsFilterDrawerOpen(false)} className="p-3 bg-slate-50 text-slate-400 rounded-full hover:text-slate-950 transition-colors">
                     <X size={20} />
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto p-10 pt-6 no-scrollbar">
                  <FiltersContent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onFilterApplied={() => setIsFilterDrawerOpen(false)} />
               </div>
               <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                  <Button label={`Mostrar Resultados`} onClick={() => setIsFilterDrawerOpen(false)} variant="primary" className="flex-1 rounded-2xl py-5 bg-slate-950" />
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold uppercase tracking-widest text-[10px]">Cargando Inventario...</div>}>
      <ShopContent />
    </Suspense>
  );
}
