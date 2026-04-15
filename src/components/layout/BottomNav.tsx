import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import { cn } from '../../utils/helpers';

const BottomNav: React.FC = () => {
  const navItems = [
    { label: 'Home', Icon: Home, path: '/' },
    { label: 'Search', Icon: Search, path: '/explore' },
    { label: 'Create', Icon: Plus, path: '/upload', special: true },
    { label: 'Inbox', Icon: MessageCircle, path: '/messages' },
    { label: 'Vault', Icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-900/95 border-t border-white/10 backdrop-blur-xl flex justify-around items-center h-16 px-4 z-50">
      {navItems.map(({ label, Icon, path, special }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center transition-all duration-300 active:scale-95 group relative flex-1 h-full",
              isActive ? "text-primary scale-110" : "text-on-surface-variant opacity-40 hover:opacity-100"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-500",
                special ? "bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] -mt-6 h-12 w-12 flex items-center justify-center" : "",
                isActive && !special ? "bg-white/5" : ""
              )}>
                <Icon size={special ? 28 : 22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              {!special && (
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-[0.2em] mt-1 transition-all",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                  {label}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
