import React, { useState } from 'react';
import { ArrowRight, Bike, Clock3, MapPin, Search, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingDialog from '../components/booking/BookingDialog';
import { services } from '../data/marketplace';
import type { MarketplaceService } from '../types/booking';

const recentPlaces = [
  { name: 'Central Market', detail: 'Main entrance' },
  { name: 'Railway Station', detail: 'North gate' },
];

const Home: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [selectedService, setSelectedService] = useState<MarketplaceService | null>(null);
  const [bookingDestination, setBookingDestination] = useState('');
  const navigate = useNavigate();

  const openRideBooking = (dropoff = '') => {
    const ride = services.find((service) => service.id === 'electric-rickshaw');
    if (ride) {
      setBookingDestination(dropoff);
      setSelectedService(ride);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = destination.trim();
    navigate(`/services?type=ride${search ? `&destination=${encodeURIComponent(search)}` : ''}`);
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28 text-on-surface">
      <header className="rounded-b-[30px] bg-[#f7ad7c] px-5 pb-6 pt-4 text-[#191715]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-black/55">Neighborhood rides & bites</p>
            <p className="mt-1 text-xl font-black tracking-tight">camport</p>
          </div>
          <button onClick={() => navigate('/profile')} aria-label="Open profile" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/60 bg-white/40">
            <UserRound size={20} />
          </button>
        </div>

        <h1 className="mt-5 text-2xl font-black leading-tight tracking-tight">Where are we going?</h1>
        <p className="mt-1 text-xs font-medium text-black/55">A quick ride or a good bite, just around the corner.</p>

        <form onSubmit={handleSearch} className="mt-4 flex h-12 items-center gap-2 rounded-2xl bg-[#fffaf6] p-1.5 pl-3.5 shadow-sm">
          <Search size={17} className="shrink-0 text-black/55" />
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="Where to?"
            aria-label="Destination"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#292725] outline-none placeholder:text-black/45"
          />
          <span className="flex h-9 items-center gap-1.5 rounded-xl bg-[#f3e8df] px-3 text-xs font-bold text-[#292725]">
            <Clock3 size={13} /> Now
          </span>
        </form>
      </header>

      <div className="space-y-5 px-5 pt-5">
        <section>
          <div className="mb-1 flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Recent places</h2>
            <button onClick={() => navigate('/services?type=ride')} className="text-[11px] font-bold text-primary">See rides</button>
          </div>
          {recentPlaces.map((place) => (
            <button
              type="button"
              key={place.name}
              onClick={() => openRideBooking(place.name)}
              className="flex w-full items-center gap-3 border-b border-white/10 py-3.5 text-left"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/65"><MapPin size={16} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-white">{place.name}</span>
                <span className="mt-0.5 block text-[11px] text-white/45">{place.detail}</span>
              </span>
              <ArrowRight size={15} className="text-white/35" />
            </button>
          ))}
        </section>

        <button onClick={() => navigate('/services')} className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-[#20201f] p-4 text-left transition hover:bg-[#292928]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><Bike size={19} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-white">Browse Camport services</span>
            <span className="mt-0.5 block text-[11px] text-white/50">Rides, delivery, travel and food</span>
          </span>
          <ArrowRight size={17} className="text-primary" />
        </button>
      </div>

      {selectedService && (
        <BookingDialog
          service={selectedService}
          defaultDestination={bookingDestination}
          onClose={() => setSelectedService(null)}
          onBooked={() => {
            setSelectedService(null);
            navigate('/orders');
          }}
        />
      )}
    </div>
  );
};

export default Home;
