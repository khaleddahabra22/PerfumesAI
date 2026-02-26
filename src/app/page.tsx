'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import TrustSection from '@/components/home/TrustSection';
import CategorySection from '@/components/home/CategorySection';
import Newsletter from '@/components/home/Newsletter';
import ProductCard from '@/components/shop/ProductCard';
import { supabase } from '@/lib/supabase';
import { products as mockProducts, Product } from '@/data/products';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or('is_featured.eq.true,badge.eq.Best Seller')
          .limit(4);

        if (error) throw error;
        if (data && data.length > 0) {
          const mappedData = data.map(p => ({
            ...p,
            isFeatured: p.is_featured,
            reviews: p.reviews || 0,
          }));
          setProducts(mappedData);
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        <TrustSection />

        <CategorySection />

        {/* New Arrivals Horizontal Scroll */}
        <section className="py-24 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-gold font-bold uppercase tracking-widest text-xs mb-4 inline-block">Direct from the Studio</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white italic">Fresh Arrivals</h2>
              </div>
              <Link href="/shop?sort=newest" className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] group">
                Exploration <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

          <div className="relative group/scroll">
            <motion.div
              className="flex gap-8 px-[col-start] md:px-[calc((100vw-1280px)/2)] overflow-x-auto no-scrollbar scroll-smooth pb-12"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {products.slice(0, 6).map((product, idx) => (
                <div key={product.id} className="min-w-[280px] md:min-w-[320px] transition-transform duration-500 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Products / Best Sellers Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-gold font-bold uppercase tracking-widest text-xs mb-4 inline-block">Calgary Favorites</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">Trending Now</h2>
              </div>
              <Link href="/shop" className="text-sm font-bold border-b-2 border-white pb-1 hover:text-white transition-all group">
                Shop the Look
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-accent/20 gap-4">
                  <Loader2 size={48} className="animate-spin" />
                  <p className="text-xs font-bold uppercase tracking-widest">Loading Favorites...</p>
                </div>
              ) : (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Speciality Subsection */}
        <section className="py-24 bg-accent relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
              alt="Perfume Lab"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white space-y-8">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">Why Perfumes are Our Specialty</h2>
              <p className="text-lg text-white/70 italic font-light leading-relaxed">
                "Fragrance is the invisible garment that speaks volumes before a word is uttered. At Luxe Calgary,
                we believe every Calgarian deserves a signature scent that reflects their unique journey,
                from the peaks of the Rockies to the heart of downtown."
              </p>
              <div className="pt-4">
                <Link href="/about" className="px-10 py-5 bg-white text-black hover:bg-white/90 font-bold text-xs uppercase tracking-widest rounded-full transition-all inline-flex items-center gap-3">
                  Read Our Story <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
