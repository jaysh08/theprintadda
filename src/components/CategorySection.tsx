"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  productCount: number;
}

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  if (categories.length === 0) {
    // Demo data for empty state
    categories = [
      {
        id: "1",
        name: "STREETWEAR",
        slug: "streetwear",
        description: "Bold statements, louder fits. Urban aesthetics for the culture.",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
        productCount: 12,
      },
      {
        id: "2",
        name: "ABSTRACT",
        slug: "abstract",
        description: "Art you can wear. Abstract patterns that challenge the eye.",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
        productCount: 8,
      },
      {
        id: "3",
        name: "TYPOGRAPHY",
        slug: "typography",
        description: "Words that speak. Bold text designs that make statements.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        productCount: 15,
      },
      {
        id: "4",
        name: "MINIMALIST",
        slug: "minimalist",
        description: "Less is more. Clean designs for the refined palate.",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
        productCount: 10,
      },
    ];
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 text-neon-cyan text-sm font-mono mb-4">
            BROWSE COLLECTIONS
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-tight text-white">
            FIND YOUR <span className="text-neon-pink">VIBE</span>
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              slug={category.slug}
              image={category.image || ""}
              description={category.description || ""}
              productCount={category.productCount || 0}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}