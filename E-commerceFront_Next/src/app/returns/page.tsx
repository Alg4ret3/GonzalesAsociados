'use client';

import React from 'react';
import PolicyLayout from '@/components/templates/PolicyLayout';

export default function ReturnsPage() {
  return (
    <PolicyLayout 
      title="Cambios y Devoluciones"
      lastUpdated="Enero 2026"
      sections={[
        {
          title: "1. Plazo de Devolución",
          content: "Usted tiene un plazo de 30 días calendario a partir de la fecha de recepción de su pedido para solicitar un cambio o devolución de cualquier prenda comprada en nuestra tienda online."
        },
        {
          title: "2. Condiciones del Producto",
          content: "Para ser elegible para una devolución, el artículo debe estar sin usar, en las mismas condiciones en que lo recibió y debe tener todas sus etiquetas originales intactas. No se aceptarán prendas con señales de uso o lavado."
        },
        {
          title: "3. Proceso de Cambio",
          content: "Para iniciar un proceso de cambio, debe contactar a nuestro equipo de soporte a través de hola@gonzales.com indicando su número de pedido y el motivo del cambio. Nosotros le proporcionaremos las instrucciones para el envío."
        }
      ]}
    />
  );
}
