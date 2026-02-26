'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
    {
        name: 'Fine Fragrances',
        description: "The world's finest scents, curated for you.",
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
        href: '/shop?category=Perfumes',
        size: 'lg'
    },
    {
        name: 'Skincare',
        description: 'Artisan formulas for natural glow.',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
        href: '/shop?category=Skincare',
        size: 'sm'
    },
    {
        name: 'Gifts & Home',
        description: 'Thoughtful treasures for any occasion.',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
        href: '/shop?category=Gifts',
        size: 'sm'
    }
];

export default function CategorySection() {
    return (
        <section className="py-24 container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                <div className="max-w-2xl">
                    <span className="text-gold font-bold uppercase tracking-widest text-xs mb-4 inline-block">Curated Selections</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">Shop by Collection</h2>
                </div>
                <Link href="/shop" className="text-sm font-bold border-b-2 border-white pb-1 hover:text-white transition-all group">
                    View All Products
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative overflow-hidden rounded-2xl group ${cat.size === 'lg' ? 'md:col-span-2 lg:col-span-1' : ''}`}
                    >
                        <div className="aspect-[16/10] md:aspect-square lg:aspect-[4/5] overflow-hidden">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-gold mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                Shop Now
                            </span>
                            <h3 className="text-2xl font-heading font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                {cat.name}
                            </h3>
                            <p className="text-sm text-white/70 italic translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                {cat.description}
                            </p>
                            <Link href={cat.href} className="absolute inset-0" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
