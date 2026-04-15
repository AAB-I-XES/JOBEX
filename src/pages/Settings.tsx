import React, { useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Bell, User, Lock, CreditCard, ChevronRight, Share2, Eye, ShieldCheck, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Settings page mounted');
  }, []);

  const sections = [
    {
      title: "Account Security",
      items: [
        { icon: Shield, label: "Two-Factor Authentication", extra: "Highly Secure" },
        { icon: Lock, label: "Password Management", extra: "Updated 2m ago" },
        { icon: ShieldCheck, label: "Login Activity", extra: "3 active sessions" }
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notification Settings", extra: "All on" },
        { icon: Eye, label: "Privacy & Visibility", extra: "Public" },
        { icon: Share2, label: "Linked Accounts", extra: "Google connected" }
      ]
    },
     {
      title: "Payments",
      items: [
        { icon: CreditCard, label: "Payout Methods", extra: "Bank Transfer" },
        { icon: HelpCircle, label: "Tax Information", extra: "Verified" }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-32 max-w-screen-md mx-auto px-6 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xl">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tighter">Settings</h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 uppercase tracking-widest">Manage your workplace</p>
        </div>
      </div>

      <div className="space-y-10">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
             <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2">{section.title}</h2>
             <div className="bg-surface-container-low rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
                {section.items.map((item, iIdx) => (
                  <button 
                    key={iIdx}
                    className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all text-left border-b border-white/5 last:border-0 group"
                  >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:scale-110 transition-transform">
                          <item.icon size={20} />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{item.label}</span>
                          <span className="text-[10px] font-medium text-zinc-500">{item.extra}</span>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
             </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 text-center space-y-4">
          <p className="text-xs font-bold text-on-surface-variant">Looking for something else?</p>
          <Button variant="outline" className="h-12 px-8 rounded-2xl text-[10px] font-black tracking-widest uppercase">
            VISIT HELP CENTER
          </Button>
      </div>
    </div>
  );
};

export default Settings;
