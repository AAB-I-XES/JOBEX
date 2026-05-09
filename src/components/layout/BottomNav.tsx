import React from 'react';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Explore', icon: Search, path: '/explore' },
    { label: 'Create', icon: PlusSquare, path: '/upload' },
    { label: 'Chat', icon: MessageCircle, path: '/messages' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full ios-glass border-t border-white/5 pb-safe z-[100]">
      <div className="max-w-md mx-auto h-20 px-6 flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path));
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300 relative",
                isActive ? "text-primary scale-110" : "text-on-surface-variant hover:text-white"
              )}
            >
              <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-widest transition-all",
                isActive ? "opacity-100 mt-1" : "opacity-0 h-0"
              )}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#007AFF]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
