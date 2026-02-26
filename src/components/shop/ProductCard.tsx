'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isFav = isInWishlist(product.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFav) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="group bg-black border border-border rounded-xl overflow-hidden hover:border-white transition-all duration-500"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Link href={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Badges */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.badge === 'New' ? 'bg-white text-black' :
                            product.badge === 'Sale' ? 'bg-red-600 text-white' :
                                'bg-gold text-white'
                            }`}>
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Action icons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={toggleWishlist}
                        className={`w-9 h-9 border border-border rounded-full flex items-center justify-center transition-colors shadow-sm ${isFav ? 'bg-white text-black border-white' : 'bg-black text-white hover:bg-white hover:text-black'
                            }`}
                    >
                        <Heart size={16} className={isFav ? 'fill-current' : ''} />
                    </button>
                </div>

                {/* Quick Add Button */}
                <div className="absolute inset-x-4 bottom-4 z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full py-3 bg-black border border-white text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 rounded-lg backdrop-blur-sm"
                    >
                        <ShoppingBag size={14} />
                        Quick Add
                    </button>
                </div>
            </div>

            <div className="p-5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <Link href={`/shop?category=${product.category}`}>
                        <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold hover:text-white transition-colors">
                            {product.category}
                        </span>
                    </Link>
                    <div className="flex items-center gap-1 text-[10px] font-bold">
                        <Star size={10} className="fill-gold text-gold" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`}>
                    <h3 className="font-heading font-bold text-lg leading-tight group-hover:text-white transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xl font-medium text-white">
                    ${product.price.toFixed(2)} <span className="text-xs uppercase ml-0.5">CAD</span>
                </p>
            </div>
        </motion.div>
    );
}
