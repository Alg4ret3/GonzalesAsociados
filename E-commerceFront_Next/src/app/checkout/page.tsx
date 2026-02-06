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
  const { cart, totalPrice } = useCart();

  // Group items by vendor for corporate multi-vendor structure
  const itemsByVendor = cart.reduce((acc, item) => {
    const vendor = item.vendor || 'Gonzales Market';
    if (!acc[vendor]) acc[vendor] = [];
    acc[vendor].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  const shippingCost = 25000;
  const grandTotal = totalPrice + shippingCost;

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <Navbar />

      <div className="pt-32 sm:pt-48 pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto">
        <header className="mb-16 border-b border-slate-200 pb-12">
          <Typography variant="h1" className="text-5xl font-black text-slate-950 tracking-tighter uppercase">Pasarela Corporativa</Typography>
          <div className="flex items-center gap-3 mt-4">
             <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest">
                <Lock size={12} /> Conexión Encriptada SSL
             </div>
             <Typography variant="small" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transacción Industrial Segura</Typography>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Checkout Form */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Step 1: Industrial Shipping */}
            <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-950 border border-slate-200"><Truck size={24} /></div>
                  <Typography variant="h3" className="text-xl font-bold uppercase tracking-tight">1. Logística y Despacho</Typography>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre Corporativo / Responsable</label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-600/10 outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email de Contacto</label>
                     <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-600/10 outline-none" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dirección de Entrega Industrial</label>
                     <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-600/10 outline-none" />
                  </div>
               </div>
            </section>

            {/* Step 2: Payment Protocol */}
            <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-950 border border-slate-200"><CreditCard size={24} /></div>
                  <Typography variant="h3" className="text-xl font-bold uppercase tracking-tight">2. Protocolo de Pago</Typography>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {['Tarjeta Corporativa', 'Transferencia PSE', 'Crédito Directo Aliados'].map(method => (
                    <label key={method} className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-blue-600 cursor-pointer group transition-all">
                       <div className="flex items-center gap-4">
                          <input type="radio" name="payment" className="w-5 h-5 text-blue-600 border-slate-200 focus:ring-blue-600" />
                          <Typography variant="body" className="text-sm font-bold text-slate-900">{method}</Typography>
                       </div>
                       <ChevronRight size={18} className="text-slate-200 group-hover:text-blue-600" />
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

               <Button label="Formalizar Pedido" variant="primary" className="w-full rounded-2xl py-6 bg-blue-600 hover:bg-blue-700 font-black uppercase text-[11px] tracking-widest relative z-10" />

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
