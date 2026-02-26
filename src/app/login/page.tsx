'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn, User } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '', // email or username
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [lockoutTime, setLockoutTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Rate limiting configuration
    const MAX_ATTEMPTS = 5;
    const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes in ms

    React.useEffect(() => {
        const storedAttempts = localStorage.getItem(`login_attempts_${formData.identifier}`);
        const storedLockout = localStorage.getItem(`login_lockout_${formData.identifier}`);

        if (storedLockout) {
            const expiry = parseInt(storedLockout);
            if (Date.now() < expiry) {
                setLockoutTime(expiry);
                setTimeLeft(Math.ceil((expiry - Date.now()) / 1000));
            } else {
                localStorage.removeItem(`login_lockout_${formData.identifier}`);
                localStorage.removeItem(`login_attempts_${formData.identifier}`);
            }
        }

        if (storedAttempts) {
            setAttempts(parseInt(storedAttempts));
        }
    }, [formData.identifier]);

    React.useEffect(() => {
        if (!lockoutTime) return;

        const timer = setInterval(() => {
            const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
            if (remaining <= 0) {
                setLockoutTime(null);
                setAttempts(0);
                localStorage.removeItem(`login_lockout_${formData.identifier}`);
                localStorage.removeItem(`login_attempts_${formData.identifier}`);
                clearInterval(timer);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [lockoutTime, formData.identifier]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (lockoutTime) return;

        setIsLoading(true);
        setError(null);

        try {
            let email = formData.identifier;

            // If identifier is not an email, assume it's a username and look up the email
            if (!formData.identifier.includes('@')) {
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('email')
                    .eq('username', formData.identifier)
                    .maybeSingle();

                if (profileError || !profile || !profile.email) {
                    throw new Error('Invalid username or email');
                }

                email = profile.email;
            }

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: formData.password,
            });

            if (signInError) throw signInError;

            if (data.user) {
                localStorage.removeItem(`login_attempts_${formData.identifier}`);
                localStorage.removeItem(`login_lockout_${formData.identifier}`);
                router.push('/account');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem(`login_attempts_${formData.identifier}`, newAttempts.toString());

            if (newAttempts >= MAX_ATTEMPTS) {
                const expiry = Date.now() + LOCKOUT_DURATION;
                setLockoutTime(expiry);
                localStorage.setItem(`login_lockout_${formData.identifier}`, expiry.toString());
                setError(`Too many failed attempts. Try again in 30 minutes.`);
            } else {
                setError(err.message === 'Invalid username or email' ? err.message : `Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black rounded-3xl p-8 md:p-12 shadow-2xl border border-border"
                    >
                        <div className="text-center mb-10 space-y-2">
                            <span className="text-gold font-bold uppercase tracking-widest text-xs">Welcome back</span>
                            <h1 className="text-4xl font-heading font-bold text-white">Sign In</h1>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wide">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={async () => {
                                    setIsLoading(true);
                                    const { error } = await supabase.auth.signInWithOAuth({
                                        provider: 'google',
                                        options: {
                                            redirectTo: `${window.location.origin}/auth/callback`,
                                        },
                                    });
                                    if (error) {
                                        setError(error.message);
                                        setIsLoading(false);
                                    }
                                }}
                                disabled={isLoading}
                                className="w-full py-4 bg-white/5 border border-border rounded-2xl flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-border"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-foreground/20">or</span>
                                <div className="flex-grow border-t border-border"></div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email or Username */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Email or Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-white transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="identifier"
                                        value={formData.identifier}
                                        onChange={handleInputChange}
                                        placeholder="Enter email or username"
                                        className="w-full pl-11 pr-4 py-4 bg-white/5 border border-border rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Password</label>
                                    <Link href="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-white underline hover:text-gold transition-colors">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-white transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-4 bg-white/5 border border-border rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/20 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2 ml-1">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-border text-white focus:ring-white/20 transition-all cursor-pointer bg-transparent"
                                />
                                <label htmlFor="remember" className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 cursor-pointer select-none">
                                    Remember me for 30 days
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !!lockoutTime}
                                className="w-full py-5 mt-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white border border-white transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : lockoutTime ? (
                                    `Locked out for ${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`
                                ) : (
                                    <>
                                        <LogIn size={18} /> Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-xs text-foreground/40 font-bold uppercase tracking-widest">
                            New to Luxe Calgary?{' '}
                            <Link href="/register" className="text-white underline hover:text-gold transition-colors">
                                Create an account
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
