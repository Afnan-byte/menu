import React from 'react';
import { restaurantInfo } from '../data/menu';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          {restaurantInfo.name}
        </h1>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
          G
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
