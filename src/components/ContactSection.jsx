import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
const ContactSection = ({ restaurantInfo }) => {
  return (
    <section className="py-12 px-6 max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-[40px] shadow-premium border border-gray-100 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-2">
          <MapPin size={32} />
        </div>
        <h3 className="font-black text-2xl">Location</h3>
        <p className="text-gray-500 font-medium leading-relaxed">
          {restaurantInfo.address}
        </p>
        <a 
          href={restaurantInfo.location} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary font-bold hover:underline"
        >
          Open in Google Maps
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <a 
          href={`tel:${restaurantInfo.phone}`}
          className="bg-white p-8 rounded-[40px] shadow-premium border border-gray-100 flex items-center gap-6 group hover:border-primary/20 transition-all"
        >
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-black text-xl">Call Us</h3>
            <p className="text-gray-500 font-bold">{restaurantInfo.phone}</p>
          </div>
        </a>
        
        <div className="bg-white p-8 rounded-[40px] shadow-premium border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-black text-xl">Opening Hours</h3>
            <p className="text-gray-500 font-bold">{restaurantInfo.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

