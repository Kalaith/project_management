import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to conditionally join CSS class names
 * Uses clsx for robust class concatenation and deduplication
 */
export function combineClassNames(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
