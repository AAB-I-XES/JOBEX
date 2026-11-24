import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Minus, Plus, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Booking, MarketplaceService } from '../../types/booking';
import { saveBooking } from '../../utils/bookings';

interface BookingDialogProps {
  service: MarketplaceService;
  onClose: () => void;
  onBooked: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ service, onClose, onBooked }) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const isRide = service.type === 'ride';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const booking: Booking = {
      id: crypto.randomUUID(),
      serviceId: service.id,
      serviceName: service.name,
      type: service.type,
      amount: service.price * quantity,
      quantity,
      pickup: isRide ? pickup.trim() : fulfillment === 'delivery' ? pickup.trim() : 'Store pickup',
      destination: isRide ? destination.trim() : '',
      fulfillment: isRide ? 'ride' : fulfillment,
      status: 'Requested',
      createdAt: new Date().toISOString(),
    };

    try {
      saveBooking(booking);
      toast.success(isRide ? 'Ride request placed' : 'Snack order placed');
      onBooked();
    } catch (error) {
      console.error('Unable to save booking:', error);
      toast.error('Could not save your request. Please try again.');
    }
  };

  return createPortal((
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="w-full max-w-md rounded-t-[2rem] border border-white/10 bg-surface p-6 shadow-2xl sm:rounded-[2rem]"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {isRide ? 'Ride booking' : 'Snack order'}
            </p>
            <h2 id="booking-title" className="mt-1 text-2xl font-black tracking-tight text-white">{service.name}</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-full bg-white/5 p-2 text-on-surface-variant hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRide ? (
            <>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-on-surface-variant">Pickup point</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4">
                  <MapPin size={16} className="shrink-0 text-success" />
                  <input required value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Enter your pickup location" className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" />
                </span>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-on-surface-variant">Drop-off point</span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4">
                  <MapPin size={16} className="shrink-0 text-error" />
                  <input required value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Where are you going?" className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" />
                </span>
              </label>
            </>
          ) : (
            <>
              <div className="rounded-2xl bg-black/20 p-1">
                {(['delivery', 'pickup'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFulfillment(option)}
                    className={`w-1/2 rounded-xl py-3 text-xs font-bold capitalize transition ${fulfillment === option ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
                  >
                    {option === 'delivery' ? 'Deliver to me' : 'I’ll pick it up'}
                  </button>
                ))}
              </div>
              {fulfillment === 'delivery' && (
                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-on-surface-variant">Delivery address</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4">
                    <MapPin size={16} className="shrink-0 text-primary" />
                    <input required value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Enter your address" className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" />
                  </span>
                </label>
              )}
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 p-4">
                <div>
                  <p className="text-sm font-bold text-white">Quantity</p>
                  <p className="text-xs text-on-surface-variant">₹{service.price} each</p>
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => value - 1)} className="rounded-full bg-white/5 p-2 text-white disabled:opacity-30"><Minus size={14} /></button>
                  <span className="w-4 text-center text-sm font-black text-white">{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)} className="rounded-full bg-white/5 p-2 text-white"><Plus size={14} /></button>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Estimated total</p>
              <p className="text-2xl font-black text-white">₹{service.price * quantity}</p>
            </div>
            <button type="submit" className="rounded-full bg-primary px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-primary/20 active:scale-95">
              {isRide ? 'Request ride' : 'Place order'}
            </button>
          </div>
          <p className="text-center text-[10px] leading-4 text-on-surface-variant">
            Demo request only. No driver, store, or payment provider is connected yet.
          </p>
        </form>
      </section>
    </div>
  ), document.body);
};

export default BookingDialog;
