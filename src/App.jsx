import React, { useState } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import MenuSection from './components/MenuSection';
import ContactSection from './components/ContactSection';
import BottomNav from './components/BottomNav';
import ItemDetailModal from './components/ItemDetailModal';
import FloatingActions from './components/FloatingActions';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import Onboarding from './components/admin/Onboarding';
import LandingPage from './components/LandingPage';

import { Search, Filter, Utensils, Languages, Flame, Lock, Settings, ChevronDown, Plus } from 'lucide-react';
import { restaurantInfo as defaultInfo, categories as initialCategories, menuItems as initialItems } from './data/menu';
import { translations } from './data/translations';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('menuvo_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('menuvo_items');
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'starters');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(() => {
    const saved = localStorage.getItem('menuvo_business');
    return saved ? JSON.parse(saved) : null;
  });

  const restaurantInfo = businessInfo || defaultInfo;

  const handleOnboardingComplete = (data) => {
    const info = {
      id: data.name.toLowerCase().replace(/\s+/g, '-'),
      name: data.name,
      tagline: `${data.category} • Digital Menu`,
      logo: data.logo || 'https://via.placeholder.com/150',
      address: data.address,
      phone: data.phone,
      whatsapp: data.whatsapp || data.phone,
      password: data.password || 'admin123',
      banner: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
      location: `https://maps.google.com/?q=${encodeURIComponent(data.address)}`
    };
    setBusinessInfo(info);
    localStorage.setItem('menuvo_business', JSON.stringify(info));
    navigate(`/menu/${info.id}`);
  };

  const t = translations['en'];

  const filters = [
    { id: 'all', label: 'All', icon: <Utensils size={14} /> },
    { id: 'veg', label: 'Veg', color: 'bg-green-500' },
    { id: 'non-veg', label: 'Non-Veg', color: 'bg-red-500' },
    { id: 'spicy', label: 'Spicy', icon: <Flame size={14} /> },
  ];

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isMenuRoute = location.pathname.startsWith('/menu/');
  const isLandingRoute = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10 text-gray-900">
      {/* Dynamic Header - Hidden in Admin Dashboard and Landing Page */}
      {!(isAdminRoute && isAuthenticated && businessInfo) && !isLandingRoute && (
        <header className="sticky top-0 z-50 bg-white shadow-sm md:shadow-none transition-all">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-accent shadow-lg shadow-primary/20">
                  <Plus size={32} strokeWidth={3} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-none tracking-tighter">Menuvo</h1>
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mt-1">{restaurantInfo.name}</p>
                </div>
              </div>
              {!isMenuRoute && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/admin')}
                    className="p-3 bg-gray-50 text-gray-400 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                    title="Admin Access"
                  >
                    <Lock size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Search & Filters - Only visible on Menu tab */}
            {isMenuRoute && (
              <div className="flex flex-col gap-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                    Browse Category
                  </label>
                  <div className="relative group">
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-6 pr-12 font-bold text-gray-900 appearance-none shadow-sm hover:border-primary transition-all focus:ring-4 focus:ring-primary/10"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all ${
                        activeFilter === filter.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/10'
                          : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {filter.color && <div className={`w-2 h-2 rounded-full ${filter.color}`} />}
                      {filter.icon && <span>{filter.icon}</span>}
                      {filter.id === 'all' ? t.all : filter.id === 'veg' ? t.veg : filter.id === 'non-veg' ? t.nonVeg : t.spicy}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      <main>
        <Routes>
          <Route path="/menu/:id" element={
            <MenuSection 
              items={items}
              categories={categories}
              searchQuery={searchQuery} 
              activeFilter={activeFilter}
              activeCategory={activeCategory}
              onItemClick={setSelectedItem}
            />
          } />
          
          <Route path="/admin" element={
            !businessInfo ? (
              <Onboarding onComplete={handleOnboardingComplete} />
            ) : !isAuthenticated ? (
              <AdminLogin 
                correctPassword={businessInfo.password}
                businessName={businessInfo.name}
                onLogin={() => setIsAuthenticated(true)} 
                onCancel={() => navigate(`/menu/${businessInfo.id || 'demo'}`)} 
              />
            ) : (
              <AdminDashboard 
                businessInfo={businessInfo}
                onLogout={() => setIsAuthenticated(false)} 
              />
            )
          } />

          <Route path="/info" element={<ContactSection restaurantInfo={restaurantInfo} />} />
          
          <Route path="/" element={<LandingPage />} />
          
          <Route path="*" element={
            <div className="py-20 text-center">
               <Utensils size={48} className="mx-auto text-gray-300 mb-4" />
               <h2 className="text-xl font-bold">404 - Page Not Found</h2>
               <button onClick={() => navigate('/admin')} className="mt-4 text-primary font-bold">Go to Dashboard</button>
            </div>
          } />
        </Routes>
      </main>

      <ItemDetailModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      {!(isAdminRoute && isAuthenticated && businessInfo) && !isLandingRoute && !isMenuRoute && (
        <>
          <BottomNav activeTab={isMenuRoute ? 'menu' : isAdminRoute ? 'admin' : 'info'} onTabChange={(id) => navigate(id === 'admin' ? '/admin' : id === 'info' ? '/info' : `/menu/${businessInfo?.id || 'demo'}`)} />
          <FloatingActions />
        </>
      )}
    </div>
  );
}

export default App;
