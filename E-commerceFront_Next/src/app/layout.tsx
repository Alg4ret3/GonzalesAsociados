import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/UserContext";
import { CompareProvider } from "@/context/CompareContext";
import { CompareDrawer } from "@/components/organisms/CompareDrawer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GonzalesAsociados | Alta Costura & Elegancia",
  description: "Descubre la exclusividad en moda contemporánea. GonzalesAsociados redefine la elegancia con colecciones de lujo y diseño de vanguardia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} antialiased font-sans`}>
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
