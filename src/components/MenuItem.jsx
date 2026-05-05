import React from 'react';
import { motion } from 'framer-motion';
import { Star, Flame } from 'lucide-react';

const MenuItem = ({ item, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(item)}
      className="bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all cursor-pointer group"
    >
      <div className="relative aspect-square sm:aspect-video overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isBestSeller && (
            <div className="flex items-center gap-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              <Star size={10} fill="currentColor" />
              Best Seller
            </div>
          )}
          {item.isNew && (
            <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
              New
            </div>
          )}
        </div>

        {/* Dietary Info */}
        <div className="absolute top-3 right-3 flex gap-2">
           <div className={`p-1.5 rounded-lg shadow-sm backdrop-blur-md ${item.isVeg ? 'bg-white/90 border border-green-500' : 'bg-white/90 border border-red-500'}`}>
             <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
           </div>
        </div>
      </div>
      
      <div className="p-3 sm:p-5">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div className="flex flex-col">
            <h3 className="font-bold text-sm sm:text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {item.isSpicy && (
                <div className="flex items-center gap-0.5 text-red-500 text-xs font-medium">
                  <Flame size={12} fill="currentColor" />
                  Spicy
                </div>
              )}
            </div>
          </div>
          <span className="font-bold text-primary text-sm sm:text-lg whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>
        <p className="text-gray-500 text-[10px] sm:text-sm line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default MenuItem;

