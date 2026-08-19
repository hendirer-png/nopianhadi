import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
  throw new Error('Missing Supabase credentials');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch {
  console.error('⚠️ Invalid Supabase URL format');
  throw new Error('Invalid Supabase URL');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce' // More secure auth flow
  }
});

// Database types
export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  hero_image: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  duration: string;
  role: string;
  images: string[];
  video?: string;
  live_demo?: string;
  source_code?: string;
  status: 'Published' | 'Draft';
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_position?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'Published' | 'Draft';
  date: string;
  image: string;
  author: string;
  author_name?: string;
  author_bio?: string;
  author_avatar?: string;
  tags: string[];
  read_time: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  message: string;
  rating: number;
  image: string;
  date: string;
  status: 'Published' | 'Pending';
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreativeWork {
  id: string;
  title: string;
  category: string;
  image: string;
  video_url?: string;
  status: 'Published' | 'Draft';
  created_at?: string;
  updated_at?: string;
}
