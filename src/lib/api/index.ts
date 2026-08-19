// Central export for all API functions
export { projectsApi } from './projects';
export { articlesApi } from './articles';
export { testimonialsApi } from './testimonials';
export { creativeWorksApi } from './creativeWorks';
export { userProfilesApi } from './user-profiles';
export { storageApi } from './storage';

// Re-export types for convenience
export type { Project, Article, Testimonial, UserProfile } from '../supabase';
