"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, MessageCircle, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neon-pink/10 rounded-full blur-[180px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-neon-purple/30 text-neon-purple text-sm font-mono mb-6">
            OUR STORY
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tight text-white mb-6">
            PRINT YOUR <span className="text-neon-cyan">STORY</span>
          </h1>
          <p className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed">
            Born from a love for streetwear and self-expression. PrintAdda is where creativity meets cotton, 
            and every tee tells a story. We print dreams, one shirt at a time.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl text-white mb-6">
                WHY <span className="text-neon-pink">PRINT</span>?
              </h2>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  In a world of fast fashion and generic prints, we believe your clothes should speak 
                  <span className="text-white font-medium"> louder</span>.
                </p>
                <p>
                  Every design we create is a statement. Every print is a canvas for your personality.
                  Whether you&apos;re channeling street culture, artistic vibes, or your own custom creation -
                  we&apos;ve got you covered.
                </p>
                <p>
                  Quality matters to us. Premium cotton, DTG printing that lasts, and attention to 
                  every detail. Because you deserve to wear something that makes you feel 
                  <span className="text-neon-cyan font-medium"> unstoppable</span>.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 gradient-border">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "500+", label: "Tees Printed" },
                    { number: "50+", label: "Designs" },
                    { number: "100%", label: "Cotton" },
                    { number: "∞", label: "Style" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-display text-4xl text-neon-cyan mb-1">{stat.number}</p>
                      <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 text-neon-cyan text-sm font-mono mb-4">
              WHAT WE BELIEVE
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              OUR <span className="text-neon-pink">VALUES</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "QUALITY FIRST",
                description: "Premium materials, lasting prints. We never compromise on what goes on your body.",
                color: "cyan"
              },
              {
                title: "KEEP IT LOCAL",
                description: "No delivery fees, no long waits. Pick up your order, support local business.",
                color: "pink"
              },
              {
                title: "YOUR VISION",
                description: "Upload your design, we bring it to life. Your creativity, our canvas.",
                color: "purple"
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-${value.color}/10 border border-${value.color}/20 flex items-center justify-center`}>
                  <Heart className={`w-8 h-8 text-${value.color === 'cyan' ? 'neon-cyan' : value.color === 'pink' ? 'neon-pink' : 'neon-purple'}`} />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{value.title}</h3>
                <p className="text-white/50">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-neon-green/30 text-neon-green text-sm font-mono mb-4">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              VISIT <span className="text-neon-cyan">US</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-white mb-1">Location</h4>
                    <p className="text-white/60">Contact us via WhatsApp for the exact address</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-neon-pink flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-white mb-1">Pickup Hours</h4>
                    <p className="text-white/60">Monday - Saturday<br />10:00 AM - 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-display text-lg text-white mb-1">Phone</h4>
                    <p className="text-white/60">+91 XXXXX XXXXX</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-neon-green text-dark-900 font-bold text-lg rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-3 mb-4"
                >
                  <MessageCircle className="w-6 h-6" />
                  Chat on WhatsApp
                </a>
                <p className="text-white/40 text-sm text-center">
                  Quickest way to reach us! We typically respond within minutes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}