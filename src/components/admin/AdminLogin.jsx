import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = ({ onLogin, onCancel, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validPass = correctPassword || 'admin123';
    if (password === validPass) { 
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-gray-50 text-center space-y-8">
        <div className="mx-auto w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-2">
          <ShieldCheck size={40} />
        </div>
        
        <div>
          <h2 className="text-3xl font-black text-gray-900">Admin Access</h2>
          <p className="text-gray-500 font-medium mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Password"
              className={`w-full bg-gray-50 border ${error ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-100'} rounded-2xl py-5 pl-14 pr-14 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold tracking-widest`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-bold animate-bounce">{error}</p>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
            >
              Unlock Dashboard
              <ArrowRight size={20} />
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 font-bold hover:text-gray-600 transition-colors py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
