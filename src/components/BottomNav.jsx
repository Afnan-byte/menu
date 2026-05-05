import React from 'react';
import { motion } from 'framer-motion';
import { Home, Info, Shield } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'menu', icon: Home, label: 'Menu' },
    { id: 'info', icon: Info, label: 'Info' },
    { id: 'admin', icon: Shield, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'text-primary' : 'text-gray-400'
          }`}
        >
          <div className="relative">
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabDot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
              />
            )}
          </div>
          {activeTab === tab.id && (
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-bold uppercase tracking-wider"
            >
              {tab.label}
            </motion.span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
