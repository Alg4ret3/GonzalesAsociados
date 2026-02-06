'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Store, ChevronRight } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import Image from 'next/image';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, isCartOpen, setIsCartOpen } = useCart();

  // Group items by vendor
  const groupedItems = cartItems.reduce((acc, item) => {
    const vendor = item.vendor || 'Varios';
    if (!acc[vendor]) acc[vendor] = [];
    acc[vendor].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const vendors = Object.keys(groupedItems);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag size={20} strokeWidth={1.5} className="text-primary" />
                <Typography variant="h4" className="text-sm font-bold text-slate-900">Tu Bolsa Marketplace</Typography>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                  {cartItems.length}
                </span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="hover:text-primary transition-colors">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Items List - Grouped by Vendor */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 opacity-40">
                  <ShoppingBag size={48} strokeWidth={0.5} />
                  <Typography variant="body" className="text-sm tracking-widest uppercase font-bold">Tu bolsa está vacía</Typography>
                  <Button label="Empezar a comprar" onClick={() => setIsCartOpen(false)} variant="outline" className="px-6 py-3 rounded-full" />
                </div>
              ) : (
                vendors.map((vendor) => (
                  <div key={vendor} className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                       <Store size={14} className="text-primary" />
                       <Typography variant="small" className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900">{vendor}</Typography>
                    </div>
                    <div className="space-y-8">
                      {groupedItems[vendor].map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex gap-6 group">
                          <div className="relative w-20 aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Typography variant="h4" className="text-[11px] font-bold text-slate-900 mb-1 leading-tight">{item.name}</Typography>
                                <div className="flex gap-2 items-center">
                                   <Typography variant="small" className="text-[9px] text-slate-400 bg-slate-50 px-1.5 rounded">Talla: {item.size || 'Unica'}</Typography>
                                </div>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} strokeWidth={1.5} />
                              </button>
                            </div>
                            
                            <div className="flex justify-between items-end">
                              <div className="flex items-center border border-slate-100 rounded-lg overflow-hidden">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                                  className="px-2 py-1.5 hover:bg-slate-50 transition-colors"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="w-8 text-center text-[10px] font-extrabold">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                                  className="px-2 py-1.5 hover:bg-slate-50 transition-colors"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <Typography variant="body" className="text-xs font-bold text-slate-900">
                                ${(item.price * item.quantity).toLocaleString()}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-6">
                <div className="flex justify-between items-end">
                  <Typography variant="small" className="text-slate-400 font-bold uppercase tracking-widest">Subtotal</Typography>
                  <Typography variant="h3" className="text-2xl font-bold text-slate-900">${totalAmount.toLocaleString()}</Typography>
                </div>
                <Typography variant="body" className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed font-medium">
                  Compra segura en marketplace. Envío calculado por cada atelier.
                </Typography>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  <button className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3">
                    Tramitar Pedido <ChevronRight size={14} />
                  </button>
                </Link>
                <button 
                   onClick={() => setIsCartOpen(false)}
                   className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Seguir Comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
