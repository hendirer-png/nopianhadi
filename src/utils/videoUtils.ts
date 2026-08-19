/**
 * Video utility functions for handling YouTube, Vimeo, and other video URLs
 */

/** Deteksi apakah URL adalah YouTube Shorts (portrait/vertical) */
export const isPortraitVideo = (url: string): boolean => {
  if (!url) return false;
  return url.includes('youtube.com/shorts/');
};

/** Kembalikan rasio aspek CSS sesuai orientasi video */
export const getVideoAspect = (url: string): string => {
  return isPortraitVideo(url) ? 'aspect-[9/16]' : 'aspect-video';
};

export const getVideoEmbedUrl = (url: string): string | null => {
  if (!url || url.trim() === '') return null;

  const trimmed = url.trim();

  // Check if it's just the base YouTube URL without video ID
  if (trimmed === 'https://www.youtube.com/' || trimmed === 'https://youtube.com/' || trimmed === 'http://www.youtube.com/') {
    return null;
  }

  // Already an embed URL with video ID
  if (trimmed.includes('youtube.com/embed/')) {
    const videoId = trimmed.split('youtube.com/embed/')[1]?.split('?')[0];
    return videoId ? trimmed : null;
  }

  // Extract video ID from various YouTube URL formats
  let videoId = '';

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (trimmed.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(trimmed.split('?')[1]);
    videoId = urlParams.get('v') || '';
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (trimmed.includes('youtu.be/')) {
    videoId = trimmed.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0] || '';
  }
  // Format: https://www.youtube.com/shorts/VIDEO_ID
  else if (trimmed.includes('youtube.com/shorts/')) {
    videoId = trimmed.split('youtube.com/shorts/')[1]?.split('?')[0] || '';
  }
  // Format: https://www.youtube.com/live/VIDEO_ID
  else if (trimmed.includes('youtube.com/live/')) {
    videoId = trimmed.split('youtube.com/live/')[1]?.split('?')[0] || '';
  }
  // Format: https://www.youtube.com/v/VIDEO_ID
  else if (trimmed.includes('youtube.com/v/')) {
    videoId = trimmed.split('youtube.com/v/')[1]?.split('?')[0] || '';
  }
  // Vimeo support
  else if (trimmed.includes('vimeo.com/')) {
    const vimeoId = trimmed.split('vimeo.com/')[1]?.split('?')[0];
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
      // Shorts → maxresdefault (portrait 1080×1920, selalu ada untuk Shorts)
      // Landscape → hqdefault (480×360, selalu tersedia)
      if (isPortraitVideo(url)) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }

  // Vimeo thumbnail (would need API call in real implementation)
  if (embedUrl.includes('vimeo')) {
    return null;
  }

  return null;
};