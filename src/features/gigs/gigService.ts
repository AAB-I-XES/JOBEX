import { supabase } from '../../lib/supabaseClient';
import type { Gig, GigCategory } from '../../types/gig';

export const gigService = {
  async getGigs(category?: GigCategory): Promise<Gig[]> {
    let query = supabase.from('gigs').select('*, profiles(full_name, avatar_url, title)');
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    
    // Using explicit cast but ensuring it matches the interface
    return (data as unknown) as Gig[];
  },

  async getGigById(id: string): Promise<Gig> {
    const { data, error } = await supabase
      .from('gigs')
      .select('*, profiles(*)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return (data as unknown) as Gig;
  },

  async createGig(gig: Partial<Gig>): Promise<Gig> {
    const { data, error } = await supabase
      .from('gigs')
      .insert(gig)
      .select()
      .single();
      
    if (error) throw error;
    return data as Gig;
  },

  async uploadMedia(file: File, path: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gigs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('gigs')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
