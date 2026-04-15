import React, { useState } from 'react';
import { useUserStore } from '../store/useUserStore';
import Button from '../components/ui/Button';
import GigCard from '../components/gig/GigCard';
import { useGigStore } from '../store/useGigStore';
import { CheckCircle, Settings, Plus, LayoutDashboard, LogOut, Star, ShieldCheck, Mail, ArrowRight, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../features/auth/authService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useGigs } from '../hooks/api/useGigs';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { gigs } = useGigStore();
  useGigs();
  const [activeTab, setActiveTab] = useState<'gigs' | 'reviews'>('gigs');
  
  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      toast.success("Signed out successfully");
      navigate('/');
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (!user) {
    return <GuestProfileCard />;
  }

  return (
    <div className="pt-24 pb-32 max-w-screen-md mx-auto px-6 h-screen overflow-y-auto no-scrollbar scroll-smooth">
      {/* Header */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <div className="relative group">
          <div className="p-1 rounded-full bg-gradient-to-tr from-primary via-primary-container to-secondary transition-all group-hover:rotate-12 duration-500">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background p-1 bg-surface-container-low backdrop-blur-3xl shadow-2xl">
              <img src={user.avatar_url || "https://picsum.photos/seed/elite/200/200"} alt="Profile" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
            </div>
          </div>
          <button
            title="Update profile photo"
            aria-label="Update profile photo"
            className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2.5 border-4 border-background flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl font-black tracking-tighter text-on-surface">
                  {user.full_name}
                </h1>
                <CheckCircle size={24} className="text-primary fill-primary" />
              </div>
              <div className="flex gap-2 justify-center md:justify-start">
                <Button onClick={() => navigate('/dashboard')} size="sm" className="h-10 px-6 gap-2 text-[10px] font-black tracking-widest shadow-lg shadow-primary/10">
                   <LayoutDashboard size={14} /> DASHBOARD
                </Button>
                <div className="flex gap-2">
                   <Button onClick={() => navigate('/settings')} variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full bg-white/5 border-white/10 hover:bg-white/10">
                     <Settings size={18} />
                   </Button>
                   <Button onClick={handleSignOut} variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full bg-error/10 border-error/20 hover:bg-error/20 text-error">
                     <LogOut size={16} />
                   </Button>
                </div>
              </div>
            </div>
            <p className="text-primary-dim font-black text-[11px] uppercase tracking-[0.2em]">Member since 2024</p>
          </div>

          <div className="flex justify-center md:justify-start gap-10">
            <Stat label="Reach" value="0" />
            <Stat label="Sales" value="0" />
            <Stat label="Skills" value={gigs.filter(g => g.seller_id === user.id).length.toString()} />
          </div>

          <div className="max-w-md mx-auto md:mx-0">
            <p className="text-on-surface-variant text-sm leading-relaxed font-medium opacity-80">Welcome to your workspace. Start publishing skills to reach thousands of buyers.</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-12 flex justify-center border-b border-white/5 mb-8">
        <div className="flex gap-16">
          <button 
            onClick={() => setActiveTab('gigs')}
            className={`flex items-center gap-2 pb-4 transition-all ${
              activeTab === 'gigs' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-on-surface-variant opacity-40 hover:opacity-100'
            } font-black text-[10px] tracking-[0.2em] uppercase`}
          >
            ACTIVE SKILLS
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 pb-4 transition-all ${
              activeTab === 'reviews' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-on-surface-variant opacity-40 hover:opacity-100'
            } font-black text-[10px] tracking-[0.2em] uppercase`}
          >
            CLIENT REVIEWS
          </button>
        </div>
      </div>

      {activeTab === 'gigs' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 pb-20">
          {gigs.filter(g => g.seller_id === user.id).map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
          {gigs.filter(g => g.seller_id === user.id).length === 0 && (
             <div className="col-span-full py-20 text-center">
                <Button variant="ghost" onClick={() => navigate('/upload')} className="text-primary-dim uppercase tracking-[0.2em] font-black text-xs">
                    + Publish Your First Skill
                </Button>
             </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 max-w-xs mx-auto">
           <div className="w-16 h-16 rounded-full bg-surface-container-high mx-auto flex items-center justify-center text-primary/40">
              <Star size={32} />
           </div>
           <p className="text-on-surface-variant font-bold text-sm">No reviews yet. Start selling to build your reputation.</p>
        </div>
      )}
    </div>
  );
};

const GuestProfileCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center p-6">
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-md bg-surface-container-low p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-8"
       >
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] mx-auto flex items-center justify-center text-primary">
             <ShieldCheck size={40} />
          </div>
          
          <div className="space-y-2">
             <h2 className="text-2xl font-black tracking-tighter">Your Vault is Locked</h2>
             <p className="text-on-surface-variant text-sm font-medium px-4">Sign in to track your revenue, manage projects, and communicate with clients.</p>
          </div>

          <div className="space-y-3">
             <Button onClick={() => navigate('/login')} className="w-full h-14 rounded-2xl gap-3 text-xs font-black uppercase tracking-widest">
                <Mail size={18} /> Sign in / Join <ArrowRight size={16} />
             </Button>
             <Button onClick={() => navigate('/login')} variant="outline" className="w-full h-14 rounded-2xl gap-3 text-sm font-bold border-white/10 hover:bg-white/5 opacity-60 hover:opacity-100">
                <Globe size={18} /> Continue with Google
             </Button>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Verified by SkillTok Protocol</p>
       </motion.div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center md:text-left flex flex-col gap-0.5">
    <p className="font-black text-2xl tracking-tighter text-on-surface">{value}</p>
    <p className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant font-black opacity-40">{label}</p>
  </div>
);

export default Profile;
