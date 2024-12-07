/**
 * Creates an array of numbers from start to end (inclusive)
 * @param start - The start number (default: 0)
 * @param end - The end number (inclusive)
 * @returns Array of numbers from start to end
 */
export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}; 