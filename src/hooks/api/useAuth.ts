import { useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { authService } from '../../features/auth/authService';
import { useUserStore } from '../../store/useUserStore';
import type { User } from '../../types/user';

const mapSessionUserToUser = (authUser: any): User => ({
  id: authUser.id,
  email: authUser.email ?? '',
  full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Member',
  avatar_url: authUser.user_metadata?.avatar_url || `https://picsum.photos/seed/${authUser.id}/200/200`,
  created_at: authUser.created_at || new Date().toISOString(),
});

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs);
    }),
  ]);
};

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
        // 1) Restore quickly from local persisted session.
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          console.log('[Auth] Initial sync: Guest mode');
          setUser(null);
          setLoading(false); // Unblock for guests
          return;
        }

        // Prevent blocking app startup on profiles query/network.
        const fallbackUser = mapSessionUserToUser(session.user);
        setUser(fallbackUser);
        setLoading(false); // Unblock UI immediately after session exists

        // 2) Try to enrich from profiles with timeout.
        try {
          const currentUser = await withTimeout(authService.getCurrentUser(), 8000);
          if (currentUser) {
            setUser(currentUser);
            console.log('[Auth] Initial sync found user:', currentUser.email);
          }
        } catch (profileErr) {
          console.warn('[Auth] Profile sync timed out/failed, using session user:', profileErr);
        }
        console.log('[Auth] Initial sync found session user:', fallbackUser.email);
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
      
      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
          if (session?.user) {
            const fallbackUser = mapSessionUserToUser(session.user);
            setUser(fallbackUser);
            if (event === 'SIGNED_IN') {
              try {
                const currentUser = await withTimeout(authService.getCurrentUser(), 8000);
                if (currentUser) setUser(currentUser);
              } catch {
                // Keep the session user and skip noisy timeout logs on transient network issues.
              }
            }
          } else {
            setUser(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      } finally {
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
