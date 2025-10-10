import { useEffect, useState } from "react";

/**
 * Debounce a primitive value (string/number/boolean). Returns debounced value.
 * @param value - The value to debounce
 * @param delayMs - Delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  
  return debounced;
}

/**
 * Debounce a callback function
 * @param callback - The function to debounce
 * @param delayMs - Delay in milliseconds
 * @returns Debounced callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delayMs: number
): T {
  const [debouncedCallback] = useState(() => {
    let timeoutId: NodeJS.Timeout;
    
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delayMs);
    }) as T;
  });

  return debouncedCallback;
}


