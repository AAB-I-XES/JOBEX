import React from 'react';
import { Search, TrendingUp, Sparkles, Zap, Camera, Music, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Video Edit', icon: Zap, color: 'bg-orange-500' },
  { name: 'UI Design', icon: Palette, color: 'bg-blue-500' },
  { name: 'VFX Flow', icon: Sparkles, color: 'bg-purple-500' },
  { name: 'Photography', icon: Camera, color: 'bg-pink-500' },
  { name: 'Music Production', icon: Music, color: 'bg-green-500' },
  { name: 'Marketing', icon: TrendingUp, color: 'bg-cyan-500' },
];

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-4 pb-32 px-6 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6 animate-ios">Explore</h1>

      {/* iOS Search Bar */}
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          placeholder="Skills, creators or projects"
          className="w-full h-12 bg-surface rounded-2xl pl-12 pr-4 text-sm font-medium border border-white/5 focus:ring-2 focus:ring-primary/20 outline-none ios-transition"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
            }
          }}
        />
      </div>

      <section className="space-y-8 animate-ios" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => navigate(`/explore/${encodeURIComponent(cat.name)}`)}
              className="ios-card p-5 flex flex-col items-start gap-4 active:scale-95 ios-transition group"
            >
              <div className={`${cat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                <cat.icon size={20} />
              </div>
              <span className="text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6 animate-ios" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Trending Now</h2>
           <button className="text-primary text-xs font-bold active:opacity-50">See All</button>
        </div>
        <div className="space-y-4">
           {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="flex items-center gap-4 bg-surface/50 p-4 rounded-2xl border border-white/5 active:bg-white/5 ios-transition">
                <div className="w-16 h-16 rounded-xl bg-zinc-800 animate-pulse overflow-hidden">
                   <img src={`https://picsum.photos/seed/trend-${i}/100/100`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                   <p className="text-sm font-bold tracking-tight">CGI Product Visualizer</p>
                   <p className="text-xs text-on-surface-variant font-medium mt-1">@studio_elite</p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black italic">₹{1200 * i}</p>
                   <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1">Global</p>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
