'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ProductCard } from '@/components/molecules/ProductCard';
import { XIcon as X, ChevronRight, SlidersHorizontal, LayoutGrid, List } from '@/components/icons';
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
  },
  {
    id: "g1",
      name: "Blazer Imperial Gonzales",
      price: 580000,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
      category: "Sastrería",
      slug: "blazer-imperial-gonzales",
      vendor: "Gonzales & CIA SAS",
      rating: 5.0,
      color: "Negro",
      sizes: ["36", "38", "40", "42"],
      productType: "Blazers"
    }
  ];

const CATEGORIES = ["Todos", "Activewear", "Trends", "Alta Costura", "Gala", "Verano", "Sastrería", "Accesorios"];
const VENDORS = ["Gonzales & CIA SAS", "Babalu.co", "Inexmoda", "Atelier Paris", "Luxe Couture", "Nativa Design"];
const COLORS = ["Negro", "Blanco", "Gris", "Beige", "Azul", "Rojo", "Multicolor"];
const SIZES = ["XS", "S", "M", "L", "XL", "34", "36", "38", "40", "42", "44"];
const PRODUCT_TYPES = ["Pantalones", "Vestidos", "Blazers", "Abrigos", "Conjuntos", "Libros", "Accesorios"];

interface FiltersContentProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedVendor: string;
  setSelectedVendor: (vendor: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onFilterApplied?: () => void;
}

