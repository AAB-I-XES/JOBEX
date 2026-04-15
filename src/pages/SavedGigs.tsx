import React, { useEffect } from 'react';
import { Bookmark, Search, ArrowRight } from 'lucide-react';
import { useGigStore } from '../store/useGigStore';
import GigCard from '../components/gig/GigCard';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const SavedGigs: React.FC = () => {
  const { gigs = [] } = useGigStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('SavedGigs page mounted');
  }, []);

  // For demo, we'll just show the first few gigs as "saved"
  const savedGigs = Array.isArray(gigs) ? gigs.slice(0, 3) : [];

  return (
    <div className="pt-24 pb-32 max-w-screen-md mx-auto px-6 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/10">
            <Bookmark size={24} style={{ fill: 'currentColor' }} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-on-surface tracking-tighter">Your Vault</h1>
            <p className="text-on-surface-variant text-sm font-medium opacity-60 uppercase tracking-widest">Bookmarked skills</p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-full bg-surface-container-high border border-white/5 text-[10px] font-black text-primary tracking-widest uppercase">
          {savedGigs.length} ITEMS
        </div>
      </div>

      {savedGigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {savedGigs.map(gig => (
            <div key={gig.id}>
               <GigCard gig={gig} />
            </div>
          ))}
          
          <div className="md:col-span-2 mt-8 p-10 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-600">
                <Search size={32} />
             </div>
             <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-400">Want more inspiration?</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Discover trending skills in the marketplace</p>
             </div>
             <Button onClick={() => navigate('/explore')} variant="ghost" className="text-primary text-[10px] font-black tracking-[0.2em] group">
                EXPLORE NOW <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
             </Button>
          </div>
        </div>
      ) : (
        <div className="py-40 flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-24 h-24 rounded-[2.5rem] bg-surface-container-low border border-white/5 flex items-center justify-center text-zinc-800 rotate-12">
              <Bookmark size={48} />
           </div>
           <div className="space-y-2">
              <h2 className="text-xl font-black text-white">Your vault is empty</h2>
              <p className="text-on-surface-variant text-sm font-medium max-w-[240px] mx-auto opacity-60">Bookmark skills you love to easily find them later.</p>
           </div>
           <Button onClick={() => navigate('/explore')} className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest uppercase">
              Browse Marketplace
           </Button>
        </div>
      )}
    </div>
  );
};

export default SavedGigs;
