import React from 'react';
import { Bell, Lock, CreditCard, ChevronRight, Eye, ShieldCheck, HelpCircle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Settings: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information", color: "bg-blue-500", path: "/settings/profile" },
        { icon: ShieldCheck, label: "Verification Level 1", extra: "Verified", color: "bg-green-500", path: "/settings/verification" },
        { icon: Trash2, label: "Trash & Recovery", color: "bg-orange-500", path: "/settings/recovery" },
        { icon: Lock, label: "Password & Security", color: "bg-zinc-600", path: "/settings/security" }
      ]
    },
    {
      title: "Notifications",
      items: [
        { icon: Bell, label: "Push Notifications", color: "bg-orange-500", path: "/settings/notifications" },
        { icon: Eye, label: "Privacy Settings", color: "bg-indigo-500", path: "/settings/privacy" }
      ]
    },
    {
      title: "Billing",
      items: [
        { icon: CreditCard, label: "Payment Methods", color: "bg-pink-500", path: "/settings/payments" },
        { icon: HelpCircle, label: "Billing Support", color: "bg-cyan-500", path: "/settings/support" }
      ]
    }
  ];

  return (
    <div className="pt-4 pb-32 max-w-screen-md mx-auto px-6 h-screen ios-scroll">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 animate-ios">Settings</h1>
      <p className="text-on-surface-variant font-medium text-sm mb-10 opacity-60 uppercase tracking-widest animate-ios">Preferences</p>

      <div className="space-y-10">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-3 animate-ios" style={{ animationDelay: `${0.1 * (sIdx + 1)}s` }}>
             <h2 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-4">{section.title}</h2>
             <div className="ios-card divide-y divide-white/5 overflow-hidden">
                {section.items.map((item, iIdx) => (
                  <button 
                    key={iIdx}
                    onClick={() => item.path && navigate(item.path)}
                    className="w-full flex items-center justify-between p-4 px-6 hover:bg-white/5 active:bg-white/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                       <div className={`${item.color} w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm`}>
                          <item.icon size={16} strokeWidth={2.5} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white tracking-tight">{item.label}</p>
                          {item.extra && <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-0.5">{item.extra}</p>}
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-600 ios-transition group-hover:translate-x-1" />
                  </button>
                ))}
             </div>
          </div>
        ))}
        
        <div className="px-6 space-y-4 animate-ios" style={{ animationDelay: '0.4s' }}>
           <button className="w-full py-4 text-center text-error font-extrabold text-sm tracking-tight active:opacity-50">Reset Application Cache</button>
           <button className="w-full py-4 text-center text-zinc-600 font-bold text-[10px] uppercase tracking-[0.3em]">Camport v1.0</button>
        </div>
      </div>
    </div>
  );
};

const User: React.FC<{ size: number; strokeWidth?: number }> = ({ size, strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default Settings;
