import React from 'react';
import { ArrowRight, Bike, ClipboardList, LogIn, LogOut, Settings, Sandwich } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useUserStore } from '../store/useUserStore';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const handleSignOut = async () => {
    try {
      const { authService } = await import('../features/auth/authService');
      await authService.signOut();
      setUser(null);
      toast.success('Signed out');
    } catch (error) {
      console.error('Unable to sign out:', error);
      toast.error('Unable to sign out. Please try again.');
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-32 pt-5">
      <section className="ios-card overflow-hidden p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/10 bg-white/5">
            <img
              src={user?.avatar_url || 'https://picsum.photos/seed/jobex-neighbor/160/160'}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Your account</p>
            <h1 className="mt-1 truncate text-2xl font-black tracking-tight text-white">
              {user?.full_name || 'Welcome, neighbor'}
            </h1>
            <p className="mt-1 truncate text-xs text-on-surface-variant">
              {user?.email || 'Guest account · no sign-in needed to book'}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="px-1 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Your neighborhood</h2>
        <button onClick={() => navigate('/orders')} className="ios-card flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary"><ClipboardList size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black text-white">Ride & snack orders</span>
            <span className="mt-1 block text-xs text-on-surface-variant">View your requests and order details</span>
          </span>
          <ArrowRight size={17} className="text-on-surface-variant" />
        </button>
        <button onClick={() => navigate('/explore?type=ride')} className="ios-card flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/15 text-success"><Bike size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black text-white">Find a local ride</span>
            <span className="mt-1 block text-xs text-on-surface-variant">Cycle and electric rickshaw options</span>
          </span>
          <ArrowRight size={17} className="text-on-surface-variant" />
        </button>
        <button onClick={() => navigate('/explore?type=snack')} className="ios-card flex w-full items-center gap-4 p-5 text-left transition hover:bg-white/5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warning/15 text-warning"><Sandwich size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black text-white">Browse nearby snacks</span>
            <span className="mt-1 block text-xs text-on-surface-variant">Order for pickup or delivery</span>
          </span>
          <ArrowRight size={17} className="text-on-surface-variant" />
        </button>
      </section>

      <section className="mt-8 ios-card p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-on-surface-variant"><Settings size={20} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-white">Account settings</p>
            <p className="mt-1 text-xs text-on-surface-variant">Manage your profile and preferences</p>
          </div>
          <button onClick={() => navigate('/settings')} aria-label="Open account settings" className="rounded-full p-2 text-primary hover:bg-white/5"><ArrowRight size={17} /></button>
        </div>
      </section>

      <div className="mt-8">
        {user ? (
          <Button onClick={handleSignOut} variant="ghost" className="h-12 w-full gap-2 rounded-2xl border border-white/10 text-error">
            <LogOut size={17} /> Sign out
          </Button>
        ) : (
          <Button onClick={() => navigate('/login')} variant="ghost" className="h-12 w-full gap-2 rounded-2xl border border-white/10 text-on-surface-variant">
            <LogIn size={17} /> Sign in (optional)
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
