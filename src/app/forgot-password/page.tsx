'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;
            setIsSent(true);
        } catch (err: any) {
            console.error('Reset error:', err);
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-accent/5 border border-border"
                    >
                        <div className="text-center mb-10 space-y-2">
                            <span className="text-gold font-bold uppercase tracking-widest text-xs">Security first</span>
                            <h1 className="text-4xl font-heading font-bold text-accent italic">Reset Password</h1>
                            <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em] pt-4">
                                {isSent ? "Email Sent!" : "Enter your email to receive a recovery link."}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wide">
                                {error}
                            </div>
                        )}

                        {!isSent ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-accent transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@email.com"
                                            className="w-full pl-11 pr-4 py-4 bg-muted/30 border border-border rounded-2xl outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/20 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            <Send size={18} /> Send Reset Link
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="py-8 text-foreground/60 text-sm leading-relaxed">
                                    We've sent an email to <span className="text-accent font-bold">{email}</span> with instructions to reset your password.
                                    Please check your inbox (and spam folder).
                                </div>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest hover:underline"
                                >
                                    <ArrowLeft size={16} /> Back to Sign In
                                </Link>
                            </div>
                        )}

                        {!isSent && (
                            <div className="mt-8 text-center text-xs text-foreground/40 font-bold uppercase tracking-widest">
                                <Link href="/login" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
                                    <ArrowLeft size={16} /> Back to Sign In
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
