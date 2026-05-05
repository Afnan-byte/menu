import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  QrCode, Sparkles, Layout, ShieldCheck, 
  ArrowRight, Check, Zap, Globe, Star
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent shadow-lg shadow-primary/20">
              <QrCode size={24} strokeWidth={3} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900">Menuvo</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-bold text-gray-500 hover:text-primary transition-colors px-4"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="absolute top-20 right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={14} />
            Next Generation Digital Menus
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[0.95]"
          >
            Your Menu. <br />
            <span className="text-accent italic">Reimagined.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
          >
            Create a stunning, QR-based digital menu for your restaurant in minutes. 
            No app download required for customers. Just scan and enjoy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 hover:scale-105 transition-all group"
            >
              Create Your Menu
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">500+ Restaurants Joined</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-6xl mx-auto mt-20 relative px-4"
        >
          <div className="bg-white rounded-[40px] md:rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-8 overflow-hidden aspect-video relative">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 flex items-center gap-2 px-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 bg-white px-4 py-1 rounded-lg text-[10px] font-bold text-gray-400 border border-gray-100">dashboard.menuvo.com</div>
            </div>
            <div className="mt-12 grid grid-cols-12 gap-6 h-full">
               <div className="col-span-3 space-y-4 py-4">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-gray-50 rounded-xl" />)}
               </div>
               <div className="col-span-9 p-4 space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                     {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-50 rounded-3xl" />)}
                  </div>
                  <div className="h-full bg-gray-50 rounded-[40px]" />
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              icon: <Zap size={32} />, 
              title: "Instant Setup", 
              desc: "From zero to live menu in less than 5 minutes. No coding required." 
            },
            { 
              icon: <Globe size={32} />, 
              title: "Global Reach", 
              desc: "Multi-language support ensures your customers feel at home." 
            },
            { 
              icon: <ShieldCheck size={32} />, 
              title: "Safe & Secure", 
              desc: "Password protected dashboards and secure data storage." 
            }
          ].map((f, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
               <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8">
                 {f.icon}
               </div>
               <h3 className="text-2xl font-black mb-4">{f.title}</h3>
               <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-accent">
              <QrCode size={18} strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tighter">Menuvo</span>
          </div>
          <p className="text-gray-400 font-bold text-sm">© 2026 Menuvo SaaS. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="text-sm font-bold text-gray-500 hover:text-primary cursor-pointer">Terms</span>
            <span className="text-sm font-bold text-gray-500 hover:text-primary cursor-pointer">Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
