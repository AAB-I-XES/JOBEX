import React, { useState } from 'react';
import { Mail, ArrowRight, Globe, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../features/auth/authService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SplineScene } from '../components/common/SplineScene';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    
    setIsLoading(true);
    try {
      await authService.signUp(email);
      toast.success('Magic link sent! Check your inbox.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send magic link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (err: any) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full max-w-7xl z-10">
        {/* Left Side: 3D Scene */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block w-full lg:w-1/2 h-[600px] relative"
        >
          <SplineScene 
            scene="https://prod.spline.design/RN6nTQaeFPhVCgcL/scene.splinecode"
            className="w-full h-full"
          />
          {/* Subtle overlay to prevent interaction with the 3D scene if desired, or leave it interactive */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-background/20" />
          
          {/* Strategic design element to mask the Spline watermark */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 px-4 py-2 rounded-xl bg-background/80 backdrop-blur-md border border-white/5 shadow-2xl pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Engine v4.0.2 Active</span>
          </div>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 group">
               <Sparkles size={14} className="text-primary group-hover:rotate-12 transition-transform" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Join the Elite</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white mb-2 italic">jobex</h1>
            <p className="text-on-surface-variant font-bold text-xs uppercase tracking-widest opacity-60">Future of Work, Today</p>
          </div>

          <div className="relative group">
              <div className="bg-surface-container-low p-10 rounded-[3rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] space-y-8 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                  
                  {/* Social Auth */}
                  <div className="space-y-3">
                      <Button 
                          onClick={handleGoogleLogin}
                          variant="outline" 
                          className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 gap-3 text-sm font-bold active:scale-95 transition-all"
                      >
                          <Globe size={20} className="text-primary" /> Continue with Google
                      </Button>
                  </div>

                  <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/5" />
                      <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-30">Universal Access</span>
                      <div className="h-px flex-1 bg-white/5" />
                  </div>

                  {/* Magic Link Form */}
                  <form onSubmit={handleMagicLink} className="space-y-4">
                      <Input 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="architect@jobex.ai"
                          type="email"
                          icon={<Mail size={18} className="text-primary" />}
                      />
                      <Button 
                          type="submit"
                          isLoading={isLoading}
                          className="w-full h-16 rounded-2xl gap-3 font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-primary/20"
                      >
                          REQUEST ACCESS <ArrowRight size={16} />
                      </Button>
                  </form>

                  <div className="flex items-center justify-center gap-2 pt-2">
                      <ShieldCheck size={14} className="text-green-500/60" />
                      <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 italic">Biometric Security Standard</span>
                  </div>
              </div>
          </div>

          <div className="mt-10 text-center space-y-6">
             <button 
               onClick={() => navigate('/')}
               className="text-on-surface-variant hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 flex items-center gap-2 mx-auto active:scale-95"
             >
               Continue as Guest <ArrowRight size={12} />
             </button>
             
             <div className="flex justify-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-widest">
                <span>Terms</span>
                <span>•</span>
                <span>Privacy</span>
                <span>•</span>
                <span>Support</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
