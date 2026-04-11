import React, { useState } from 'react';
import { DollarSign, TrendingUp, Download, Settings, ArrowRight, CreditCard, PieChart, Activity } from 'lucide-react';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/helpers';
import { useUserStore } from '../store/useUserStore';
import { toast } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user } = useUserStore();
  const [activeSegment, setActiveSegment] = useState<'overview' | 'finance'>('overview');

  const handleWithdrawal = () => {
    toast.error("Withdrawal feature coming soon. Link your bank account in Settings.");
  };

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto min-h-screen pb-24 overflow-y-auto no-scrollbar scroll-smooth">
      {/* Editorial Header */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[4rem] font-black tracking-tighter leading-none mb-4 bg-gradient-to-br from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              Command <br /> Center
            </h1>
            <p className="text-on-surface-variant font-bold text-sm tracking-wide uppercase opacity-60">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Creator'}. You have 3 pending reviews.
            </p>
          </div>
          <div className="flex gap-3">
             <Button 
                onClick={() => setActiveSegment('overview')}
                variant={activeSegment === 'overview' ? 'primary' : 'outline'}
                className="rounded-full px-6 h-12 text-[10px] font-black tracking-widest"
             >
                <Activity size={16} className="mr-2" /> OVERVIEW
             </Button>
             <Button 
                onClick={() => setActiveSegment('finance')}
                variant={activeSegment === 'finance' ? 'primary' : 'outline'}
                className="rounded-full px-6 h-12 text-[10px] font-black tracking-widest"
             >
                <PieChart size={16} className="mr-2" /> REVENUE
             </Button>
          </div>
        </div>
      </section>

      {/* Primary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Wallet Card */}
        <div className="bg-zinc-900 border border-white/5 p-8 rounded-[3rem] flex flex-col justify-between min-h-[260px] shadow-2xl relative overflow-hidden group col-span-1 md:col-span-2 lg:col-span-1">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
          <div className="relative z-10 flex justify-between items-start mb-4">
            <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">Revenue Balance</span>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
               <DollarSign size={20} />
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-6xl font-black tracking-tighter text-white">{formatPrice(4820)}</span>
            <div className="flex gap-8 mt-8">
              <StatMini label="ESCROWED" value={formatPrice(1240)} />
              <div className="w-px h-10 bg-white/5" />
              <StatMini label="AVAILABLE" value={formatPrice(3580)} />
            </div>
          </div>
          <Button onClick={handleWithdrawal} className="mt-8 rounded-2xl font-black text-xs gap-2 py-8 bg-white text-black hover:bg-zinc-200">
            <CreditCard size={18} /> INITIATE WITHDRAWAL
          </Button>
        </div>

        {/* Live Tracking */}
        <div className="bg-surface-container-low p-8 rounded-[3rem] border border-white/5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <span className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-black">Active Pipeline</span>
            <div className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Live</span>
            </div>
          </div>
          <div className="space-y-8">
            <ProjectProgress label="Visual Identity Build" progress={85} />
            <ProjectProgress label="Ad-Campaign Editing" progress={32} />
            <ProjectProgress label="Motion Graphics" progress={100} />
          </div>
          <Button variant="ghost" size="sm" className="mt-8 text-primary font-black text-[10px] uppercase tracking-widest gap-2">
            OPEN MANAGEMENT PANEL <ArrowRight size={14} />
          </Button>
        </div>

        {/* Pulse Chart */}
        <div className="bg-surface-container-low p-8 rounded-[3rem] border border-white/5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <span className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-black">Weekly Pulse</span>
            <span className="text-xs font-black text-primary">+14.2%</span>
          </div>
          <div className="h-28 flex items-end gap-1.5">
             {[30, 45, 35, 80, 50, 70, 40].map((h, i) => (
               <div key={i} className="flex-1 group relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                     ₹{h * 10}
                  </div>
                  <div 
                    className={cn(
                        "w-full rounded-t-xl transition-all duration-500",
                        i === 3 ? "bg-primary" : "bg-white/5 group-hover:bg-white/10"
                    )} 
                    style={{ height: `${h}%` }} 
                  />
               </div>
             ))}
          </div>
          <div className="flex justify-between items-end mt-8 pt-6 border-t border-white/5">
            <div>
              <p className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-1 opacity-40">Avg. Day</p>
              <p className="text-2xl font-black text-on-surface tracking-tighter">₹9,420</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary shadow-xl">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight">Recent Activity</h3>
            <Button variant="ghost" className="text-[10px] font-black tracking-widest uppercase text-on-surface-variant">History Archive</Button>
          </div>
          <div className="space-y-4">
            <TransactionItem label="Visual effects payment" amount={1200} date="2 mins ago" type="deposit" />
            <TransactionItem label="Server infrastructure fee" amount={45} date="Today, 2:40 PM" type="withdrawal" />
            <TransactionItem label="UI Kit Licensing" amount={840} date="Yesterday" type="deposit" />
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-white/5 space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center font-black text-xl border border-white/10">
                   AV
                </div>
                <div>
                   <h4 className="font-extrabold text-base tracking-tight">{user?.full_name || 'Alex Rivera'}</h4>
                   <p className="text-[9px] text-primary uppercase font-black tracking-[0.2em]">Verified Seller</p>
                </div>
             </div>
             <div className="space-y-6">
                <MetricBar label="Consistency Rate" value="98%" />
                <MetricBar label="SLA Compliance" value="100%" />
             </div>
          </div>
          <Button variant="outline" className="w-full h-20 rounded-[2rem] text-[11px] font-black tracking-[0.2em] gap-3 bg-white/5 border-white/10 hover:bg-white/10 uppercase">
            <Settings size={20} /> Configure Workplace
          </Button>
        </section>
      </div>
    </div>
  );
};

