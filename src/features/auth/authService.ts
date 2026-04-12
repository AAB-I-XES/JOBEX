import { supabase } from '../../lib/supabaseClient';
import type { User } from '../../types/user';

export const authService = {
  async signInWithMagicLink(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  },

  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signUpWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    console.log('[AuthService] User found in Auth:', user.email);

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('[AuthService] Profile fetch error:', error);
      // If profile doesn't exist, create it manually as a fallback to the DB trigger
      if (error.code === 'PGRST116') {
        const newProfile = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url || `https://picsum.photos/seed/${user.id}/200/200`,
        };
        console.log('[AuthService] Creating missing profile:', newProfile.full_name);
        const { data: insertedData, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (insertError) {
          console.error('[AuthService] Profile creation failed:', insertError);
          // Return a basic user object even if insert fails, to prevent login lock
          return newProfile as User;
        }
        return insertedData as User;
      }
      return null;
    }

    return data as User;
  },
};
