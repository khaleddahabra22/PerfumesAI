import React from 'react';
import { Truck, Store, ShieldCheck, HeartPulse } from 'lucide-react';

const features = [
    {
        icon: <Truck size={32} />,
        title: 'Local Calgary Delivery',
        description: 'Fast, reliable delivery across Calgary. Free on orders over $75.'
    },
    {
        icon: <Store size={32} />,
        title: 'Free Store Pickup',
        description: 'Order online and pick up your items at our Calgary location.'
    },
    {
        icon: <ShieldCheck size={32} />,
        title: 'Secure Payments',
        description: 'Shop with confidence using our encrypted checkout system.'
    },
    {
        icon: <HeartPulse size={32} />,
        title: 'Handpicked Quality',
        description: 'Every product is personally tested and approved by our team.'
    }
];

export default function TrustSection() {
    return (
        <section className="bg-black text-white py-24 border-y border-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-8 text-gold group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="font-heading font-bold text-xl mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed max-w-[200px] mx-auto italic font-light">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
