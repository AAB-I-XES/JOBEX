import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { Toaster } from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-on-surface font-body selection:bg-primary/30">
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'ios-glass border border-white/10 rounded-2xl text-white font-semibold text-sm shadow-2xl',
          duration: 3000,
        }}
      />
      
      <Navbar />
      
      {/* Dynamic Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-40 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full pointer-events-none opacity-40 animate-pulse" />

      <main className="min-h-screen w-full relative z-10 px-0 sm:px-4">
        <Outlet />
      </main>

      <BottomNav />
      
      {/* iOS Style Action Button (Replacing AI Assistant logic) */}
      <button className="fixed right-6 bottom-24 z-[60] w-14 h-14 rounded-full ios-glass border border-white/10 flex items-center justify-center shadow-2xl active:scale-95 transition-all group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles size={24} className="text-white group-hover:text-primary transition-colors" />
      </button>
    </div>
  );
};

export default MainLayout;
