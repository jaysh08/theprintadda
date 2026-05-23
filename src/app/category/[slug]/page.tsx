import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { _count: { select: { products: true } } },
    });
    return category;
  } catch {
    return null;
  }
}

async function getProductsByCategory(categoryId: string) {
  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return { title: "Category Not Found | PrintAdda" };
  }

  return {
    title: `${category.name} | PrintAdda`,
    description: category.description || `Browse ${category.name} collection at PrintAdda`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  // Demo data for when DB is empty
  const demoCategories: Record<string, any> = {
    streetwear: { id: "1", name: "STREETWEAR", slug: "streetwear", description: "Bold statements, louder fits. Urban aesthetics for the culture.", image: null, order: 1 },
    abstract: { id: "2", name: "ABSTRACT", slug: "abstract", description: "Art you can wear. Abstract patterns that challenge the eye.", image: null, order: 2 },
    typography: { id: "3", name: "TYPOGRAPHY", slug: "typography", description: "Words that speak. Bold text designs that make statements.", image: null, order: 3 },
    minimalist: { id: "4", name: "MINIMALIST", slug: "minimalist", description: "Less is more. Clean designs for the refined palate.", image: null, order: 4 },
  };

  const resolvedCategory = category || demoCategories[slug];
  
  if (!resolvedCategory) {
    notFound();
  }

  const products = await getProductsByCategory(resolvedCategory.id);

  // Demo products
  const demoProducts = products.length > 0 ? products : [
    { id: "1", name: "NEON DREAMS", slug: "neon-dreams", price: 599, plainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", printImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", isCustomizable: false, isFeatured: true, categoryId: resolvedCategory.id },
    { id: "2", name: "URBAN ABSTRACT", slug: "urban-abstract", price: 699, plainImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", printImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", isCustomizable: true, isFeatured: true, categoryId: resolvedCategory.id },
    { id: "3", name: "STREET KING", slug: "street-king", price: 799, plainImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7c1d0?w=600&q=80", printImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80", isCustomizable: false, isFeatured: true, categoryId: resolvedCategory.id },
    { id: "4", name: "CYBER PULSE", slug: "cyber-pulse", price: 649, plainImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80", printImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80", isCustomizable: true, isFeatured: true, categoryId: resolvedCategory.id },
  ];

  return <CategoryPageClient category={resolvedCategory as any} products={demoProducts as any} />;
}