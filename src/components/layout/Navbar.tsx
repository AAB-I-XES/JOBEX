import React, { useState, useEffect, useRef } from 'react';
import { Bell, Heart, Search, Menu, Command, User, LayoutDashboard, Settings, Bookmark, History, LogOut, ChevronRight, Moon } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { cn } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/api/useAuth';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotifications = () => {
    toast('System: 3 High-priority creative requests pending', { icon: '⚡' });
  };

  const menuItems = [
    { label: 'View Profile', icon: User, path: '/profile' },
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Security & Privacy', icon: Settings, path: '/settings' },
    { label: 'Saved Gigs', icon: Bookmark, path: '/saved' },
    { label: 'Transaction History', icon: History, path: '/history' },
    { label: 'Appearance', icon: Moon, path: '#', extra: 'Dark' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out safely");
      setShowDropdown(false);
      navigate('/');
    } catch (err) {
      toast.error("Sign out failed");
    }
  };

  return (
    <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-3",
        isScrolled ? "pt-4" : "pt-6"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
        "h-16 px-6 relative",
        "rounded-[2rem] border border-white/5 bg-background/40 backdrop-blur-3xl shadow-2xl",
        isScrolled ? "bg-zinc-900/80 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]" : "bg-transparent border-transparent"
      )}>
        
        {/* Brand Section */}
        <Link to="/" className="flex items-center gap-4 active:scale-95 transition-all group">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[1px] group-hover:rotate-6 transition-transform">
               <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                  <span className="text-primary font-black text-xl leading-none">S</span>
               </div>
            </div>
            <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
             <span className="text-xl font-black text-white tracking-tighter">SkillTok</span>
             <span className="text-[7px] font-black text-primary/60 uppercase tracking-[0.4em] mt-0.5">Vertical Elite</span>
          </div>
        </Link>

        {/* Search Bar Shortcut (Desktop) */}
        <div 
           onClick={() => navigate('/explore')}
           className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-4 py-2 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group"
        >
          <Search size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Global Search</span>
          <div className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded-md border border-white/5">
             <Command size={10} className="text-white/40" />
             <span className="text-[8px] font-bold text-white/40">K</span>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-1">
          <NavAction 
            onClick={() => navigate('/explore')} 
            active={location.pathname === '/explore'}
            Icon={Search} 
            className="lg:hidden"
          />
          <NavAction 
            onClick={() => navigate('/dashboard')} 
            active={location.pathname === '/dashboard'}
            Icon={Heart} 
          />
          
          <button 
             onClick={handleNotifications}
             className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-white transition-all relative group"
          >
            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-primary rounded-full border border-background animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]"></span>
          </button>
          
          <div className="w-[1px] h-6 bg-white/10 mx-3" />
          
          {/* Enhanced Profile Trigger with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className={cn(
                    "flex items-center gap-3 pl-2 pr-4 h-12 rounded-2xl transition-all active:scale-90 group",
                    showDropdown ? "bg-white/15" : "bg-white/5 border border-white/10 hover:bg-white/10"
                )}
            >
                <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img src={user?.avatar_url || "https://picsum.photos/seed/elite/100/100"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <Menu size={18} className={cn("text-on-surface-variant group-hover:text-white transition-colors", showDropdown && "text-white")} />
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-72 rounded-[2rem] bg-zinc-900 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl overflow-hidden z-[100]"
                    >
                        <div className="p-6 pb-4 border-b border-white/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                                     <img src={user?.avatar_url || "https://picsum.photos/seed/elite/100/100"} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-extrabold text-white text-base tracking-tight">{user?.full_name?.split(' ')[0] || 'Member'}</span>
                                    <span className="text-[10px] uppercase font-black text-primary tracking-widest leading-none">Pro Creator</span>
                                </div>
                            </div>
                            <Button size="sm" className="w-full h-10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20" onClick={() => navigate('/profile')}>
                                PRO DASHBOARD
                            </Button>
                        </div>

                        <div className="p-2 py-3">
                            {menuItems.map((item, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => { item.path !== '#' && navigate(item.path); setShowDropdown(false); }}
                                    className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 rounded-2xl transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                                            <item.icon size={18} />
                                        </div>
                                        <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.extra && (
                                            <span className="text-[9px] font-black text-primary/60 px-2 py-0.5 rounded-full bg-primary/10">{item.extra}</span>
                                        )}
                                        <ChevronRight size={14} className="text-white/20 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-3 bg-white/5 border-t border-white/5">
                            <button 
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 p-3 text-error hover:bg-error/10 rounded-2xl transition-all font-bold text-sm"
                            >
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavActionProps {
  Icon: any;
  onClick: () => void;
  active?: boolean;
  className?: string;
}

const NavAction: React.FC<NavActionProps> = ({ Icon, onClick, active, className }) => (
  <button 
    onClick={onClick}
    className={cn(
        "w-12 h-12 flex items-center justify-center transition-all group",
        active ? "text-primary" : "text-on-surface-variant hover:text-white",
        className
    )}
  >
    <div className={cn(
        "absolute w-8 h-8 rounded-xl bg-primary/10 opacity-0 transition-all scale-50",
        active ? "opacity-100 scale-100" : "group-hover:opacity-40 group-hover:scale-90"
    )} />
    <Icon size={20} className="relative z-10" />
  </button>
);

export default Navbar;
