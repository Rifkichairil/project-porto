-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description VARCHAR(500) NOT NULL,
    price DECIMAL(12, 2),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    features TEXT[] DEFAULT '{}',
    tech_stack TEXT[] DEFAULT '{}',
    demo_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'coming_soon')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Images table
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt VARCHAR(255),
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories"
    ON categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public read access on products"
    ON products FOR SELECT
    TO anon, authenticated
    USING (status = 'active');

CREATE POLICY "Allow public read access on product images"
    ON product_images FOR SELECT
    TO anon, authenticated
    USING (true);

-- Create policies for admin write access (requires authentication)
CREATE POLICY "Allow admin full access on categories"
    ON categories FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin full access on products"
    ON products FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow admin full access on product images"
    ON product_images FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
    ('Point of Sale (POS)', 'pos', 'Sistem kasir dan manajemen penjualan untuk berbagai jenis bisnis', 'ShoppingCart'),
    ('Education', 'education', 'Sistem manajemen untuk lembaga pendidikan dan bimbel', 'GraduationCap'),
    ('Community Management', 'community', 'Sistem manajemen untuk RT/RW dan organisasi komunitas', 'Users'),
    ('Business Management', 'business', 'Sistem ERP dan manajemen bisnis terintegrasi', 'Building'),
    ('Custom Development', 'custom', 'Solusi software kustom sesuai kebutuhan spesifik', 'Code');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket setup for product images
-- Run this in Supabase Dashboard SQL Editor or use Supabase CLI
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policy for public read access
-- CREATE POLICY "Allow public read access on product-images"
--     ON storage.objects FOR SELECT
--     TO anon, authenticated
--     USING (bucket_id = 'product-images');
