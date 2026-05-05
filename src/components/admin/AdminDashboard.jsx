import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, CheckCircle2, XCircle, Save, X, 
  Upload, QrCode, LogOut, Sparkles, Layout, Eye, 
  Download, Palette, Globe, Check, ChevronRight, 
  TrendingUp, Users, ShoppingBag, Settings, Menu,
  Search, Bell, User
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { menuItems as initialItems, categories as initialCategories } from '../../data/menu';

const AdminDashboard = ({ businessInfo, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [qrColor, setQrColor] = useState('#22C55E'); // Updated to Menuvo Green
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'starters',
    isVeg: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    inStock: true
  });

  useEffect(() => {
    const savedItems = localStorage.getItem('menuvo_items');
    const savedCats = localStorage.getItem('menuvo_categories');
    if (savedItems) setItems(JSON.parse(savedItems));
    else setItems(initialItems);
    if (savedCats) setCategories(JSON.parse(savedCats));
    else setCategories(initialCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('menuvo_items', JSON.stringify(items));
    localStorage.setItem('menuvo_categories', JSON.stringify(categories));
  }, [items, categories]);

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...formData, id: i.id } : i));
      setEditingItem(null);
    } else {
      const newItem = { ...formData, id: Date.now() };
      setItems([newItem, ...items]);
    }
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: categories[0]?.id || 'starters',
      isVeg: true,
      isSpicy: false,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      inStock: true
    });
    setEditingItem(null);
  };

  const generateWithAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const aiItems = [
        { id: 'ai-1', name: 'Chef\'s Special Risotto', price: '450', description: 'Creamy Arborio rice with wild mushrooms and truffle oil.', category: 'mains', isVeg: true, isSpicy: false, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600' },
        { id: 'ai-2', name: 'Zesty Lemon Chicken', price: '380', description: 'Grilled chicken breast with honey-lemon glaze and herbs.', category: 'mains', isVeg: false, isSpicy: true, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600' },
        { id: 'ai-3', name: 'Mango Passion Mousse', price: '220', description: 'Light and airy mango mousse with fresh passion fruit pulp.', category: 'desserts', isVeg: true, isSpicy: false, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600' }
      ];
      setItems([...aiItems, ...items]);
      setIsGenerating(false);
    }, 2000);
  };

  const deleteItem = (id) => {
    if (window.confirm('Delete this item?')) setItems(items.filter(i => i.id !== id));
  };

  const toggleStock = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, inStock: !i.inStock } : i));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName) return;
    const newCat = {
      id: newCatName.toLowerCase().replace(/\s+/g, '-'),
      name: newCatName,
      icon: 'Utensils'
    };
    setCategories([...categories, newCat]);
    setNewCatName('');
  };

  const deleteCategory = (id) => {
    if (window.confirm('Delete this category and all its items?')) {
      setCategories(categories.filter(c => c.id !== id));
      setItems(items.filter(i => i.category !== id));
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'menu', label: 'Menu Manager', icon: MenuIcon },
    { id: 'qr', label: 'QR Code', icon: QrCode },
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 bg-primary text-white transition-all duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'} shadow-2xl lg:shadow-none`}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className={`p-6 flex items-center justify-between ${isSidebarOpen ? '' : 'flex-col gap-4'}`}>
            <div className={`flex items-center ${isSidebarOpen ? 'gap-3' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <Plus size={24} strokeWidth={3} />
              </div>
              {isSidebarOpen && <span className="text-2xl font-black tracking-tighter">Menuvo</span>}
            </div>
            
            {/* Mobile Close Button */}
            {isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-xl font-bold transition-all ${isSidebarOpen ? 'gap-3' : 'justify-center'} ${
                  activeTab === item.id 
                  ? 'bg-accent text-primary shadow-lg shadow-accent/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={!isSidebarOpen ? item.label : ''}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`w-full hidden lg:flex items-center px-4 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all ${isSidebarOpen ? 'gap-3' : 'justify-center'}`}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              {isSidebarOpen && <span>Collapse</span>}
            </button>
            <button 
              onClick={onLogout}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all ${isSidebarOpen ? 'gap-3' : 'justify-center'}`}
            >
              <LogOut size={20} className="flex-shrink-0" />
              {isSidebarOpen && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg md:text-xl font-black text-gray-900 capitalize truncate">{activeTab.replace('-', ' ')}</h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl max-w-[200px] md:max-w-none">
              <Globe size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm font-bold text-gray-600 truncate">Menu: {businessInfo.id}</span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
               <img src={businessInfo.logo} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Items', value: items.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Categories', value: categories.length, icon: Layout, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Views', value: '1,240', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                      <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {items.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                       <div className="flex items-center gap-4">
                          <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-xs text-gray-400">Added recently</p>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Category Manager */}
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 space-y-6">
                <h3 className="text-xl font-black">Manage Categories</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <div key={cat.id} className="group relative flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 hover:border-accent transition-all">
                      <span className="font-bold text-sm">{cat.name}</span>
                      <button onClick={() => deleteCategory(cat.id)} className="opacity-0 group-hover:opacity-100 text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddCategory} className="flex gap-3">
                  <input value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="e.g. Desserts" className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 font-bold" />
                  <button type="submit" className="bg-primary text-white px-6 py-3 rounded-2xl font-bold">Add</button>
                </form>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">Menu Items</h3>
                <div className="flex gap-3">
                  <button onClick={generateWithAI} className="bg-white border-2 border-accent text-accent px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                    <Sparkles size={20} className={isGenerating ? 'animate-spin' : ''} />
                    {isGenerating ? 'Generating...' : 'AI Generate'}
                  </button>
                  <button onClick={() => setIsAdding(true)} className="bg-accent text-primary px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-accent/20">
                    <Plus size={20} />
                    Add Item
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-6">
                        <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                        <div>
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <p className="text-sm font-bold text-accent">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => toggleStock(item.id)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${item.inStock !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {item.inStock !== false ? 'In Stock' : 'Out of Stock'}
                        </button>
                        <button onClick={() => { setEditingItem(item); setFormData(item); setIsAdding(true); }} className="p-3 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-xl"><Edit2 size={18} /></button>
                        <button onClick={() => deleteItem(item.id)} className="p-3 text-gray-400 hover:text-red-500 bg-gray-50 rounded-xl"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 space-y-10">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black">Your QR Code</h3>
                <p className="text-gray-500">Scan this to see your live menu</p>
              </div>
              <div className="flex flex-col items-center gap-10">
                <div className="bg-gray-50 p-10 rounded-[48px] border-8 border-accent/5">
                  <QRCodeSVG value={`${window.location.origin}/menu/${businessInfo.id}`} size={250} fgColor={qrColor} includeMargin />
                </div>
                <div className="w-full space-y-6">
                   <div className="flex flex-wrap gap-3 justify-center">
                      {['#22C55E', '#0B1F3A', '#000000', '#2563EB', '#DC2626'].map(c => (
                        <button key={c} onClick={() => setQrColor(c)} className={`w-10 h-10 rounded-full border-4 ${qrColor === c ? 'border-accent' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                      ))}
                   </div>
                   <button className="w-full bg-primary text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3">
                     <Download size={24} /> Download Image
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="flex flex-col items-center py-8">
              <div className="w-[375px] h-[750px] rounded-[60px] border-[12px] border-primary shadow-2xl overflow-hidden relative overflow-y-auto no-scrollbar bg-white">
                 <div className="p-8">
                    <img src={businessInfo.logo} className="w-20 h-20 rounded-2xl mx-auto mb-6 shadow-lg" />
                    <h4 className="text-2xl font-black text-center">{businessInfo.name}</h4>
                    <p className="text-gray-500 text-center text-sm mb-10">{businessInfo.tagline}</p>
                    <div className="space-y-6">
                       {items.slice(0, 5).map(i => (
                         <div key={i.id} className="flex gap-4 p-4 rounded-3xl bg-gray-50">
                            <img src={i.image} className="w-16 h-16 rounded-xl object-cover" />
                            <div>
                               <p className="font-bold text-sm">{i.name}</p>
                               <p className="text-accent font-black text-sm">₹{i.price}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                <h3 className="text-3xl font-black">Settings</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Restaurant Name</label>
                      <input defaultValue={businessInfo.name} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Contact Number</label>
                      <input defaultValue={businessInfo.phone} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold" />
                   </div>
                   <button className="w-full bg-primary text-white py-5 rounded-3xl font-black text-xl">Save Changes</button>
                </div>
             </div>
          )}
        </div>
      </main>

      {/* Modals & Popups */}
      {isAdding && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden max-h-[95vh] flex flex-col shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black">{editingItem ? 'Edit Item' : 'New Item'}</h2>
              <button onClick={() => setIsAdding(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6 overflow-y-auto no-scrollbar">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Price</label>
                    <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold h-24 resize-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Photo</label>
                  <div className="flex items-center gap-4">
                     <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                        {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <Upload className="text-gray-300" />}
                     </div>
                     <label className="flex-1 bg-gray-100 py-3 rounded-xl text-center font-bold cursor-pointer">
                        <input type="file" onChange={handleImageUpload} className="hidden" />
                        Upload
                     </label>
                  </div>
               </div>
               <button type="submit" className="w-full bg-accent text-primary py-5 rounded-3xl font-black text-xl">Save Item</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
