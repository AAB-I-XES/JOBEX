import React, { useState } from 'react';
import { ArrowRight, Bike, MapPin, Sandwich } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingDialog from '../components/booking/BookingDialog';
import ServiceCard from '../components/booking/ServiceCard';
import { services } from '../data/marketplace';
import type { MarketplaceService, ServiceType } from '../types/booking';

const Home: React.FC = () => {
  const [activeType, setActiveType] = useState<ServiceType>('ride');
  const [selectedService, setSelectedService] = useState<MarketplaceService | null>(null);
  const navigate = useNavigate();
  const visibleServices = services.filter((service) => service.type === activeType);

  return (
    <div className="min-h-screen bg-background pb-32 text-on-surface">
      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface px-6 py-8 sm:px-10 sm:py-12">
          <div className="absolute -right-14 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[90px]" />
          <div className="relative z-10 max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Your neighborhood, ready
            </div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl">
              Little trips.<br />Good bites.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-on-surface-variant sm:text-base">
              Book a local cycle or e-rickshaw, then get your favorite snacks delivered from nearby.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => { setActiveType('ride'); navigate('/explore?type=ride'); }} className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-black text-white shadow-lg shadow-primary/20 transition hover:brightness-110 active:scale-95">
                <Bike size={16} /> Book a ride <ArrowRight size={14} />
              </button>
              <button onClick={() => { setActiveType('snack'); navigate('/explore?type=snack'); }} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-black text-white transition hover:bg-white/10 active:scale-95">
                <Sandwich size={16} /> Find snacks
              </button>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 hidden h-64 w-64 items-center justify-center rounded-full border border-white/5 bg-black/10 sm:flex">
            <div className="flex h-44 w-44 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <Bike size={88} strokeWidth={1.2} />
            </div>
          </div>
        </section>

        <section className="mt-9">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                <MapPin size={14} className="text-primary" /> Available in your neighborhood
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">What do you need?</h2>
            </div>
            <button onClick={() => navigate(`/explore?type=${activeType}`)} className="hidden items-center gap-1 text-xs font-bold text-primary sm:flex">
              Browse all <ArrowRight size={14} />
            </button>
          </div>

          <div className="mb-5 inline-flex rounded-2xl border border-white/5 bg-white/5 p-1">
            {([
              { type: 'ride' as const, label: 'Rides', icon: Bike },
              { type: 'snack' as const, label: 'Snacks', icon: Sandwich },
            ]).map(({ type, label, icon: Icon }) => (
              <button key={type} onClick={() => setActiveType(type)} className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black transition ${activeType === type ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-white'}`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visibleServices.map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
            ))}
          </div>
          <button onClick={() => navigate(`/explore?type=${activeType}`)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-4 text-xs font-black text-white transition hover:bg-white/10 sm:hidden">
            See all {activeType === 'ride' ? 'rides' : 'snacks'} <ArrowRight size={14} />
          </button>
        </section>

        <section className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/5 bg-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="text-sm font-black text-white">One easy place for local errands</p>
            <p className="mt-1 text-xs text-on-surface-variant">Your requests appear in Orders so you can keep track.</p>
          </div>
          <button onClick={() => navigate('/orders')} className="shrink-0 rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold text-primary hover:bg-white/5">
            View your orders
          </button>
        </section>
      </div>

      {selectedService && (
        <BookingDialog service={selectedService} onClose={() => setSelectedService(null)} onBooked={() => {
          setSelectedService(null);
          navigate('/orders');
        }} />
      )}
    </div>
  );
};

export default Home;
