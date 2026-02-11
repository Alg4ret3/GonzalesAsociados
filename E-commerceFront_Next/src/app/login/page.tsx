'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { Mail, Lock, ArrowRight } from '@/components/icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login({ email, password });
    setTimeout(() => window.location.href = '/', 500);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <Typography variant="h1" className="text-3xl sm:text-4xl font-black">
              Bienvenido a <span className="text-accent">Gonzales & CIA SAS</span>
            </Typography>
            <Typography variant="body" className="text-secondary text-base">
              Accede a tu cuenta para ver tus pedidos y favoritos
            </Typography>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground">Correo Electrónico</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-muted border-2 border-border rounded-xl py-3 px-4 outline-none focus:border-accent focus:bg-background transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-4 top-3.5 text-foreground/40 group-focus-within:text-accent transition-colors" size={18} />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground">Contraseña</label>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted border-2 border-border rounded-xl py-3 px-4 outline-none focus:border-accent focus:bg-background transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute right-4 top-3.5 text-foreground/40 group-focus-within:text-accent transition-colors" size={18} />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-border rounded accent-accent" />
                <span className="text-xs font-medium text-foreground/60">Recordarme en este dispositivo</span>
              </label>
              <button type="button" className="text-xs font-bold text-accent hover:text-primary transition-colors">
                ¿Olvide contraseña?
              </button>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full py-4 mt-8 rounded-xl text-base font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Entrar a mi Cuenta'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-xs text-foreground/40 font-medium">O</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Sign Up Link */}
          <div className="bg-muted border-2 border-border rounded-2xl p-6 text-center space-y-4">
            <Typography variant="body" className="text-sm text-foreground/70">
              ¿Primera vez en Gonzales & CIA SAS?
            </Typography>
            <Link href="/signup" className="inline-block">
              <Button variant="outline" className="px-8 py-3 rounded-xl font-bold">
                Crear Cuenta Gratis
              </Button>
            </Link>
            <Typography variant="small" className="text-[11px] text-foreground/50">
              Sin compromisos. Regístrate en segundos.
            </Typography>
          </div>

          {/* Social Proof */}
          <div className="mt-8 pt-8 border-t border-border text-center space-y-4">
            <Typography variant="small" className="text-foreground/60">
              ¿Necesitas ayuda?
            </Typography>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent hover:text-primary transition-colors">
                WhatsApp
              </a>
              <span className="text-foreground/40">•</span>
              <a href="mailto:hola@gonzales.com" className="text-xs font-bold text-accent hover:text-primary transition-colors">
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
