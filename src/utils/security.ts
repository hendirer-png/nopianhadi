/**
 * Security utility functions
 */

/**
 * Sanitize string input to prevent XSS
 */
export const sanitizeString = (input: string, maxLength: number = 1000): string => {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate name (only letters, spaces, hyphens, apostrophes)
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
};

/**
 * Check for spam patterns in text
 */
export const hasSpamPatterns = (text: string): boolean => {
  const spamPatterns = [
    /https?:\/\//i,
    /www\./i,
    /<script/i,
    /onclick/i,
    /onerror/i,
    /javascript:/i,
    /<iframe/i,
    /eval\(/i,
    /document\./i,
    /window\./i
  ];
  
  return spamPatterns.some(pattern => pattern.test(text));
};

/**
 * Rate limiting check using localStorage
 */
export const checkRateLimit = (
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remainingTime?: number } => {
  const now = Date.now();
  const storageKey = `rateLimit_${key}`;
  const data = localStorage.getItem(storageKey);
  
  if (!data) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, firstAttempt: now }));
    return { allowed: true };
  }
  
  try {
    const { count, firstAttempt } = JSON.parse(data);
    const timePassed = now - firstAttempt;
    
    if (timePassed > windowMs) {
      // Window expired, reset
      localStorage.setItem(storageKey, JSON.stringify({ count: 1, firstAttempt: now }));
      return { allowed: true };
    }
    
    if (count >= maxAttempts) {
      const remainingTime = Math.ceil((windowMs - timePassed) / 1000);
      return { allowed: false, remainingTime };
    }
    
    // Increment count
    localStorage.setItem(storageKey, JSON.stringify({ count: count + 1, firstAttempt }));
    return { allowed: true };
  } catch {
    // If parsing fails, reset
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, firstAttempt: now }));
    return { allowed: true };
  }
};

/**
 * Clear rate limit for a specific key
 */
export const clearRateLimit = (key: string): void => {
  localStorage.removeItem(`rateLimit_${key}`);
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  
  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('Password harus mengandung karakter khusus');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate secure random string
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Hash string using Web Crypto API (for client-side hashing)
 */
export const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Escape HTML to prevent XSS
 */
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Check if user is on secure connection
 */
export const isSecureConnection = (): boolean => {
  return window.location.protocol === 'https:' || 
         window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1';
};
