import React, { useState } from 'react';
import { useUserStore } from '../store/useUserStore';
import Button from '../components/ui/Button';
import GigCard from '../components/gig/GigCard';
import { useGigStore } from '../store/useGigStore';
import { Settings, LogOut, Star, ShieldCheck, Mail, ArrowRight, Globe, Plus, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../features/auth/authService';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { gigs, removeGig } = useGigStore();
  const [activeTab, setActiveTab] = useState<'skills' | 'activity'>('skills');
  
  const handleDeleteGig = async (id: string) => {
    try {
       await gigService.deleteGig(id);
       removeGig(id);
       toast.success("Skill deleted successfully");
    } catch (err) {
       toast.error("Delete failed");
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      toast.success("Disconnected successfully");
      navigate('/');
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (!user) {
    return <GuestProfileCard />;
  }

  const userGigs = gigs.filter(g => g.seller_id === user.id);

  return (
    <div className="pt-4 pb-32 max-w-screen-md mx-auto px-6 min-h-screen ios-scroll">
      {/* iOS Profile Header */}
      <section className="flex flex-col items-center text-center space-y-6 mb-12 animate-ios">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface shadow-2xl bg-zinc-900 ring-1 ring-white/10">
            <img src={user.avatar_url || "https://picsum.photos/seed/elite/200/200"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-2.5 border-4 border-background shadow-lg active:scale-90 transition-transform">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">{user.full_name}</h1>
          <p className="text-primary font-bold text-xs uppercase tracking-widest">Verified Creator</p>
        </div>

        <div className="flex gap-10">
          <div className="text-center">
             <p className="text-xl font-extrabold text-white">0</p>
             <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Followers</p>
          </div>
          <div className="text-center">
             <p className="text-xl font-extrabold text-white">{userGigs.length}</p>
             <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Skills</p>
          </div>
          <div className="text-center">
             <p className="text-xl font-extrabold text-white">4.9</p>
             <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Rating</p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full max-w-sm">
           <Button onClick={() => navigate('/dashboard')} className="flex-1 h-12 rounded-2xl gap-2 font-bold text-sm bg-surface border border-white/5 hover:bg-white/5 transition-all">
              <LayoutDashboard size={18} /> Dashboard
           </Button>
           <Button onClick={() => navigate('/settings')} variant="ghost" className="w-12 h-12 rounded-2xl ios-glass border border-white/10 p-0 text-white">
              <Settings size={20} />
           </Button>
        </div>
      </section>

      {/* Segmented Control (iOS Style) */}
      <div className="bg-surface/50 p-1 rounded-2xl flex relative mb-10 mx-auto max-w-xs border border-white/5">
         <div 
           className="absolute top-1 bottom-1 bg-zinc-800 rounded-xl transition-all duration-300 shadow-xl border border-white/5" 
           style={{ left: activeTab === 'skills' ? '4px' : 'calc(50% + 2px)', width: 'calc(50% - 6px)' }}
         />
         <button onClick={() => setActiveTab('skills')} className="relative z-10 flex-1 py-2 text-xs font-black uppercase tracking-widest text-on-surface transition-colors">Skills</button>
         <button onClick={() => setActiveTab('activity')} className="relative z-10 flex-1 py-2 text-xs font-black uppercase tracking-widest text-on-surface transition-colors">Activity</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, x: activeTab === 'skills' ? -20 : 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: activeTab === 'skills' ? -20 : 20 }}
           transition={{ duration: 0.3 }}
           className="pb-20"
        >
          {activeTab === 'skills' ? (
            <div className="grid grid-cols-2 gap-4">
              {userGigs.map(gig => (
                <GigCard key={gig.id} gig={gig} onDelete={handleDeleteGig} />
              ))}
              {userGigs.length === 0 && (
                 <div className="col-span-full py-20 text-center">
                    <p className="text-on-surface-variant font-bold text-sm mb-4">No published services yet</p>
                    <Button onClick={() => navigate('/upload')} className="mx-auto rounded-full px-8 font-black uppercase tracking-widest text-[10px] bg-primary">Create Your First Skill</Button>
                 </div>
              )}
            </div>
          ) : (
            <div className="ios-card divide-y divide-white/5 overflow-hidden">
               <div className="ios-list-item px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-white leading-none mb-1">Weekly Digest</p>
                    <p className="text-[10px] text-on-surface-variant font-medium">Your profile reached 0 people</p>
                  </div>
                  <ArrowRight size={16} className="text-zinc-600" />
               </div>
               <div className="ios-list-item px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-white leading-none mb-1">Verification Status</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Verified Level 1</p>
                  </div>
                  <ShieldCheck size={18} className="text-green-500" />
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 pt-8 border-t border-white/5 animate-ios">
          <button 
            onClick={handleSignOut}
            className="w-full h-14 rounded-2xl bg-error/10 text-error font-extrabold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-error/20 transition-all active:scale-[0.98]"
          >
            <LogOut size={18} /> Disconnect jobex ID
          </button>
      </div>
    </div>
  );
};

const GuestProfileCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center p-6 bg-background">
       <div className="w-full max-w-sm ios-glass p-8 rounded-[3rem] border border-white/10 shadow-2xl text-center space-y-8 animate-ios">
          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary shadow-xl">
             <Star size={40} className="fill-primary/20" />
          </div>
          
          <div className="space-y-2">
             <h2 className="text-3xl font-black tracking-tighter text-white">Join jobex</h2>
             <p className="text-on-surface-variant text-sm font-medium px-4 opacity-70">Sign in to publish elite skills and connect with global talent.</p>
          </div>

          <div className="space-y-3">
             <Button onClick={() => navigate('/login')} className="w-full h-14 rounded-2xl gap-3 text-sm font-bold bg-white text-black hover:bg-zinc-200 transition-all uppercase tracking-widest">
                <Mail size={18} /> Continue with Email
             </Button>
             <Button onClick={() => navigate('/login')} variant="ghost" className="w-full h-14 rounded-2xl gap-3 text-sm font-bold border border-white/10 text-white hover:bg-white/5 transition-all">
                <Globe size={18} /> Continue with Google
             </Button>
          </div>
       </div>
    </div>
  );
};



export default Profile;
