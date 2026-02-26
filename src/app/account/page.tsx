'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    User,
    Settings,
    ShoppingBag,
    Heart,
    LogOut,
    Package,
    MapPin,
    CreditCard,
    Loader2,
    ChevronRight,
    Clock
} from 'lucide-react';

export default function AccountPage() {
    const { user, signOut, isLoading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<{ username: string, full_name: string } | null>(null);
    const [fetchingProfile, setFetchingProfile] = useState(true);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchProfile();
        }
    }, [user, isLoading, router]);

    async function fetchProfile() {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, full_name')
                .eq('id', user.id)
                .maybeSingle();

            if (error) {
                console.error('Supabase fetch error:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    hint: error.hint
                });
                return;
            }

            if (data) {
                setProfile(data);
            } else {
                console.log('No profile record found for user:', user.id);
            }
        } catch (err: any) {
            console.error('Unexpected error in fetchProfile:', err);
        } finally {
            setFetchingProfile(false);
        }
    }

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    if (isLoading || (user && fetchingProfile)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center gap-6">
                <Loader2 size={64} className="animate-spin text-white/20" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Authenticating...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />

            <main className="flex-grow pt-10 pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-border">
                            <div className="space-y-4">
                                <span className="text-gold font-bold uppercase tracking-widest text-xs">Member Dashboard</span>
                                <h1 className="text-5xl md:text-6xl font-heading font-bold text-white italic">
                                    Hello, {profile?.full_name?.split(' ')[0] || profile?.username || 'Guest'}
                                </h1>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/40 hover:text-red-500 transition-colors group"
                            >
                                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Sign Out
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Sidebar / Stats */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-black rounded-3xl p-8 border border-border shadow-xl">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            {(profile?.full_name?.[0] || profile?.username?.[0] || 'U').toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-xl text-white">{profile?.full_name || 'Set Name'}</h3>
                                            <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">@{profile?.username || 'username'}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-border">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-foreground/40">Email</span>
                                            <span className="font-medium">{user.email}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-foreground/40">Member Since</span>
                                            <span className="font-medium text-white">{new Date(user.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button className="bg-white/5 p-6 rounded-2xl border border-border hover:border-white transition-colors flex flex-col items-center gap-3">
                                        <ShoppingBag size={24} className="text-white" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Orders</span>
                                    </button>
                                    <button
                                        onClick={() => router.push('/wishlist')}
                                        className="bg-white/5 p-6 rounded-2xl border border-border hover:border-white transition-colors flex flex-col items-center gap-3"
                                    >
                                        <Heart size={24} className="text-white" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Wishlist</span>
                                    </button>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="lg:col-span-8 space-y-12">
                                {/* Order History Section (Placeholder) */}
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-heading font-bold text-white">Recent Orders</h2>
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-white underline hover:text-gold transition-colors">View All</button>
                                    </div>

                                    <div className="bg-black rounded-3xl border border-border overflow-hidden">
                                        <div className="p-12 text-center space-y-6">
                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-foreground/20">
                                                <Package size={32} />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-lg font-bold text-white">No orders yet</h4>
                                                <p className="text-sm text-foreground/40 max-w-xs mx-auto italic">
                                                    Your exquisite purchases will appear here once you place your first order.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => router.push('/shop')}
                                                className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-black hover:text-white border border-white transition-all shadow-lg"
                                            >
                                                Explore Shop
                                            </button>
                                        </div>
                                    </div>
                                </section>

                                {/* Quick Settings / Info */}
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-3xl border border-border hover:border-white transition-all group cursor-pointer bg-black text-white">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                                                <MapPin size={24} />
                                            </div>
                                            <ChevronRight size={20} className="text-foreground/20 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">Shipping Addresses</h4>
                                        <p className="text-xs text-foreground/40 uppercase tracking-widest leading-loose font-bold">Manage your delivery locations</p>
                                    </div>

                                    <div className="p-8 rounded-3xl border border-border hover:border-white transition-all group cursor-pointer bg-black text-white">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                                                <CreditCard size={24} />
                                            </div>
                                            <ChevronRight size={20} className="text-foreground/20 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2">Payment Methods</h4>
                                        <p className="text-xs text-foreground/40 uppercase tracking-widest leading-loose font-bold">Securely stored for faster checkout</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
