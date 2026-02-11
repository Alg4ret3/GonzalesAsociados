'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ChevronDown } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 0,
      question: "¿Cuál es el tiempo de entrega?",
      answer: "Los pedidos se procesan en 24-48 horas hábiles. El envío a nivel nacional toma entre 3-7 días hábiles dependiendo de tu ubicación. Recibirás un número de seguimiento por email una vez tu pedido sea despachado."
    },
    {
      id: 1,
      question: "¿Puedo cambiar mi pedido después de realizarlo?",
      answer: "Sí, puedes modificar tu pedido dentro de las primeras 2 horas después de haberlo realizado. Ponte en contacto con nuestro equipo de soporte a través de WhatsApp (+57 300 1234567) o email (hola@gonzales.com) con el número de tu pedido."
    },
    {
      id: 2,
      question: "¿CuAl es tu política de devoluciones?",
      answer: "Tenemos una política de devolución de 30 días. El producto debe estar sin usar, en perfectas condiciones y con todas sus etiquetas originales. Los costos de envío para devoluciones corren por cuenta del cliente, a menos que sea un error nuestro."
    },
    {
      id: 3,
      question: "¿Ofrecen servicio de mayorista?",
      answer: "Sí, contamos con un programa especial para mayoristas con precios wholesaleros. Visita nuestra sección de Mayoristas en el navegación o contáctanos directamente para conocer nuestras condiciones y volúmenes mínimos."
    },
    {
      id: 4,
      question: "¿Qué métodos de pago acepten?",
      answer: "Aceptamos todas las tarjetas de crédito (Visa, Mastercard, American Express), débito, transferencia bancaria, y pagos a través de plataformas como Nequi, Daviplata y Mercado Pago."
    },
    {
      id: 5,
      question: "¿Puedo rastrear mi pedido?",
      answer: "Por supuesto. Recibirás un número de seguimiento en tu email una vez tu pedido sea enviado. Puedes usarlo para rastrear tu paquete en tiempo real a través del sitio web del transportista."
    },
    {
      id: 6,
      question: "¿Venden internacionalmente?",
      answer: "Actualmente enviamos a nivel nacional en Colombia. Estamos expandiendo nuestros envíos internacionales próximamente. Suscríbete a nuestra newsletter para estar informado cuando lancemos esta opción."
    },
    {
      id: 7,
      question: "¿Cómo puedo contactar al equipo de soporte?",
      answer: "Puedes contactarnos de varias formas: Email: hola@gonzales.com | WhatsApp: +57 300 1234567 | Visítanos en Pasto, Nariño | A través del formulario de contacto en nuestro sitio web."
    },
    {
      id: 8,
      question: "¿Las prendas son originales?",
      answer: "El 100% de nuestras prendas son originales y confeccionadas por nuestros maestros sastres en Gonzales & CIA SAS. Cada pieza es única con garantía de autenticidad y calidad artesanal."
    },
    {
      id: 9,
      question: "¿Ofrecen servicio de gift wrapping?",
      answer: "Sí, ofrecemos un servicio de empaque de regalo premium sin costo adicional para compras mayores a $500.000. Solicítalo al momento de checkout o contacta a nuestro equipo de soporte."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <Typography variant="small" className="text-primary font-bold">ESTAMOS AQUÍ PARA AYUDARTE</Typography>
          <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl">
            Preguntas <span className="text-accent">Frecuentes</span>
          </Typography>
          <Typography variant="body" className="text-lg text-secondary font-light leading-relaxed">
            Encuentra respuestas a tus consultas sobre nuestros productos, envíos, devoluciones y más. Si no encuentras lo que buscas, no dudes en contactarnos.
          </Typography>
        </motion.div>
      </section>

      {/* FAQ Items */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full text-left bg-muted border border-border rounded-2xl p-6 hover:bg-muted/80 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <Typography variant="h4" className="text-base sm:text-lg font-bold text-foreground pr-6">
                    {faq.question}
                  </Typography>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-accent transition-transform duration-300 ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-background border-x border-b border-border rounded-b-2xl -mt-2 p-6 pt-8 space-y-4">
                      <Typography variant="body" className="text-foreground/80 leading-relaxed">
                        {faq.answer}
                      </Typography>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 bg-muted border border-border rounded-3xl p-8 sm:p-12 md:p-16"
        >
          <Typography variant="h2" className="text-3xl sm:text-4xl">
            ¿Aún tienes preguntas?
          </Typography>
          <Typography variant="body" className="text-lg text-secondary">
            Nuestro equipo de atención al cliente está listo para ayudarte en cualquier momento.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
              <Button className="px-8">Contáctanos por WhatsApp</Button>
            </a>
            <a href="mailto:hola@gonzales.com">
              <Button variant="outline" className="px-8">Enviar Email</Button>
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
