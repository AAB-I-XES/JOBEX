import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import type { Gig } from '../../types/gig';
import { cn } from '../ui/Button';

interface GigCardProps {
  gig: Gig;
  variant?: 'grid' | 'detailed';
  className?: string;
}

const GigCard: React.FC<GigCardProps> = ({ gig, className }) => {
  return (
    <div className={cn(
      "group relative bg-surface-container-low rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-primary/30",
      className
    )}>
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={gig.thumbnail_url} 
          alt={gig.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2 py-1 bg-surface-container-lowest/60 backdrop-blur-md rounded-md text-[10px] font-bold text-primary tracking-widest uppercase">
            {gig.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-t from-surface-container-low to-transparent">
        <h3 className="text-sm font-semibold text-on-surface leading-tight mb-1 line-clamp-2">
          {gig.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[11px] font-bold text-on-surface">{gig.rating}</span>
          <span className="text-[11px] text-on-surface-variant">({gig.review_count})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-on-surface-variant truncate max-w-[80px]">@creator</span>
            {gig.is_verified && <CheckCircle size={14} className="text-blue-400 fill-blue-400" />}
          </div>
          <span className="text-sm font-bold text-primary">₹{gig.price}</span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
