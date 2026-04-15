import { useState } from 'react';
import type { FC } from 'react';
import { useGigStore } from '../store/useGigStore';
import { useGigs } from '../hooks/api/useGigs';
import GigVideoCard from '../components/gig/GigVideoCard';
import { Loader2, RefreshCcw, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/helpers';
import Button from '../components/ui/Button';

const Home: FC = () => {
  const { gigs } = useGigStore();
  const { isLoading, error, refresh } = useGigs();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  if (isLoading && gigs.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse">Syncing Feed</span>
      </div>
    );
  }

  if (error && gigs.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2">Connection Interrupted</h3>
        <p className="text-on-surface-variant font-medium mb-8 max-w-xs">{error.message}</p>
        <Button 
          onClick={handleRefresh}
          className="px-8 flex gap-2"
        >
          <RefreshCcw size={18} className={cn(isRefreshing && "animate-spin")} />
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth bg-background">
      {/* Story Bar */}
      <div className="fixed top-16 w-full z-40 bg-background/60 backdrop-blur-xl flex gap-4 px-6 py-3 overflow-x-auto no-scrollbar border-b border-white/5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-[64px] shrink-0">
            <div className={cn(
              "w-14 h-14 rounded-full p-[2px]",
              i === 1 ? "bg-gradient-to-tr from-primary to-primary-container" : "bg-zinc-800"
            )}>
              <div className="w-full h-full rounded-full border-2 border-background overflow-hidden bg-surface-container-low">
                <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="" className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all cursor-pointer" />
              </div>
            </div>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter opacity-70">Seller {i}</span>
          </div>
        ))}
      </div>

      {/* Feed */}
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <GigVideoCard key={gig.id} gig={gig} />
        ))
      ) : (
        <div className="h-screen flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-2">
            <Loader2 size={32} className="opacity-20" />
          </div>
          <p className="text-on-surface-variant font-medium">No vertical gigs found in your area.</p>
          <Button variant="ghost" onClick={handleRefresh} className="text-primary text-xs uppercase tracking-widest font-black">
            Refresh Feed
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
