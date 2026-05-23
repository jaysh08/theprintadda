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
  AlertCircle,
  MessageCircle
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
      setCategories([...categories, { id: Date.now().toString(), ...formData, image: null, order: categories.length + 1, _count: { products: 0 } }]);
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
  type Product = {
    id: string;
    name: string;
    slug: string;
    price: number;
    categoryId: string;
    isCustomizable: boolean;
    isFeatured: boolean;
    stock: number;
    plainImage: string | null;
    printImage: string | null;
    description: string;
  };

  type ProductForm = Omit<Product, 'id'>;

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "NEON DREAMS", slug: "neon-dreams", price: 599, categoryId: "1", isCustomizable: false, isFeatured: true, stock: 10, plainImage: null, printImage: null, description: "" },
    { id: "2", name: "URBAN ABSTRACT", slug: "urban-abstract", price: 699, categoryId: "2", isCustomizable: true, isFeatured: true, stock: 8, plainImage: null, printImage: null, description: "" },
    { id: "3", name: "STREET KING", slug: "street-king", price: 799, categoryId: "1", isCustomizable: false, isFeatured: true, stock: 12, plainImage: null, printImage: null, description: "" },
    { id: "4", name: "CYBER PULSE", slug: "cyber-pulse", price: 649, categoryId: "3", isCustomizable: true, isFeatured: true, stock: 15, plainImage: null, printImage: null, description: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    name: "", 
    slug: "", 
    price: 0, 
    categoryId: "1", 
    isCustomizable: false, 
    isFeatured: false,
    stock: 0,
    plainImage: null,
    printImage: null,
    description: ""
  });

  const categories = [
    { id: "1", name: "Streetwear" },
    { id: "2", name: "Abstract" },
    { id: "3", name: "Typography" },
    { id: "4", name: "Minimalist" },
  ];

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      categoryId: product.categoryId,
      isCustomizable: product.isCustomizable,
      isFeatured: product.isFeatured,
      stock: product.stock,
      plainImage: product.plainImage,
      printImage: product.printImage,
      description: product.description
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...formData } : p));
    } else {
      setProducts([...products, { id: Date.now().toString(), ...formData }]);
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: "", slug: "", price: 0, categoryId: "1", isCustomizable: false, isFeatured: false, stock: 0, plainImage: null, printImage: null, description: "" });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Products</h2>
        <button
          onClick={() => { setEditingProduct(null); setFormData({ name: "", slug: "", price: 0, categoryId: "1", isCustomizable: false, isFeatured: false, stock: 0, plainImage: null, printImage: null, description: "" }); setShowModal(true); }}
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
              <th className="pb-4 font-medium">Category</th>
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
                <td className="py-4 text-white/60">{categories.find(c => c.id === product.categoryId)?.name || "N/A"}</td>
                <td className="py-4">
                  {product.isCustomizable ? <CheckCircle className="w-5 h-5 text-neon-green" /> : <AlertCircle className="w-5 h-5 text-white/20" />}
                </td>
                <td className="py-4">
                  {product.isFeatured ? <CheckCircle className="w-5 h-5 text-neon-yellow" /> : <AlertCircle className="w-5 h-5 text-white/20" />}
                </td>
                <td className="py-4 text-white/60">{product.stock}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5 text-white/60" />
                    </button>
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

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white">{editingProduct ? "Edit" : "Add"} Product</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-dark-600 rounded-lg">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input-glow rounded-xl text-white"
                  placeholder="e.g. NEON DREAMS"
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
                  placeholder="neon-dreams"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full input-glow rounded-xl text-white"
                    placeholder="599"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock || ""}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full input-glow rounded-xl text-white"
                    placeholder="10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Category *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full input-glow rounded-xl text-white bg-dark-800"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full input-glow rounded-xl text-white h-20 resize-none"
                  placeholder="Product description..."
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Plain T-Shirt Image URL</label>
                <input
                  type="text"
                  value={formData.plainImage || ""}
                  onChange={(e) => setFormData({ ...formData, plainImage: e.target.value || null })}
                  className="w-full input-glow rounded-xl text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Print Design Image URL</label>
                <input
                  type="text"
                  value={formData.printImage || ""}
                  onChange={(e) => setFormData({ ...formData, printImage: e.target.value || null })}
                  className="w-full input-glow rounded-xl text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCustomizable}
                    onChange={(e) => setFormData({ ...formData, isCustomizable: e.target.checked })}
                    className="w-5 h-5 accent-neon-cyan"
                  />
                  <span className="text-white">Allow Custom Design Upload</span>
                </label>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5 accent-neon-yellow"
                  />
                  <span className="text-white">Show on Homepage (Featured)</span>
                </label>
              </div>
              <button type="submit" className="w-full btn-primary">
                {editingProduct ? "Update" : "Create"} Product
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function DesignsContent() {
  type DesignRequest = {
    id: string;
    name: string;
    phone: string;
    email?: string;
    message?: string;
    designName?: string;
    designPosition?: string;
    designScale?: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    createdAt: string;
    notes?: string;
  };

  const [designs, setDesigns] = useState<DesignRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState<DesignRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Fetch designs from API
  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const response = await fetch("/api/custom-designs");
      if (response.ok) {
        const data = await response.json();
        setDesigns(data.map((d: any) => ({
          id: d.id,
          name: d.name,
          phone: d.phone,
          email: d.email || undefined,
          message: d.message || undefined,
          designName: d.designName || d.image,
          designPosition: d.designPosition || undefined,
          designScale: d.designScale || undefined,
          status: d.status as DesignRequest["status"],
          createdAt: new Date(d.createdAt).toLocaleString(),
        })));
      }
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: DesignRequest["status"]) => {
    try {
      const response = await fetch(`/api/custom-designs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setDesigns(designs.map(d => d.id === id ? { ...d, status: newStatus } : d));
        if (selectedDesign?.id === id) {
          setSelectedDesign({ ...selectedDesign, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleViewDetails = (design: DesignRequest) => {
    setSelectedDesign(design);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this design request?")) {
      try {
        const response = await fetch(`/api/custom-designs/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          setDesigns(designs.filter(d => d.id !== id));
        }
      } catch (error) {
        console.error("Error deleting design:", error);
      }
    }
  };

  const filteredDesigns = filterStatus === "all" 
    ? designs 
    : designs.filter(d => d.status === filterStatus);

  const statusCounts = {
    all: designs.length,
    pending: designs.filter(d => d.status === "pending").length,
    confirmed: designs.filter(d => d.status === "confirmed").length,
    completed: designs.filter(d => d.status === "completed").length,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Custom Design Requests</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchDesigns}
            className="px-4 py-2 bg-dark-700 text-white/60 text-sm rounded-lg hover:text-white transition-colors"
          >
            Refresh
          </button>
          <span className="text-white/60 text-sm">{designs.length} total requests</span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-white/60">Loading designs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && designs.length === 0 && (
        <div className="glass rounded-xl p-8 text-center">
          <p className="text-white/60">No design requests found</p>
          <p className="text-white/30 text-sm mt-2">Requests will appear here when customers submit them</p>
        </div>
      )}

      {/* Filter Tabs */}
      {!loading && designs.length > 0 && (
        <>
          <div className="flex gap-2 mb-6">
            {[
              { id: "all", label: "All", count: statusCounts.all },
              { id: "pending", label: "Pending", count: statusCounts.pending },
              { id: "confirmed", label: "Confirmed", count: statusCounts.confirmed },
              { id: "completed", label: "Completed", count: statusCounts.completed },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterStatus(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === filter.id
                    ? "bg-neon-cyan text-dark-900"
                    : "bg-dark-700 text-white/60 hover:text-white"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </>
      )}

      {/* Designs List */}
      <div className="space-y-4">
        {filteredDesigns.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-white/40">No design requests found</p>
          </div>
        ) : (
          filteredDesigns.map((design) => (
            <div key={design.id} className="glass rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-xl text-white">{design.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      design.status === "pending" ? "bg-neon-yellow/20 text-neon-yellow" :
                      design.status === "confirmed" ? "bg-neon-cyan/20 text-neon-cyan" :
                      design.status === "completed" ? "bg-neon-green/20 text-neon-green" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {design.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50">
                    <span>📱 {design.phone}</span>
                    {design.email && <span>📧 {design.email}</span>}
                    {design.designName && <span>📎 {design.designName}</span>}
                  </div>
                  {design.message && (
                    <p className="text-white/30 text-sm mt-2 italic">"{design.message}"</p>
                  )}
                  <p className="text-white/20 text-xs mt-2">Received: {design.createdAt}</p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Quick Status Actions */}
                  {design.status === "pending" && (
                    <button
                      onClick={() => handleStatusChange(design.id, "confirmed")}
                      className="px-3 py-1.5 bg-neon-cyan/20 text-neon-cyan text-sm rounded-lg hover:bg-neon-cyan/30 transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {design.status === "confirmed" && (
                    <button
                      onClick={() => handleStatusChange(design.id, "completed")}
                      className="px-3 py-1.5 bg-neon-green/20 text-neon-green text-sm rounded-lg hover:bg-neon-green/30 transition-colors"
                    >
                      Complete
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleViewDetails(design)}
                    className="px-4 py-2 bg-dark-600 text-white/80 text-sm rounded-lg hover:bg-dark-500 transition-colors"
                  >
                    View Details
                  </button>
                  
                  <button
                    onClick={() => handleDelete(design.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Design Details Modal */}
      {showModal && selectedDesign && (
        <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white">Request Details</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-dark-600 rounded-lg">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-sm">Customer Name</label>
                  <p className="text-white font-medium">{selectedDesign.name}</p>
                </div>
                <div>
                  <label className="text-white/40 text-sm">Phone</label>
                  <p className="text-white font-medium">{selectedDesign.phone}</p>
                </div>
                {selectedDesign.email && (
                  <div>
                    <label className="text-white/40 text-sm">Email</label>
                    <p className="text-white font-medium">{selectedDesign.email}</p>
                  </div>
                )}
                {selectedDesign.designName && (
                  <div>
                    <label className="text-white/40 text-sm">Design Name</label>
                    <p className="text-white font-medium">{selectedDesign.designName}</p>
                  </div>
                )}
                {selectedDesign.designPosition && (
                  <div>
                    <label className="text-white/40 text-sm">Design Position</label>
                    <p className="text-white font-medium">{selectedDesign.designPosition}</p>
                  </div>
                )}
                {selectedDesign.designScale && (
                  <div>
                    <label className="text-white/40 text-sm">Design Scale</label>
                    <p className="text-white font-medium">{selectedDesign.designScale}</p>
                  </div>
                )}
              </div>
              
              {selectedDesign.message && (
                <div>
                  <label className="text-white/40 text-sm">Message</label>
                  <p className="text-white">{selectedDesign.message}</p>
                </div>
              )}
              
              <div>
                <label className="text-white/40 text-sm">Status</label>
                <select
                  value={selectedDesign.status}
                  onChange={(e) => handleStatusChange(selectedDesign.id, e.target.value as DesignRequest["status"])}
                  className="w-full input-glow rounded-xl text-white bg-dark-800 mt-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/40 text-sm">Admin Notes</label>
                <textarea
                  value={selectedDesign.notes || ""}
                  onChange={(e) => setSelectedDesign({ ...selectedDesign, notes: e.target.value })}
                  placeholder="Add notes about this request..."
                  className="w-full input-glow rounded-xl text-white h-24 resize-none mt-1"
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <a
                href={`https://wa.me/${selectedDesign.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Customer
              </a>
              <button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}