import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/UserContext";
import { CompareProvider } from "@/context/CompareContext";
import { CompareDrawer } from "@/components/organisms/CompareDrawer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gonzales & CIA | Tienda de Ropa Online",
  description: "Explora la mejor selección de moda y alta costura en nuestra tienda de ropa online. Gonzales & CIA ofrece colecciones exclusivas de marcas asociadas y diseños de vanguardia para cada ocasión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased font-sans`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <CompareProvider>
                {children}
                <CompareDrawer />
              </CompareProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
