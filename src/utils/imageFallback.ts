// Utility untuk handle image fallback tanpa external dependency

// SVG placeholder sebagai data URI - tidak perlu koneksi internet
export const createPlaceholderImage = (width: number, height: number, text: string): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        font-family="Arial, sans-serif" 
        font-size="18" 
        fill="#9ca3af"
      >${text}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Preset placeholders
export const PLACEHOLDER_IMAGES = {
  article: createPlaceholderImage(800, 500, 'Gambar Artikel'),
  project: createPlaceholderImage(800, 600, 'Gambar Project'),
  testimonial: createPlaceholderImage(400, 400, 'Foto Testimonial'),
  notFound: (type: 'article' | 'project' | 'testimonial') => {
    const dimensions = {
      article: { w: 800, h: 500 },
      project: { w: 800, h: 600 },
      testimonial: { w: 400, h: 400 }
    };
    const { w, h } = dimensions[type];
    return createPlaceholderImage(w, h, 'Gambar Tidak Ditemukan');
  }
};

// Handler untuk onError event
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  type: 'article' | 'project' | 'testimonial'
) => {
  e.currentTarget.src = PLACEHOLDER_IMAGES.notFound(type);
  e.currentTarget.onerror = null; // Prevent infinite loop
};
