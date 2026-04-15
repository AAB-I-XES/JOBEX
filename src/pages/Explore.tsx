import { useState } from 'react';
import type { FC } from 'react';
import { Search } from 'lucide-react';
import Input from '../components/ui/Input';
import GigCard from '../components/gig/GigCard';
import { useGigStore } from '../store/useGigStore';
import { GigCategory } from '../types/gig';
import { useGigs } from '../hooks/api/useGigs';

const categories = Object.values(GigCategory);

const Explore: FC = () => {
  const { filteredGigs, searchQuery, setSearchQuery } = useGigStore();
  const [activeCategory, setActiveCategory] = useState<GigCategory | 'All'>('All');
  const { isLoading, error } = useGigs();
  const visibleGigs = activeCategory === 'All'
    ? filteredGigs
    : filteredGigs.filter((gig) => gig.category === activeCategory);

  return (
    <div className="pt-20 px-4 max-w-2xl mx-auto min-h-screen pb-32 overflow-y-auto no-scrollbar">
      {/* Search */}
      <section className="mb-8 mt-4">
        <Input 
          placeholder="Find your next skill..." 
          icon={<Search size={20} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Categories */}
      <section className="mb-10 -mx-4">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
              activeCategory === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant border border-white/5'
            }`}
          >
            ALL SKILLS
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-highest text-on-surface-variant border border-white/5'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 space-y-4">
          {visibleGigs.filter((_, idx) => idx % 2 === 0).map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
        <div className="col-span-1 space-y-4 pt-6">
          {visibleGigs.filter((_, idx) => idx % 2 !== 0).map(gig => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="py-20 text-center text-on-surface-variant">
          Loading gigs...
        </div>
      )}

      {error && (
        <div className="py-20 text-center text-error">
          Failed to load gigs. Please refresh.
        </div>
      )}

      {!isLoading && !error && visibleGigs.length === 0 && (
        <div className="py-20 text-center text-on-surface-variant">
          No matches found for your search.
        </div>
      )}
    </div>
  );
};

export default Explore;
