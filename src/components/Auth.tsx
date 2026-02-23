import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Phone, MessageSquare, ArrowLeft, Upload, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

interface AuthProps {
  type: 'login' | 'register';
  onBack: () => void;
  onLogin: (u: string, p: string) => void;
  onRegister: (data: any) => void;
  onSwitch: () => void;
}

export const Auth: React.FC<AuthProps> = ({ type, onBack, onLogin, onRegister, onSwitch }) => {
  const [role, setRole] = React.useState<UserRole>('CUSTOMER');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (type === 'login') {
      onLogin(data.username as string, data.password as string);
    } else {
      onRegister({ ...data, role });
    }
  };

  return (
    <div className="min-h-screen bg-farm-light flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-farm-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-farm-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-12">
          <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-slate-500 hover:text-farm-green transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">
              {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500">
              {type === 'login' ? 'Please enter your details to login' : 'Join our eco-friendly dairy community'}
            </p>
          </div>

          {type === 'register' && (
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
              {(['CUSTOMER', 'ENTREPRENEUR'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-all",
                    role === r ? "bg-white text-farm-green shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {type === 'register' && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input name="fullName" placeholder="Full Name" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green focus:ring-4 focus:ring-farm-green/10 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input name="mobile" placeholder="Mobile" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green focus:ring-4 focus:ring-farm-green/10 outline-none transition-all" />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input name="whatsApp" placeholder="WhatsApp" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green focus:ring-4 focus:ring-farm-green/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input name="email" type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green focus:ring-4 focus:ring-farm-green/10 outline-none transition-all" />
                </div>
              </>
            )}

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="username" placeholder="Username" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green focus:ring-4 focus:ring-farm-green/10 outline-none transition-all" />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                required 
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-farm-green focus:ring-4 focus:ring-farm-green/10 outline-none transition-all" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {type === 'register' && role === 'ENTREPRENEUR' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">NID Front</label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-farm-green hover:bg-farm-light transition-all">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-500">Upload Front</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">NID Back</label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-farm-green hover:bg-farm-light transition-all">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-500">Upload Back</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {type === 'login' && (
              <div className="text-right">
                <button type="button" className="text-sm font-bold text-farm-green hover:underline">Forgot Password?</button>
              </div>
            )}

            <button type="submit" className="w-full glossy-button py-4 text-lg font-bold mt-4 shadow-xl shadow-farm-green/20">
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500">
              {type === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={onSwitch}
                className="ml-2 font-bold text-farm-green hover:underline"
              >
                {type === 'login' ? 'Create one now' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
