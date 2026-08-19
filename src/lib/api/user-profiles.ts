import { supabase } from '../supabase';
import type { UserProfile } from '../supabase';

export const userProfilesApi = {
  // Get current user's profile
  async getCurrent(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      // If profile doesn't exist yet, return null
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching user profile:', error);
      throw error;
    }

    return data;
  },

  // Create user profile (automatically called after registration)
  async create(profile: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(profile)
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }

    return data;
  },

  // Update current user's profile
  async update(updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data;
  },

  // Get or create profile (useful for ensuring profile exists)
  async getOrCreate(): Promise<UserProfile> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Try to get existing profile
    const existing = await this.getCurrent();
    
    if (existing) {
      return existing;
    }

    // If doesn't exist, create default profile
    const defaultProfile: Omit<UserProfile, 'created_at' | 'updated_at'> = {
      id: user.id,
      name: user.email?.split('@')[0] || 'User',
      email: user.email || '',
      phone: '',
      location: '',
      bio: '',
      avatar: `https://i.pravatar.cc/150?u=${user.id}`,
      website: '',
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    };

    return await this.create(defaultProfile);
  }
};
