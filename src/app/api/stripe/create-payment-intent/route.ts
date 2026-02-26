import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
});

const calculateOrderAmount = (items: { id: string; quantity: number }[]) => {
    let subtotal = 0;

    for (const item of items) {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
            throw new Error(`Product not found: ${item.id}`);
        }
        subtotal += Math.round(product.price * 100) * item.quantity;
    }

    const taxRate = 0.05; // GST 5%
    const shipping = 1000; // Flat $10.00 CAD (1000 cents)

    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax + shipping;

    return {
        subtotal,
        tax,
        shipping,
        total,
    };
};

export async function POST(req: Request) {
    try {
        const { items, deliveryMethod, customerEmail, customerName } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const { subtotal, tax, shipping, total } = calculateOrderAmount(items);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'cad',
            receipt_email: customerEmail,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                deliveryMethod,
                customerEmail,
                customerName,
                items: JSON.stringify(items),
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            totals: {
                subtotal,
                tax,
                shipping,
                total,
            },
        });
    } catch (error: any) {
        console.error('Stripe PaymentIntent Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
