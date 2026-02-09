'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, ArrowLeftRight, Store, ChevronDown, ChevronRight, Sparkles, Tag, Building2, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { useCompare } from '@/context/CompareContext';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { CartDrawer } from './CartDrawer';

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useUser();
  const { compareItems } = useCompare();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const catalogSubgroups = [
    { name: 'Mujer', links: ['Vestidos', 'Blusas', 'Calzado', 'Accesorios'] },
    { name: 'Hombre', links: ['Sastrería', 'Camisas', 'Calzado', 'Relojería'] },
    { name: 'Infantil', links: ['Gala', 'Casual', 'Recién Nacido'] }
  ];

  const vendors = [
    { name: 'Babalu.co', slug: 'babalu', description: 'Activewear & Fitness' },
    { name: 'Inexmoda', slug: 'inexmoda', description: 'Fashion Institute & Trends' },
    { name: 'Atelier Paris', slug: 'atelier-paris', description: 'Alta Costura' },
    { name: 'Luxe Couture', slug: 'luxe-couture', description: 'Premium Gala' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-[0_2px_8px_0_rgba(42,37,32,0.08)] transition-all duration-300">
      {/* Top Utility Bar - Hidden on mobile */}
      <div className="hidden sm:flex bg-primary py-2 sm:py-2.5 px-4 sm:px-6 md:px-12 justify-between items-center text-white gap-4 text-[8px] sm:text-[9px]">
        <p className="tracking-widest uppercase font-bold text-white/70 whitespace-nowrap">
           Soporte: <span className="text-white">+57 300 000 0000</span>
        </p>
        <div className="flex gap-3 sm:gap-6 ml-auto">
           <Link href="/seller-onboarding" className="tracking-widest uppercase font-bold hover:text-accent transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap">
             <Building2 size={10} /> <span className="hidden sm:inline">Ser Vendedor</span>
           </Link>
           <Link href="/help" className="tracking-widest uppercase font-bold hover:text-accent transition-colors hidden xs:block">Ayuda</Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4 sm:gap-10 transition-all duration-300 ${isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'}`}>
        
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
           <div className="w-6 sm:w-8 h-6 sm:h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif text-lg sm:text-xl flex-shrink-0">G</div>
           <Typography variant="h4" className="text-sm sm:text-lg md:text-xl text-foreground font-black tracking-tight sm:tracking-tighter uppercase whitespace-nowrap">
             Gonzales<span className="text-accent font-light lowercase tracking-normal text-xs sm:text-sm md:text-base">Market</span>
           </Typography>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
           <Link href="/" className="nav-link-v3">Inicio</Link>
           
           {/* Dropdown: Catálogo */}
           <div 
             className="relative group h-full flex items-center"
             onMouseEnter={() => setActiveDropdown('catalog')}
             onMouseLeave={() => setActiveDropdown(null)}
           >
              <button className="nav-link-v3 flex items-center gap-1.5 group-hover:text-accent">
                Catálogo <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'catalog' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'catalog' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[600px] bg-background shadow-[0_12px_24px_-4px_rgba(42,37,32,0.12)] rounded-2xl p-8 border border-border grid grid-cols-3 gap-8 overflow-hidden"
                  >
                    {catalogSubgroups.map(group => (
                      <div key={group.name} className="space-y-4">
                        <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{group.name}</Typography>
                        <div className="flex flex-col gap-3">
                          {group.links.map(link => (
                            <Link key={link} href={`/shop?category=${link}`} className="text-sm text-foreground/60 hover:text-accent font-medium transition-colors">
                              {link}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="col-span-3 pt-6 mt-6 border-t border-border">
                       <Link href="/shop" className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                         Ver todo el catálogo <ArrowRight size={12} />
                       </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           {/* Dropdown: Multivendedor */}
           <div 
             className="relative group h-full flex items-center"
             onMouseEnter={() => setActiveDropdown('vendors')}
             onMouseLeave={() => setActiveDropdown(null)}
           >
              <button className="nav-link-v3 flex items-center gap-1.5 group-hover:text-accent">
                Multivendedor <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'vendors' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'vendors' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-background shadow-[0_12px_24px_-4px_rgba(42,37,32,0.12)] rounded-2xl p-6 border border-border space-y-4"
                  >
                    <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Directorio de Ateliers</Typography>
                    <div className="grid grid-cols-1 gap-2">
                       {vendors.map(vendor => (
                         <Link 
                           key={vendor.slug} 
                           href={`/shop?vendor=${vendor.name}`} 
                           className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group/item"
                         >
                            <div>
                               <Typography variant="h4" className="text-sm font-bold text-foreground">{vendor.name}</Typography>
                               <Typography variant="small" className="text-[10px] text-foreground/40">{vendor.description}</Typography>
                            </div>
                            <ChevronRight size={14} className="text-foreground/20 group-hover/item:text-accent pr-2" />
                         </Link>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           <Link href="/shop?filter=new" className="nav-link-v3 flex items-center gap-2">
              <Sparkles size={14} className="text-accent" /> Nuevas Colecciones
           </Link>
           <Link href="/shop?filter=wholesale" className="nav-link-v3">Mayoristas</Link>
           <Link href="/shop?filter=outlet" className="nav-link-v3 text-accent/80 font-bold flex items-center gap-2">
              <Tag size={14} /> Outlet
           </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 text-foreground/60">
           <div className="relative hidden xl:block">
              <input 
                 type="text" 
                 placeholder="Búsqueda profesional..." 
                 className="bg-muted border-border border rounded-xl py-2 px-4 pl-10 text-xs w-[200px] focus:w-[300px] transition-all outline-none focus:ring-2 focus:ring-accent/20" 
              />
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
           </div>

           <Link href="/compare" className="nav-icon-btn relative">
              <ArrowLeftRight size={18} strokeWidth={1.5} />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-[8px] w-4 h-4 flex items-center justify-center text-white font-bold rounded-full">{compareItems.length}</span>
              )}
           </Link>

           <Link href="/profile" className="nav-icon-btn hidden xs:flex">
              <User size={18} strokeWidth={1.5} />
           </Link>

           <button onClick={() => setIsCartOpen(true)} className="nav-icon-btn relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-[8px] w-4 h-4 flex items-center justify-center text-white font-bold rounded-full">{totalItems}</span>
              )}
           </button>

           <button className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
           </button>
          
           {/* Theme toggle */}
           <button
             onClick={toggleTheme}
             aria-pressed={theme === 'dark'}
             title={theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}
             className="p-2 hover:bg-muted rounded-xl transition-colors"
           >
             {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
           </button>
        </div>
      </div>

      {/* Mobile Drawer - Redesigned for Corporate Structure */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.5 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileMenuOpen(false)}
               className="fixed inset-0 bg-foreground/20 z-[90]"
            />
            <motion.div
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 200 }}
               className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-[100] p-8 flex flex-col font-sans"
            >
               <div className="flex justify-between items-center mb-10">
                  <Typography variant="h3" className="text-xl font-black uppercase tracking-tighter">Gonzales<span className="text-accent">Market</span></Typography>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
               </div>

               <div className="flex-1 space-y-12">
                  <div className="space-y-4">
                     <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Navegación Principal</Typography>
                     <div className="grid grid-cols-1 gap-2">
                        <Link href="/" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
                        <Link href="/shop" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</Link>
                        <Link href="/shop?filter=new" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Nuevas Colecciones</Link>
                        <Link href="/shop?filter=wholesale" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Mayoristas</Link>
                        <Link href="/shop?filter=outlet" className="mob-nav-link text-accent/80" onClick={() => setIsMobileMenuOpen(false)}>Outlet</Link>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Nuestros Ateliers</Typography>
                     <div className="grid grid-cols-1 gap-1">
                        {vendors.map(v => (
                          <Link key={v.slug} href={`/shop?vendor=${v.name}`} className="text-sm font-bold text-foreground py-3 block border-b border-border last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
                            {v.name}
                          </Link>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-border flex flex-col gap-4">
                  <Button label="Iniciar Sesión" href="/login" variant="outline" className="w-full rounded-xl py-4" />
                  <Button label="Ser un Vendedor" href="/seller-onboarding" variant="primary" className="w-full rounded-xl py-4" />
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer />

      <style jsx>{`
        .nav-link-v3 {
          @apply text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors h-full flex items-center px-2;
        }
        .nav-icon-btn {
          @apply p-2.5 hover:bg-muted rounded-xl transition-all flex items-center justify-center;
        }
        .mob-nav-link {
          @apply text-xl font-bold text-foreground py-2 block border-b-2 border-transparent hover:border-accent transition-all;
        }
      `}</style>
    </nav>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
