import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { Toaster } from 'react-hot-toast';

const MainLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-on-surface font-body overflow-hidden">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#191a1a',
            color: '#e7e5e5',
            border: '1px solid rgba(173, 198, 255, 0.1)',
          },
        }}
      />
      <Navbar />
      {/* Top Bloom */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-40 opacity-50" />
      
      <main className="h-screen w-full">
        <Outlet />
      </main>
      <BottomNav />
      
      {/* AI Assistant Button */}
      <button className="fixed right-6 bottom-64 z-[60] w-12 h-12 rounded-full bg-surface-container-highest border border-primary/30 flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
      </button>

      {/* Atmospheric Grain */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBehouzsGF5Wf1El2rIRxYINbHFvoPaKXEm6-WdDjOq6HXM7H5BvSR5OP8S1TXOjMYBs85ZP6O50OnULELOVW9iavQ5t5Qr2U0ReE6jqSaOmew6tg_bJ3OBolTa7JoBsKwJnaqOLE8oskMXU7Jx-ExuOk2ohGXqnPuQKWMy0UsgvNuig8RmF1CB8TFi9ciGU3Mvzd-PhzgZR7Q9ksYOVBR7B1q6xfa9_nW89b8s_JwOi3O-d8Bu3YLcQVahyfHGrjcYwoLLh9MjF1c')]"></div>
    </div>
  );
};

export default MainLayout;
