'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Star, Truck, ShieldCheck, CornerUpLeft, Plus, Minus, ShoppingBag, Heart, Share2, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const isFav = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (isFav) removeFromWishlist(product.id);
        else addToWishlist(product);
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow pt-10 pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-12 overflow-x-auto no-scrollbar py-2">
                        <button onClick={() => router.push('/')} className="hover:text-accent whitespace-nowrap transition-colors">Home</button>
                        <span>/</span>
                        <button onClick={() => router.push(`/shop?category=${product.category}`)} className="hover:text-accent whitespace-nowrap transition-colors">{product.category}</button>
                        <span>/</span>
                        <span className="text-foreground whitespace-nowrap">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Image Gallery */}
                        <div className="lg:col-span-7 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted relative group shadow-2xl shadow-accent/5 lg:sticky lg:top-24"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />

                                {product.badge && (
                                    <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-[0.2em]">
                                        {product.badge}
                                    </span>
                                )}

                                <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-accent transition-all">
                                    <Share2 size={18} />
                                </button>
                            </motion.div>
                        </div>

                        {/* Product Details Info */}
                        <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24">
                            {/* Header Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                                    <span>Premium {product.category}</span>
                                    <div className="h-4 w-[1px] bg-border" />
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="fill-gold text-gold" />
                                        <span>{product.rating}</span>
                                        <span className="opacity-50">({product.reviews} Reviews)</span>
                                    </div>
                                </div>

                                <h1 className="text-5xl font-heading font-bold text-accent leading-tight">{product.name}</h1>

                                <p className="text-3xl font-medium text-gold font-elegant tracking-tight">
                                    ${product.price.toFixed(2)} <span className="text-sm font-sans uppercase">CAD</span>
                                </p>
                            </div>

                            {/* Description */}
                            <div className="space-y-4 pt-6 border-t border-border">
                                <h3 className="font-bold uppercase tracking-widest text-xs opacity-40">Description</h3>
                                <p className="text-lg text-foreground/70 leading-relaxed font-light italic">
                                    {product.description}
                                </p>
                                <p className="text-sm text-foreground/60 leading-relaxed">
                                    A testament to refined taste, this item is part of our curated {product.category} collection.
                                    Hand-picked for the discerning Calgary local who appreciates both style and substance.
                                </p>
                            </div>

                            {/* Size Selection */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold uppercase tracking-widest text-xs opacity-40">Select Size</h3>
                                        <button className="text-[10px] uppercase font-bold text-accent hover:underline">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-8 py-3 rounded-xl border-2 text-sm font-bold transition-all ${selectedSize === size
                                                    ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20'
                                                    : 'border-border bg-transparent hover:border-gold/30 hover:bg-gold/5'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="space-y-6 pt-6 ">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-muted/50 rounded-2xl border border-border overflow-hidden">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="p-4 hover:bg-accent/10 transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="p-4 hover:bg-accent/10 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={toggleWishlist}
                                        className={`flex-grow flex items-center justify-center gap-3 transition-colors ${isFav ? 'text-accent' : 'text-foreground/40 hover:text-accent'
                                            }`}
                                    >
                                        <Heart size={24} className={isFav ? 'fill-current' : ''} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">
                                            {isFav ? 'In Wishlist' : 'Add to wishlist'}
                                        </span>
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-6 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 active:scale-95"
                                    >
                                        <ShoppingBag size={18} />
                                        Add to Shopping Bag
                                    </button>
                                    <button className="w-full py-6 bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-gold/90 transition-all flex items-center justify-center gap-3 active:scale-95">
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            {/* Calgary Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-border">
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <Truck size={20} className="text-accent" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Local Delivery</h4>
                                    <p className="text-[9px] text-foreground/40 uppercase tracking-tighter">Calgary AB only</p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <MapPin size={20} className="text-accent" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Free Pickup</h4>
                                    <p className="text-[9px] text-foreground/40 uppercase tracking-tighter">Order ready in 2h</p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <CornerUpLeft size={20} className="text-accent" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Easy Returns</h4>
                                    <p className="text-[9px] text-foreground/40 uppercase tracking-tighter">14 Day Policy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-40 space-y-12">
                            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                                <div className="max-w-2xl">
                                    <span className="text-gold font-bold uppercase tracking-widest text-xs mb-4 inline-block">Curated Suggestions</span>
                                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent italic">You May Also Exquisite</h2>
                                </div>
                                <button onClick={() => router.push('/shop')} className="text-sm font-bold border-b-2 border-accent pb-1 hover:text-accent transition-all group">
                                    Explore Collection
                                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map(rel => (
                                    <ProductCard key={rel.id} product={rel} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
