import { supabase } from '@/lib/supabase';
import { products as mockProducts, Product } from '@/data/products';
import ProductDetailsClient from '@/components/product/ProductDetailsClient';
import { Metadata } from 'next';
import Script from 'next/script';

interface Props {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
    try {
        const { data: pData, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (pData) {
            return {
                ...pData,
                isFeatured: pData.is_featured,
                reviews: pData.reviews || 0,
            } as Product;
        }
    } catch (err) {
        console.warn('SSR Fetch failed, using mock data:', err);
    }
    return mockProducts.find(p => p.id === id) || null;
}

async function getRelatedProducts(product: Product) {
    try {
        const { data: rData } = await supabase
            .from('products')
            .select('*')
            .eq('category', product.category)
            .neq('id', product.id)
            .limit(4);

        if (rData && rData.length > 0) {
            return rData.map(p => ({
                ...p,
                isFeatured: p.is_featured,
                reviews: p.reviews || 0,
            })) as Product[];
        }
    } catch (err) {
        console.warn('SSR Related Fetch failed');
    }
    return mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return {
            title: 'Product Not Found | Luxe Calgary',
        };
    }

    return {
        title: `${product.name} | Luxe Calgary`,
        description: product.description,
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-20 text-center">
                <h1 className="text-4xl font-heading mb-6">Product not found.</h1>
                <a href="/shop" className="text-accent font-bold underline">Back to Shop</a>
            </div>
        );
    }

    const relatedProducts = await getRelatedProducts(product);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Luxe Calgary',
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'CAD',
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviews,
        },
    };

    return (
        <>
            <Script
                id="product-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
        </>
    );
}
