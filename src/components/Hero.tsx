"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Shirt, Palette, Zap } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-pink/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px]" />

      {/* Floating Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-[10%] w-32 h-32 border border-neon-cyan/30 rounded-full animate-float"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute top-40 right-[15%] w-20 h-20 bg-neon-pink/20 rounded-lg rotate-12 animate-float"
      />
      <motion.div
        style={{ y }}
        className="absolute bottom-40 left-[20%] w-24 h-24 border border-neon-purple/30 rotate-45 animate-float"
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-neon-yellow" />
          <span className="text-sm font-medium text-white/80">New Collection Dropping</span>
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight mb-6"
        >
          <span className="block text-white">PRINT</span>
          <span className="block gradient-text">YOUR</span>
          <span className="block text-white">STYLE</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Custom t-shirt printing that speaks louder than words.
          <br className="hidden md:block" />
          Pickup available. WhatsApp to reserve.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/collections" className="btn-primary flex items-center gap-3 group">
            Explore Collections
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/custom" className="btn-secondary flex items-center gap-3">
            <Palette className="w-5 h-5" />
            Upload Your Design
          </Link>
        </motion.div>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: Shirt, text: "Premium Cotton", color: "cyan" },
            { icon: Zap, text: "Fast Turnaround", color: "pink" },
            { icon: Palette, text: "Custom Designs", color: "purple" },
          ].map((item, i) => (
            <div
              key={item.text}
              className={`flex items-center gap-2 px-4 py-2 rounded-full glass border border-${item.color === 'cyan' ? 'neon-cyan/20' : item.color === 'pink' ? 'neon-pink/20' : 'neon-purple/20'}`}
            >
              <item.icon className={`w-4 h-4 text-${item.color === 'cyan' ? 'neon-cyan' : item.color === 'pink' ? 'neon-pink' : 'neon-purple'}`} />
              <span className="text-sm text-white/70">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}