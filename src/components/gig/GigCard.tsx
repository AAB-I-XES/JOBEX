import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import type { Gig } from '../../types/gig';
import { cn } from '../../utils/helpers';

interface GigCardProps {
  gig: Gig;
  className?: string;
}

const GigCard: React.FC<GigCardProps> = ({ gig, className }) => {
  return (
    <div className={cn(
      "group ios-card relative overflow-hidden ios-transition active:scale-[0.98] cursor-pointer",
      className
    )}>
      {/* Media Content */}
      <div className="aspect-[4/5] relative overflow-hidden bg-zinc-900">
        <img 
          src={gig.thumbnail_url} 
          alt={gig.title} 
          className="w-full h-full object-cover ios-transition group-hover:scale-105" 
        />
        
        {/* Transparent Badge Overlay */}
        <div className="absolute top-3 left-3">
          <div className="ios-glass px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
            <span className="text-[9px] font-black text-white uppercase tracking-wider">
              {gig.category}
            </span>
          </div>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3">
           <div className="bg-primary px-3 py-1 rounded-full shadow-lg shadow-primary/20">
              <span className="text-sm font-black text-white tracking-tighter italic">₹{gig.price}</span>
           </div>
        </div>
      </div>
      
      {/* Information Overlay */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
           <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10">
              <img src={`https://picsum.photos/seed/${gig.id}/50/50`} className="w-full h-full object-cover" alt="" />
           </div>
           <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest truncate">Elite Creator</span>
           {gig.is_verified && <CheckCircle size={10} className="text-primary fill-primary/10" />}
        </div>

        <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
          {gig.title}
        </h3>
        
        <div className="flex items-center justify-between pt-1 opacity-60">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-black text-white">{gig.rating}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">{gig.delivery_time}</span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
