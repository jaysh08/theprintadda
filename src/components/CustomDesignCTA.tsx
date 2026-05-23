"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, Palette, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Design",
    description: "Send us your artwork via WhatsApp",
  },
  {
    icon: Palette,
    title: "We Print It",
    description: "Premium DTG printing on quality cotton",
  },
  {
    icon: CheckCircle,
    title: "Pick It Up",
    description: "Grab your custom creation locally",
  },
];

export default function CustomDesignCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-neon-yellow/30 text-neon-yellow text-sm font-mono mb-6">
              CUSTOM PRINTS
            </span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-white mb-6">
              YOUR DESIGN.<br />
              <span className="text-neon-pink">YOUR STYLE.</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Got an idea? Upload your design and we&apos;ll bring it to life on premium cotton tees.
              Logos, artwork, quotes - if you can imagine it, we can print it.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <span className="text-neon-cyan font-mono text-xs mb-1 block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-white font-medium">{step.title}</h4>
                    <p className="text-white/50 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/custom"
              className="inline-flex items-center gap-3 btn-primary"
            >
              Upload Your Design
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Grid */}
            <div className="absolute inset-0 grid-pattern opacity-30 rounded-3xl" />
            
            {/* Main Card */}
            <div className="relative glass rounded-3xl p-8 border border-white/10">
              {/* Mock T-Shirt */}
              <div className="relative aspect-square mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-600 to-dark-700 rounded-2xl flex items-center justify-center">
                  <div className="w-48 h-48 bg-dark-800 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center">
                    <span className="text-white/30 text-sm font-mono">Your Design Here</span>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-neon-cyan text-dark-900 font-bold text-sm rounded-full shadow-lg shadow-neon-cyan/30">
                  ANY DESIGN
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-neon-pink text-dark-900 font-bold text-sm rounded-full shadow-lg shadow-neon-pink/30">
                  CUSTOM SIZES
                </div>
              </div>

              {/* Supported Formats */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["PNG", "JPG", "PDF", "AI", "EPS"].map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1.5 bg-dark-700 border border-white/10 rounded-full text-white/60 text-xs font-mono"
                  >
                    .{format}
                  </span>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi! I want to print my custom design."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-4 bg-neon-green text-dark-900 font-bold text-center rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}