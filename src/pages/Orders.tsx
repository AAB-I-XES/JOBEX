import React, { useState } from 'react';
import { ArrowRight, Bike, Clock3, MapPin, Sandwich } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Booking } from '../types/booking';
import { getBookings } from '../utils/bookings';

const Orders: React.FC = () => {
  const [{ bookings, loadError }] = useState(() => {
    try {
      return { bookings: getBookings(), loadError: '' };
    } catch (error) {
      console.error('Unable to load saved bookings:', error);
      return { bookings: [] as Booking[], loadError: 'Could not load saved requests from this device.' };
    }
  });
  const navigate = useNavigate();
  const latestBooking = bookings[0];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-28 text-on-surface lg:grid lg:max-w-7xl lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-8 lg:px-8 lg:pb-12 lg:pt-8">
      <header className="rounded-b-[30px] bg-[#f7ad7c] px-5 pb-5 pt-5 text-[#191715] lg:rounded-[30px] lg:px-8 lg:py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Activity <span aria-hidden="true">◷</span></h1>
            <p className="mt-1 text-xs font-semibold text-black/55">Past trips, rentals & orders</p>
          </div>
          <button onClick={() => navigate('/profile')} aria-label="Open profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/40">
            <span className="text-sm font-black">C</span>
          </button>
        </div>

        <button onClick={() => navigate('/services?type=ride')} className="theme-map-card relative mt-5 block h-40 w-full overflow-hidden rounded-[22px] text-left text-white lg:mt-8 lg:h-64">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'linear-gradient(25deg, transparent 44%, #55534e 45%, #55534e 47%, transparent 48%), linear-gradient(145deg, transparent 39%, #393936 40%, #393936 42%, transparent 43%), linear-gradient(90deg, transparent 70%, #4b4a45 71%, #4b4a45 73%, transparent 74%)',
              backgroundSize: '190px 130px, 220px 140px, 160px 120px',
              backgroundPosition: 'center',
            }}
          />
          <div className="activity-map-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5" />
          <div className="absolute right-8 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_0_6px_rgba(247,173,124,0.18)]">
            <MapPin size={15} fill="currentColor" />
          </div>
          <div className="absolute inset-x-4 bottom-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{latestBooking ? 'Latest activity' : 'Your neighborhood'}</p>
            <p className="mt-1 text-lg font-black">
              {latestBooking?.destination || latestBooking?.pickup || 'Ready for your next trip?'}
            </p>
            <p className="mt-0.5 text-[10px] text-white/60">
              {latestBooking ? `${latestBooking.serviceName} · ${latestBooking.status}` : 'Book an e-rickshaw or rent a cycle nearby'}
            </p>
          </div>
        </button>
      </header>

      <section className="px-5 pt-5 lg:px-0 lg:pt-2">
        <div className="mb-1 flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Recent</h2>
          {bookings.length > 0 && <span className="text-[11px] text-white/40">{bookings.length} total</span>}
        </div>

        {loadError ? (
          <div role="alert" className="mt-3 rounded-2xl border border-error/20 bg-error/10 px-4 py-4 text-sm text-error">{loadError}</div>
        ) : bookings.length ? (
          <div>
            {bookings.map((booking) => {
              const Icon = booking.type === 'snack' ? Sandwich : Bike;
              const location = booking.type === 'rent' ? booking.pickup : booking.destination || booking.pickup || booking.fulfillment;
              return (
                <article key={booking.id} className="flex items-center gap-3 border-b border-white/10 py-3.5">
                  <div className="theme-icon-surface flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-white/80">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{location}</p>
                    <p className="mt-1 truncate text-[10px] font-medium text-white/45">
                      {booking.type === 'rent' ? `${booking.quantity} ${booking.quantity === 1 ? 'hour' : 'hours'} · ` : ''}{booking.serviceName} · {new Date(booking.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">₹{booking.amount}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-primary">{booking.status}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="theme-card mt-3 rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><Clock3 size={18} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Your activity will show up here</p>
                <p className="mt-1 text-[11px] text-white/45">Your rides, rentals and food orders, all in one place.</p>
              </div>
            </div>
            <button onClick={() => navigate('/')} className="mt-4 flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-xs font-bold text-primary">
              Explore services <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;
