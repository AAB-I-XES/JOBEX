import React from 'react';
import { Clock3, Home, LayoutGrid, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Activity', icon: Clock3, path: '/orders' },
    { label: 'Services', icon: LayoutGrid, path: '/services' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-white/5 bg-[#191918]/95 pb-safe backdrop-blur-xl z-[100]">
      <div className="mx-auto flex h-[68px] max-w-md items-center justify-between px-5">
        {tabs.map((tab) => {
          const isActive = tab.path === '/'
            ? location.pathname === '/'
            : tab.path === '/services'
              ? location.pathname === '/services' || location.pathname === '/explore'
            : location.pathname === tab.path || location.pathname.startsWith(`${tab.path}/`);
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex min-w-16 flex-col items-center justify-center gap-1.5 transition-all duration-300 relative",
                isActive ? "text-primary" : "text-on-surface-variant hover:text-white"
              )}
            >
              <tab.icon size={21} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-[10px] font-semibold transition-all",
                isActive ? "opacity-100" : "opacity-75"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
