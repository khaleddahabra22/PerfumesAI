'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ChevronRight, Truck, Store, MapPin, CreditCard, ChevronLeft, Minus, Plus, X, Tag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
    const [orderStep, setOrderStep] = useState<'cart' | 'delivery' | 'payment'>('cart');
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

    const shippingFee = deliveryMethod === 'delivery' ? (cartTotal > 75 ? 0 : 12.00) : 0;
    const gst = cartTotal * 0.05;
    const total = cartTotal + shippingFee + gst;

    const [checkoutComplete, setCheckoutComplete] = useState(false);

    if (checkoutComplete) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center space-y-8">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent animate-bounce">
                    <ShoppingBag size={48} />
                </div>
                <h1 className="text-5xl font-heading font-bold text-accent">Thank you for your order!</h1>
                <p className="text-xl text-foreground/60 italic font-light max-w-lg">
                    Your order has been placed successfully. A confirmation email has been sent to you.
                    {deliveryMethod === 'delivery' ? 'Expect your delivery in 2-4 business days.' : 'Your order will be ready for pickup in 2 hours.'}
                </p>
                <Link href="/shop" className="px-12 py-5 bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-full">
                    Continue Shopping
                </Link>
                <Link href="/" className="text-sm font-bold text-accent underline">Back to Homepage</Link>
            </div>
        );
    }

    if (cartCount === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-20 text-center space-y-8">
                    <img
                        src="https://images.unsplash.com/photo-1586769852044-692d6e3703a0?q=80&w=400&auto=format&fit=crop"
                        alt="Empty Cart"
                        className="w-48 h-48 object-cover rounded-full grayscale opacity-20"
                    />
                    <h2 className="text-4xl font-heading">Your shopping bag is empty.</h2>
                    <Link href="/shop" className="px-12 py-5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-full">
                        Find Something Special
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Header / Steps */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-border">
                            <div className="space-y-4">
                                <span className="text-gold font-bold uppercase tracking-widest text-xs">Your Selection</span>
                                <h1 className="text-5xl md:text-6xl font-heading font-bold text-white">Shopping Bag</h1>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Left Column: Cart Content or Forms */}
                            <div className="lg:col-span-7 space-y-12">
                                <AnimatePresence mode="wait">
                                    {orderStep === 'cart' && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-8"
                                        >
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex gap-6 pb-8 border-b border-border group">
                                                    <div className="w-24 sm:w-32 aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-lg shadow-accent/5">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                                    </div>
                                                    <div className="flex-grow flex flex-col justify-between py-2">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div className="space-y-1">
                                                                <Link href={`/product/${item.id}`} className="font-heading font-bold text-xl hover:text-accent transition-colors">{item.name}</Link>
                                                                <p className="text-xs text-foreground/40 italic uppercase tracking-widest font-medium">{item.category}</p>
                                                            </div>
                                                            <button onClick={() => removeFromCart(item.id)} className="text-foreground/40 hover:text-red-500 transition-colors">
                                                                <X size={18} />
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-between items-end">
                                                            <div className="flex items-center bg-muted/50 rounded-xl border border-border overflow-hidden scale-90 -ml-2">
                                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-accent/10"><Minus size={14} /></button>
                                                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-accent/10"><Plus size={14} /></button>
                                                            </div>
                                                            <p className="font-medium text-lg text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-8">
                                                <Link
                                                    href="/checkout"
                                                    className="w-full py-6 bg-black border border-white text-white font-bold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-white hover:text-black transition-all"
                                                >
                                                    Proceed to Checkout <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right Column: Order Summary */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="bg-muted p-8 rounded-3xl space-y-8 sticky top-32 border border-border shadow-2xl shadow-accent/5">
                                    <h3 className="font-heading font-bold text-2xl text-white pb-6 border-b border-border">Order Summary</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-foreground/60 italic">Subtotal ({cartCount} items)</span>
                                            <span className="font-bold">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-foreground/60 italic">
                                                Delivery {deliveryMethod === 'pickup' && '(Pickup)'}
                                            </span>
                                            <span className="font-bold">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-foreground/60 italic">Taxes (GST 5%)</span>
                                            <span className="font-bold">${gst.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-border space-y-6">
                                        <div className="flex items-center gap-3 bg-black border border-border p-2 rounded-xl">
                                            <div className="p-3 bg-white/10 rounded-lg text-white"><Tag size={16} /></div>
                                            <input placeholder="Promo Code" className="bg-transparent text-sm font-bold uppercase tracking-widest outline-none flex-grow text-white placeholder:text-foreground/40" />
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-black px-4 py-2 bg-white rounded-lg hover:bg-black hover:text-white transition-all shadow-sm">Apply</button>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-heading font-bold text-white">Total (CAD)</span>
                                            <span className="text-3xl font-elegant font-bold text-gold">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {deliveryMethod === 'delivery' && (
                                        <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl flex items-start gap-3">
                                            <Truck size={18} className="text-accent mt-0.5" />
                                            <p className="text-[10px] text-accent font-bold uppercase leading-relaxed tracking-wider">
                                                {cartTotal > 75
                                                    ? 'CALGARY FREE DELIVERY APPLIED 🎉'
                                                    : `ADD $${(75 - cartTotal).toFixed(2)} MORE FOR FREE CALGARY DELIVERY`}
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-foreground/40 mb-2">
                                            <ShieldCheck size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Local Checkout</span>
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
