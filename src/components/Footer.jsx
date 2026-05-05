import React from 'react';
import { restaurantInfo } from '../data/menu';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-100 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-primary mb-2">
          {restaurantInfo.name}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          &copy; {new Date().getFullYear()} {restaurantInfo.name}. All rights reserved.
        </p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-gray-400 hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-accent transition-colors">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-accent transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
