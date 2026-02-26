# Setup Guide - DevFolio

## Quick Start (Without Supabase)

The project works out of the box with mock data for demonstration purposes. Simply:

```bash
npm install
npm run build
```

The site will use mock data and be fully functional for demonstration.

## Full Setup (With Supabase)

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for the project to be ready

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Update the values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Admin Credentials
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password
```

Get your Supabase credentials from:
- **Project Settings > API** for the URL and keys

Generate a random secret for NextAuth:
```bash
openssl rand -base64 32
```

### 3. Set Up Database

1. Go to Supabase Dashboard > SQL Editor
2. Copy the contents of `database/schema.sql`
3. Run the SQL script

This will create:
- `categories` table
- `products` table
- `product_images` table
- Sample categories
- Row Level Security policies

### 4. Set Up Storage

1. Go to Supabase Dashboard > Storage
2. Click "New bucket"
3. Name: `product-images`
4. Check "Public bucket"
5. Click "Create bucket"

Add storage policies:
1. Go to the bucket > Policies
2. Add the following policies:

**SELECT policy:**
```sql
ALLOW public SELECT
```

**INSERT policy:**
```sql
ALLOW authenticated INSERT
```

**DELETE policy:**
```sql
ALLOW authenticated DELETE
```

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin

### 6. Deploy to Vercel

1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables in Vercel Dashboard
4. Update `NEXTAUTH_URL` to your production URL
5. Deploy!

## Troubleshooting

### Build fails with "supabaseUrl is required"
Make sure you've created the `.env.local` file with all required variables, or the project will use mock data.

### Images not uploading
Check that:
1. Storage bucket `product-images` is created
2. Bucket is set to public
3. Storage policies are configured correctly
4. `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### Cannot login to admin
Verify that:
1. `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in `.env.local`
2. `NEXTAUTH_SECRET` is set
3. You restart the dev server after changing env variables

## Next Steps

1. Update the WhatsApp number in components with your actual number
2. Customize the branding in `src/components/public/Navbar.tsx`
3. Add your social links in `src/components/public/Footer.tsx`
4. Update the hero section content in `src/components/public/Hero.tsx`
