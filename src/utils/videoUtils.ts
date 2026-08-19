/**
 * Video utility functions for handling YouTube, Vimeo, and other video URLs
 */

export const getVideoEmbedUrl = (url: string): string | null => {
  if (!url || url.trim() === '') return null;

  // Check if it's just the base YouTube URL without video ID
  if (url === 'https://www.youtube.com/' || url === 'https://youtube.com/' || url === 'http://www.youtube.com/') {
    return null;
  }

  // Already an embed URL with video ID
  if (url.includes('youtube.com/embed/')) {
    const videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
    return videoId ? url : null;
  }

  // Extract video ID from various YouTube URL formats
  let videoId = '';

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch?v=')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  // Format: https://www.youtube.com/v/VIDEO_ID
  else if (url.includes('youtube.com/v/')) {
    videoId = url.split('youtube.com/v/')[1]?.split('?')[0] || '';
  }
  // Vimeo support
  else if (url.includes('vimeo.com/')) {
    const vimeoId = url.split('vimeo.com/')[1]?.split('?')[0];
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
  }

  // Return embed URL if video ID found and valid (using youtube-nocookie for privacy)
  if (videoId && videoId.length > 5) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  }

  // Return null if no valid video ID found
  return null;
};

export const isValidVideoUrl = (url: string): boolean => {
  return getVideoEmbedUrl(url) !== null;
};

export const getVideoThumbnail = (url: string): string | null => {
  const embedUrl = getVideoEmbedUrl(url);
  if (!embedUrl) return null;

  // YouTube thumbnail
  if (embedUrl.includes('youtube')) {
    const videoId = embedUrl.split('/embed/')[1]?.split('?')[0];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }

  // Vimeo thumbnail (would need API call in real implementation)
  if (embedUrl.includes('vimeo')) {
    return null; // Vimeo thumbnails require API calls
  }

  return null;
};