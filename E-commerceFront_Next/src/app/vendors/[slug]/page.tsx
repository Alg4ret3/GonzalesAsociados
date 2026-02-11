'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ProductCard } from '@/components/molecules/ProductCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Data mapping for all vendors
const VENDORS_DATA: Record<string, any> = {
  'babalu': {
    name: 'Babalu.co',
    fullName: 'Babalu.co',
    tagline: 'Activewear & Fitness',
    description: 'Líder regional en activewear y moda fitness de alto rendimiento. Diseñado para atletas y amantes del movimiento.',
    stats: [
      { label: 'Productos Activos', value: '500+' },
      { label: 'Calificación', value: '4.9' },
      { label: 'Clientes', value: '15K+' },
      { label: 'Desde', value: '2020' }
    ],
    banners: [
      {
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop',
        title: 'Activewear Primavera',
        description: 'Descubre nuestra colección más fresca'
      },
      {
        image: 'https://images.unsplash.com/photo-1506629082632-30e0a60a31ad?q=80&w=1600&auto=format&fit=crop',
        title: 'Promoción Fitness',
        description: '20% OFF en ropa deportiva seleccionada'
      }
    ],
    videos: [
      { title: 'Babalu Colección Primavera', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { title: 'Babalu Últimas Tendencias', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' }
    ]
  },
  'inexmoda': {
    name: 'Inexmoda',
    fullName: 'Inexmoda Institute',
    tagline: 'Fashion Institute & Trends',
    description: 'Transformamos la industria de la moda a través de la investigación, el diseño y la innovación. Conectando marcas con el futuro.',
    stats: [
      { label: 'Investigaciones', value: '200+' },
      { label: 'Eventos/Año', value: '12' },
      { label: 'Marcas Aliadas', value: '50+' },
      { label: 'Desde', value: '1988' }
    ],
    banners: [
      {
        image: 'https://images.unsplash.com/photo-1595521624433-d1aef5d28e0f?q=80&w=1600&auto=format&fit=crop',
        title: 'Tendencias 2026',
        description: 'El futuro de la moda está aquí'
      },
      {
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd62?q=80&w=1600&auto=format&fit=crop',
        title: 'Innovación Textil',
        description: 'Materiales sostenibles y tecnología aplicada'
      }
    ],
    videos: [
      { title: 'Tendencias 2026', url: 'https://www.youtube.com/embed/9bZkp7q19f0' },
      { title: 'Colección Nueva', url: 'https://www.youtube.com/embed/vVvQgMPiNAc' }
    ]
  },
  'atelier-paris': {
    name: 'Atelier Paris',
    fullName: 'Atelier Paris Haute Couture',
    tagline: 'Alta Costura Francesa',
    description: 'La esencia de la sofisticación francesa en cada puntada. Diseños exclusivos hechos a medida para los momentos más memorables.',
    stats: [
      { label: 'Puntadas/Prenda', value: '50K+' },
      { label: 'Exclusividad', value: '100%' },
      { label: 'Países', value: '15' },
      { label: 'Legado', value: '45 Años' }
    ],
    banners: [
      {
        image: 'https://images.unsplash.com/photo-1578926314433-dbc14910cf1f?q=80&w=1600&auto=format&fit=crop',
        title: 'Alta Costura Francesa',
        description: 'Elegancia y sofisticación sin compromisos'
      },
      {
        image: 'https://images.unsplash.com/photo-1539533057440-7814a9755say?q=80&w=1600&auto=format&fit=crop',
        title: 'Colección Exclusiva',
        description: 'Diseños únicos directamente de París'
      }
    ],
    videos: [
      { title: 'Alta Costura Francesa', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' },
      { title: 'Colección Especial', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ]
  },
  'luxe-couture': {
    name: 'Luxe Couture',
    fullName: 'Luxe Couture London',
    tagline: 'Premium Gala',
    description: 'Redefiniendo el lujo contemporáneo para la alfombra roja. Vestidos de gala que capturan la mirada y el corazón.',
    stats: [
      { label: 'Modelos Gala', value: '80+' },
      { label: 'Rating Global', value: '5.0' },
      { label: 'Celebridades', value: '100+' },
      { label: 'Desde', value: '2015' }
    ],
    banners: [
      {
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
        title: 'Eventos Premium',
        description: 'La elección de las estrellas para eventos de gala'
      },
      {
        image: 'https://images.unsplash.com/photo-1558127353-f1b6e6e6a6f0?q=80&w=1600&auto=format&fit=crop',
        title: 'Gala Collection',
        description: 'Lujo, elegancia y distinción'
      }
    ],
    videos: [
      { title: 'Eventos Premium', url: 'https://www.youtube.com/embed/OCMa3tX76kE' },
      { title: 'Gala 2026', url: 'https://www.youtube.com/embed/9bZkp7q19f0' }
    ]
  }
};

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Legging Premium', price: 120000, image: 'https://images.unsplash.com/photo-1506629082632-30e0a60a31ad?q=80&w=400&auto=format&fit=crop', category: 'Mayorista', slug: 'legging-premium', vendor: 'Babalu.co', rating: 4.9 },
  { id: 'p2', name: 'Vestido Gala Dorado', price: 450000, image: 'https://images.unsplash.com/photo-1558127353-f1b6e6e6a6f0?q=80&w=400&auto=format&fit=crop', category: 'Premium', slug: 'vestido-gala', vendor: 'Luxe Couture', rating: 5 },
  { id: 'p3', name: 'Blazer Seda Pura', price: 320000, image: 'https://images.unsplash.com/photo-1539533057440-7814a9755say?q=80&w=400&auto=format&fit=crop', category: 'Boutique', slug: 'blazer-seda', vendor: 'Inexmoda', rating: 4.8 },
  { id: 'p4', name: 'Conjunto Francés', price: 380000, image: 'https://images.unsplash.com/photo-1616778132694-1595436707f0?q=80&w=400&auto=format&fit=crop', category: 'Alta Costura', slug: 'conjunto-frances', vendor: 'Atelier Paris', rating: 4.9 }
];

export default function VendorPage() {
  const { slug } = useParams();
  const router = useRouter();
  const data = VENDORS_DATA[slug as string];
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!data) {
    if (typeof window !== 'undefined') router.push('/multivendor');
    return null;
  }

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => p.vendor.toLowerCase().includes(data.name.toLowerCase()));
  const categories = ['all', ...new Set(filteredProducts.map(p => p.category))];
  const displayProducts = selectedCategory === 'all' 
    ? filteredProducts 
    : filteredProducts.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <Typography variant="h1" className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {data.name}
          </Typography>
          <Typography variant="body" className="text-lg text-secondary font-light max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </Typography>
        </motion.div>
      </section>

      {/* Banners Section */}
      <section className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-12">
          <Typography variant="h2" className="text-3xl sm:text-4xl font-black text-center mb-12 uppercase tracking-tight">
            Campañas <span className="text-accent underline underline-offset-8">Destacadas</span>
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.banners.map((banner: any, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="relative overflow-hidden rounded-[32px] h-[500px] border border-border group shadow-xl transition-all duration-300"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-all duration-500 flex items-end p-10">
                  <div className="space-y-2 text-white">
                    <Typography variant="h4" className="text-2xl font-black uppercase tracking-tight">
                      {banner.title}
                    </Typography>
                    <Typography variant="body" className="text-sm font-light text-white/80">
                      {banner.description}
                    </Typography>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Videos Section */}
      <section className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Typography variant="small" className="text-accent font-black uppercase tracking-widest text-[10px]">INSPIRACIÓN AUDIOVISUAL</Typography>
            <Typography variant="h2" className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
               Fashion <span className="text-slate-400">Broadcast</span>
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.videos.map((video: any, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="relative overflow-hidden rounded-[40px] border border-border bg-muted h-[400px] shadow-2xl"
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  className="absolute inset-0"
                  allowFullScreen
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border pb-12">
            <div>
              <Typography variant="h2" className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                Catálogo <span className="text-accent">{data.name}</span>
              </Typography>
              <Typography variant="body" className="text-secondary mt-2">
                {filteredProducts.length} referencias premium disponibles
              </Typography>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${
                    selectedCategory === cat
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-muted text-foreground hover:bg-accent/10 border border-border'
                  }`}
                >
                  {cat === 'all' ? 'Ver Todo' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link href={`/shop?vendor=${encodeURIComponent(data.name)}`}>
              <Button 
                variant="outline" 
                className="px-16 py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 hover:bg-accent hover:text-white transition-all shadow-xl" 
                label="Explorar Colección Completa" 
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-[40px] px-8 py-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
            {data.stats.map((stat: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="space-y-2"
              >
                <Typography variant="h3" className="text-4xl sm:text-5xl font-black text-accent tracking-tighter">
                  {stat.value}
                </Typography>
                <Typography variant="body" className="text-white/50 text-xs font-black uppercase tracking-widest">
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
