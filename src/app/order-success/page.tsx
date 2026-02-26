'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, Package, Truck, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentIntent = searchParams.get('payment_intent');
    const email = searchParams.get('email');
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on successful reach of this page
        clearCart();

        // In a real app, you might fetch the order details from your DB using the payment_intent id
        // or wait for the webhook to create it. For this demo, we'll poll for the order or show a "processing" state.
        const fetchOrder = async () => {
            try {
                // This is a simplified fetch - normally you'd have an API route for this
                // For now we'll simulate a slight delay to allow webhook to process
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [paymentIntent]);

    return (
        <main className="flex-grow py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-12">

                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 text-green-500 rounded-full mb-8">
                        <CheckCircle2 size={48} />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-heading font-bold text-white">Payment Successful!</h1>
                        <p className="text-xl text-white/80 max-w-xl mx-auto italic font-light">
                            Your order has been received and is being prepared with care in our Calgary boutique.
                        </p>
                    </div>

                    <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 text-left space-y-8 shadow-2xl">
                        <div className="flex justify-between items-start border-b border-white/10 pb-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Order Status</p>
                                <div className="flex items-center gap-2 text-green-400 font-bold">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Confirmed & Paid
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Order ID</p>
                                <p className="font-mono text-sm">{paymentIntent?.slice(-12).toUpperCase() || 'PROCESSING...'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white">
                                    <Package size={20} className="text-gray-500" />
                                    <h3 className="font-bold">Next Steps</h3>
                                </div>
                                <ul className="text-sm text-white/60 space-y-2">
                                    <li className="flex items-center gap-2">• Confirmation email sent {email ? `to ${email}` : ''}</li>
                                    <li className="flex items-center gap-2">• Preparing your items</li>
                                    <li className="flex items-center gap-2">• Tracking info to follow</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white">
                                    <Truck size={20} className="text-gray-500" />
                                    <h3 className="font-bold">Delivery Info</h3>
                                </div>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Standard Calgary delivery usually takes 2-4 business days. You'll be notified when it ships.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/shop" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-black hover:text-white border border-white transition-all flex items-center gap-2 shadow-xl">
                            Return to Boutique <ArrowRight size={14} />
                        </Link>
                        <Link href="/" className="text-sm font-bold text-white hover:opacity-70 transition-colors underline underline-offset-8">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Navbar />
            <Suspense fallback={
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-gray-200" />
                </div>
            }>
                <SuccessContent />
            </Suspense>
            <Footer />
        </div>
    );
}
