'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { useCart } from '@/context/CartContext';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ShieldCheck, Lock, Truck, CreditCard, ChevronRight, Building2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart = [], totalPrice = 0 } = useCart() || {};

  // Group items by vendor for corporate multi-vendor structure
  const itemsByVendor = (cart || []).reduce((acc, item) => {
    const vendor = item.vendor || 'Gonzales Market';
    if (!acc[vendor]) acc[vendor] = [];
    acc[vendor].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  const shippingCost = 25000;
  const grandTotal = totalPrice + shippingCost;

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-accent/20">
      <Navbar />

      <div className="pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-6 md:px-12 max-w-[1400px] mx-auto">
        <header className="mb-8 sm:mb-12 md:mb-16 border-b border-border pb-8 sm:pb-10 md:pb-12">
          <Typography variant="h1" className="text-2xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase">Pasarela</Typography>
          <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-4 flex-wrap">
             <div className="flex items-center gap-1.5 sm:gap-2 bg-primary text-white px-2 sm:px-3 py-1 rounded-lg text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
                <Lock size={10} className="sm:size-3 md:size-3.5" /> Encriptada SSL
             </div>
             <Typography variant="small" className="text-[7px] sm:text-[8px] md:text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Transacción Segura</Typography>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Main Checkout Form */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 md:space-y-12">
            
            {/* Step 1: Industrial Shipping */}
            <section className="bg-background p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[40px] border border-border shadow-sm space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
               <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-11 md:w-12 lg:w-12 bg-muted rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-foreground border border-border flex-shrink-0"><Truck size={18} className="sm:size-5 md:size-6" /></div>
                  <Typography variant="h3" className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-tight">1. Logística</Typography>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                  <div className="space-y-1.5 sm:space-y-2">
                     <label className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Nombre</label>
                     <input type="text" className="w-full bg-muted border border-border rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-2 sm:py-3 md:py-4 font-bold focus:ring-2 focus:ring-accent/10 outline-none" />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                     <label className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Email</label>
                     <input type="email" className="w-full bg-muted border border-border rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-2 sm:py-3 md:py-4 font-bold focus:ring-2 focus:ring-accent/10 outline-none" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5 sm:space-y-2">
                     <label className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-1">Dirección</label>
                     <input type="text" className="w-full bg-muted border border-border rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-2 sm:py-3 md:py-4 font-bold focus:ring-2 focus:ring-accent/10 outline-none" />
                  </div>
               </div>
            </section>

            {/* Step 2: Payment Protocol */}
            <section className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[40px] border border-slate-100 shadow-sm space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
               <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-11 md:w-12 lg:w-12 bg-slate-50 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-slate-950 border border-slate-200 flex-shrink-0"><CreditCard size={18} className="sm:size-5 md:size-6" /></div>
                  <Typography variant="h3" className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-tight">2. Pago</Typography>
               </div>
               <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                  {['Tarjeta Corporativa', 'Transferencia PSE', 'Crédito Directo'].map(method => (
                    <label key={method} className="flex items-center justify-between p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border border-border hover:border-accent cursor-pointer group transition-all">
                       <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                          <input type="radio" name="payment" className="w-4 h-4 sm:w-5 md:w-5 text-accent border-border focus:ring-accent flex-shrink-0" />
                          <Typography variant="body" className="text-[10px] sm:text-xs md:text-sm font-bold text-foreground">{method}</Typography>
                       </div>
                       <ChevronRight size={14} className="text-foreground/20 group-hover:text-accent sm:size-4.5 md:size-5 flex-shrink-0" />
                    </label>
                  ))}
               </div>
            </section>
          </div>

          {/* Corporate Order Summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-48 h-fit">
            <div className="bg-slate-950 text-white p-10 rounded-[40px] shadow-2xl space-y-10 relative overflow-hidden">
               <Building2 className="absolute -top-20 -right-20 text-white/5" size={300} />
               
               <header className="relative z-10 border-b border-white/10 pb-6">
                  <Typography variant="h3" className="text-lg font-bold uppercase tracking-tight">Resumen Facturación</Typography>
               </header>

               <div className="space-y-8 relative z-10">
                  {Object.entries(itemsByVendor).map(([vendor, items]) => (
                    <div key={vendor} className="space-y-4">
                       <Typography variant="small" className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
                          <Building2 size={12} /> {vendor}
                       </Typography>
                       {items.map(item => (
                         <div key={item.id} className="flex gap-4">
                            <div className="w-14 h-14 relative rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                               <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <Typography variant="h4" className="text-xs font-bold text-white uppercase truncate">{item.name}</Typography>
                               <Typography variant="small" className="text-[10px] text-white/40">Cant: {item.quantity}</Typography>
                            </div>
                            <Typography variant="small" className="text-xs font-bold">${(item.price * item.quantity).toLocaleString()}</Typography>
                         </div>
                       ))}
                    </div>
                  ))}
               </div>

               <div className="pt-8 border-t border-white/10 space-y-4 relative z-10">
                  <div className="flex justify-between text-white/60 text-[10px] uppercase font-bold tracking-widest">
                     <span>Subtotal Industrial</span>
                     <span className="text-white">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-[10px] uppercase font-bold tracking-widest">
                     <span>Logística Certificada</span>
                     <span className="text-white">${shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                     <div>
                        <Typography variant="small" className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Total Transaccional</Typography>
                        <Typography variant="h2" className="text-3xl font-black text-white tracking-tighter">${grandTotal.toLocaleString()}</Typography>
                     </div>
                  </div>
               </div>

               <Button label="Formalizar Pedido" variant="primary" className="w-full rounded-2xl py-6 bg-accent hover:bg-accent/80 font-black uppercase text-[11px] tracking-widest relative z-10" />

               <div className="flex items-center justify-center gap-2 relative z-10 opacity-40">
                  <ShieldCheck size={14} />
                  <Typography variant="small" className="text-[9px] font-bold uppercase tracking-widest">Transacción B2B Protegida</Typography>
               </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
