import { useEffect } from 'react';
import { authService } from '../../features/auth/authService';
import { useUserStore } from '../../store/useUserStore';

export const useAuth = () => {
  const { user, setUser, setLoading, isLoading } = useUserStore();

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      console.log('[Auth] Initializing session check...');
      setLoading(true);
      
      try {
        // Fallback timeout to prevent permanent lock if service is unresponsive
        const timeout = setTimeout(() => {
          if (mounted && isLoading) {
            console.warn('[Auth] Initialization taking too long, forcing ready state.');
            setLoading(false);
          }
        }, 5000);

        const currentUser = await authService.getCurrentUser();
        clearTimeout(timeout);
        
        if (mounted) {
          console.log('[Auth] Check complete. User:', currentUser ? currentUser.email : 'Guest');
          setUser(currentUser);
        }
      } catch (err) {
        console.error('[Auth] Check failed:', err);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();
    return () => { mounted = false; };
  }, [setUser, setLoading]);

  const signOut = async (): Promise<void> => {
    await authService.signOut();
    setUser(null);
  };

  return { user, isLoading, signOut };
};
