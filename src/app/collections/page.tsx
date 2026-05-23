import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Collections | PrintAdda",
  description: "Browse our collection of custom printed t-shirts",
};

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

async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch {
    return [];
  }
}

export default async function CollectionsPage() {
  const categories = await getCategories();
  const products = await getAllProducts();

  return <CollectionsClient categories={categories} products={products} />;
}