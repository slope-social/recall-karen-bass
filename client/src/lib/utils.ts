/**
 * Utility function to combine class names
 * Filters out falsy values and joins with spaces
 */
export function cn(...inputs: (string | undefined | null | false | 0)[]) {
  return inputs.filter(Boolean).join(" ");
}