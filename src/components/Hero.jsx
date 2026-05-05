import React from 'react';
import { motion } from 'framer-motion';
const Hero = ({ restaurantInfo }) => {
  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${restaurantInfo.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm uppercase tracking-[0.3em] font-semibold mb-2 opacity-80">
            Welcome to
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {restaurantInfo.name}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90 italic">
            Scan. View. Enjoy.
          </p>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
