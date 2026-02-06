'use client';

import React from 'react';
import PolicyLayout from '@/components/templates/PolicyLayout';

export default function PrivacyPage() {
  return (
    <PolicyLayout 
      title="Política de Privacidad"
      lastUpdated="Enero 2026"
      sections={[
        {
          title: "1. Recolección de Información",
          content: "Recopilamos información personal cuando usted se registra en nuestro sitio, realiza un pedido o se suscribe a nuestro boletín. La información recopilada incluye su nombre, dirección de correo electrónico, dirección de envío y número de teléfono."
        },
        {
          title: "2. Uso de la Información",
          content: "Cualquier información que recopilemos de usted puede ser utilizada para personalizar su experiencia, mejorar nuestro sitio web, mejorar el servicio al cliente y procesar transacciones de manera eficiente."
        },
        {
          title: "3. Protección de Datos",
          content: "Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal. Sus datos personales se guardan bajo redes seguras y solo son accesibles por un número limitado de personas con derechos especiales de acceso."
        }
      ]}
    />
  );
}
