import { supabase } from '../../lib/supabaseClient';
import type { User } from '../../types/user';

export const authService = {
  async signUp(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
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

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      // If profile doesn't exist, create it
      if (error.code === 'PGRST116') {
        const newProfile = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
          created_at: new Date().toISOString(),
        };
        await supabase.from('profiles').insert(newProfile);
        return newProfile as User;
      }
      throw error;
    }

    return data as User;
  },
};
