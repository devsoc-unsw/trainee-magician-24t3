/**
 * Creates an array of numbers similar to Python's range function
 * @param start - If only one argument, acts as end. If two or three arguments, acts as start
 * @param end - Optional end number (exclusive)
 * @param step - Optional step value (default: 1)
 * @returns Array of numbers from start to end (exclusive)
 * 
 * Examples:
 * range(5) => [0, 1, 2, 3, 4]
 * range(2, 5) => [2, 3, 4]
 * range(0, 10, 2) => [0, 2, 4, 6, 8]
 */
export const range = (start: number, end?: number, step: number = 1): number[] => {
  // Handle single argument case (end only)
  if (end === undefined) {
    end = start;
    start = 0;
  }
  
  // Calculate length based on start, end, and step
  const length = Math.ceil((end - start) / step);
  
  return Array.from({ length }, (_, i) => start + (i * step));
}; 