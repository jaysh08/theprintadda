import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PickupInfo from "@/components/PickupInfo";
import CustomDesignCTA from "@/components/CustomDesignCTA";

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { products: true } } },
    });
    return categories;
  } catch {
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();

  // Transform Prisma data to match component expectations
  const transformedCategories = categories.map(c => ({
    ...c,
    productCount: c._count?.products || 0,
  }));

  return (
    <div className="relative">
      {/* Grain Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 grain opacity-30" />
      
      <Hero />
      
      {/* Categories Section */}
      <CategorySection categories={transformedCategories} />
      
      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} />
      
      {/* Pickup Info Section */}
      <PickupInfo />
      
      {/* Custom Design CTA */}
      <CustomDesignCTA />
    </div>
  );
}