import { supabase, CreativeWork } from '../supabase';

export const creativeWorksApi = {
  // Fetch all creative works (for admin)
  getAll: async (): Promise<CreativeWork[]> => {
    const { data, error } = await supabase
      .from('creative_works')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching creative works:', error);
      throw error;
    }
    
    return data || [];
  },

  // Fetch creative work by id
  getById: async (id: string): Promise<CreativeWork | null> => {
    const { data, error } = await supabase
      .from('creative_works')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching creative work by id:', error);
      return null;
    }
    
    return data;
  },

  // Fetch published creative works only (for public portfolio)
  getPublished: async (): Promise<CreativeWork[]> => {
    const { data, error } = await supabase
      .from('creative_works')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching published creative works:', error);
      throw error;
    }
    
    return data || [];
  },

  // Create new creative work
  create: async (creativeWork: Omit<CreativeWork, 'id' | 'created_at' | 'updated_at'>): Promise<CreativeWork> => {
    const { data, error } = await supabase
      .from('creative_works')
      .insert([creativeWork])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating creative work:', error);
      throw error;
    }
    
    return data;
  },

  // Update existing creative work
  update: async (id: string, updates: Partial<CreativeWork>): Promise<CreativeWork> => {
    const { data, error } = await supabase
      .from('creative_works')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating creative work:', error);
      throw error;
    }
    
    return data;
  },

  // Delete creative work
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('creative_works')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting creative work:', error);
      throw error;
    }
  }
};
