"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  plainImage: string | null;
  printImage: string | null;
  isCustomizable: boolean;
  isFeatured: boolean;
  categoryId: string;
}

interface CategoryPageClientProps {
  category: Category;
  products: Product[];
}

export default function CategoryPageClient({ category, products }: CategoryPageClientProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/collections" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            All Collections
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-pink/10 rounded-full blur-[150px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 text-neon-cyan text-sm font-mono mb-4">
            COLLECTION
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] tracking-tight text-white mb-4">
            {category.name}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {category.description || "Explore our collection of custom printed t-shirts."}
          </p>
          <p className="text-white/40 mt-4 font-mono">
            {products.length} products
          </p>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  plainImage={product.plainImage || ""}
                  printImage={product.printImage || ""}
                  isCustomizable={product.isCustomizable}
                  isFeatured={product.isFeatured}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">👕</div>
              <h3 className="font-display text-2xl text-white mb-2">No products yet</h3>
              <p className="text-white/60 mb-6">This category is waiting for its first design!</p>
              <Link href="/custom" className="btn-primary inline-flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Upload Custom Design
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}