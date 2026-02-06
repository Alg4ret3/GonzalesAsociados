'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 sm:px-12">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
            <Typography variant="small" className="text-primary font-bold">Bienvenido</Typography>
            <Typography variant="h2" className="text-4xl">Ingresar</Typography>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="w-full bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-0 top-4 text-neutral-300 group-focus-within:text-primary transition-colors" size={16} />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute right-0 top-4 text-neutral-300 group-focus-within:text-primary transition-colors" size={16} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-border rounded-none accent-primary" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Recordarme</span>
              </label>
              <button type="button" className="text-[10px] uppercase tracking-widest text-primary hover:underline">Olvide mi contraseña</button>
            </div>

            <Button label="Iniciar Sesión" variant="primary" className="w-full py-6" />
            
            <div className="text-center pt-8">
              <Typography variant="body" className="text-xs text-neutral-400 font-light mb-4">¿No tienes una cuenta?</Typography>
              <Link 
                href="/signup" 
                className="group inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-foreground hover:text-primary transition-colors"
              >
                Crear Cuenta <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
