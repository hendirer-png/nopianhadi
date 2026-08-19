import { supabase, Testimonial } from '../supabase';

export const testimonialsApi = {
  // Fetch all testimonials
  async getAll(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }

    return data || [];
  },

  // Fetch single testimonial by ID
  async getById(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching testimonial:', error);
      throw error;
    }

    return data;
  },

  // Fetch published testimonials only
  async getPublished(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'Published')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching published testimonials:', error);
      throw error;
    }

    return data || [];
  },

  // Create new testimonial
  async create(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial> {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single();

    if (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }

    return data;
  },

  // Update testimonial
  async update(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }

    return data;
  },

  // Delete testimonial
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  }
};
