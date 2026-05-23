"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Local Pickup",
    description: "Visit our store to pick up your order. No delivery fees, just good vibes.",
    color: "cyan",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Most orders ready within 24-48 hours. Time is precious, we get it.",
    color: "pink",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "100% cotton, DTG printing that lasts. No fading, no compromise.",
    color: "purple",
  },
  {
    icon: Truck,
    title: "WhatsApp First",
    description: "Reserve via WhatsApp, pick up when ready. Simple as that.",
    color: "green",
  },
];

export default function PickupInfo() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-neon-purple/30 text-neon-purple text-sm font-mono mb-4">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-tight text-white">
            PICKUP MADE <span className="text-neon-green">EASY</span>
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Simple process, no hidden fees. Just great prints and local convenience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-800 rounded-2xl border border-white/5 transform group-hover:scale-[1.02] transition-transform duration-300" />
              
              <div className="relative p-8 h-full flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-${feature.color}/10 border border-${feature.color}/20`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color === 'cyan' ? 'neon-cyan' : feature.color === 'pink' ? 'neon-pink' : feature.color === 'purple' ? 'neon-purple' : 'neon-green'}`} />
                </div>

                <h3 className="font-display text-xl tracking-wider text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-${feature.color} group-hover:w-full transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pickup Hours Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl glass gradient-border text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
              <span className="text-white font-medium">Currently Open for Pickup</span>
            </div>
            <div className="h-px md:h-12 w-px bg-white/20" />
            <div className="text-white/60">
              <span className="font-mono text-neon-cyan">Mon-Sat:</span> 10:00 AM - 8:00 PM
            </div>
            <div className="h-px md:h-12 w-px bg-white/20" />
            <a
              href="https://wa.me/919136598457"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-neon-green text-dark-900 font-bold rounded-full hover:scale-105 transition-transform"
            >
              Reserve on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}