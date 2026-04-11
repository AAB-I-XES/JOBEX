import { supabase } from '../../lib/supabaseClient';
import type { Message, Conversation } from '../../types/chat';

export const chatService = {
  async getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*, profiles!user2_id(*)') 
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);
    
    if (error) throw error;
    return (data as unknown) as Conversation[];
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as Message[];
  },

  async sendMessage(message: Partial<Message>): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();
    if (error) throw error;
    return data as Message;
  },

  subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`room-${conversationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, payload => {
        callback(payload.new as Message);
      })
      .subscribe();
  }
};
