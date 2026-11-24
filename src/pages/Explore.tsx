import React, { useMemo, useState } from 'react';
import { Bike, Search, Sandwich } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import BookingDialog from '../components/booking/BookingDialog';
import ServiceCard from '../components/booking/ServiceCard';
import { services } from '../data/marketplace';
import type { MarketplaceService, ServiceType } from '../types/booking';

const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType: ServiceType = searchParams.get('type') === 'snack' ? 'snack' : 'ride';
  const [query, setQuery] = useState('');
  const [selectedService, setSelectedService] = useState<MarketplaceService | null>(null);
  const results = useMemo(() => services.filter((service) =>
    service.type === activeType &&
    `${service.name} ${service.description} ${service.category}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [activeType, query]);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-5 pb-32 pt-5 sm:px-8">
      <div className="mb-7">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Around you</p>
        <h1 className="mt-2 text-4xl font-black tracking-tighter text-white">
          Find {activeType === 'ride' ? 'a ride' : 'a good bite'}
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">Local rides and fresh snacks, all in one place.</p>
      </div>

      <div className="mb-5 inline-flex rounded-2xl border border-white/5 bg-white/5 p-1">
        {([
          { type: 'ride' as const, label: 'Rides', icon: Bike },
          { type: 'snack' as const, label: 'Snacks', icon: Sandwich },
        ]).map(({ type, label, icon: Icon }) => (
          <button key={type} onClick={() => setSearchParams({ type })} className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black transition ${activeType === type ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <label className="mb-7 flex h-12 items-center gap-3 rounded-2xl border border-white/5 bg-surface px-4 text-on-surface-variant">
        <Search size={17} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={activeType === 'ride' ? 'Search cycle or e-rickshaw rides' : 'Search chai, snacks and more'} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
      </label>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">{activeType === 'ride' ? 'Nearby rides' : 'Nearby snacks'}</h2>
        <span className="text-xs text-on-surface-variant">{results.length} options</span>
      </div>
      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((service) => <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />)}
        </div>
      ) : (
        <div className="ios-card px-6 py-12 text-center">
          <p className="font-bold text-white">Nothing found yet</p>
          <p className="mt-2 text-sm text-on-surface-variant">Try another search to see what’s nearby.</p>
        </div>
      )}

      {selectedService && (
        <BookingDialog service={selectedService} onClose={() => setSelectedService(null)} onBooked={() => setSelectedService(null)} />
      )}
    </div>
  );
};

export default Explore;
