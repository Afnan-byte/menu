import React from 'react';
import { restaurantInfo } from '../data/menu';

const AboutSection = () => {
  return (
    <section className="py-20 bg-primary text-white text-center px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-[40px] border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-[60px] border-white rounded-full" />
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-6">About Our Kitchen</h2>
        <p className="text-lg opacity-80 leading-relaxed font-light italic">
          "{restaurantInfo.tagline} We believe in sourcing the finest ingredients to create unforgettable Mediterranean experiences. Every dish tells a story of tradition, passion, and modern culinary art."
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
