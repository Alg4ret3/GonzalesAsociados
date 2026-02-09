'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ProductCard } from '@/components/molecules/ProductCard';
import Link from 'next/link';

const VENDORS = [
  { id: 'v1', name: 'Babalu.co', type: 'mayorista', description: 'Activewear & performance', logo: 'BB' },
  { id: 'v2', name: 'Atelier Paris', type: 'boutique', description: 'Alta costura', logo: 'AP' },
  { id: 'v3', name: 'Outlet Studio', type: 'outlet', description: 'Liquidaciones y remanentes', logo: 'OS' }
];

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Muestra A', price: 120000, image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1000&auto=format&fit=crop', category: 'Outlet', slug: 'muestra-a', vendor: 'Outlet Studio' },
  { id: 'p2', name: 'Muestra B', price: 250000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop', category: 'Mayorista', slug: 'muestra-b', vendor: 'Babalu.co' }
];

export default function MultiVendorPage() {
  const [filter, setFilter] = useState<'all' | 'mayorista' | 'outlet'>('all');

  const filteredVendors = VENDORS.filter(v => filter === 'all' ? true : v.type === filter);

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-accent/20">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-8 md:px-12 max-w-[1200px] mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Typography variant="h2" className="text-2xl sm:text-3xl font-black text-foreground">Multivendedor</Typography>
            <Typography variant="body" className="text-sm text-foreground/60">Explora proveedores por canal: mayorista, outlet y boutiques.</Typography>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-2 rounded-lg ${filter === 'all' ? 'bg-foreground text-background' : 'bg-muted text-foreground'}`}>Todos</button>
            <button onClick={() => setFilter('mayorista')} className={`px-3 py-2 rounded-lg ${filter === 'mayorista' ? 'bg-foreground text-background' : 'bg-muted text-foreground'}`}>Mayoristas</button>
            <button onClick={() => setFilter('outlet')} className={`px-3 py-2 rounded-lg ${filter === 'outlet' ? 'bg-foreground text-background' : 'bg-muted text-foreground'}`}>Outlet</button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {filteredVendors.map(v => (
            <div key={v.id} className="bg-muted rounded-lg p-4 flex flex-col gap-4 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">{v.logo}</div>
                <div>
                  <Typography variant="h4" className="text-lg font-bold text-foreground">{v.name}</Typography>
                  <Typography variant="small" className="text-[11px] text-foreground/60">{v.description}</Typography>
                </div>
              </div>
              <div className="flex-1">
                <Typography variant="small" className="text-[11px] text-foreground/40">Canal: {v.type}</Typography>
              </div>
              <div className="flex gap-2">
                <Link href={`/shop?vendor=${encodeURIComponent(v.name)}`} className="flex-1">
                  <Button label="Ver Catálogo" variant="primary" className="w-full" />
                </Link>
                <Link href={`/shop?filter=${v.type}`} className="flex-0">
                  <Button label="Ver Ofertas" variant="outline" className="px-4" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section>
          <header className="mb-6 flex items-center justify-between">
            <Typography variant="h3" className="text-xl font-black">Muestras</Typography>
            <Link href="/shop" className="text-sm text-foreground/60">Ver más</Link>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SAMPLE_PRODUCTS.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
