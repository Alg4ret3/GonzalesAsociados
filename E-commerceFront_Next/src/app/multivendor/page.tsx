'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ProductCard } from '@/components/molecules/ProductCard';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

const VENDORS = [
  {
    id: 'v1',
    name: 'Babalu.co',
    type: 'mayorista',
    description: 'Activewear & Fitness',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Especialistas en deportivo de alta rendimiento',
    colors: { bg: 'bg-blue-50', accent: 'text-blue-600' },
    slug: 'babalu'
  },
  {
    id: 'v2',
    name: 'Inexmoda',
    type: 'boutique',
    description: 'Fashion Institute & Trends',
    logo: 'https://images.unsplash.com/photo-1595521624433-d1aef5d28e0f?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Tendencias de moda para el mundo',
    colors: { bg: 'bg-pink-50', accent: 'text-pink-600' },
    slug: 'inexmoda'
  },
  {
    id: 'v3',
    name: 'Atelier Paris',
    type: 'boutique',
    description: 'Alta Costura Francesa',
    logo: 'https://images.unsplash.com/photo-1578926314433-dbc14910cf1f?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Elegancia y sofisticación francesa',
    colors: { bg: 'bg-purple-50', accent: 'text-purple-600' },
    slug: 'atelier-paris'
  },
  {
    id: 'v4',
    name: 'Luxe Couture',
    type: 'outlet',
    description: 'Premium Gala',
    logo: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    tagline: 'Lujo accesible para eventos especiales',
    colors: { bg: 'bg-amber-50', accent: 'text-amber-600' },
    slug: 'luxe-couture'
  }
];

