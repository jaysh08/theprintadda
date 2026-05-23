import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    return product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    return { title: "Product Not Found | PrintAdda" };
  }

  return {
    title: `${product.name} | PrintAdda`,
    description: product.description || `Custom printed ${product.name} t-shirt - ₹${product.price}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  // Demo data for when DB is empty
  const demoProduct = product || {
    id,
    name: "NEON DREAMS",
    slug: "neon-dreams",
    description: "Bold, vibrant design that captures the essence of urban nightlife. Made with premium cotton and DTG printing for lasting quality.",
    price: 599,
    plainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    printImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    isCustomizable: true,
    isFeatured: true,
    stock: 15,
    category: { id: "1", name: "STREETWEAR", slug: "streetwear", description: "Bold statements, louder fits", image: null, order: 0, createdAt: new Date(), updatedAt: new Date() },
    categoryId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return <ProductDetailClient product={demoProduct as any} />;
}