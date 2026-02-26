import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted text-foreground pt-16 pb-8 border-t border-border mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Logo and About */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-1">
                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg mb-0.5">L</div>
                            <span className="text-2xl font-heading font-bold text-accent">Luxe Calgary</span>
                        </Link>
                        <p className="text-foreground/60 leading-relaxed text-sm">
                            Your local Calgary destination for premium fragrances, curated skincare, and unique lifestyle gifts.
                            Small business, big service.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Instagram size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                                <Twitter size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-accent">Quick Links</h4>
                        <ul className="space-y-3 flex flex-col">
                            <Link href="/shop" className="text-sm hover:text-accent transition-colors">Shop All</Link>
                            <Link href="/shop?category=Perfumes" className="text-sm hover:text-accent transition-colors">Perfumes</Link>
                            <Link href="/shop?category=Skincare" className="text-sm hover:text-accent transition-colors">Skincare</Link>
                            <Link href="/shop?category=Gifts" className="text-sm hover:text-accent transition-colors">Gift Sets</Link>
                            <Link href="/about" className="text-sm hover:text-accent transition-colors">Our Story</Link>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-accent">Customer Care</h4>
                        <ul className="space-y-3 flex flex-col">
                            <Link href="/policies/shipping" className="text-sm hover:text-accent transition-colors">Shipping & Delivery</Link>
                            <Link href="/policies/returns" className="text-sm hover:text-accent transition-colors">Returns & Refunds</Link>
                            <Link href="/policies/privacy" className="text-sm hover:text-accent transition-colors">Privacy Policy</Link>
                            <Link href="/policies/terms" className="text-sm hover:text-accent transition-colors">Terms & Conditions</Link>
                            <Link href="/contact" className="text-sm hover:text-accent transition-colors">FAQ</Link>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-accent">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-foreground/60 italic">Calgary, AB (Local Pickup Available)</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-accent flex-shrink-0" />
                                <p className="text-sm text-foreground/60">+1 (403) 000-0000</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-accent flex-shrink-0" />
                                <p className="text-sm text-foreground/60 italic">hello@luxecalgary.ca</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-foreground/40 font-medium tracking-wide">
                        &copy; {currentYear} LUXE CALGARY. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-4 grayscale opacity-50">
                        {/* Payment icons placeholders */}
                        <div className="text-xs font-bold border border-foreground/20 px-2 rounded">VISA</div>
                        <div className="text-xs font-bold border border-foreground/20 px-2 rounded">MASTERCARD</div>
                        <div className="text-xs font-bold border border-foreground/20 px-2 rounded">INTERAC</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
