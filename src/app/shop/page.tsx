'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { supabase } from '@/lib/supabase';
import { products as mockProducts, Product } from '@/data/products';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { Suspense, useEffect } from 'react';

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');

    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) throw error;
                if (data && data.length > 0) {
                    // Map Supabase snake_case to our CamelCase if needed, 
                    // or just ensure schema matches. In our SQL we used is_featured.
                    const mappedData = data.map(p => ({
                        ...p,
                        isFeatured: p.is_featured,
                        reviews: p.reviews || 0,
                    }));
                    setProducts(mappedData);
                }
            } catch (err) {
                console.error('Error fetching from Supabase:', err);
                // Fallback to mockProducts is already the default state
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const categories = ['All', 'Perfumes', 'Skincare', 'Gadgets', 'Gifts', 'Trending'];

    const filteredProducts = useMemo(() => {
        let result = products;

        if (activeCategory && activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortOrder === 'price-asc') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeCategory, searchTerm, sortOrder]);

    return (
        <div className="min-h-screen flex flex-col pt-10">
            <div className="container mx-auto px-4 md:px-6 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-12 border-b border-border">
                    <div className="space-y-4">
                        <span className="text-gold font-bold uppercase tracking-widest text-xs">Explore Our Collections</span>
                        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white">Store Collection</h1>
                        <p className="text-foreground/60 max-w-lg italic">
                            Carefully curated essentials for the modern lifestyle. Fast local delivery across Calgary.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-grow sm:w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all"
                            />
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                        </div>

                        <div className="relative flex-grow sm:w-48 group">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as any)}
                                className="w-full appearance-none pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-accent transition-all cursor-pointer"
                            >
                                <option value="newest">Sort By: Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                            <SlidersHorizontal size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none transition-transform group-hover:rotate-180" />
                        </div>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-4 py-8 overflow-x-auto no-scrollbar scroll-smooth">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat || (cat === 'All' && !activeCategory)
                                ? 'bg-white text-black shadow-lg shadow-white/20 scale-105'
                                : 'bg-muted text-foreground/60 hover:bg-border'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-10 text-xs font-bold uppercase tracking-widest text-foreground/40">
                    <div className="flex items-center gap-2">
                        <span>Showing {filteredProducts.length} Results</span>
                        {loading && <Loader2 size={12} className="animate-spin text-accent" />}
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border border-dashed border-border rounded-3xl">
                        <h3 className="text-2xl font-heading mb-4 text-accent/60 italic">No products matched your search.</h3>
                        <button
                            onClick={() => { setActiveCategory(null); setSearchTerm(''); }}
                            className="text-sm font-bold text-gold underline underline-offset-4"
                        >
                            Clear filters and show all
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<div className="container mx-auto p-20 text-center">Loading collection...</div>}>
                <ShopContent />
            </Suspense>
            <Footer />
        </>
    );
}
