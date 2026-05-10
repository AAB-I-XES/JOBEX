import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, Shield, UserX } from 'lucide-react';

const PrivacySettings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-32 max-w-screen-md mx-auto px-6 min-h-screen">
      <header className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black tracking-tighter">Privacy</h1>
      </header>

      <div className="space-y-10 animate-ios">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-4">Visibility</h2>
          <div className="ios-card divide-y divide-white/5 overflow-hidden">
            <ToggleItem icon={Eye} label="Public Profile" desc="Allow anyone to view profile" color="bg-indigo-500" defaultChecked />
            <ToggleItem icon={Shield} label="Status Sync" desc="Show active status" color="bg-green-500" defaultChecked />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-4">Interactions</h2>
          <div className="ios-card divide-y divide-white/5 overflow-hidden">
            <SettingsItem icon={UserX} label="Blocked Accounts" desc="Manage users you've blocked" color="bg-error" />
            <ToggleItem icon={EyeOff} label="Private Gigs" desc="Hide active projects" color="bg-zinc-600" />
          </div>
        </section>
      </div>
    </div>
  );
};

const SettingsItem: React.FC<{ icon: any; label: string; desc: string; color: string }> = ({ icon: Icon, label, desc, color }) => (
  <button className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all text-left">
    <div className="flex items-center gap-4">
      <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-white tracking-tight">{label}</p>
        <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{desc}</p>
      </div>
    </div>
    <ChevronLeft className="rotate-180 text-zinc-600" size={16} />
  </button>
);

const ToggleItem: React.FC<{ icon: any; label: string; desc: string; color: string; defaultChecked?: boolean }> = ({ icon: Icon, label, desc, color, defaultChecked }) => (
  <div className="flex items-center justify-between p-5 text-left">
    <div className="flex items-center gap-4">
      <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-bold text-white tracking-tight">{label}</p>
        <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{desc}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  </div>
);

export default PrivacySettings;