const FiltersContent: React.FC<FiltersContentProps> = ({ 
  selectedCategory, setSelectedCategory,
  selectedColor, setSelectedColor,
  selectedSize, setSelectedSize,
  selectedType, setSelectedType,
  selectedVendor, setSelectedVendor,
  priceRange, setPriceRange,
  onFilterApplied 
}) => (
  <div className="space-y-10 group">
     <div className="flex items-center justify-between">
        <Typography variant="h4" className="text-sm font-extrabold flex items-center gap-2">
          <SlidersHorizontal size={16} /> Filtros de Búsqueda
        </Typography>
        <button 
          onClick={() => { 
            setSelectedCategory('Todos');
            setSelectedColor('Todos');
            setSelectedSize('Todos');
            setSelectedType('Todos');
            setSelectedVendor('Todas');
            setPriceRange([0, 2000000]);
          }} 
          className="text-[10px] text-accent font-bold uppercase hover:underline"
        >
          Limpiar
        </button>
     </div>

    {/* Marcas Aliadas (Directorio) */}
    <div className="space-y-6">
      <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Nuestras Marcas Aliadas</Typography>
      <div className="flex flex-col gap-3">
        {["Todas", ...VENDORS].map(vendor => (
          <button 
            key={vendor} 
            onClick={() => { setSelectedVendor(vendor); onFilterApplied?.(); }}
            className={`text-sm flex justify-between items-center transition-colors py-1 ${
              selectedVendor === vendor ? 'text-accent font-extrabold' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {vendor}
            <ChevronRight size={12} className={selectedVendor === vendor ? 'opacity-100' : 'opacity-0'} />
          </button>
        ))}
      </div>
    </div>

    {/* Tipos de Producto */}
    <div className="space-y-6 pt-6 border-t border-border">
      <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Tipo de Producto</Typography>
      <div className="flex flex-col gap-3">
        {["Todos", ...PRODUCT_TYPES].map(type => (
          <button 
            key={type} 
            onClick={() => { setSelectedType(type); onFilterApplied?.(); }}
            className={`text-sm flex justify-between items-center transition-colors py-1 ${
              selectedType === type ? 'text-accent font-extrabold' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {type}
            <span className="text-[9px] bg-muted text-foreground/40 px-2 py-0.5 rounded-full font-bold">8</span>
          </button>
        ))}
      </div>
    </div>

    {/* Colores */}
    <div className="space-y-6 pt-6 border-t border-border">
      <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Color</Typography>
      <div className="flex flex-wrap gap-2">
        {["Todos", ...COLORS].map(color => (
          <button 
            key={color} 
            onClick={() => { setSelectedColor(color); onFilterApplied?.(); }}
            className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${
              selectedColor === color 
                ? 'bg-accent text-background' 
                : 'bg-muted text-foreground/60 hover:bg-muted/80'
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>

    {/* Rango de Precio */}
    <div className="space-y-6 pt-6 border-t border-border">
      <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Rango de Precio</Typography>
      <div className="space-y-4">
         <div className="space-y-2">
           <input 
             type="range" 
             min="0" 
             max="2000000" 
             value={priceRange[1]}
             onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
             className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-accent" 
           />
           <div className="flex justify-between text-[9px] font-bold text-foreground bg-muted px-3 py-2 rounded-lg">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
           </div>
         </div>
      </div>
    </div>

    {/* Tallas */}
    <div className="space-y-6 pt-6 border-t border-border">
      <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Talla</Typography>
      <div className="flex flex-wrap gap-2">
        {["Todos", ...SIZES].map(size => (
          <button 
            key={size} 
            onClick={() => { setSelectedSize(size); onFilterApplied?.(); }}
            className={`text-[9px] font-bold uppercase tracking-wider w-10 h-10 rounded-lg transition-all flex items-center justify-center ${
              selectedSize === size 
                ? 'bg-accent text-background' 
                : 'bg-muted text-foreground/60 hover:bg-muted/80 border border-border'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

    {/* Departamentos */}
    <div className="space-y-6 pt-6 border-t border-border">
      <Typography variant="small" className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Departamentos</Typography>
      <div className="flex flex-col gap-3">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            onClick={() => { setSelectedCategory(cat); onFilterApplied?.(); }}
            className={`text-sm flex justify-between items-center transition-colors py-1 ${
              selectedCategory === cat ? 'text-accent font-extrabold' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {cat}
            <span className="text-[9px] bg-muted text-foreground/40 px-2 py-0.5 rounded-full font-bold">12</span>
          </button>
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
  const [selectedColor, setSelectedColor] = useState("Todos");
  const [selectedSize, setSelectedSize] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedVendor, setSelectedVendor] = useState(vendorParam || "Todas");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(p => {
    // Category Filter
    if (selectedCategory !== "Todos" && p.category !== selectedCategory) return false;
    
    // Color Filter
    if (selectedColor !== "Todos" && p.color !== selectedColor) return false;

    // Size Filter
    if (selectedSize !== "Todos" && !p.sizes.includes(selectedSize)) return false;

    // Product Type Filter
    if (selectedType !== "Todos" && p.productType !== selectedType) return false;

    // Price Range Filter
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    
    // Vendor Filter
    if (selectedVendor !== "Todas" && p.vendor !== selectedVendor) return false;
    if (vendorParam && p.vendor !== vendorParam && selectedVendor === "Todas") return false;

    // Filter Badges
    if (filterParam === 'wholesale' && !p.isWholesale) return false;
    
    return true;
  });

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-accent/20">
      <Navbar />
      
      <div className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
        <header className="mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase text-foreground/40 font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
            <ChevronRight size={8} className="sm:size-2.5 md:size-3" />
            <span className="text-foreground">Catálogo General</span>
            {(vendorParam || filterParam) && (
              <>
                <ChevronRight size={8} className="sm:size-2.5 md:size-3" />
                <span className="text-accent line-clamp-1">{vendorParam || filterParam}</span>
              </>
            )}
          </nav>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 md:gap-6 border-b border-border pb-6 sm:pb-8 md:pb-10">
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
               <Typography variant="h2" className="text-foreground">Explorar</Typography>
               <Typography variant="body" className="text-[10px] sm:text-xs md:text-sm text-foreground/60 font-light">Colecciones de autor y referencias.</Typography>
            </div>
            <Typography variant="body" className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-foreground/40 uppercase tracking-widest whitespace-nowrap">{filteredProducts.length} Referencias</Typography>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Filters Sidebar - Desktop (Hidden until lg) */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="bg-background p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[32px] border border-border shadow-sm sticky top-24 sm:top-32 md:top-48">
                <FiltersContent 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  selectedVendor={selectedVendor}
                  setSelectedVendor={setSelectedVendor}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
             </div>
          </aside>

          {/* Product Feed */}
          <section className="lg:col-span-9 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Toolbar */}
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 shadow-sm">
               <div className="flex gap-1.5 sm:gap-2 md:gap-3 w-full sm:w-auto flex-wrap">
                  <button 
                    onClick={() => setIsFilterDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 sm:gap-2 bg-primary text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-lg"
                  >
                    <SlidersHorizontal size={12} className="sm:size-3.5 md:size-3.5" /> Filtrar
                  </button>
                  
                  <select className="text-xs bg-muted border-none rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold text-foreground/60 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 outline-none focus:ring-2 focus:ring-accent/10 cursor-pointer">
                     <option>Ordenar por: Relevancia</option>
                     <option>Precio: Menor a Mayor</option>
                     <option>Precio: Mayor a Menor</option>
                     <option>Más Recientes</option>
                  </select>
               </div>
               
               <div className="hidden xs:flex items-center gap-1 sm:gap-2 border-l border-slate-100 pl-3 sm:pl-4 md:pl-6">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    <LayoutGrid size={14} className="sm:size-4 md:size-4.5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    <List size={14} className="sm:size-4 md:size-4.5" />
                  </button>
               </div>
            </div>

            {/* Product Grid - 2 columns until lg */}
            <div className={`grid gap-3 sm:gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
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
               className="fixed inset-0 bg-foreground/30 z-[80]"
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
                  <FiltersContent 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedVendor={selectedVendor}
                    setSelectedVendor={setSelectedVendor}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onFilterApplied={() => setIsFilterDrawerOpen(false)}
                  />
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
