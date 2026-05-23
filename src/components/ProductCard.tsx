"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  printImage: string;
  plainImage: string;
  isCustomizable: boolean;
  isFeatured: boolean;
  index: number;
}

export default function ProductCard({ 
  id, 
  name, 
  slug, 
  price, 
  printImage, 
  plainImage, 
  isCustomizable,
  isFeatured,
  index 
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/product/${id}`}
        className="group relative block overflow-hidden rounded-2xl bg-dark-700 card-hover"
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-neon-pink text-dark-900 text-xs font-bold tracking-wider rounded-full">
            FEATURED
          </div>
        )}

        {/* Customizable Badge */}
        {isCustomizable && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-neon-cyan text-dark-900 text-xs font-bold tracking-wider rounded-full">
            CUSTOMIZABLE
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Plain T-Shirt (Background) */}
          {plainImage && (
            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
              <Image
                src={plainImage}
                alt={`${name} - Plain`}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Print T-Shirt (Foreground) */}
          {printImage && (
            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
              <Image
                src={printImage}
                alt={`${name} - With Print`}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* View Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-xl tracking-wider text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-neon-pink font-bold text-lg">
              ₹{price}
            </span>
            <span className="text-white/40 text-sm">
              {plainImage && "Hover to preview"}
            </span>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </motion.div>
  );
}