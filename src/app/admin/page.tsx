"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  Image, 
  Users, 
  Settings,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";

type Tab = "dashboard" | "categories" | "products" | "designs";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "printadda2024") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-3xl text-white">ADMIN LOGIN</h1>
            <p className="text-white/60 mt-2">Enter password to access dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full input-glow rounded-xl text-white text-center text-lg tracking-widest"
            />
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-dark-800 border-b border-white/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-white">ADMIN DASHBOARD</h1>
            <p className="text-white/60">Manage your PrintAdda store</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-dark-700 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-dark-800 border-b border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "categories", icon: Package, label: "Categories" },
            { id: "products", icon: Image, label: "Products" },
            { id: "designs", icon: Users, label: "Designs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-neon-cyan border-b-2 border-neon-cyan"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="p-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "categories" && <CategoriesContent />}
          {activeTab === "products" && <ProductsContent />}
          {activeTab === "designs" && <DesignsContent />}
        </div>
      </section>
    </div>
  );
}

function DashboardContent() {
  const stats = [
    { label: "Total Products", value: "24", change: "+3 this week", color: "cyan" },
    { label: "Categories", value: "4", change: "Active", color: "pink" },
    { label: "Custom Requests", value: "12", change: "This month", color: "purple" },
    { label: "Featured Items", value: "6", change: "On homepage", color: "yellow" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="glass rounded-2xl p-6">
          <span className={`text-${stat.color === 'cyan' ? 'neon-cyan' : stat.color === 'pink' ? 'neon-pink' : stat.color === 'purple' ? 'neon-purple' : 'neon-yellow'} text-sm font-mono`}>
            {stat.label}
          </span>
          <p className="font-display text-4xl text-white mt-2">{stat.value}</p>
          <p className="text-white/40 text-sm mt-1">{stat.change}</p>
        </div>
      ))}
    </motion.div>
  );
}

function CategoriesContent() {
  const [categories, setCategories] = useState([
    { id: "1", name: "STREETWEAR", slug: "streetwear", description: "Bold statements, louder fits", image: null, order: 1, _count: { products: 8 } },
    { id: "2", name: "ABSTRACT", slug: "abstract", description: "Art you can wear", image: null, order: 2, _count: { products: 6 } },
    { id: "3", name: "TYPOGRAPHY", slug: "typography", description: "Words that speak", image: null, order: 3, _count: { products: 5 } },
    { id: "4", name: "MINIMALIST", slug: "minimalist", description: "Less is more", image: null, order: 4, _count: { products: 5 } },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof categories[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

  const handleDelete = (id: string) => {
    if (confirm("Delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleEdit = (category: typeof categories[0]) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug, description: category.description || "" });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
    } else {
      setCategories([...categories, { id: Date.now().toString(), ...formData, order: categories.length + 1, _count: { products: 0 } }]);
    }
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "", slug: "", description: "" });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Categories</h2>
        <button
          onClick={() => { setEditingCategory(null); setFormData({ name: "", slug: "", description: "" }); setShowModal(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="glass rounded-xl p-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl text-white">{category.name}</h3>
              <p className="text-white/50 text-sm">{category.description}</p>
              <span className="text-neon-cyan text-sm font-mono">{category._count.products} products</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(category)} className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                <Edit2 className="w-5 h-5 text-white/60" />
              </button>
              <button onClick={() => handleDelete(category.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white">{editingCategory ? "Edit" : "Add"} Category</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-dark-600 rounded-lg">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input-glow rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full input-glow rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full input-glow rounded-xl text-white h-24 resize-none"
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                {editingCategory ? "Update" : "Create"} Category
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function ProductsContent() {
  const [products, setProducts] = useState([
    { id: "1", name: "NEON DREAMS", slug: "neon-dreams", price: 599, categoryId: "1", isCustomizable: false, isFeatured: true, stock: 10 },
    { id: "2", name: "URBAN ABSTRACT", slug: "urban-abstract", price: 699, categoryId: "2", isCustomizable: true, isFeatured: true, stock: 8 },
    { id: "3", name: "STREET KING", slug: "street-king", price: 799, categoryId: "1", isCustomizable: false, isFeatured: true, stock: 12 },
    { id: "4", name: "CYBER PULSE", slug: "cyber-pulse", price: 649, categoryId: "3", isCustomizable: true, isFeatured: true, stock: 15 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", price: 0, categoryId: "1", isCustomizable: false, isFeatured: false });

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Products</h2>
        <button
          onClick={() => { setEditingProduct(null); setFormData({ name: "", slug: "", price: 0, categoryId: "1", isCustomizable: false, isFeatured: false }); setShowModal(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/60 border-b border-white/10">
              <th className="pb-4 font-medium">Name</th>
              <th className="pb-4 font-medium">Price</th>
              <th className="pb-4 font-medium">Custom</th>
              <th className="pb-4 font-medium">Featured</th>
              <th className="pb-4 font-medium">Stock</th>
              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/5">
                <td className="py-4 text-white font-medium">{product.name}</td>
                <td className="py-4 text-neon-pink">₹{product.price}</td>
                <td className="py-4">
                  {product.isCustomizable ? <CheckCircle className="w-5 h-5 text-neon-green" /> : <AlertCircle className="w-5 h-5 text-white/20" />}
                </td>
                <td className="py-4">
                  {product.isFeatured ? <CheckCircle className="w-5 h-5 text-neon-yellow" /> : <AlertCircle className="w-5 h-5 text-white/20" />}
                </td>
                <td className="py-4 text-white/60">{product.stock}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function DesignsContent() {
  const [designs] = useState([
    { id: "1", name: "Rahul S.", phone: "+91 98765 43210", status: "pending", createdAt: "2024-01-15" },
    { id: "2", name: "Priya M.", phone: "+91 87654 32109", status: "confirmed", createdAt: "2024-01-14" },
    { id: "3", name: "Amit K.", phone: "+91 76543 21098", status: "pending", createdAt: "2024-01-13" },
  ]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Custom Design Requests</h2>
      </div>

      <div className="space-y-4">
        {designs.map((design) => (
          <div key={design.id} className="glass rounded-xl p-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl text-white">{design.name}</h3>
              <p className="text-white/50 text-sm">{design.phone}</p>
              <p className="text-white/30 text-xs mt-1">{design.createdAt}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                design.status === "pending" ? "bg-neon-yellow/20 text-neon-yellow" : "bg-neon-green/20 text-neon-green"
              }`}>
                {design.status}
              </span>
              <button className="px-4 py-2 bg-neon-cyan text-dark-900 font-medium rounded-lg hover:bg-neon-cyan/80 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}