import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Truck, CornerDownLeft, Lock } from 'lucide-react';

const policyData: Record<string, { title: string, icon: any, content: string }> = {
  'shipping': {
    title: 'Shipping & Delivery Policy',
    icon: <Truck size={48} className="text-accent" />,
    content: `
      <h2>Local Calgary Delivery</h2>
      <p>We pride ourselves on being a truly local Calgary business. For all addresses within the city of Calgary limits, we offer a specialized local delivery service. </p>
      <ul>
        <li><strong>Standard Local Delivery:</strong> $12.00 CAD flat rate.</li>
        <li><strong>Free Local Delivery:</strong> Automatically applied on orders over $75.00 CAD.</li>
        <li><strong>Delivery Timeframes:</strong> Standard local delivery is typically completed within 1-3 business days.</li>
      </ul>

      <h2>Free Boutique Pickup</h2>
      <p>Avoid delivery fees by selecting our Boutique Pickup option during checkout. Once your order is ready (usually within 2 hours), you will receive an email with our SW Calgary pickup location address and instructions.</p>

      <h2>Shipping Across Alberta & Canada</h2>
      <p>We ship nationwide via Canada Post. Shipping rates are calculated at checkout based on your location and package weight. Most orders arrive within 4-7 business days depending on the destination province.</p>
    `
  },
  'returns': {
    title: 'Returns & Refunds',
    icon: <CornerDownLeft size={48} className="text-accent" />,
    content: `
      <h2>14-Day Easy Returns</h2>
      <p>We want you to love your purchase. If you are not completely satisfied, you may return your item within 14 days of delivery or pickup for a full refund or exchange, provided the item is in its original, unopened condition.</p>
      
      <h2>Hygiene & Safety</h2>
      <p>Due to health and safety regulations, we cannot accept returns for opened personal care products including perfumes, skincare, and beauty accessories unless they were received damaged or defective.</p>

      <h2>How to Initiate a Return</h2>
      <p>Please contact us at returns@luxecalgary.ca with your order number and reason for return. Our team will provide you with a return authorization and instructions on where to drop off or ship your return.</p>
    `
  },
  'privacy': {
    title: 'Privacy Policy',
    icon: <Lock size={48} className="text-accent" />,
    content: `
      <h2>Your Data is Safe</h2>
      <p>At Luxe Calgary, we value your privacy. We only collect the information necessary to process your orders and improve your shopping experience.</p>
      <p>We do not sell, rent, or share your personal information with third parties for marketing purposes. All payment information is processed through secure, encrypted gateways and is never stored on our servers.</p>
    `
  },
  'terms': {
    title: 'Terms & Conditions',
    icon: <ShieldCheck size={48} className="text-accent" />,
    content: `
      <h2>Using Our Store</h2>
      <p>By using the Luxe Calgary website, you agree to comply with our terms of service. All prices are listed in Canadian Dollars (CAD) and are subject to GST (5%) as per Alberta regulations.</p>
      <p>We reserve the right to cancel orders if we suspect fraudulent activity or if there are pricing errors on the website. Thank you for supporting a local business.</p>
    `
  }
};

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = policyData[params.slug] || policyData['terms'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                {policy.icon}
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-accent">{policy.title}</h1>
              <div className="w-24 h-1 bg-gold opacity-50" />
            </div>

            <div
              className="prose prose-lg max-w-none px-8 py-12 bg-muted border border-border rounded-3xl space-y-8 font-light italic leading-relaxed text-foreground/80"
              dangerouslySetInnerHTML={{ __html: policy.content }}
            />

            <div className="text-center pt-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-8">Have more questions?</p>
              <Link href="/contact" className="px-10 py-5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-accent/90 transition-all">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
