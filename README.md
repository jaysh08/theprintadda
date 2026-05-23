# PrintAdda - Custom T-Shirt Print Shop

A modern, visually stunning e-commerce website for a local t-shirt print business.

![PrintAdda](https://img.shields.io/badge/PrintAdda-T--Shirt%20Printing-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055)

## Features

- 🎨 **Category Showcase**: Browse 3-4 creative print categories
- 📱 **WhatsApp Reservations**: Reserve prints via WhatsApp
- 📍 **Local Pickup**: Display pickup hours and location
- 🖼️ **Custom Designs**: Upload your own custom designs
- 👕 **Mockup Toggle**: View plain t-shirt vs print view
- 🔐 **Admin Dashboard**: Manage categories, products, and designs

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: SQLite with Prisma ORM
- **File Storage**: Local file system
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
printadda/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── collections/         # All products page
│   │   ├── category/[slug]/      # Category pages
│   │   ├── product/[id]/         # Product detail pages
│   │   ├── custom/               # Custom design upload
│   │   ├── about/                # About page
│   │   └── admin/                # Admin dashboard
│   ├── components/               # Reusable components
│   └── lib/
│       └── prisma.ts             # Prisma client
├── prisma/
│   └── schema.prisma             # Database schema
└── public/
    └── uploads/                  # Uploaded files
```

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="file:./dev.db"
WHATSAPP_NUMBER="91XXXXXXXXXX"
```

## Admin Access

1. Navigate to `/admin`
2. Default password: `printadda2024`

## Design Direction

**"Vibrant Streetwear Meets Modern Minimalism"**
- Dark theme with neon accent colors (electric cyan, hot pink)
- Large typography, dramatic imagery
- Micro-interactions on every element
- Smooth page transitions and staggered animations

## License

MIT License - See LICENSE file for details.