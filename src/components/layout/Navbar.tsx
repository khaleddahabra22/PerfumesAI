'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, Heart, MapPin, User as UserIcon, LogOut } from 'lucide-react';

export default function Navbar() {
    const { cartCount } = useCart();
    const { wishlist } = useWishlist();
    const { user, signOut } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Perfumes', href: '/shop?category=Perfumes' },
        { name: 'Skincare', href: '/shop?category=Skincare' },
        { name: 'Gifts', href: '/shop?category=Gifts' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <div className="bg-black text-white border-b border-border py-2 px-4 text-center text-xs font-medium tracking-wide">
                <div className="container mx-auto flex items-center justify-center gap-2">
                    <MapPin size={12} />
                    <span>FREE LOCAL DELIVERY IN CALGARY ON ORDERS OVER $75</span>
                </div>
            </div>

            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-background/90 backdrop-blur-md border-b border-border py-4Shadow-sm'
                    : 'bg-background py-6'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1 group">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg mb-0.5">L</div>
                        <span className="text-2xl font-heading font-bold tracking-tight text-white">Luxe Calgary</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <button className="hidden sm:block text-foreground/80 hover:text-accent transition-colors">
                            <Search size={20} />
                        </button>
                        <Link href="/wishlist" className="relative text-foreground/80 hover:text-accent transition-colors">
                            <Heart size={20} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link href={user ? "/account" : "/login"} className="hidden sm:block text-foreground/80 hover:text-accent transition-colors">
                            <UserIcon size={20} />
                        </Link>
                        <Link href="/cart" className="relative text-foreground/80 hover:text-accent transition-colors">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-background md:hidden"
                    >
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-12">
                                <span className="text-2xl font-heading font-bold text-accent">Luxe Calgary</span>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={28} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-light hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    href={user ? "/account" : "/login"}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-light hover:text-accent transition-colors flex items-center gap-3"
                                >
                                    <UserIcon size={24} />
                                    {user ? "My Account" : "Sign In"}
                                </Link>
                                {user && (
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-2xl font-light text-red-500 hover:text-red-600 transition-colors flex items-center gap-3 text-left"
                                    >
                                        <LogOut size={24} />
                                        Sign Out
                                    </button>
                                )}
                            </div>

                            <div className="mt-auto pt-10 border-t border-border">
                                <p className="text-sm text-foreground/60 mb-4">Local Calgary Online Shop</p>
                                <div className="flex gap-4">
                                    {/* Social placeholders */}
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">I</div>
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">F</div>
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">T</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
