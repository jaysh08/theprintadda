"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  plainImage: string | null;
  printImage: string | null;
  isCustomizable: boolean;
  isFeatured: boolean;
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) {
    products = [
      { id: "1", name: "NEON DREAMS", slug: "neon-dreams", price: 599, plainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", printImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", isCustomizable: false, isFeatured: true },
      { id: "2", name: "URBAN ABSTRACT", slug: "urban-abstract", price: 699, plainImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", printImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", isCustomizable: true, isFeatured: true },
      { id: "3", name: "STREET KING", slug: "street-king", price: 799, plainImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7c1d0?w=600&q=80", printImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80", isCustomizable: false, isFeatured: true },
      { id: "4", name: "CYBER PULSE", slug: "cyber-pulse", price: 649, plainImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80", printImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80", isCustomizable: true, isFeatured: true },
      { id: "5", name: "RETRO VIBE", slug: "retro-vibe", price: 549, plainImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80", printImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", isCustomizable: false, isFeatured: true },
      { id: "6", name: "CHAOS THEORY", slug: "chaos-theory", price: 899, plainImage: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80", printImage: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80", isCustomizable: true, isFeatured: true },
    ];
  }

  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-neon-pink/30 text-neon-pink text-sm font-mono mb-4">
              HOT PICKS
            </span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-tight text-white">
              FEATURED <span className="text-neon-cyan">PRINTS</span>
            </h2>
          </div>
          
          <Link
            href="/collections"
            className="mt-6 md:mt-0 flex items-center gap-2 text-white/60 hover:text-neon-pink transition-colors group"
          >
            View All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}