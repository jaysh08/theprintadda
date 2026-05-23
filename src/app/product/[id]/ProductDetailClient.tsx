"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  MessageCircle, 
  Upload, 
  CheckCircle, 
  Eye,
  EyeOff,
  MapPin,
  Clock,
  Truck,
  Share2,
  Move,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Shirt
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  plainImage: string | null;
  printImage: string | null;
  isCustomizable: boolean;
  isFeatured: boolean;
  stock: number;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [showPrint, setShowPrint] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [uploadedDesign, setUploadedDesign] = useState<string | null>(null);
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 40 });
  const [designScale, setDesignScale] = useState(100);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleWhatsAppReserve = () => {
    const message = encodeURIComponent(
      `Hi! I want to reserve:\n\n` +
      `📦 Product: ${product.name}\n` +
      `💰 Price: ₹${product.price}\n` +
      `📏 Size: ${selectedSize}\n` +
      `${product.isCustomizable && uploadedDesign ? "🎨 Custom design attached (Position: " + designPosition.x + "%," + designPosition.y + "%, Size: " + designScale + "%)\n" : ""}\n\n` +
      `Please confirm availability.`
    );
    window.open(`https://wa.me/917039514368?text=${message}`, "_blank");
  };

  const resetDesignPosition = () => {
    setDesignPosition({ x: 50, y: 40 });
    setDesignScale(100);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} at PrintAdda!`,
        url: window.location.href,
      });
    }
  };

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
            Back to Collections
          </Link>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-dark-700">
                <AnimatePresence mode="wait">
                  {showPrint && product.printImage ? (
                    <motion.div
                      key="print"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={product.printImage}
                        alt={`${product.name} - With Print`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="plain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      {product.plainImage ? (
                        <Image
                          src={product.plainImage}
                          alt={`${product.name} - Plain`}
                          fill
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/30 font-mono">No preview available</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isFeatured && (
                    <span className="px-4 py-2 bg-neon-pink text-dark-900 text-sm font-bold tracking-wider rounded-full">
                      FEATURED
                    </span>
                  )}
                  {product.isCustomizable && (
                    <span className="px-4 py-2 bg-neon-cyan text-dark-900 text-sm font-bold tracking-wider rounded-full">
                      CUSTOMIZABLE
                    </span>
                  )}
                </div>

                {/* Toggle Button */}
                {product.plainImage && product.printImage && (
                  <button
                    onClick={() => setShowPrint(!showPrint)}
                    className="absolute bottom-4 right-4 px-6 py-3 glass-strong rounded-full flex items-center gap-2 text-white hover:text-neon-cyan transition-colors"
                  >
                    {showPrint ? (
                      <>
                        <EyeOff className="w-5 h-5" />
                        <span>View Plain</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-5 h-5" />
                        <span>View Print</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Toggle Indicator */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleShare}
                  className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              {/* Category */}
              <Link
                href={`/collections`}
                className="inline-block w-fit px-3 py-1 bg-dark-700 rounded-full text-neon-cyan text-sm font-mono mb-4 hover:bg-dark-600 transition-colors"
              >
                {product.category.name}
              </Link>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl tracking-tight text-white mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-neon-pink font-bold text-3xl">
                  ₹{product.price}
                </span>
                <span className="text-white/40 text-sm">Premium DTG Print</span>
              </div>

              {/* Description */}
              <p className="text-white/60 leading-relaxed mb-8">
                {product.description || "High-quality custom printed t-shirt made with premium 100% cotton and DTG printing technology. Designed to last and feel comfortable."}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-3">Select Size</label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border transition-all duration-300 flex items-center justify-center font-medium ${
                        selectedSize === size
                          ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                          : "border-white/20 text-white/60 hover:border-white/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-8">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <span className="text-white/80">In Stock ({product.stock} available)</span>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleWhatsAppReserve}
                  className="w-full py-4 bg-neon-green text-dark-900 font-bold text-lg rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  Reserve on WhatsApp
                </button>
                
                {product.isCustomizable && (
                  <label className="w-full py-4 bg-dark-700 border border-white/20 font-bold text-lg rounded-xl cursor-pointer hover:bg-dark-600 transition-colors flex items-center justify-center gap-3 text-white/80">
                    <Upload className="w-6 h-6" />
                    Upload Your Design
                    <input
                      type="file"
                      accept="image/png,image/jpeg,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setUploadedDesign(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Uploaded Design Preview with Position Controls */}
              {uploadedDesign && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 glass rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-600">
                        <img src={uploadedDesign} alt="Your design" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Design uploaded!</p>
                        <p className="text-white/50 text-sm">Position it on the t-shirt</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedDesign(null)}
                      className="p-2 text-white/40 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {/* Mini T-Shirt Preview */}
                  <div className="relative w-full max-w-xs mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-dark-600 to-dark-700 border border-white/10 mb-4">
                    <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full">
                      <path d="M40,50 L20,70 L20,100 L40,90 L40,240 L160,240 L160,90 L180,100 L180,70 L160,50 L130,30 Q100,10 70,30 Z" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                      <path d="M70,30 Q100,50 130,30" fill="none" stroke="#333" strokeWidth="2"/>
                    </svg>
                    <div 
                      className="absolute"
                      style={{
                        left: `${designPosition.x}%`,
                        top: `${designPosition.y}%`,
                        transform: `translate(-50%, -50%) scale(${designScale / 100})`,
                        width: '40%',
                        aspectRatio: '1',
                      }}
                    >
                      <img src={uploadedDesign} alt="Design" className="w-full h-full object-contain drop-shadow-lg pointer-events-none" draggable={false}/>
                    </div>
                  </div>
                  
                  {/* Position Controls */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/40 text-xs mb-1 flex items-center gap-1">
                        <Move className="w-3 h-3" />
                        Position (X: {designPosition.x}%, Y: {designPosition.y}%)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-white/30 text-xs">Horizontal</span>
                          <input type="range" min="10" max="90" value={designPosition.x} onChange={(e) => setDesignPosition({ ...designPosition, x: parseInt(e.target.value) })} className="w-full accent-neon-cyan"/>
                        </div>
                        <div>
                          <span className="text-white/30 text-xs">Vertical</span>
                          <input type="range" min="10" max="80" value={designPosition.y} onChange={(e) => setDesignPosition({ ...designPosition, y: parseInt(e.target.value) })} className="w-full accent-neon-cyan"/>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-white/40 text-xs mb-1 flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        Size ({designScale}%)
                      </label>
                      <div className="flex items-center gap-2">
                        <ZoomOut className="w-4 h-4 text-white/30"/>
                        <input type="range" min="30" max="150" value={designScale} onChange={(e) => setDesignScale(parseInt(e.target.value))} className="flex-1 accent-neon-cyan"/>
                        <ZoomIn className="w-4 h-4 text-white/30"/>
                      </div>
                    </div>
                    
                    <button onClick={resetDesignPosition} className="w-full py-1.5 bg-dark-600 hover:bg-dark-500 text-white/50 hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs transition-colors">
                      <RefreshCw className="w-3 h-3"/> Reset
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Pickup Info */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg tracking-wider text-white mb-4">PICKUP DETAILS</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Local Pickup Only</p>
                      <p className="text-white/50 text-sm">Contact us for address details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-neon-pink flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Mon-Sat: 10AM - 8PM</p>
                      <p className="text-white/50 text-sm">Usually ready within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Truck className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">WhatsApp First</p>
                      <p className="text-white/50 text-sm">Reserve via WhatsApp, pick up at your convenience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}