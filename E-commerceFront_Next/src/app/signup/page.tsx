'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useUser } from '@/context/UserContext';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup then login
    await login(formData);
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 sm:px-12">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-4">
            <Typography variant="small" className="text-primary font-bold">Unirse</Typography>
            <Typography variant="h2" className="text-4xl">Crear Cuenta</Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  placeholder="Nombre"
                  className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
                <input
                  placeholder="Apellido"
                  className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="w-full bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <Mail className="absolute right-0 top-4 text-neutral-300 group-focus-within:text-primary transition-colors" size={16} />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <Lock className="absolute right-0 top-4 text-neutral-300 group-focus-within:text-primary transition-colors" size={16} />
              </div>
            </div>

            <div className="p-6 bg-neutral-50 dark:bg-black/20 border border-border">
              <Typography variant="body" className="text-[10px] text-neutral-400 leading-relaxed uppercase tracking-widest text-center">
                Al crear una cuenta, aceptas nuestros términos y condiciones y nuestra política de privacidad.
              </Typography>
            </div>

            <Button label="Registrarme" variant="primary" className="w-full py-6" />
            
            <div className="text-center pt-8">
              <Typography variant="body" className="text-xs text-neutral-400 font-light mb-4">¿Ya tienes cuenta?</Typography>
              <Link 
                href="/login" 
                className="group inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-foreground hover:text-primary transition-colors"
              >
                Ingresar <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
