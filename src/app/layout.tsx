import React from "react";
import type { Metadata } from "next";
import { Outfit, Bodoni_Moda } from "next/font/google";
import "./globals.css";

// Providers & Layout Components
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import PageWrapper from "@/components/layout/PageWrapper";
import AmbientBackground from "@/components/layout/AmbientBackground";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
});

export const metadata: Metadata = {
  title: "Luxe Calgary | Local Perfume & Lifestyle Shop",
  description: "Your local Calgary-based online shop for premium perfumes, skincare, and unique gifts. Fast local delivery and pickup available.",
  keywords: "Calgary online shop, Calgary perfume delivery, local Calgary gifts, Alberta skincare, luxury fragrances Canada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${bodoni.variable} font-sans antialiased`}
      >
        <CartProvider>
          <AuthProvider>
            <WishlistProvider>
              <AmbientBackground />
              <PageWrapper>
                {children}
              </PageWrapper>
            </WishlistProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
