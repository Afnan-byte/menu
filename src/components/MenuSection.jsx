import React from 'react';
import MenuItem from './MenuItem';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const MenuSection = ({ items, categories, searchQuery, activeFilter, activeCategory, onItemClick }) => {
  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'veg' && item.isVeg) || 
                         (activeFilter === 'non-veg' && !item.isVeg) ||
                         (activeFilter === 'spicy' && item.isSpicy);
    
    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <section className="py-8 px-6 max-w-7xl mx-auto space-y-12">
      {categories.map((category) => {
        const categoryItems = filteredItems.filter(item => item.category === category.id);
        
        if (categoryItems.length === 0) return null;

        return (
          <div key={category.id} id={category.id} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  {category.name}
                </h2>
              </div>
              <div className="h-[1px] flex-grow bg-gray-100" />
              <span className="text-sm font-medium text-gray-400">
                {categoryItems.length} items
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {categoryItems.map(item => (
                  <MenuItem key={item.id} item={item} onClick={onItemClick} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <Search size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No items found</h3>
          <p className="text-gray-500">Try searching for something else</p>
        </motion.div>
      )}
    </section>
  );
};

export default MenuSection;

