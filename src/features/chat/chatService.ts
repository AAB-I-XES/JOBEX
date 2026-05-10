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
    
    // Update the conversation's last message
    if (message.conversation_id) {
      await supabase
        .from('conversations')
        .update({ 
          last_message: message.content,
          updated_at: new Date().toISOString()
        })
        .eq('id', message.conversation_id);
    }
    
    return data as Message;
  },

  async getOrCreateConversation(user1Id: string, user2Id: string): Promise<Conversation> {
    // Check if conversation exists
    const { data: existing, error: findError } = await supabase
      .from('conversations')
      .select('*')
      .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
      .single();

    if (existing) return existing as Conversation;

    // Create new if not found
    const { data: created, error: createError } = await supabase
      .from('conversations')
      .insert({
        user1_id: user1Id,
        user2_id: user2Id,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) throw createError;
    return created as Conversation;
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
