'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { UserIcon as User, Mail, Lock, ArrowRight, Star, Package, Heart, Trophy } from '@/components/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Por favor acepta los términos y condiciones');
      return;
    }
    setIsLoading(true);
    await login(formData);
    setTimeout(() => window.location.href = '/', 500);
  };

  const benefits = [
    { icon: Star, text: 'Acceso a ofertas exclusivas' },
    { icon: Package, text: 'Seguimiento de pedidos' },
    { icon: Heart, text: 'Guarda tus favoritos' },
    { icon: Trophy, text: 'Puntos de recompensa' }
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Benefits */}
            <div className="space-y-8 order-2 md:order-1">
              <div className="space-y-4">
                <Typography variant="h3" className="text-2xl sm:text-3xl font-black">
                  ¿Por qué <span className="text-accent">unirse?</span>
                </Typography>
                <Typography variant="body" className="text-foreground/70">
                  Obtén acceso a beneficios exclusivos de Gonzales & CIA SAS
                </Typography>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon size={20} className="text-accent" />
                    </div>
                    <Typography variant="body" className="text-sm font-medium">
                      {benefit.text}
                    </Typography>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <Typography variant="h4" className="text-2xl font-black text-accent">
                    10K+
                  </Typography>
                  <Typography variant="small" className="text-foreground/60 text-xs">
                    Clientes satisfechos
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h4" className="text-2xl font-black text-accent">
                    4.9
                  </Typography>
                  <Typography variant="small" className="text-foreground/60 text-xs">
                    Calificación promedio
                  </Typography>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="order-1 md:order-2">
              <div className="space-y-6 mb-8">
                <div className="text-center md:text-left">
                  <Typography variant="h2" className="text-3xl font-black">
                    Crear Cuenta
                  </Typography>
                  <Typography variant="body" className="text-secondary text-sm mt-2">
                    Únete a nuestra comunidad de moda
                  </Typography>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Names Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-foreground">Nombre</label>
                    <input
                      placeholder="Juan"
                      className="w-full bg-muted border-2 border-border rounded-xl py-3 px-4 outline-none focus:border-accent focus:bg-background transition-all text-sm"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-foreground">Apellido</label>
                    <input
                      placeholder="Pérez"
                      className="w-full bg-muted border-2 border-border rounded-xl py-3 px-4 outline-none focus:border-accent focus:bg-background transition-all text-sm"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-foreground">Correo Electrónico</label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full bg-muted border-2 border-border rounded-xl py-3 px-4 outline-none focus:border-accent focus:bg-background transition-all text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <Mail className="absolute right-4 top-3.5 text-foreground/40 group-focus-within:text-accent transition-colors" size={18} />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-foreground">Contraseña</label>
                  <div className="relative group">
                    <input
                      type="password"
                      placeholder="Mín. 8 caracteres"
                      className="w-full bg-muted border-2 border-border rounded-xl py-3 px-4 outline-none focus:border-accent focus:bg-background transition-all text-sm"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      minLength={8}
                    />
                    <Lock className="absolute right-4 top-3.5 text-foreground/40 group-focus-within:text-accent transition-colors" size={18} />
                  </div>
                  <Typography variant="small" className="text-[10px] text-foreground/50">
                    Usa mayúsculas, minúsculas y números para mayor seguridad
                  </Typography>
                </div>

                {/* Terms Checkbox */}
                <div className="bg-muted border-2 border-border rounded-xl p-4 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 border-border rounded accent-accent flex-shrink-0"
                    />
                    <span className="text-[11px] leading-relaxed text-foreground/70">
                      Acepto los{' '}
                      <Link href="/terms" className="font-bold text-accent hover:underline">
                        términos y condiciones
                      </Link>
                      {' '}y la{' '}
                      <Link href="/privacy" className="font-bold text-accent hover:underline">
                        política de privacidad
                      </Link>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-0.5 border-border rounded accent-accent flex-shrink-0"
                      defaultChecked
                    />
                    <span className="text-[11px] leading-relaxed text-foreground/70">
                      Deseo recibir ofertas exclusivas y noticias de Gonzales & CIA SAS
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full py-4 mt-6 rounded-xl text-base font-bold"
                  disabled={isLoading || !agreeTerms}
                >
                  {isLoading ? 'Registrando...' : 'Crear mi Cuenta'}
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-border text-center">
                <Typography variant="body" className="text-sm text-foreground/70 mb-3">
                  ¿Ya tienes cuenta?
                </Typography>
                <Link href="/login" className="inline-flex items-center gap-2 text-accent font-bold hover:text-primary transition-colors group">
                  Ingresar aquí <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
