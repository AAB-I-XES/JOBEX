import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User, Mail, Briefcase, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useUserStore } from '../../store/useUserStore';

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <div className="pt-4 pb-32 max-w-screen-md mx-auto px-6 min-h-screen">
      <header className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black tracking-tighter">Personal Info</h1>
      </header>

      <div className="space-y-8 animate-ios">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/5 shadow-2xl">
              <img src={user?.avatar_url || "https://picsum.photos/seed/user/200/200"} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full border-2 border-background shadow-lg">
              <Camera size={14} />
            </button>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Change Profile Photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <InputGroup label="Full Name" value={user?.full_name || ""} icon={User} />
          <InputGroup label="Email Address" value={user?.email || ""} icon={Mail} disabled />
          <InputGroup label="Professional Title" value={user?.title || "Elite Creator"} icon={Briefcase} />
          <InputGroup label="Location" value="Global" icon={MapPin} />
        </div>

        <div className="pt-10">
          <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ label: string; value: string; icon: any; disabled?: boolean }> = ({ label, value, icon: Icon, disabled }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] px-4">{label}</label>
    <div className={cn(
      "ios-card flex items-center gap-4 p-4 px-6",
      disabled && "opacity-50"
    )}>
      <Icon size={18} className="text-on-surface-variant" />
      <input 
        type="text" 
        defaultValue={value} 
        disabled={disabled}
        className="bg-transparent border-none focus:ring-0 flex-1 text-sm font-bold text-white placeholder:text-zinc-700"
      />
    </div>
  </div>
);

// Helper for cn (copying from other files if needed, but using local template)
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default ProfileSettings;
