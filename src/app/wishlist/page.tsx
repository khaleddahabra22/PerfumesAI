'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-border">
                            <div className="space-y-4">
                                <span className="text-gold font-bold uppercase tracking-widest text-xs">Your Curated Collection</span>
                                <h1 className="text-5xl md:text-6xl font-heading font-bold text-accent">Wishlist</h1>
                            </div>
                            <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest">
                                {wishlist.length} Items Saved
                            </p>
                        </div>

                        {wishlist.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                                {wishlist.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center space-y-8">
                                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto text-foreground/20">
                                    <Heart size={48} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-heading italic text-accent/60">Your wishlist is looking lonely.</h3>
                                    <p className="text-foreground/40 max-w-sm mx-auto">
                                        Explore our collections and save your favorite items to keep an eye on them.
                                    </p>
                                </div>
                                <Link href="/shop" className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-accent/90 transition-all shadow-xl shadow-accent/10">
                                    <ShoppingBag size={16} /> Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
