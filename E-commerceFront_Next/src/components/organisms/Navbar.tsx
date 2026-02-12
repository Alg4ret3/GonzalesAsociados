'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, UserIcon as User, SearchIcon as Search, MenuIcon as Menu, XIcon as X, ArrowLeftRight, ChevronDown, ChevronRight, Building2 } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useCompare } from '@/context/CompareContext';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { CartDrawer } from './CartDrawer';

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

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isCatalogExpanded, setIsCatalogExpanded] = useState(false);
  const [isVendorsExpanded, setIsVendorsExpanded] = useState(false);
  
  const { totalItems, setIsCartOpen } = useCart();
  const { compareItems } = useCompare();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-[0_2px_8px_0_rgba(42,37,32,0.08)] transition-all duration-300">
      {/* Top Utility Bar - Hidden on mobile/tablet */}
      <div className="hidden lg:flex bg-primary py-2 sm:py-2.5 px-4 sm:px-6 md:px-12 justify-between items-center text-white gap-4 text-[8px] sm:text-[9px]">
        <p className="tracking-widest uppercase font-bold text-white/70 whitespace-nowrap">
           Soporte: <span className="text-white">+57 300 000 0000</span>
        </p>
        <div className="flex gap-3 sm:gap-6 ml-auto">
           <a href="https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20ser%20vendedor%20de%20Gonzales%20&%20Asociados" target="_blank" rel="noopener noreferrer" className="tracking-widest uppercase font-bold hover:text-accent transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap">
             <Building2 size={10} /> <span className="hidden sm:inline">Ser Vendedor</span>
           </a>
           <Link href="/help" className="tracking-widest uppercase font-bold hover:text-accent transition-colors hidden xs:block">Ayuda</Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3 sm:gap-8 transition-all duration-300 ${isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'}`}>
        
        {/* Mobile Menu Button - LEFT SIDE */}
        <button className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors order-first" onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menú">
           <Menu size={20} />
        </button>

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2 sm:gap-3">
           <div className="w-7 sm:w-9 h-7 sm:h-9 shrink-0">
             <img src="/assets/logo.svg" alt="Gonzales & CIA SAS" className="w-full h-full object-contain" />
           </div>
           <Typography variant="h4" className="text-xs sm:text-sm md:text-base text-foreground font-black tracking-tight uppercase whitespace-nowrap">
             Gonzales <span className="text-accent font-black">&</span> CIA <span className="text-foreground">SAS</span>
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
                Catálogo Gonzales <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'catalog' ? 'rotate-180' : ''}`} />
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
                            <Link key={link} href={`/shop?category=${link}&vendor=Gonzales & CIA SAS`} className="text-sm text-foreground/60 hover:text-accent font-medium transition-colors">
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
                Nuestras Marcas Asociadas <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'vendors' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'vendors' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-background shadow-[0_12px_24px_-4px_rgba(42,37,32,0.12)] rounded-2xl p-6 border border-border space-y-4"
                  >
                    <Typography variant="small" className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Directorio de Marcas Asociadas</Typography>
                    <div className="grid grid-cols-1 gap-2">
                       {vendors.map(vendor => (
                         <Link 
                           key={vendor.slug} 
                           href={`/vendors/${vendor.slug}`} 
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

           <Link href="/shop?filter=wholesale" className="nav-link-v3">Mayoristas</Link>
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

            <Link href="/compare" className="nav-icon-btn relative order-first sm:order-none">
              <ArrowLeftRight size={18} strokeWidth={1.5} />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-[8px] w-4 h-4 flex items-center justify-center text-white font-bold rounded-full">{compareItems.length}</span>
              )}
           </Link>

           <Link href="/profile" className="nav-icon-btn hidden lg:flex">
              <User size={18} strokeWidth={1.5} />
           </Link>

           <button onClick={() => setIsCartOpen(true)} className="nav-icon-btn relative order-first sm:order-none">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-[8px] w-4 h-4 flex items-center justify-center text-white font-bold rounded-full">{totalItems}</span>
              )}
           </button>

           {/* Desktop Auth Buttons - Hidden on mobile/tablet */}
           <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <Link href="/login" className="px-4 py-2 text-sm font-bold text-foreground hover:text-accent transition-colors">
                Ingresar
              </Link>
              <Link href="/signup" className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-colors">
                Registrarse
              </Link>
           </div>
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
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               transition={{ type: 'spring', damping: 30, stiffness: 200 }}
               className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-background z-100 p-6 sm:p-8 flex flex-col font-sans overflow-y-auto"
            >
               <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7">
                      <img src="/assets/logo.svg" alt="Gonzales & CIA SAS" className="w-full h-full object-contain" />
                    </div>
                    <Typography variant="h4" className="text-lg font-black text-foreground uppercase">
                      Gonzales <span className="text-accent">&</span> CIA
                    </Typography>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors"><X size={24} /></button>
               </div>

               <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                     <Typography variant="h4" className="text-sm font-black uppercase text-foreground">Tienda</Typography>
                     <div className="grid grid-cols-1 gap-3">
                        <Link href="/" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
                        
                        {/* Expandable Catálogo */}
                        <div className="space-y-2">
                          <button 
                            onClick={() => setIsCatalogExpanded(!isCatalogExpanded)} 
                            className="mob-nav-link w-full flex items-center justify-between"
                          >
                            Catálogo <ChevronDown size={20} className={`transition-transform ${isCatalogExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {isCatalogExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 space-y-2 overflow-hidden"
                              >
                                {catalogSubgroups.map(group => (
                                  <div key={group.name} className="space-y-1 py-1">
                                    <p className="text-[10px] font-black uppercase text-foreground/40 tracking-widest">{group.name}</p>
                                    {group.links.map(link => (
                                      <Link 
                                        key={link} 
                                        href={`/shop?category=${link}`} 
                                        className="block py-1 text-sm font-bold text-foreground/70 hover:text-accent"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {link}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                                <Link 
                                  href="/shop" 
                                  className="block py-2 text-xs font-black uppercase tracking-widest text-accent"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  Ver todo el catálogo
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Expandable Ateliers */}
                        <div className="space-y-2">
                          <button 
                            onClick={() => setIsVendorsExpanded(!isVendorsExpanded)} 
                            className="mob-nav-link w-full flex items-center justify-between"
                          >
                            Marcas Asociadas <ChevronDown size={20} className={`transition-transform ${isVendorsExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {isVendorsExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 space-y-2 overflow-hidden"
                              >
                                {vendors.map(vendor => (
                                  <Link 
                                    key={vendor.slug} 
                                    href={`/vendors/${vendor.slug}`} 
                                    className="block py-2 text-base font-bold text-foreground/70 hover:text-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {vendor.name}
                                  </Link>
                                ))}
                                <Link 
                                  href="/multivendor" 
                                  className="block py-2 text-xs font-black uppercase tracking-widest text-accent"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  Ver directorio completo
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <Link href="/shop?filter=wholesale" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Mayorista</Link>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <Typography variant="h4" className="text-sm font-black uppercase text-foreground">Información</Typography>
                     <div className="grid grid-cols-1 gap-3">
                        <Link href="/nosotros" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Nosotros</Link>
                        <Link href="/faq" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Preguntas Frecuentes</Link>
                        <Link href="/contact" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
                        <Link href="/returns" className="mob-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Devoluciones</Link>
                     </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-border space-y-3 mt-auto">
                  <Link href="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-xl py-3" label="Iniciar Sesión" />
                  </Link>
                  <Link href="/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl py-3" label="Crear Cuenta" />
                  </Link>
                  <a href="https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20ser%20vendedor%20de%20Gonzales%20&%20Asociados" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full rounded-xl py-3 bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20" label="Ser Vendedor" />
                  </a>
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
