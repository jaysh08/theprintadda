"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image, File, X, CheckCircle, MessageCircle, Info } from "lucide-react";

type Step = "upload" | "details" | "confirm";

export default function CustomPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload PNG, JPG, or PDF files only");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }
    setFile(selectedFile);
    
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleSubmit = () => {
    const text = encodeURIComponent(
      `🎨 Custom Design Request\n\n` +
      `👤 Name: ${name}\n` +
      `📱 Phone: ${phone}\n` +
      `${email ? `📧 Email: ${email}\n` : ""}` +
      `${message ? `💬 Message: ${message}\n` : ""}` +
      `📎 File: ${file?.name || "See attached"}`
    );
    window.open(`https://wa.me/91XXXXXXXXXX?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-pink/10 rounded-full blur-[180px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-neon-yellow/30 text-neon-yellow text-sm font-mono mb-4">
            CUSTOM PRINTS
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] tracking-tight text-white">
            UPLOAD YOUR <span className="text-neon-cyan">DESIGN</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Send us your artwork and we&apos;ll print it on premium cotton tees.
          </p>
        </motion.div>
      </section>

      {/* Steps Progress */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {["upload", "details", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${
                  step === s ? "bg-neon-cyan text-dark-900" :
                  (step === "details" && s === "upload") || (step === "confirm" && (s === "upload" || s === "details"))
                    ? "bg-neon-green text-dark-900"
                    : "bg-dark-700 text-white/40"
                }`}>
                  {step === s ? i + 1 : <CheckCircle className="w-5 h-5" />}
                </div>
                {i < 2 && <div className={`w-16 h-0.5 ${step !== "upload" && s !== "confirm" ? "bg-neon-cyan" : "bg-dark-600"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-3">
            <span className={`text-sm ${step === "upload" ? "text-white" : "text-white/40"}`}>Upload</span>
            <span className={`text-sm ${step === "details" ? "text-white" : "text-white/40"}`}>Details</span>
            <span className={`text-sm ${step === "confirm" ? "text-white" : "text-white/40"}`}>Confirm</span>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Upload */}
          {step === "upload" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-8"
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragging 
                    ? "border-neon-cyan bg-neon-cyan/10" 
                    : "border-white/20 hover:border-neon-cyan/50 hover:bg-dark-700/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                
                {!file ? (
                  <>
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-dark-700 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-neon-cyan" />
                    </div>
                    <h3 className="font-display text-2xl text-white mb-2">Drop your design here</h3>
                    <p className="text-white/50 mb-4">or click to browse</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["PNG", "JPG", "PDF"].map((ext) => (
                        <span key={ext} className="px-3 py-1 bg-dark-700 rounded-full text-white/40 text-sm font-mono">.{ext}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 rounded-2xl bg-neon-green/20 flex items-center justify-center">
                      <File className="w-10 h-10 text-neon-green" />
                    </div>
                    <p className="text-white font-medium mb-1">{file.name}</p>
                    <p className="text-white/50 text-sm mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove file
                    </button>
                  </div>
                )}
              </div>

              {/* Preview */}
              {preview && (
                <div className="mt-8">
                  <h4 className="text-white font-medium mb-4">Preview</h4>
                  <div className="relative w-full max-w-xs aspect-square rounded-xl overflow-hidden bg-dark-700 mx-auto">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep("details")}
                disabled={!file}
                className="w-full mt-8 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === "details" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full input-glow rounded-xl text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">WhatsApp Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full input-glow rounded-xl text-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full input-glow rounded-xl text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Additional Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full input-glow rounded-xl text-white h-32 resize-none"
                    placeholder="Any special instructions?"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep("upload")}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  disabled={!name || !phone}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === "confirm" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-green/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-neon-green" />
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Review Your Request</h3>
                <p className="text-white/60">We&apos;ll send this via WhatsApp for confirmation</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-white/60">Name</span>
                  <span className="text-white font-medium">{name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-white/60">Phone</span>
                  <span className="text-white font-medium">{phone}</span>
                </div>
                {email && (
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/60">Email</span>
                    <span className="text-white font-medium">{email}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-white/60">File</span>
                  <span className="text-white font-medium">{file?.name}</span>
                </div>
                {message && (
                  <div className="py-3">
                    <span className="text-white/60 block mb-2">Message</span>
                    <span className="text-white">{message}</span>
                  </div>
                )}
              </div>

              <div className="bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-sm">
                    Clicking send will open WhatsApp with your details. We&apos;ll confirm your order within a few hours.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-neon-green text-dark-900 font-bold text-lg rounded-xl hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Send via WhatsApp
              </button>

              <button
                onClick={() => setStep("details")}
                className="w-full mt-4 btn-secondary"
              >
                Go Back
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}