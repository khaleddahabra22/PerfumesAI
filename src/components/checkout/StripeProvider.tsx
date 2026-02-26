'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeProvider({
    children,
    clientSecret
}: {
    children: React.ReactNode;
    clientSecret: string;
}) {
    const options = {
        clientSecret,
        appearance: {
            theme: 'night' as const,
            variables: {
                colorPrimary: '#ffffff',
                colorBackground: '#1c1c1c',
                colorText: '#ffffff',
                colorTextPlaceholder: '#737373',
                fontFamily: 'Outfit, sans-serif',
                borderRadius: '12px',
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
}
