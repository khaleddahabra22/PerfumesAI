export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Perfumes' | 'Skincare' | 'Gadgets' | 'Gifts' | 'Trending';
    description: string;
    image: string;
    badge?: 'New' | 'Sale' | 'Best Seller';
    rating: number;
    reviews: number;
    stock: number;
    sizes?: string[];
    isFeatured?: boolean;
}

export const products: Product[] = [
    // PERFUMES
    {
        id: 'p1',
        name: 'Midnight Oud Eau de Parfum',
        price: 85.00,
        category: 'Perfumes',
        description: 'A rich, mysterious blend of agarwood, rose, and amber. Perfect for cold Calgary evenings.',
        image: '/images/midnight-oud.png',
        badge: 'Best Seller',
        rating: 4.9,
        reviews: 124,
        stock: 15,
        sizes: ['50ml', '100ml'],
        isFeatured: true
    },
    {
        id: 'p2',
        name: 'Black Opium Eau de Parfum with Coffee & White Flowers',
        price: 65.00,
        category: 'Perfumes',
        description: 'Fresh and airy with notes of jasmine, lavender, and mountain air. Inspired by the Rockies.',
        image: '/images/Black opium.png',
        badge: 'New',
        rating: 4.8,
        reviews: 45,
        stock: 20,
        sizes: ['50ml', '100ml']
    },
    {
        id: 'p3',
        name: 'Velvet Rose & Honey',
        price: 75.00,
        category: 'Perfumes',
        description: 'Sweet and seductive floral fragrance with a warm honey base.',
        image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1000&auto=format&fit=crop',
        rating: 4.7,
        reviews: 82,
        stock: 8,
        sizes: ['50ml']
    },
    {
        id: 'p4',
        name: 'Bleu De Chanel',
        price: 90.00,
        category: 'Perfumes',
        description: 'Bold citrus opening that settles into a smooth, leathery base.',
        image: '/images/bleu-de-chanel.png',
        rating: 4.9,
        reviews: 32,
        stock: 12,
        sizes: ['100ml'],
        isFeatured: true
    },
    {
        id: 'p5',
        name: 'Santal Driftwood',
        price: 95.00,
        category: 'Perfumes',
        description: 'Creamy sandalwood with a hint of sea salt and cardamom.',
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop',
        rating: 4.8,
        reviews: 56,
        stock: 18
    },
    {
        id: 'p6',
        name: 'Peony Silk & Pear',
        price: 68.00,
        category: 'Perfumes',
        description: 'Light, fruity-floral fragrance that captures the essence of spring.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
        badge: 'New',
        rating: 4.6,
        reviews: 19,
        stock: 25
    },

    // SKINCARE
    {
        id: 's1',
        name: 'Glow Radiance Vitamin C Serum',
        price: 45.00,
        category: 'Skincare',
        description: 'Brighten your skin and protect against local Calgary winds with our Vitamin C booster.',
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1000&auto=format&fit=crop',
        badge: 'Sale',
        rating: 4.6,
        reviews: 95,
        stock: 50
    },
    {
        id: 's2',
        name: 'Arctic Hydration Face Cream',
        price: 38.00,
        category: 'Skincare',
        description: 'Heavy-duty moisturizer specifically formulated for the dry Alberta climate.',
        image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?q=80&w=1000&auto=format&fit=crop',
        rating: 5.0,
        reviews: 67,
        stock: 30
    },
    {
        id: 's3',
        name: 'Midnight Recovery Oil',
        price: 52.00,
        category: 'Skincare',
        description: 'Nighttime facial oil that repairs skin barrier while you sleep.',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop',
        rating: 4.9,
        reviews: 142,
        stock: 40
    },
    {
        id: 's4',
        name: 'Calgary Rose Water Mist',
        price: 24.00,
        category: 'Skincare',
        description: 'Refreshing facial mist for an instant pick-me-up during dry days.',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000&auto=format&fit=crop',
        rating: 4.7,
        reviews: 88,
        stock: 60
    },

    // GADGETS
    {
        id: 'g1',
        name: 'Mini Mist Humidifier',
        price: 29.00,
        category: 'Gadgets',
        description: 'Portable USB humidifier to keep your room comfortable in dry weather.',
        image: 'https://images.unsplash.com/photo-1638006355975-33e7fdd59b2e?q=80&w=1000&auto=format&fit=crop',
        rating: 4.5,
        reviews: 156,
        stock: 100
    },
    {
        id: 'g2',
        name: 'Portable Neck Fan',
        price: 35.00,
        category: 'Gadgets',
        description: 'Perfect for summer festivals and outdoor events in Calgary.',
        image: 'https://images.unsplash.com/photo-1590422749897-47036da0b0ff?q=80&w=1000&auto=format&fit=crop',
        rating: 4.2,
        reviews: 24,
        stock: 45
    },

    // GIFTS
    {
        id: 'gift1',
        name: 'Luxury Scented Candle Set',
        price: 55.00,
        category: 'Gifts',
        description: 'Set of three hand-poured soy candles with premium fragrances.',
        image: 'https://images.unsplash.com/photo-1602607362916-0a364499fc61?q=80&w=1000&auto=format&fit=crop',
        badge: 'Best Seller',
        rating: 4.9,
        reviews: 89,
        stock: 25
    },
    {
        id: 'gift2',
        name: 'Artisan Tea Sampler Box',
        price: 40.00,
        category: 'Gifts',
        description: 'A curated selection of luxury teas from around the world.',
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1000&auto=format&fit=crop',
        rating: 4.8,
        reviews: 31,
        stock: 15
    },
    {
        id: 'gift3',
        name: 'Handcrafted Mug Set',
        price: 48.00,
        category: 'Gifts',
        description: 'Set of two artisanal ceramic mugs, perfect for Calgary winter mornings.',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop',
        rating: 4.7,
        reviews: 22,
        stock: 30
    },

    // TRENDING
    {
        id: 't1',
        name: 'Oversized Silk Scrunchie Pack',
        price: 18.00,
        category: 'Trending',
        description: `High-quality silk scrunchies that don't damage your hair.`,
        image: 'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?q=80&w=1000&auto=format&fit=crop',
        rating: 4.4,
        reviews: 78,
        stock: 200
    },
    {
        id: 't2',
        name: 'Minimalist Desktop Planter',
        price: 25.00,
        category: 'Trending',
        description: 'Sleek cement planter that brings life to any office space.',
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000&auto=format&fit=crop',
        badge: 'New',
        rating: 4.5,
        reviews: 14,
        stock: 50
    }
];
