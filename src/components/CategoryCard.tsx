"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
  index: number;
}

export default function CategoryCard({ name, slug, image, description, productCount, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/category/${slug}`}
        className="group relative block overflow-hidden rounded-2xl bg-dark-700 card-hover"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20" />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-16 h-16 border border-neon-cyan/30 rounded-full rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-20 right-4 w-10 h-10 bg-neon-pink/20 rounded-lg rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: "100ms" }} />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-mono text-neon-cyan bg-neon-cyan/10 rounded-full border border-neon-cyan/20 mb-3">
              {productCount} Products
            </span>
            <h3 className="font-display text-3xl tracking-wider text-white group-hover:text-neon-cyan transition-colors duration-300">
              {name}
            </h3>
          </div>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-neon-pink transition-colors duration-300">
            View Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-pink/10" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-neon-cyan/20 to-transparent" />
        </div>
      </Link>
    </motion.div>
  );
}