# DevFolio - Developer Portfolio & Product Catalog

A dynamic portfolio website built with Next.js to showcase and sell software products. Features a public landing page and a private admin dashboard for product management.

## Features

### Public Site
- **Landing Page**: Responsive, SEO-friendly product catalog
- **Product Categories**: POS, Education, Community Management, Business, Custom Development
- **Product Detail Pages**: Full product information with image gallery
- **WhatsApp Integration**: Click-to-Chat CTA buttons with pre-filled messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Admin Dashboard
- **Authentication**: Secure login using NextAuth.js
- **Product Management**: CRUD operations for products
- **Media Gallery**: Upload and manage product screenshots
- **Categories**: Organize products by category
- **Dashboard Stats**: Overview of products, active items, and featured products

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Storage**: Supabase Storage
- **Deployment**: Vercel (optimized)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kim-porto
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_SECRET=your_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_secure_password
```

5. Set up the database:
   - Go to Supabase Dashboard
   - Open SQL Editor
   - Run the SQL from `database/schema.sql`

6. Create a storage bucket:
   - Go to Supabase Dashboard > Storage
   - Create a new bucket called `product-images`
   - Set it to public
   - Add RLS policies for upload/delete

7. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── products/      # Product CRUD pages
│   │   ├── layout.tsx     # Admin layout with sidebar
│   │   └── page.tsx       # Admin login page
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js routes
│   │   ├── products/      # Product API
│   │   └── upload/        # File upload API
│   ├── product/           # Public product pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading state
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── admin/            # Admin-specific components
│   └── public/           # Public site components
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase clients
│   ├── auth.ts           # NextAuth config
│   └── utils.ts          # Helper functions
├── types/                # TypeScript types
├── hooks/                # Custom React hooks
└── middleware.ts         # Next.js middleware

database/
└── schema.sql            # Database schema
```

## Database Schema

### Categories
- `id` (UUID, PK)
- `name` (VARCHAR)
- `slug` (VARCHAR, UNIQUE)
- `description` (TEXT)
- `icon` (VARCHAR)

### Products
- `id` (UUID, PK)
- `name` (VARCHAR)
- `slug` (VARCHAR, UNIQUE)
- `description` (TEXT)
- `short_description` (VARCHAR)
- `price` (DECIMAL)
- `category_id` (UUID, FK)
- `features` (TEXT[])
- `tech_stack` (TEXT[])
- `demo_url` (VARCHAR)
- `is_featured` (BOOLEAN)
- `status` (VARCHAR)

### Product Images
- `id` (UUID, PK)
- `product_id` (UUID, FK)
- `url` (TEXT)
- `alt` (VARCHAR)
- `order` (INTEGER)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel Dashboard
4. Deploy!

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

## Customization

### Changing WhatsApp Number
Update the phone number in:
- `src/components/public/Navbar.tsx`
- `src/components/public/Hero.tsx`
- `src/components/public/Contact.tsx`
- `src/lib/utils.ts` (generateWhatsAppLink function)

### Adding New Categories
1. Add to `database/schema.sql` in the INSERT statement
2. Run the SQL in Supabase Dashboard

### Styling
- Modify `tailwind.config.ts` for theme colors
- Update `src/app/globals.css` for global styles

## License

MIT License - feel free to use this for your own portfolio!

## Support

For support, contact via WhatsApp or email.