const StatMini: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-[9px] uppercase font-black text-white/40 tracking-[0.2em] leading-none mb-1.5">{label}</p>
    <p className="text-xl font-black text-white tracking-tighter">{value}</p>
  </div>
);

const ProjectProgress: React.FC<{ label: string; progress: number }> = ({ label, progress }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
      <span className="text-on-surface">{label}</span>
      <span className={cn(progress === 100 ? "text-primary" : "text-on-surface-variant")}>
        {progress === 100 ? 'COMPLETED' : `${progress}%`}
      </span>
    </div>
    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
      <div 
        className={cn(
            "h-full transition-all duration-1000",
            progress === 100 ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" : "bg-primary/40 text-primary blur-[1px]"
        )} 
        style={{ width: `${progress}%` }} 
      />
    </div>
  </div>
);

const TransactionItem: React.FC<{ label: string; amount: number; date: string; type: 'deposit' | 'withdrawal' }> = ({ label, amount, date, type }) => (
  <div className="bg-surface-container-lowest p-5 rounded-3xl flex items-center justify-between border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
    <div className="flex items-center gap-5">
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
        type === 'deposit' ? "bg-green-500/10 text-green-500" : "bg-error/10 text-error"
      )}>
        {type === 'deposit' ? <TrendingUp size={24} /> : <Download size={24} />}
      </div>
      <div>
        <p className="font-black text-base tracking-tighter leading-none mb-1 group-hover:text-primary transition-colors">{label}</p>
        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-50">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={cn("font-black text-lg tracking-tighter", type === 'deposit' ? "text-green-500" : "text-on-surface")}>
        {type === 'deposit' ? '+' : '-'}{formatPrice(amount)}
      </p>
      <p className="text-[8px] uppercase font-black text-on-surface-variant tracking-[0.2em] opacity-40">Processed</p>
    </div>
  </div>
);

const MetricBar: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
      <span className="text-on-surface-variant opacity-60">{label}</span>
      <span className="text-primary">{value}</span>
    </div>
    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
      <div className="bg-primary h-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" style={{ width: value }} />
    </div>
  </div>
);

import { cn } from '../utils/helpers';
export default Dashboard;
