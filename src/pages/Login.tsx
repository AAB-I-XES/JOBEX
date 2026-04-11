import React, { useState } from 'react';
import { Mail, ArrowRight, Globe, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authService } from '../features/auth/authService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';

interface LoginProps {
  isInitializing?: boolean;
}

const Login: React.FC<LoginProps> = ({ isInitializing }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoading } = useUserStore();

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

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 group">
             <Sparkles size={14} className="text-primary group-hover:rotate-12 transition-transform" />
             <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Join the Elite</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-2 italic">SkillTok</h1>
          <p className="text-on-surface-variant font-bold text-xs uppercase tracking-widest opacity-60">Creative Commerce Redefined</p>
        </div>

        <div className="relative group">
           {/* Initializing Overlay */}
           {isInitializing && (
             <div className="absolute inset-0 z-50 rounded-[3rem] bg-zinc-900/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 border border-primary/20 animate-in fade-in duration-500">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Syncing Session</span>
             </div>
           )}

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
                        placeholder="architect@skilltok.com"
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
             onClick={() => {
                if (isInitializing) {
                    setLoading(false);
                } else {
                    navigate('/');
                }
             }}
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
  );
};

export default Login;
