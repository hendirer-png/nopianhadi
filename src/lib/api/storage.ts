import { supabase } from '../supabase';

export const storageApi = {
  /**
   * Uploads a file to the 'public' bucket in Supabase storage.
   * @param file The File object to upload
   * @param path Optional folder path inside the bucket (e.g., 'projects/' or 'creative-works/')
   * @returns The public URL of the uploaded file
   */
  uploadImage: async (file: File, path: string = ''): Promise<string> => {
    // Generate a unique filename using timestamp and a random string to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}${fileName}`;

    const { data, error } = await supabase.storage
      .from('public')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);

    return publicUrl;
  }
};
