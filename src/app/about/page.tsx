import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Sparkles, Heart, Globe, Award, MapPinned, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto space-y-24">

                        {/* Hero Section */}
                        <div className="text-center space-y-8">
                            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs">Our Heritage</span>
                            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white leading-tight">Founded in the Heart of Calgary</h1>
                            <p className="text-xl md:text-2xl text-foreground/60 italic font-light leading-relaxed max-w-3xl mx-auto">
                                "We believe that luxury shouldn't be a distant dream. It should be an everyday experience,
                                right here in our beautiful city."
                            </p>
                        </div>

                        {/* Story Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl shadow-accent/20">
                                <img
                                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop"
                                    alt="Luxe Calgary Boutique"
                                    className="w-full h-full object-cover scale-110"
                                />
                                <div className="absolute inset-0 bg-accent/20" />
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-heading font-bold text-white">Small Beginnings, Big Dreams.</h2>
                                    <p className="text-lg text-foreground/70 leading-relaxed font-light">
                                        Luxe Calgary started as a small personal project in a home studio in SW Calgary. Our mission
                                        was simple: to bring the world's most exquisite fragrances and lifestyle products to our
                                        neighbors without the astronomical price tags of high-end department stores.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl font-heading font-bold text-white">Why Perfumes?</h2>
                                    <p className="text-lg text-foreground/70 leading-relaxed font-light">
                                        For us, scent is memory. It's the crisp air of a winter morning in the Rockies, the
                                        warmth of a local coffee shop on 17th Ave, or the freshness of a summer breeze in Fish Creek Park.
                                        We specialize in perfumes because we want to help Calgarians create lasting, elegant memories.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Link href="/shop" className="px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/90 transition-all shadow-xl shadow-white/20">
                                        Shop Collection
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 pt-24 border-t border-border">
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-accent"><Award size={28} /></div>
                                <h3 className="text-2xl font-heading font-bold text-white">Affordable Quality</h3>
                                <p className="text-foreground/60 leading-relaxed font-light italic">
                                    We cut out the middlemen to bring you premium products that are accessible. Quality is our baseline, not a luxury.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-accent"><MapPinned size={28} /></div>
                                <h3 className="text-2xl font-heading font-bold text-white">Truly Local</h3>
                                <p className="text-foreground/60 leading-relaxed font-light italic">
                                    We aren't a massive chain. We live here, shop here, and serve here. Your local delivery supports a local family.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-accent"><Heart size={28} /></div>
                                <h3 className="text-2xl font-heading font-bold text-white">Customer First</h3>
                                <p className="text-foreground/60 leading-relaxed font-light italic">
                                    If you aren't wowed by your purchase, we aren't satisfied. Our return policy is as simple as our mission.
                                </p>
                            </div>
                        </div>

                        {/* Stats / Impact */}
                        <div className="bg-black border border-border rounded-[3rem] p-16 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
                                <div className="space-y-2">
                                    <p className="text-5xl font-heading font-bold text-gold">2,500+</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">Happy Calgarians</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-5xl font-heading font-bold text-gold">200+</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">Exquisite Products</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-5xl font-heading font-bold text-gold">2yr</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">Community Roots</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-5xl font-heading font-bold text-gold">1hr</p>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">Avg. Response Time</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center py-20 border-t border-border space-y-8">
                            <h2 className="text-5xl font-heading font-bold text-white leading-tight">Ready to find your <br /> next favorite thing?</h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/shop?category=Perfumes" className="px-12 py-5 bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gold/90 transition-all">
                                    Discover Perfumes
                                </Link>
                                <Link href="/contact" className="px-12 py-5 bg-muted text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-border transition-all">
                                    Say Hello
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
