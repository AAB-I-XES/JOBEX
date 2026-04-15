import React from 'react';

const HomeFeed: React.FC = () => {
  const feeds = [
    {
      id: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOKyVOeK7b4lm3edJgrf3es02VxrNFtGUEMvntwSXYbkh0bBDvFnx62mo2YlBbzbZsvXu36aI88dBmscQCqqT_zwePIMux4MEGSlW5TwOjSOwMkpka7wheQwfUkyZNgnJhqNG18xhfKbVeYgB5IbjkUK5_048-joqD4P0WtwHsFiMxCiEon4lVqVSpQSAH_xXqEo1peI2fFWNiR8fUYICkXHZk3PqWU3kKQt_5Q9z6SH-MUEeuQf5dWJs3nUf-GxTHwRSIUVyAFPA",
      title: "I will design a modern logo for ₹50",
      user: "creative_pixel",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzEqS_mVXJc8MtzB7I2rfLySrAuKs4jyEzLMDxRCwBl4wAM-R_Rgycf3mRUEB58UzY7mNm0nMnAboTggEi4GHAlsFsrfIKuDB5ntgVaTHs4UcNnzdDzdQ7wKa0D9vxrdMLIyP1BImRPXhLd3uS1QMZHxXE5ECjx-sCWN6LxU4Rl0twLgIcJizHvu_VnRnSx4vEJio70nc8VrqIZvi4kRHe4VjvQyGuBaPXPqCKG6mfb_83iOiDcv4LoqFUJ6uWJGqW1HvDqqbR5HY",
      price: "₹50",
      stats: { likes: "12.4K", comments: "842", shares: "Share", views: "42k views" },
      tag: "Selling Fast",
      isVerified: true
    },
    {
      id: 2,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx9q0CU-ajwA2KzV2O3sKKdyaVZN0PFBOTFSJK5WklmAMPXsuOOHJOH9olb_eqHV_S0Y127FF-I2ls2am4yqznB7JnZ0EkAQFiQjHtbTNN6hpItj9xc4ocmMg8XuvhgMMJNymWu71IqXi0ukGblXHKJBATjt2pNDiGl0lPbM6BqPlAIW3K_nPf2Srvqy8SBtCnzjor5-8iMBfVgTM0dhFos0mujESI-Oc06In_1PH2AiMCiR38K3_DPOYBwM-ph8W5wUYe9tZf-Lg",
      title: "Custom React Component Optimization",
      user: "dev_guru",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi4AWXRxltV56CavqMX_XhkwUAPel9i2W_NKd8KY4DCrLEq__h37CvlHPUppn9uo9CcCXy8bjuoCZ0TO3xoEJkX6UjOcGUy94fI13Rdg4smjMYYhKLDfnHSROwidLxIZisKhQ4C2OxCPOO8fe_eOHqc_XINkStK5JzqIchi_juY-AetfZfiVNfxVbxi2EzrA3_tzsjEB1KoRWwjGIFfYJ5gckYd2CeQJX3H4mZKWSy92fBC1YSL4B-ND5NKIgtCVGIdptbRL2qwU8",
      price: "₹500",
      stats: { likes: "8.1K", comments: "120", shares: "Share", views: "15k views" },
      tag: "Top Rated",
      isVerified: true
    }
  ];

  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth">
      {/* Seller Updates Story Bar */}
      <div className="fixed top-[88px] w-full z-40 bg-zinc-900/70 backdrop-blur-lg flex gap-4 px-6 py-2 overflow-x-auto no-scrollbar border-b border-white/5 pb-3">
        <div className="flex flex-col items-center gap-1 min-w-[56px] opacity-100">
          <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-primary">
            <div className="w-full h-full rounded-full border-2 border-black overflow-hidden">
              <img alt="Seller" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzEqS_mVXJc8MtzB7I2rfLySrAuKs4jyEzLMDxRCwBl4wAM-R_Rgycf3mRUEB58UzY7mNm0nMnAboTggEi4GHAlsFsrfIKuDB5ntgVaTHs4UcNnzdDzdQ7wKa0D9vxrdMLIyP1BImRPXhLd3uS1QMZHxXE5ECjx-sCWN6LxU4Rl0twLgIcJizHvu_VnRnSx4vEJio70nc8VrqIZvi4kRHe4VjvQyGuBaPXPqCKG6mfb_83iOiDcv4LoqFUJ6uWJGqW1HvDqqbR5HY"/>
            </div>
          </div>
          <span className="text-[9px] font-bold text-zinc-300">New Design</span>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1 min-w-[56px] opacity-60">
            <div className="w-12 h-12 rounded-full p-[2px] bg-zinc-700">
              <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-zinc-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-500 text-lg">
                  {i === 1 ? 'history' : i === 2 ? 'star' : 'person'}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-bold text-zinc-500">
              {i === 1 ? 'Recents' : i === 2 ? 'Offers' : 'More'}
            </span>
          </div>
        ))}
      </div>

      {feeds.map((feed) => (
        <section key={feed.id} className="relative h-screen w-full snap-start overflow-hidden flex flex-col justify-end">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src={feed.image} alt={feed.title} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90"></div>
          </div>

          {/* Live Activity */}
          <div className="absolute top-40 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10 shadow-lg">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
              </span>
              <span className="text-[10px] font-bold text-on-surface whitespace-nowrap uppercase tracking-widest">
                12 people viewing now
              </span>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 w-full px-6 pb-52 flex justify-between items-end">
            <div className="max-w-[75%] space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-white/10">
                  <span className="material-symbols-outlined text-primary text-sm">payments</span>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">Starting at {feed.price}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/30 border border-error/20">
                  <span className="text-[10px] font-black text-error uppercase tracking-widest">🔥 {feed.tag}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight text-on-surface tracking-tight">{feed.title}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-on-surface-variant flex items-center gap-1">
                    @{feed.user}
                    {feed.isVerified && <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary gig-pulse-dot"></div>
                  <span className="text-xs text-secondary-dim font-bold tracking-widest uppercase">AVAILABLE NOW</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-xl glass-panel w-fit border border-white/5 active:scale-95 transition-transform cursor-pointer">
                <img className="w-10 h-10 rounded-lg object-cover" src={feed.avatar} alt={feed.user} />
                <div className="pr-4">
                  <p className="text-xs font-bold text-on-surface flex items-center gap-1">Alex Rivera <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span></p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Pro Level 2 Designer</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 items-center">
              {[
                { icon: 'favorite', label: feed.stats.likes },
                { icon: 'chat_bubble', label: feed.stats.comments },
                { icon: 'share', label: feed.stats.shares, color: 'text-green-400', glow: 'share-glow' },
                { icon: 'bookmark', label: feed.stats.views }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/10 active:scale-90 transition-transform ${stat.glow || ''}`}>
                    <span className={`material-symbols-outlined text-2xl ${stat.color || 'text-on-surface'}`}>{stat.icon}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${stat.color ? stat.color + '/80' : 'text-on-surface-variant'}`}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buy Button */}
          <div className="absolute bottom-[112px] left-0 w-full px-6 z-40">
            <button className="w-full h-14 primary-glow-button rounded-2xl flex items-center justify-between px-6 active:scale-[0.97] transition-all">
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-on-primary-container/80 tracking-widest uppercase">Quick Purchase</span>
                <span className="text-sm font-bold text-white">Buy This Gig</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-white">{feed.price}</span>
                <span className="material-symbols-outlined text-white">arrow_forward</span>
              </div>
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomeFeed;
