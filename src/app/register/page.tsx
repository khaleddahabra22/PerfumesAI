'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, UserPlus } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [lastRegisteredEmail, setLastRegisteredEmail] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3 || formData.username.length > 20) {
            newErrors.username = 'Username must be between 3 and 20 characters';
        } else if (!/^[a-zA-Z0-9._]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, dots, and underscores';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = 'Password must include at least one letter and one number';
        }

        // Confirm Password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            // Check if username is already taken in the profiles table
            const { data: existingUser, error: checkError } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', formData.username)
                .maybeSingle();

            if (existingUser) {
                setErrors(prev => ({ ...prev, username: 'Username is already taken' }));
                setIsLoading(false);
                return;
            }

            // Register the user
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        username: formData.username,
                        full_name: formData.fullName,
                        email: formData.email
                    }
                }
            });

            if (error) throw error;

            if (data.user) {
                // Success - Show verification prompt instead of redirecting
                setLastRegisteredEmail(formData.email);
                setShowVerificationModal(true);
            }
        } catch (err: any) {
            console.error('Registration error:', err);
            setErrors(prev => ({ ...prev, server: err.message || 'An error occurred during registration' }));
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
                            <span className="text-gold font-bold uppercase tracking-widest text-xs">Join our community</span>
                            <h1 className="text-4xl font-heading font-bold text-white">Create Account</h1>
                        </div>

                        {errors.server && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wide">
                                {errors.server}
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
                                        setErrors({ server: error.message });
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

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Full Name (Optional)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-accent transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className="w-full pl-11 pr-4 py-4 bg-white/5 border border-border rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20"
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-accent transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="yourusername"
                                        className={`w-full pl-11 pr-4 py-4 bg-white/5 border ${errors.username ? 'border-red-400' : 'border-border'} rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20`}
                                        required
                                    />
                                </div>
                                {errors.username && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.username}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-white transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@email.com"
                                        className={`w-full pl-11 pr-4 py-4 bg-white/5 border ${errors.email ? 'border-red-400' : 'border-border'} rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20`}
                                        required
                                    />
                                </div>
                                {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-accent transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Min. 8 chars, 1 letter + 1 number"
                                        className={`w-full pl-11 pr-12 py-4 bg-white/5 border ${errors.password ? 'border-red-400' : 'border-border'} rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20`}
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
                                {formData.password && (
                                    <div className="mt-2 space-y-2">
                                        <div className="flex gap-1 h-1">
                                            {[1, 2, 3, 4].map((level) => {
                                                const strength =
                                                    (formData.password.length >= 8 ? 1 : 0) +
                                                    (/[A-Z]/.test(formData.password) ? 1 : 0) +
                                                    (/[0-9]/.test(formData.password) ? 1 : 0) +
                                                    (/[^A-Za-z0-9]/.test(formData.password) ? 1 : 0);
                                                return (
                                                    <div
                                                        key={level}
                                                        className={`flex-1 rounded-full transition-all duration-500 ${level <= strength
                                                            ? strength <= 1 ? 'bg-red-400' : strength <= 3 ? 'bg-orange-400' : 'bg-green-400'
                                                            : 'bg-muted'
                                                            }`}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <p className="text-[9px] uppercase font-bold tracking-widest text-foreground/30">
                                            {(() => {
                                                const s = (formData.password.length >= 8 ? 1 : 0) + (/[A-Z]/.test(formData.password) ? 1 : 0) + (/[0-9]/.test(formData.password) ? 1 : 0) + (/[^A-Za-z0-9]/.test(formData.password) ? 1 : 0);
                                                if (s <= 1) return 'Weak';
                                                if (s <= 3) return 'Moderate';
                                                return 'Strong';
                                            })()} Security
                                        </p>
                                    </div>
                                )}
                                {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/20 group-focus-within:text-accent transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Repeat your password"
                                        className={`w-full pl-11 pr-12 py-4 bg-white/5 border ${errors.confirmPassword ? 'border-red-400' : 'border-border'} rounded-2xl outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all text-sm text-white placeholder:text-foreground/20`}
                                        required
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.confirmPassword}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 mt-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white border border-white transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <UserPlus size={18} /> Create Account
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-xs text-foreground/40 font-bold uppercase tracking-widest">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white underline hover:text-gold transition-colors">
                                Login here
                            </Link>
                        </div>
                    </motion.div>

                    {/* Verification Prompt Modal */}
                    {showVerificationModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-black border border-border p-8 md:p-12 rounded-3xl max-w-sm w-full text-center space-y-8 shadow-2xl"
                            >
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white">
                                        <Mail size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-heading font-bold">Verify your email?</h2>
                                        <p className="text-sm text-foreground/60 leading-relaxed">
                                            We've sent a link to <span className="text-white font-bold">{lastRegisteredEmail}</span>.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => router.push(`/verify-email?email=${encodeURIComponent(lastRegisteredEmail)}`)}
                                        className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-black hover:text-white border border-white transition-all"
                                    >
                                        Verify Now
                                    </button>
                                    <button
                                        onClick={() => router.push('/account')}
                                        className="w-full py-4 bg-transparent text-foreground/40 font-bold text-xs uppercase tracking-widest rounded-2xl hover:text-white transition-all"
                                    >
                                        Later
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
