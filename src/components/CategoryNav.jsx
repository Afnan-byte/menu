import React from 'react';
import { ChevronDown } from 'lucide-react';

const CategoryNav = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="px-6 py-4 space-y-3">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
        Category
      </label>
      <div className="relative group">
        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-6 pr-12 font-bold text-gray-900 appearance-none shadow-sm hover:border-primary transition-all focus:ring-4 focus:ring-primary/10"
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
  );
};

export default CategoryNav;

