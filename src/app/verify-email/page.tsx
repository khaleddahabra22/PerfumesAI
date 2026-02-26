'use client';

import React, { useState, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email') || '';
    const [isLoading, setIsLoading] = useState(false);
    const [resent, setResent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleResend = async () => {
        if (!email) return;
        setIsLoading(true);
        setError(null);
        try {
            const { error: resendError } = await supabase.auth.resend({
                type: 'signup',
                email: email,
            });
            if (resendError) throw resendError;
            setResent(true);
            setTimeout(() => setResent(false), 5000);
        } catch (err: any) {
            setError(err.message || 'Failed to resend email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-grow flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black rounded-3xl p-8 md:p-12 shadow-2xl border border-border text-center"
                >
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-white mb-8">
                        <Mail size={40} />
                    </div>

                    <h1 className="text-4xl font-heading font-bold text-white mb-4">Check your email</h1>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-10">
                        We have sent a verification link to <br />
                        <span className="text-white font-bold">{email || 'your email'}</span>. <br />
                        Please click the link to confirm your account.
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={handleResend}
                            disabled={isLoading || resent}
                            className={`w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 border ${resent
                                    ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                    : 'bg-white text-black border-white hover:bg-black hover:text-white'
                                }`}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : resent ? (
                                <>
                                    <CheckCircle2 size={18} /> Email Sent
                                </>
                            ) : (
                                'Resend Email'
                            )}
                        </button>

                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={14} /> Back to Sign In
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <Suspense fallback={
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={32} />
                </div>
            }>
                <VerifyEmailContent />
            </Suspense>
            <Footer />
        </div>
    );
}
