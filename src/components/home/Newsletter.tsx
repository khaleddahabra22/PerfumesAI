'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="py-24 bg-muted border-y border-border overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative">
                {/* Background pattern placeholder */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 text-center md:text-left relative z-10">
                    <div className="flex-1 space-y-4">
                        <span className="text-gold font-bold uppercase tracking-widest text-xs">Join Our Community</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">Unlock exclusive perks</h2>
                        <p className="text-foreground/60 leading-relaxed max-w-lg italic font-light">
                            Be the first to know about new arrivals, private sales, and local Calgary pop-up events.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-1 h-full">
                        <form className="flex flex-col sm:flex-row gap-3 w-full bg-black border border-border p-3 rounded-2xl shadow-xl">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm focus:ring-0"
                                required
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-accent/20"
                            >
                                Subscribe
                                <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </form>
                        <p className="mt-4 text-[10px] text-foreground/40 text-center font-medium tracking-wide">
                            NO SPAM. JUST PURE ELEGANCE. UNSUBSCRIBE ANYTIME.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
