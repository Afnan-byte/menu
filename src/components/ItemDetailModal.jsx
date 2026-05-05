import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Flame, Info, ChevronRight } from 'lucide-react';

const ItemDetailModal = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-[40px] max-h-[95vh] overflow-y-auto no-scrollbar shadow-2xl pb-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-white sm:text-gray-900" />
            </button>

            {/* Header Image */}
            <div className="relative aspect-square sm:aspect-video w-full overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover sm:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex gap-2 mb-3">
                  {item.isBestSeller && (
                    <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> BEST SELLER
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${item.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {item.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>
                <h2 className="text-3xl font-black">{item.name}</h2>
              </div>
            </div>

            <div className="p-8 pb-12">
              <div className="flex justify-between items-center mb-8">
                <span className="text-3xl font-black text-primary">₹{item.price}</span>
                {item.isSpicy && (
                  <div className="flex items-center gap-1 text-red-500 font-bold bg-red-50 px-4 py-2 rounded-2xl">
                    <Flame size={20} fill="currentColor" />
                    <span>SPICY</span>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Description</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </section>

                {item.allergens && item.allergens.length > 0 && (
                  <section className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                    <div className="flex items-center gap-2 mb-3 text-orange-700 font-bold">
                      <Info size={18} />
                      <h4>Allergen Information</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map((allergen, index) => (
                        <span key={index} className="bg-white/80 px-3 py-1 rounded-xl text-orange-700 text-sm font-medium">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </section>
                )}


              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ItemDetailModal;