const VENDOR_VIDEOS = {
  'Babalu.co': [
    { title: 'Activewear Primavera', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Colección Fitness', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' }
  ],
  'Inexmoda': [
    { title: 'Tendencias 2026', url: 'https://www.youtube.com/embed/9bZkp7q19f0' },
    { title: 'Colección Nueva', url: 'https://www.youtube.com/embed/vVvQgMPiNAc' }
  ],
  'Atelier Paris': [
    { title: 'Alta Costura Francesa', url: 'https://www.youtube.com/embed/jNQXAC9IVRw' },
    { title: 'Colección Especial', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  ],
  'Luxe Couture': [
    { title: 'Eventos Premium', url: 'https://www.youtube.com/embed/OCMa3tX76kE' },
    { title: 'Gala 2026', url: 'https://www.youtube.com/embed/9bZkp7q19f0' }
  ]
};

const VENDOR_BANNERS = {
  'Babalu.co': [
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
  'Inexmoda': [
    {
      image: 'https://images.unsplash.com/photo-1595521624433-d1aef5d28e0f?q=80&w=1600&auto=format&fit=crop',
      title: 'Colección Primavera',
      description: 'Diseños únicos y exclusivos'
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd62?q=80&w=1600&auto=format&fit=crop',
      title: 'Tendencias',
      description: 'Lo más nuevo en moda'
    }
  ],
  'Atelier Paris': [
    {
      image: 'https://images.unsplash.com/photo-1578926314433-dbc14910cf1f?q=80&w=1600&auto=format&fit=crop',
      title: 'Alta Costura Francesa',
      description: 'Elegancia y sofisticación'
    },
    {
      image: 'https://images.unsplash.com/photo-1539533057440-7814a9755say?q=80&w=1600&auto=format&fit=crop',
      title: 'Colección Exclusiva',
      description: 'Diseños únicos de París'
    }
  ],
  'Luxe Couture': [
    {
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
      title: 'Eventos Premium',
      description: 'Para tus momentos especiales'
    },
    {
      image: 'https://images.unsplash.com/photo-1558127353-f1b6e6e6a6f0?q=80&w=1600&auto=format&fit=crop',
      title: 'Gala Collection',
      description: 'Lujo y elegancia'
    }
  ]
};

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Legging Premium', price: 120000, image: 'https://images.unsplash.com/photo-1506629082632-30e0a60a31ad?q=80&w=400&auto=format&fit=crop', category: 'Mayorista', slug: 'legging-premium', vendor: 'Babalu.co', rating: 4.9 },
  { id: 'p2', name: 'Vestido Gala Dorado', price: 450000, image: 'https://images.unsplash.com/photo-1558127353-f1b6e6e6a6f0?q=80&w=400&auto=format&fit=crop', category: 'Premium', slug: 'vestido-gala', vendor: 'Luxe Couture', rating: 5 },
  { id: 'p3', name: 'Blazer Seda Pura', price: 320000, image: 'https://images.unsplash.com/photo-1539533057440-7814a9755say?q=80&w=400&auto=format&fit=crop', category: 'Boutique', slug: 'blazer-seda', vendor: 'Inexmoda', rating: 4.8 },
  { id: 'p4', name: 'Conjunto Francés', price: 380000, image: 'https://images.unsplash.com/photo-1616778132694-1595436707f0?q=80&w=400&auto=format&fit=crop', category: 'Alta Costura', slug: 'conjunto-frances', vendor: 'Atelier Paris', rating: 4.9 },
  { id: 'p5', name: 'Top Fitness Elite', price: 85000, image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=400&auto=format&fit=crop', category: 'Activewear', slug: 'top-fitness', vendor: 'Babalu.co', rating: 4.9 },
  { id: 'p6', name: 'Chaqueta Diseñador', price: 290000, image: 'https://images.unsplash.com/photo-1495298322410-8fde742f60e5?q=80&w=400&auto=format&fit=crop', category: 'Boutique', slug: 'chaqueta-designer', vendor: 'Inexmoda', rating: 4.7 }
];

export default function MultiVendorPage() {
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const selectedVendorData = VENDORS.find(v => v.name === selectedVendor);

  const filteredProducts = selectedVendor === 'all' 
    ? SAMPLE_PRODUCTS 
    : SAMPLE_PRODUCTS.filter(p => p.vendor === selectedVendor);

  const vendorVideos = selectedVendor !== 'all' ? VENDOR_VIDEOS[selectedVendor as keyof typeof VENDOR_VIDEOS] : [];
  const vendorBanners = selectedVendor !== 'all' ? VENDOR_BANNERS[selectedVendor as keyof typeof VENDOR_BANNERS] : [];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <Typography variant="small" className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">NUESTROS SOCIOS</Typography>
          <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Nuestras Marcas <span className="text-slate-900">Asociadas</span>
          </Typography>
          <Typography variant="body" className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            Descubre las mejores marcas y diseñadores en un solo lugar. Desde activewear de rendimiento hasta alta costura francesa, aquí encuentras lo mejor en moda contemporánea.
          </Typography>
        </motion.div>
      </section>

      {/* Vendor Cards with Banners */}
      <section className="pb-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <Typography variant="h2" className="text-3xl font-black mb-12 tracking-tight uppercase">Directorio de Marcas Aliadas</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {VENDORS.map((vendor, idx) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group cursor-pointer transition-all ${selectedVendor === vendor.name ? 'ring-2 ring-blue-600' : ''}`}
            >
              <div className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl">
                {/* Banner Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-50">
                  <Image
                    src={vendor.logo}
                    alt={vendor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/5 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <Typography variant="h3" className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                      {vendor.name}
                    </Typography>
                    <Typography variant="body" className={`text-[10px] font-black uppercase tracking-[0.2em] ${vendor.colors.accent} mt-1`}>
                      {vendor.tagline}
                    </Typography>
                  </div>

                  <Typography variant="body" className="text-slate-500 text-sm leading-relaxed font-light">
                    {vendor.description}
                  </Typography>

                  <div className="flex gap-3 pt-4">
                    <Link 
                      href={`/vendors/${vendor.slug}`} 
                      className="flex-1"
                    >
                      <Button 
                        className="w-full bg-slate-950 text-white rounded-xl py-4 text-[9px] font-bold uppercase tracking-widest" 
                        label={vendor.name === 'Babalu.co' ? 'Ver Tienda' : 'Ver Catálogo'} 
                      />
                    </Link>
                    <button
                      onClick={() => setSelectedVendor(vendor.name)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all text-[9px] font-bold uppercase tracking-widest ${
                        selectedVendor === vendor.name 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'border-slate-100 hover:bg-slate-50 text-slate-900'
                      }`}
                    >
                      Destacados
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Content Section - Only when vendor is selected */}
      <AnimatePresence mode="wait">
        {selectedVendor !== 'all' && selectedVendorData && (
          <motion.div
            key={selectedVendor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-32 bg-slate-50/50 py-32"
          >
            {/* Vendor Header */}
            <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
              <button
                onClick={() => setSelectedVendor('all')}
                className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:gap-3 transition-all text-[10px] uppercase tracking-widest"
              >
                <ChevronLeft size={16} />
                Volver a Directorio de Marcas
              </button>

              <div className="space-y-4">
                <Typography variant="h2" className="text-4xl sm:text-5xl font-black tracking-tighter uppercase">
                  {selectedVendor}
                </Typography>
                <Typography variant="body" className="text-lg text-slate-500 font-light max-w-3xl">
                  {selectedVendorData.description}
                </Typography>
              </div>
            </section>

            {/* Banners Section */}
            {vendorBanners.length > 0 && (
              <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <div className="space-y-12">
                  <div className="text-center space-y-4 border-b border-slate-200 pb-12">
                    <Typography variant="small" className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">Campañas Destacadas</Typography>
                    <Typography variant="h3" className="text-3xl font-black uppercase tracking-tight">
                      Lo Más <span className="text-slate-400">Reciente</span>
                    </Typography>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {vendorBanners.map((banner, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="relative overflow-hidden rounded-[32px] h-96 border border-slate-200 group shadow-xl transition-all duration-300"
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
            )}

            {/* Videos Section */}
            {vendorVideos.length > 0 && (
              <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <div className="space-y-12">
                  <div className="text-center space-y-4">
                    <Typography variant="small" className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">Audiovisuales</Typography>
                    <Typography variant="h3" className="text-3xl font-black uppercase tracking-tight">
                      Fisología de <span className="text-slate-400">Diseño</span>
                    </Typography>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {vendorVideos.map((video, idx) => (
                      <div
                        key={idx}
                        className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-slate-50 h-96 shadow-lg"
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={video.url}
                          title={video.title}
                          className="absolute inset-0"
                          allowFullScreen
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Products Section */}
            <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-32">
              <div className="space-y-12">
                <div className="flex items-end justify-between border-b border-slate-200 pb-10">
                  <div>
                    <Typography variant="h3" className="text-4xl font-black tracking-tighter uppercase">
                      Catálogo <span className="text-blue-600">{selectedVendor}</span>
                    </Typography>
                    <Typography variant="body" className="text-slate-500 font-light mt-2">
                      {filteredProducts.length} referencias industriales disponibles
                    </Typography>
                  </div>
                  <Link href={`/shop?vendor=${encodeURIComponent(selectedVendor)}`}>
                    <Button 
                      variant="outline" 
                      className="rounded-xl px-8 border-slate-200 text-[10px] font-bold uppercase tracking-widest" 
                      label="Ver Todo el Inventario" 
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* General Video Section - Only when no vendor selected */}
      {selectedVendor === 'all' && (
        <section className="pb-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Typography variant="small" className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">INSPIRACIÓN INDUSTRIAL</Typography>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
                Trend <span className="text-slate-400">Broadcast</span>
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-slate-50 h-96 shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Babalu Colección Primavera"
                  className="absolute inset-0"
                  allowFullScreen
                />
              </div>

              <div className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-slate-50 h-96 shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/jNQXAC9IVRw"
                  title="Atelier Paris Colección 2026"
                  className="absolute inset-0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="pb-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-[40px] p-12 sm:p-20 text-center space-y-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="relative z-10 space-y-6">
            <Typography variant="h2" className="text-3xl sm:text-5xl font-black tracking-tighter uppercase">
              ¿Quieres ser parte de <br/> Gonzales & Asociados?
            </Typography>
            <Typography variant="body" className="text-lg font-light text-slate-400 max-w-2xl mx-auto">
              Somos una plataforma abierta para diseñadores independientes, marcas emergentes y proveedores de moda. Únete a nuestro ecosistema de lujo.
            </Typography>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10 pt-4">
            <a href="https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20ser%20vendedor%20de%20Gonzales%20&%20Asociados" target="_blank" rel="noopener noreferrer">
              <Button 
                className="bg-blue-600 text-white px-12 py-6 rounded-2xl hover:bg-blue-700 text-[10px] font-black uppercase tracking-widest" 
                label="Ser Vendedor" 
              />
            </a>
            <Link href="/contact">
              <Button 
                variant="outline" 
                className="border-white/20 !text-white hover:bg-white/5 hover:!text-blue-400 px-12 py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors" 
                label="Más Información" 
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
