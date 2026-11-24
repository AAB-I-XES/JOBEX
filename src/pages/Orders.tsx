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

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-5 pb-32 pt-5 sm:px-8">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Your activity</p>
      <h1 className="mt-2 text-4xl font-black tracking-tighter text-white">Orders</h1>
      <p className="mt-2 text-sm text-on-surface-variant">Keep track of your ride requests and snack orders.</p>

      {loadError ? (
        <div role="alert" className="ios-card mt-8 px-6 py-8 text-center text-sm text-error">{loadError}</div>
      ) : bookings.length ? (
        <div className="mt-7 space-y-3">
          {bookings.map((booking) => {
            const Icon = booking.type === 'ride' ? Bike : Sandwich;
            return (
              <article key={booking.id} className="ios-card flex items-start gap-4 p-5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${booking.type === 'ride' ? 'bg-primary/15 text-primary' : 'bg-warning/15 text-warning'}`}>
                  <Icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-black text-white">{booking.serviceName}</h2>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {booking.type === 'ride' ? 'Ride request' : `${booking.fulfillment} order`} · {booking.status}
                      </p>
                    </div>
                    <p className="text-lg font-black text-white">₹{booking.amount}</p>
                  </div>
                  <div className="mt-4 space-y-2 text-xs text-on-surface-variant">
                    {booking.pickup && <p className="flex items-center gap-2"><MapPin size={13} /> {booking.pickup}{booking.destination ? ` → ${booking.destination}` : ''}</p>}
                    {booking.type === 'snack' && <p>{booking.quantity} item{booking.quantity === 1 ? '' : 's'}</p>}
                    <p className="flex items-center gap-2"><Clock3 size={13} /> {new Date(booking.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="ios-card mt-8 flex flex-col items-center px-6 py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"><Bike size={28} /></div>
          <h2 className="text-lg font-black text-white">Nothing booked yet</h2>
          <p className="mt-2 max-w-xs text-sm leading-6 text-on-surface-variant">Your ride requests and snack orders will show up here.</p>
          <button onClick={() => navigate('/')} className="mt-6 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-black text-white">
            Explore nearby <ArrowRight size={14} />
          </button>
        </div>
      )}
      <p className="mt-6 text-center text-[10px] leading-4 text-on-surface-variant">
        Requests are saved on this device for the demo. They are not sent to a driver or store.
      </p>
    </div>
  );
};

export default Orders;
