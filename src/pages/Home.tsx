import React from 'react';
import HomeFeed from './HomeFeed';
import StoryBar from '../components/story/StoryBar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Large iOS Header (Collapses on scroll handled by Navbar/HomeFeed) */}
      {/* Story Section */}
      <div>
         <StoryBar />
      </div>

      <div className="px-6 py-8">
         <h1 className="text-4xl font-extrabold tracking-tight text-white animate-ios">
            Featured
         </h1>
         <p className="text-on-surface-variant text-sm font-medium opacity-60 mt-1">
            Discover elite skills today
         </p>
      </div>

      {/* Categories Bar */}
      <div className="sticky top-14 z-40 ios-glass border-b border-white/5 flex gap-3 px-6 py-3 overflow-x-auto no-scrollbar scroll-smooth">
        {['All', 'Video', 'Design', 'Development', 'Marketing', 'Audio'].map((cat, i) => (
          <button 
            key={cat} 
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              i === 0 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white/5 text-on-surface-variant hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <HomeFeed />
    </div>
  );
};

export default Home;
