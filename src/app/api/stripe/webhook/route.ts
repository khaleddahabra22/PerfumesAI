import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { products } from '@/data/products';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = (await headers()).get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) {
            console.error('Missing Stripe signature or webhook secret');
            return NextResponse.json({ error: 'Missing configuration' }, { status: 400 });
        }
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        try {
            // Check if order already exists (idempotency)
            const existingOrder = await prisma.order.findUnique({
                where: { stripePaymentIntentId: paymentIntent.id },
            });

            if (existingOrder) {
                return NextResponse.json({ received: true, message: 'Order already processed' });
            }

            const metadata = paymentIntent.metadata;
            const items = JSON.parse(metadata.items || '[]');
            const amountTotal = paymentIntent.amount;
            const customerEmail = metadata.customerEmail || paymentIntent.receipt_email || 'guest@example.com';

            // Create Order and OrderItems in a transaction
            const order = await prisma.$transaction(async (tx: any) => {
                const newOrder = await tx.order.create({
                    data: {
                        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        customerEmail: customerEmail,
                        customerName: metadata.customerName || 'Guest Customer',
                        amountTotal: amountTotal,
                        currency: 'cad',
                        status: 'paid',
                        deliveryMethod: metadata.deliveryMethod || 'shipping',
                        stripePaymentIntentId: paymentIntent.id,
                        addressLine1: paymentIntent.shipping?.address?.line1,
                        addressLine2: paymentIntent.shipping?.address?.line2,
                        city: paymentIntent.shipping?.address?.city,
                        state: paymentIntent.shipping?.address?.state,
                        postalCode: paymentIntent.shipping?.address?.postal_code,
                    },
                });

                for (const item of items) {
                    const product = products.find((p) => p.id === item.id);
                    if (product) {
                        await tx.orderItem.create({
                            data: {
                                orderId: newOrder.id,
                                productId: product.id,
                                productName: product.name,
                                priceAtPurchase: Math.round(product.price * 100),
                                quantity: item.quantity,
                            },
                        });
                    }
                }

                return newOrder;
            });

            console.log(`Order created successfully: ${order.orderNumber}`);

        } catch (error) {
            console.error('Error creating order from webhook:', error);
            return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
