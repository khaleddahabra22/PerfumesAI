'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, MessageCircle, Clock, Instagram, Facebook, Send, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto">

                        {/* Header */}
                        <div className="text-center mb-24 space-y-4">
                            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs">Reach Out</span>
                            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white leading-tight">We're here to help.</h1>
                            <p className="text-xl text-foreground/60 italic font-light max-w-2xl mx-auto">
                                Have a question about a product or your delivery? Don't hesitate to get in touch.
                                Our local Calgary team is ready to assist you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            {/* Contact Info Column */}
                            <div className="space-y-16">
                                <div className="space-y-10">
                                    <div className="flex items-start gap-8 group">
                                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl shadow-accent/5">
                                            <Phone size={28} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-heading font-bold text-white italic">Give us a call</h3>
                                            <p className="text-foreground/60 text-lg font-light leading-relaxed">Available Mon-Fri, 9am - 5pm MST. </p>
                                            <p className="text-xl font-bold text-gold tracking-widest">+1 (403) 000-0000</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-8 group">
                                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl shadow-accent/5">
                                            <MessageCircle size={28} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-heading font-bold text-white italic">WhatsApp Support</h3>
                                            <p className="text-foreground/60 text-lg font-light leading-relaxed">Fastest for quick product questions. </p>
                                            <p className="text-xl font-bold text-gold tracking-widest">Chat with us</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-8 group">
                                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl shadow-accent/5">
                                            <Mail size={28} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-heading font-bold text-white italic">Email Enquiries</h3>
                                            <p className="text-foreground/60 text-lg font-light leading-relaxed">For all order and general questions. </p>
                                            <p className="text-xl font-bold text-gold tracking-widest italic">hello@luxecalgary.ca</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Area / Location */}
                                <div className="p-10 bg-muted/50 rounded-3xl border border-border space-y-10">
                                    <div className="flex items-center gap-4">
                                        <MapPinned size={24} className="text-accent" />
                                        <h3 className="text-2xl font-heading font-bold text-white underline underline-offset-8 decoration-gold">Calgary Service Area</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent">Availability</h4>
                                            <p className="text-sm text-foreground/60 leading-relaxed font-light italic">
                                                We serve all sectors of Calgary including downtown, beltline, suburban communities, and nearby areas for delivery.
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent">Pickup Hub</h4>
                                            <p className="text-sm text-foreground/60 leading-relaxed font-light italic">
                                                Convenient pickup location in SW Calgary. Address provided upon order confirmation.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative h-64 bg-background border border-border rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                                        {/* Map Placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 italic">
                                            Map Visualization Placeholder
                                        </div>
                                        <img
                                            src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=1000&auto=format&fit=crop"
                                            className="w-full h-full object-cover opacity-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form Column */}
                            <div className="bg-black border border-border text-white p-12 rounded-[3.5rem] shadow-2xl space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl transition-transform duration-1000 group-hover:scale-125" />

                                <div className="space-y-4 relative z-10">
                                    <h2 className="text-4xl font-heading font-bold leading-tight">Send us a message</h2>
                                    <p className="text-white/60 font-light italic">Fill out the form below and we'll get back to you within 24 hours.</p>
                                </div>

                                <form className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                                            <input className="w-full bg-white/10 border-b border-white/20 p-4 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-md" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                                            <input className="w-full bg-white/10 border-b border-white/20 p-4 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-md" placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Subject</label>
                                        <input className="w-full bg-white/10 border-b border-white/20 p-4 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-md" placeholder="Order Inquiry" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Message</label>
                                        <textarea rows={6} className="w-full bg-white/10 border-b border-white/20 p-4 rounded-xl outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-md resize-none" placeholder="Tell us what's on your mind..."></textarea>
                                    </div>

                                    <button className="w-full py-6 bg-gold hover:bg-gold/90 text-white font-bold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all group active:scale-95">
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>

                                <div className="pt-10 flex items-center justify-between relative z-10">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Business Hours</h4>
                                        <div className="space-y-1 text-sm font-light italic">
                                            <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                                            <p>Sat: 10:00 AM - 4:00 PM</p>
                                            <p>Sun: Closed (Rest Day 🏔️)</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><Instagram size={20} /></div>
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><Facebook size={20} /></div>
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
