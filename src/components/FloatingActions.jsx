import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, MapPin, ChevronUp } from 'lucide-react';
import { restaurantInfo } from '../data/menu';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const actions = [
    { 
      icon: <Phone size={24} />, 
      label: 'Call Now', 
      href: `tel:${restaurantInfo.phone}`,
      color: 'bg-blue-500'
    },
    { 
      icon: <MapPin size={24} />, 
      label: 'Directions', 
      href: restaurantInfo.location,
      color: 'bg-red-500'
    },
    { 
      icon: <MessageCircle size={24} />, 
      label: 'WhatsApp', 
      href: `https://wa.me/${restaurantInfo.whatsapp.replace(/\D/g, '')}`,
      color: 'bg-green-500'
    },
  ];

  return (
    <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-white px-3 py-1.5 rounded-xl shadow-lg text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
                <div className={`${action.color} text-white p-4 rounded-2xl shadow-xl shadow-black/10 hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-5 rounded-[24px] shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-gray-900 text-white rotate-180' : 'bg-primary text-white'
        }`}
      >
        {isOpen ? <ChevronUp size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default FloatingActions;
