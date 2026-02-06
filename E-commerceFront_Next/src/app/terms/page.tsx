'use client';

import React from 'react';
import PolicyLayout from '@/components/templates/PolicyLayout';

export default function TermsPage() {
  return (
    <PolicyLayout 
      title="Términos y Condiciones"
      lastUpdated="Enero 2026"
      sections={[
        {
          title: "1. Aceptación de los Términos",
          content: "Al acceder y utilizar el sitio web de GonzalesAsociados, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web."
        },
        {
          title: "2. Propiedad Intelectual",
          content: "Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, imágenes y software, es propiedad de GonzalesAsociados o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual internacionales."
        },
        {
          title: "3. Uso del Sitio",
          content: "Este sitio es para su uso personal y no comercial. Usted no puede modificar, copiar, distribuir, transmitir, mostrar, realizar, reproducir, publicar, licenciar, crear trabajos derivados, transferir ni vender ninguna información obtenida de este sitio."
        }
      ]}
    />
  );
}
