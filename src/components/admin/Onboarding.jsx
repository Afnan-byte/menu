import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Utensils, Hotel, Camera, Phone, MapPin, 
  ArrowRight, ArrowLeft, CheckCircle2, Lock, 
  Sparkles, Layout, Plus, QrCode 
} from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cafe',
    logo: null,
    phone: '',
    address: '',
    whatsapp: '',
    password: ''
  });

  const categories = [
    { id: 'Cafe', icon: Utensils, label: 'Cafe' },
    { id: 'Restaurant', icon: Utensils, label: 'Restaurant' },
    { id: 'Hotel', icon: Hotel, label: 'Hotel' }
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const steps = [
    {
      title: "Tell us about your business",
      subtitle: "Let's start with the basics",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Business Name</label>
            <input 
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. The Green Cafe"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-lg font-bold focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Business Category</label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFormData({...formData, category: cat.id})}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    formData.category === cat.id 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <cat.icon size={24} />
                  <span className="text-xs font-black uppercase tracking-widest">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Add your brand logo",
      subtitle: "Make your menu look professional",
      content: (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative group">
            <div className={`w-40 h-40 rounded-[40px] border-4 border-dashed flex items-center justify-center overflow-hidden transition-all ${formData.logo ? 'border-primary bg-white' : 'border-gray-200 bg-gray-50'}`}>
              {formData.logo ? (
                <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera size={48} className="text-gray-300" />
              )}
            </div>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleLogoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <p className="text-sm text-gray-400 font-medium">Click to upload or drag and drop</p>
        </div>
      )
    },
    {
      title: "Contact Details",
      subtitle: "How can customers reach you?",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
            <div className="relative">
              <Phone size={20} className="absolute left-5 top-5 text-gray-400" />
              <input 
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-14 pr-5 font-bold focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Address</label>
            <div className="relative">
              <MapPin size={20} className="absolute left-5 top-5 text-gray-400" />
              <textarea 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="123 Street, City, Kerala"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-14 pr-5 font-bold focus:ring-4 focus:ring-primary/10 h-32 resize-none"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Secure your Dashboard",
      subtitle: "Set a password to manage your menu",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Admin Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-5 top-5 text-gray-400" />
              <input 
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="e.g. cafe2024"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-14 pr-5 font-bold focus:ring-4 focus:ring-primary/10 tracking-widest"
              />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 ml-1">
              Minimum 6 characters recommended
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[step - 1];

  if (!isStarted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-[50px] p-12 text-center space-y-10 shadow-2xl border border-gray-100"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-[30px] flex items-center justify-center text-primary relative">
              <Sparkles size={48} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Create your Digital Menu in <span className="text-primary">Minutes.</span>
            </h1>
            <p className="text-lg text-gray-500 font-medium max-w-md mx-auto">
              Set up your Cafe, Restaurant, or Hotel dashboard, add your menu, and get a professional QR code instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
            {[
              { icon: Layout, label: 'Custom Dashboard' },
              { icon: Plus, label: 'Easy Menu Builder' },
              { icon: QrCode, label: 'Instant QR Code' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                  <feature.icon size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{feature.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="w-full bg-primary text-white py-6 rounded-[30px] font-black text-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
            Get Started
            <ArrowRight size={28} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 pb-20">
      <div className="w-full max-w-xl bg-white rounded-[40px] p-6 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100 flex">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-4 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Step {step} of {steps.length}</span>
            <h2 className="text-3xl font-black text-gray-900">{currentStepData.title}</h2>
            <p className="text-gray-500 font-medium">{currentStepData.subtitle}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentStepData.content}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 bg-gray-50 text-gray-700 py-5 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}
            <button
              onClick={step === steps.length ? () => onComplete(formData) : nextStep}
              disabled={step === 1 && !formData.name}
              className={`flex-[2] py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-2 shadow-xl transition-all ${
                (step === 1 && !formData.name) 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-primary text-white shadow-primary/20 hover:scale-[1.02]'
              }`}
            >
              {step === steps.length ? 'Get Started' : 'Continue'}
              {step === steps.length ? <CheckCircle2 size={24} /> : <ArrowRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
