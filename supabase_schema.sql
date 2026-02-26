-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image TEXT,
  badge TEXT,
  rating DECIMAL(3, 2),
  reviews INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  sizes TEXT[] -- Array of size strings
);

-- Enable Row Level Security (optional, depending on your setup)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read products
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);

-- Insert sample data
INSERT INTO products (id, name, price, category, description, image, badge, rating, reviews, stock, is_featured, sizes)
VALUES 
('p1', 'Midnight Oud Eau de Parfum', 85.00, 'Perfumes', 'A rich, mysterious blend of agarwood, rose, and amber. Perfect for cold Calgary evenings.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop', 'Best Seller', 4.9, 124, 15, true, ARRAY['50ml', '100ml']),
('p2', 'Calgary Mountain Bloom', 65.00, 'Perfumes', 'Fresh and airy with notes of jasmine, lavender, and mountain air. Inspired by the Rockies.', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop', 'New', 4.8, 45, 20, false, ARRAY['50ml', '100ml']),
('p3', 'Velvet Rose & Honey', 75.00, 'Perfumes', 'Sweet and seductive floral fragrance with a warm honey base.', 'https://images.unsplash.com/photo-1616948055600-8f94cb977382?q=80&w=1000&auto=format&fit=crop', NULL, 4.7, 82, 8, false, ARRAY['50ml']),
('s1', 'Glow Radiance Vitamin C Serum', 45.00, 'Skincare', 'Brighten your skin and protect against local Calgary winds.', 'https://images.unsplash.com/photo-1620916566398-39f114387c42?q=80&w=1000&auto=format&fit=crop', 'Sale', 4.6, 95, 50, false, NULL);
