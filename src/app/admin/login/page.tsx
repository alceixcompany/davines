'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, loginWithStaticAdmin, clearError, checkDatabaseAdmins } from '@/store/slices/authSlice';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated, hasDatabaseAdmins } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkDatabaseAdmins());
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/admin');
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      // First try normal login, if it fails and it's static credentials, try static login
      // Or just try both. Given the user's request, we'll try static if it matches, otherwise normal.
      if (email === 'admin@davines.com' && password === 'admin123') {
        await dispatch(loginWithStaticAdmin({ email, password })).unwrap();
      } else {
        await dispatch(loginUser({ email, password })).unwrap();
      }
      
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(184,149,98,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(184,149,98,0.1),transparent_70%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white p-10 sm:p-14 rounded-[48px] border border-[#eadcc8] shadow-[0_40px_100px_rgba(124,96,54,0.08)]">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-[#fcf8f2] rounded-[28px] flex items-center justify-center text-[#b78a49] border border-[#eadcc8]">
              <FiLock className="w-8 h-8" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl text-[#111111] mb-2">Yönetim Paneli</h1>
            <p className="text-[#60584f] text-sm">Lütfen kimlik bilgilerinizi giriniz.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold ml-2">E-posta</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#b78a49]">
                  <FiMail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-[#fcf8f2] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm"
                  placeholder="admin@davines.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-[0.2em] text-[#343434] uppercase font-bold ml-2">Şifre</label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#b78a49]">
                  <FiLock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 bg-[#fcf8f2] border border-transparent rounded-full focus:outline-none focus:border-[#b78a49] transition-all text-[#111111] text-sm"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[#60584f] hover:text-[#b78a49] transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 rounded-2xl border border-red-100 text-red-700 text-xs text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#111111] text-white py-5 rounded-full font-bold tracking-[0.15em] text-xs hover:bg-[#2d2d2d] transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  GİRİŞ YAPILIYOR...
                </>
              ) : (
                <>
                  GİRİŞ YAP
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-10 text-center text-[10px] tracking-[0.2em] text-[#60584f] uppercase">
          Davines &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
