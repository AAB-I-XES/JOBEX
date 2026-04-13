import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo Section */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Sparkles size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Initializing Systems</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter text-white mb-2 italic">jobex</h1>
                    <div className="flex items-center gap-4 mt-4 justify-center">
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary/50" />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Loading Experience</span>
                        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary/50" />
                    </div>
                </motion.div>

                {/* Loading Bar */}
                <div className="w-64 h-[2px] bg-white/5 rounded-full relative overflow-hidden">
                    <motion.div 
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: "easeInOut" 
                        }}
                        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                </div>

                {/* Status messages */}
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Quantum Engine Core v4.0.2</span>
                    <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.1em]">Stabilizing 3D Neural Mesh...</span>
                </div>
            </div>

            {/* Corner Decor */}
            <div className="absolute bottom-12 right-12 text-right">
                <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Phase 1</span>
                <span className="block text-[8px] font-black text-white/10 uppercase tracking-[0.2em]">Environment Sync</span>
            </div>

            {/* Animated background lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
                <div className="absolute top-0 left-2/4 w-px h-full bg-white" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
                <div className="absolute top-1/4 left-0 w-full h-px bg-white" />
                <div className="absolute top-2/4 left-0 w-full h-px bg-white" />
                <div className="absolute top-3/4 left-0 w-full h-px bg-white" />
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
