'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-[90vh] md:h-[85vh] min-h-[600px] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Perfume Collection"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-2xl text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <span className="w-12 h-0.5 bg-gold" />
                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Local Calgary Boutique</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-[1.1]"
                    >
                        Elevate Your <br />
                        <span className="text-accent-foreground italic">Signature Scent</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed font-light"
                    >
                        Discover a curated collection of premium fragrances, artisanal skincare, and unique lifestyle gifts.
                        Calgary's destination for elegance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/shop"
                                className="px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3 shadow-xl hover:bg-black hover:text-white border border-white"
                            >
                                Shop Collection <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/shop?category=Perfumes"
                                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3"
                            >
                                Visit Perfume Bar
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="mt-16 flex items-center gap-4 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border border-background bg-muted overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <span>Loved by 500+ Calgarians</span>
                    </motion.div>
                </div>
            </div>

            {/* Trust Scroll */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-0.5 h-12 bg-white/20"
                >
                    <div className="w-full h-1/2 bg-accent" />
                </motion.div>
            </div>
        </section>
    );
}
