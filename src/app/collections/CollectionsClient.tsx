"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  _count?: { products: number };
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

interface CollectionsClientProps {
  categories: Category[];
  products: Product[];
}

export default function CollectionsClient({ categories, products }: CollectionsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomizableOnly, setShowCustomizableOnly] = useState(false);

  if (categories.length === 0) {
    categories = [
      { id: "1", name: "STREETWEAR", slug: "streetwear", description: "Bold statements, louder fits", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80" },
      { id: "2", name: "ABSTRACT", slug: "abstract", description: "Art you can wear", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" },
      { id: "3", name: "TYPOGRAPHY", slug: "typography", description: "Words that speak", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
      { id: "4", name: "MINIMALIST", slug: "minimalist", description: "Less is more", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80" },
    ];
  }

  if (products.length === 0) {
    products = [
      { id: "1", name: "NEON DREAMS", slug: "neon-dreams", price: 599, plainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", printImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", isCustomizable: false, isFeatured: true, categoryId: "1" },
      { id: "2", name: "URBAN ABSTRACT", slug: "urban-abstract", price: 699, plainImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", printImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", isCustomizable: true, isFeatured: true, categoryId: "2" },
      { id: "3", name: "STREET KING", slug: "street-king", price: 799, plainImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7c1d0?w=600&q=80", printImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80", isCustomizable: false, isFeatured: true, categoryId: "1" },
      { id: "4", name: "CYBER PULSE", slug: "cyber-pulse", price: 649, plainImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80", printImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80", isCustomizable: true, isFeatured: true, categoryId: "3" },
      { id: "5", name: "RETRO VIBE", slug: "retro-vibe", price: 549, plainImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80", printImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", isCustomizable: false, isFeatured: true, categoryId: "2" },
      { id: "6", name: "CHAOS THEORY", slug: "chaos-theory", price: 899, plainImage: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80", printImage: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80", isCustomizable: true, isFeatured: true, categoryId: "4" },
      { id: "7", name: "VOID WALKER", slug: "void-walker", price: 749, plainImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", printImage: "https://images.unsplash.com/photo-1502157873-818bc0726f68?w=600&q=80", isCustomizable: false, isFeatured: false, categoryId: "3" },
      { id: "8", name: "NEON STRIKE", slug: "neon-strike", price: 699, plainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", printImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", isCustomizable: true, isFeatured: true, categoryId: "1" },
    ];
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCustomizable = !showCustomizableOnly || product.isCustomizable;
    return matchesCategory && matchesSearch && matchesCustomizable;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-cyan/10 rounded-full blur-[150px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 text-neon-cyan text-sm font-mono mb-4">
            ALL COLLECTIONS
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] tracking-tight text-white">
            BROWSE <span className="text-neon-pink">PRINTS</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            From streetwear to abstract art. Find the design that speaks to you.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-neon-cyan text-dark-900"
                  : "bg-dark-700 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-neon-pink text-dark-900"
                    : "bg-dark-700 text-white/60 hover:text-white border border-white/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search and Options */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search prints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-700 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
              />
            </div>
            
            <button
              onClick={() => setShowCustomizableOnly(!showCustomizableOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                showCustomizableOnly
                  ? "bg-neon-purple/20 border-neon-purple text-neon-purple"
                  : "bg-dark-700 border-white/10 text-white/60 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">Custom</span>
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-white/60">
              Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, index) => (
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
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-2xl text-white mb-2">No products found</h3>
                <p className="text-white/60">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}