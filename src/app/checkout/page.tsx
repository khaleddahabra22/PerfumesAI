'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Truck, Store, ChevronRight, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StripeProvider from '@/components/checkout/StripeProvider';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
    const { cart, cartTotal, cartCount } = useCart();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totals, setTotals] = useState<any>(null);

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        suite: '',
        postalCode: '',
        phone: '',
    });

    // Auto-fill from logged-in user
    useEffect(() => {
        if (user) {
            const meta = user.user_metadata;
            setAddress(prev => ({
                ...prev,
                email: prev.email || user.email || '',
                firstName: prev.firstName || meta?.full_name?.split(' ')[0] || '',
                lastName: prev.lastName || meta?.full_name?.split(' ').slice(1).join(' ') || '',
            }));
        }
    }, [user]);

    useEffect(() => {
        if (cartCount > 0) {
            createPaymentIntent();
        } else {
            setIsLoading(false);
        }
    }, [cartCount, deliveryMethod]);

    const createPaymentIntent = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
                    deliveryMethod,
                    customerEmail: address.email || user?.email || '',
                    customerName: `${address.firstName} ${address.lastName}`.trim() || user?.user_metadata?.full_name || '',
                }),
            });

            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setClientSecret(data.clientSecret);
                setTotals(data.totals);
            }
        } catch (err) {
            setError('Failed to initialize payment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (cartCount === 0 && !isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center space-y-8">
                <h2 className="text-4xl font-heading">Your bag is empty.</h2>
                <Link href="/shop" className="px-12 py-5 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-full">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />

            <main className="flex-grow py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12">
                            <h1 className="text-4xl font-heading font-bold mb-2 text-white">Checkout</h1>
                            <p className="text-gray-400">Securely complete your boutique order</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Left Side: Forms */}
                            <div className="lg:col-span-7 space-y-12">

                                {/* Delivery Method */}
                                <section className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                        <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">1</span>
                                        Delivery Method
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setDeliveryMethod('delivery')}
                                            className={`p-6 rounded-2xl border-2 transition-all text-left ${deliveryMethod === 'delivery' ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                                        >
                                            <Truck className={`mb-4 ${deliveryMethod === 'delivery' ? 'text-white' : 'text-gray-600'}`} />
                                            <p className="font-bold text-sm uppercase tracking-wider text-white">Local Delivery</p>
                                            <p className="text-xs text-gray-400">Calgary Area (2-4 Days)</p>
                                        </button>
                                        <button
                                            onClick={() => setDeliveryMethod('pickup')}
                                            className={`p-6 rounded-2xl border-2 transition-all text-left ${deliveryMethod === 'pickup' ? 'border-white bg-white/5' : 'border-white/10 hover:border-white/30'}`}
                                        >
                                            <Store className={`mb-4 ${deliveryMethod === 'pickup' ? 'text-white' : 'text-gray-600'}`} />
                                            <p className="font-bold text-sm uppercase tracking-wider text-white">Boutique Pickup</p>
                                            <p className="text-xs text-gray-400">Ready in 2 Hours</p>
                                        </button>
                                    </div>
                                </section>

                                {/* Contact & Shipping */}
                                <section className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                        <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">2</span>
                                        {deliveryMethod === 'delivery' ? 'Shipping Address' : 'Contact Information'}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors text-white placeholder:text-gray-500"
                                            placeholder="First Name"
                                            value={address.firstName}
                                            onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                                        />
                                        <input
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors text-white placeholder:text-gray-500"
                                            placeholder="Last Name"
                                            value={address.lastName}
                                            onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                                        />
                                        <input
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors sm:col-span-2 text-white placeholder:text-gray-500"
                                            placeholder="Email Address"
                                            type="email"
                                            value={address.email}
                                            onChange={(e) => setAddress({ ...address, email: e.target.value })}
                                        />
                                        {deliveryMethod === 'delivery' && (
                                            <>
                                                <input className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors sm:col-span-2 text-white placeholder:text-gray-500" placeholder="Street Address" />
                                                <input className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors text-white placeholder:text-gray-500" placeholder="Suite / Apt" />
                                                <input className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors text-white placeholder:text-gray-500" placeholder="Postal Code (T2X 0X0)" />
                                            </>
                                        )}
                                        <input className="p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-white transition-colors sm:col-span-2 text-white placeholder:text-gray-500" placeholder="Phone Number" />
                                    </div>
                                </section>

                                {/* Payment */}
                                <section className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                        <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">3</span>
                                        Payment
                                    </h3>
                                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                                        {isLoading ? (
                                            <div className="flex flex-col items-center py-12 space-y-4">
                                                <Loader2 className="w-8 h-8 animate-spin text-white" />
                                                <p className="text-sm text-white font-medium">Initializing secure payment...</p>
                                            </div>
                                        ) : error ? (
                                            <div className="text-red-400 bg-red-950/30 p-4 rounded-xl text-center text-sm border border-red-900/50">
                                                {error}
                                                <button onClick={createPaymentIntent} className="block mx-auto mt-2 underline font-bold">Try again</button>
                                            </div>
                                        ) : clientSecret && (
                                            <StripeProvider clientSecret={clientSecret}>
                                                <CheckoutForm
                                                    amount={totals?.total || 0}
                                                    customerEmail={address.email || user?.email || undefined}
                                                />
                                                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-gray-500">
                                                    <Lock size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">SSL Encrypted Payment</span>
                                                </div>
                                            </StripeProvider>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Right Side: Summary */}
                            <div className="lg:col-span-5">
                                <div className="bg-white/5 text-white p-10 rounded-[2.5rem] sticky top-32 space-y-10 border border-white/10 shadow-2xl backdrop-blur-sm">
                                    <h3 className="text-2xl font-heading font-bold">Order Summary</h3>

                                    <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-16 h-20 bg-muted border border-border rounded-lg overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-sm font-bold">{item.name}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category} × {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-10 border-t border-border space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 italic">Subtotal</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 italic">Delivery ({deliveryMethod})</span>
                                            <span>{totals ? `$${(totals.shipping / 100).toFixed(2)}` : 'Calculated next'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 italic">Estimated Tax (GST 5%)</span>
                                            <span>{totals ? `$${(totals.tax / 100).toFixed(2)}` : 'Calculated next'}</span>
                                        </div>
                                        <div className="flex justify-between items-end pt-4">
                                            <span className="text-xl font-bold">Total</span>
                                            <span className="text-3xl font-bold text-white">
                                                {totals ? `$${(totals.total / 100).toFixed(2)}` : '...'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
