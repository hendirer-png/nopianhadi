import { supabase, Article } from '../supabase';

export const articlesApi = {
  // Fetch all articles
  async getAll(): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    return data || [];
  },

  // Fetch single article by ID
  async getById(id: string): Promise<Article | null> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      throw error;
    }

    return data;
  },

  // Fetch published articles only
  async getPublished(): Promise<Article[]> {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'Published')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching published articles:', error);
      throw error;
    }

    return data || [];
  },

  // Create new article
  async create(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();

    if (error) {
      console.error('Error creating article:', error);
      throw error;
    }

    return data;
  },

  // Update article
  async update(id: string, article: Partial<Article>): Promise<Article> {
    const { data, error } = await supabase
      .from('articles')
      .update(article)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
      throw error;
    }

    return data;
  },

  // Delete article
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }
};
