import { useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { authService } from '../../features/auth/authService';
import { useUserStore } from '../../store/useUserStore';

export const useAuth = () => {
  const { user, setUser, setLoading, isLoading } = useUserStore();
  const isInitialCheckDone = useRef(false);

  useEffect(() => {
    // 1. Initial Session Sync
    const initAuth = async () => {
      if (isInitialCheckDone.current) return;
      
      console.log('[Auth] Running initial session sync...');
      setLoading(true);
      
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          console.log('[Auth] Initial sync found user:', currentUser.email);
        } else {
          console.log('[Auth] Initial sync: Guest mode');
          setUser(null);
        }
      } catch (err) {
        console.error('[Auth] Sync failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
        isInitialCheckDone.current = true;
      }
    };

    initAuth();

    // 2. Listen for Auth State Changes (Critical for OAuth Redirects)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Auth] State Change Detected:', event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  const signOut = async (): Promise<void> => {
    await authService.signOut();
    setUser(null);
  };

  return { user, isLoading, signOut };
};
