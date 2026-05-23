"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, File, X, CheckCircle, MessageCircle, Info, Move, ZoomIn, ZoomOut, RefreshCw, Shirt, Crop, Type, Loader2 } from "lucide-react";

type Step = "upload" | "details" | "confirm";

export default function CustomPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showCropTool, setShowCropTool] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 25, y: 25, width: 50, height: 50 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  
  // Mockup controls
  const [showMockup, setShowMockup] = useState(true);
  const [designPosition, setDesignPosition] = useState({ x: 50, y: 40 });
  const [designScale, setDesignScale] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    setFileName(selectedFile.name.replace(/\.[^/.]+$/, "")); // Default name without extension
    
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCrop = () => {
    if (!preview || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width * (cropArea.width / 100);
      canvas.height = img.height * (cropArea.height / 100);
      
      const sx = img.width * (cropArea.x / 100);
      const sy = img.height * (cropArea.y / 100);
      const sw = img.width * (cropArea.width / 100);
      const sh = img.height * (cropArea.height / 100);
      
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      const croppedDataUrl = canvas.toDataURL("image/png");
      setPreview(croppedDataUrl);
      setShowCropTool(false);
    };
    img.src = preview;
  };

  const resetDesignPosition = () => {
    setDesignPosition({ x: 50, y: 40 });
    setDesignScale(100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("Please fill in name and phone number");
      return;
    }

    setIsSubmitting(true);
    let orderId = null;

    // Try to save to database
    try {
      const response = await fetch("/api/custom-designs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          designName: fileName || file?.name || "Unnamed Design",
          designPosition: `${designPosition.x}% horizontal, ${designPosition.y}% vertical`,
          designScale: `${designScale}%`,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        orderId = data.id.slice(-8).toUpperCase();
        setSubmittedId(data.id);
      }
    } catch (error) {
      console.error("Could not save to database:", error);
      // Continue anyway - WhatsApp message will still work
    }

    // Open WhatsApp regardless of DB success
    const text = encodeURIComponent(
      `${orderId ? `📋 Order ID: ${orderId}\n\n` : ""}` +
      `🎨 Custom Design Request\n\n` +
      `👤 Name: ${name}\n` +
      `📱 Phone: ${phone}\n` +
      `${email ? `📧 Email: ${email}\n` : ""}` +
      `${message ? `💬 Message: ${message}\n` : ""}` +
      `📎 File: ${fileName || file?.name || "See attached"}\n` +
      `🎯 Design Position: ${designPosition.x}% horizontal, ${designPosition.y}% vertical\n` +
      `📐 Design Scale: ${designScale}%`
    );
    window.open(`https://wa.me/919136598457?text=${text}`, "_blank");
    setIsSubmitting(false);
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
                    
                    {/* Image Rename Input */}
                    <div className="w-full max-w-xs mb-4">
                      <label className="text-white/50 text-xs mb-1 flex items-center gap-1">
                        <Type className="w-3 h-3" />
                        Rename your design
                      </label>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full input-glow rounded-lg text-white text-sm bg-dark-800"
                        placeholder="Design name"
                      />
                    </div>
                    
                    {/* Crop Tool Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowCropTool(true); }}
                      className="mb-2 px-3 py-1.5 bg-neon-cyan/20 text-neon-cyan text-sm rounded-lg hover:bg-neon-cyan/30 transition-colors flex items-center gap-1"
                    >
                      <Crop className="w-4 h-4" />
                      Crop Image
                    </button>
                    
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setFileName(""); }}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove file
                    </button>
                  </div>
                )}
              </div>

              {/* Mockup Preview with Design Position */}
              {preview && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Shirt className="w-5 h-5 text-neon-cyan" />
                      Live Preview
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowMockup(!showMockup)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          showMockup 
                            ? "bg-neon-cyan text-dark-900" 
                            : "bg-dark-600 text-white/60"
                        }`}
                      >
                        {showMockup ? "Design on Shirt" : "Plain Shirt"}
                      </button>
                    </div>
                  </div>
                  
                  {/* T-Shirt Mockup */}
                  <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-dark-600 to-dark-700 border border-white/10">
                    {/* T-Shirt SVG */}
                    <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full">
                      {/* T-shirt shape */}
                      <path 
                        d="M40,50 L20,70 L20,100 L40,90 L40,240 L160,240 L160,90 L180,100 L180,70 L160,50 L130,30 Q100,10 70,30 Z" 
                        fill="#1a1a1a" 
                        stroke="#333" 
                        strokeWidth="1"
                      />
                      {/* Collar */}
                      <path 
                        d="M70,30 Q100,50 130,30" 
                        fill="none" 
                        stroke="#333" 
                        strokeWidth="2"
                      />
                    </svg>
                    
                    {/* Design Overlay */}
                    {preview && showMockup && (
                      <div 
                        className="absolute cursor-move"
                        style={{
                          left: `${designPosition.x}%`,
                          top: `${designPosition.y}%`,
                          transform: `translate(-50%, -50%) scale(${designScale / 100})`,
                          width: '40%',
                          height: 'auto',
                          aspectRatio: '1',
                        }}
                      >
                        <img 
                          src={preview} 
                          alt="Design" 
                          className="w-full h-full object-contain drop-shadow-lg pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    )}
                    
                    {/* Plain t-shirt mode - show upload indicator */}
                    {preview && !showMockup && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/30">
                          <Shirt className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <span className="text-sm">Plain View</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Design Position Controls */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="text-white/60 text-sm mb-2 flex items-center gap-2">
                        <Move className="w-4 h-4" />
                        Position (X: {designPosition.x}%, Y: {designPosition.y}%)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-white/40 text-xs">Horizontal</span>
                          <input
                            type="range"
                            min="10"
                            max="90"
                            value={designPosition.x}
                            onChange={(e) => setDesignPosition({ ...designPosition, x: parseInt(e.target.value) })}
                            className="w-full accent-neon-cyan"
                          />
                        </div>
                        <div>
                          <span className="text-white/40 text-xs">Vertical</span>
                          <input
                            type="range"
                            min="10"
                            max="80"
                            value={designPosition.y}
                            onChange={(e) => setDesignPosition({ ...designPosition, y: parseInt(e.target.value) })}
                            className="w-full accent-neon-cyan"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-white/60 text-sm mb-2 flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" />
                        Size ({designScale}%)
                      </label>
                      <div className="flex items-center gap-4">
                        <ZoomOut className="w-5 h-5 text-white/40" />
                        <input
                          type="range"
                          min="30"
                          max="150"
                          value={designScale}
                          onChange={(e) => setDesignScale(parseInt(e.target.value))}
                          className="flex-1 accent-neon-cyan"
                        />
                        <ZoomIn className="w-5 h-5 text-white/40" />
                      </div>
                    </div>
                    
                    <button
                      onClick={resetDesignPosition}
                      className="w-full py-2 bg-dark-600 hover:bg-dark-500 text-white/60 hover:text-white rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset Position
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden canvas for cropping */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Crop Tool Modal */}
              {showCropTool && preview && (
                <div className="fixed inset-0 bg-dark-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-6 w-full max-w-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-xl text-white flex items-center gap-2">
                        <Crop className="w-5 h-5 text-neon-cyan" />
                        Crop Your Design
                      </h3>
                      <button onClick={() => setShowCropTool(false)} className="p-2 hover:bg-dark-600 rounded-lg">
                        <X className="w-5 h-5 text-white/60" />
                      </button>
                    </div>
                    
                    <p className="text-white/50 text-sm mb-4">Adjust the crop area to focus on the part you want to print.</p>
                    
                    {/* Preview with crop overlay */}
                    <div className="relative mb-4 rounded-xl overflow-hidden bg-dark-700">
                      <img src={preview} alt="Preview" className="w-full max-h-64 object-contain" />
                      {/* Crop area indicator */}
                      <div 
                        className="absolute border-2 border-neon-cyan bg-neon-cyan/10"
                        style={{
                          left: `${cropArea.x}%`,
                          top: `${cropArea.y}%`,
                          width: `${cropArea.width}%`,
                          height: `${cropArea.height}%`,
                        }}
                      />
                    </div>
                    
                    {/* Crop controls */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-white/60 text-xs mb-1 block">X Position ({cropArea.x}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="75"
                          value={cropArea.x}
                          onChange={(e) => setCropArea({ ...cropArea, x: parseInt(e.target.value) })}
                          className="w-full accent-neon-cyan"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-xs mb-1 block">Y Position ({cropArea.y}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="75"
                          value={cropArea.y}
                          onChange={(e) => setCropArea({ ...cropArea, y: parseInt(e.target.value) })}
                          className="w-full accent-neon-cyan"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/60 text-xs mb-1 block">Width ({cropArea.width}%)</label>
                          <input
                            type="range"
                            min="25"
                            max="100"
                            value={cropArea.width}
                            onChange={(e) => setCropArea({ ...cropArea, width: parseInt(e.target.value) })}
                            className="w-full accent-neon-cyan"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-xs mb-1 block">Height ({cropArea.height}%)</label>
                          <input
                            type="range"
                            min="25"
                            max="100"
                            value={cropArea.height}
                            onChange={(e) => setCropArea({ ...cropArea, height: parseInt(e.target.value) })}
                            className="w-full accent-neon-cyan"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={handleCrop}
                        className="flex-1 btn-primary flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Apply Crop
                      </button>
                      <button
                        onClick={() => setShowCropTool(false)}
                        className="flex-1 btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
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
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-white/60">Design Position</span>
                  <span className="text-white font-medium">X: {designPosition.x}%, Y: {designPosition.y}%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-white/60">Design Size</span>
                  <span className="text-white font-medium">{designScale}%</span>
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