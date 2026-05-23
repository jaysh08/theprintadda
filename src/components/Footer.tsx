"use client";

import Link from "next/link";
import { MapPin, Clock, Phone, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-3xl tracking-wider">
                <span className="text-white">PRINT</span>
                <span className="text-neon-cyan">ADDA</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Your local destination for custom t-shirt printing. 
              Express yourself with unique designs or bring your own creations to life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              {["Collections", "Custom Prints", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white/60 hover:text-neon-cyan transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-6">CATEGORIES</h4>
            <ul className="space-y-3">
              {["Streetwear", "Abstract Art", "Typography", "Custom Uploads"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/collections`}
                    className="text-white/60 hover:text-neon-pink transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg tracking-wider text-white mb-6">VISIT US</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">Local Pickup Only<br />Contact for Address</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-neon-pink flex-shrink-0" />
                <span className="text-white/60 text-sm">Mon-Sat: 10AM - 8PM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neon-purple flex-shrink-0" />
                <span className="text-white/60 text-sm">+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">
            © 2024 PrintAdda. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919136598457"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm font-medium hover:bg-neon-green hover:text-dark-900 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/theprintadda2k26"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-dark-600 border border-white/10 text-white/60 hover:border-neon-pink hover:text-neon-pink transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}