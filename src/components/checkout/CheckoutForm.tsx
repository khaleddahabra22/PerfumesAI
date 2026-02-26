'use client';

import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

export default function CheckoutForm({ amount, customerEmail }: { amount: number; customerEmail?: string }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/order-success${customerEmail ? `?email=${encodeURIComponent(customerEmail)}` : ''}`,
                receipt_email: customerEmail,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay now (CAD $${(amount / 100).toFixed(2)})`
                )}
            </button>

            {message && (
                <div id="payment-message" className="text-red-500 text-sm mt-4 p-4 bg-red-50 rounded-lg">
                    {message}
                </div>
            )}
        </form>
    );
}
