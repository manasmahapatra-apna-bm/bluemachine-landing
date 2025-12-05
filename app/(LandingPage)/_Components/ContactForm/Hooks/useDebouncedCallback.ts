import { useRef, useCallback } from 'react';

/**
 * Custom hook for debouncing callback functions
 * 
 * Prevents rapid successive calls to a function by delaying execution
 * until a specified time has passed since the last call.
 * 
 * Useful for:
 * - Preventing multiple form submissions
 * - Debouncing button clicks
 * - Optimizing performance for frequently called functions
 * 
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds before executing callback
 * @returns Debounced version of the callback function
 * 
 * @example
 * ```tsx
 * const debouncedSubmit = useDebouncedCallback(handleSubmit, 300);
 * <button onClick={debouncedSubmit}>Submit</button>
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): T {
    /**
     * Store timeout reference to allow cleanup
     */
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Create debounced callback using useCallback for memoization
     */
    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            /**
             * Clear any existing timeout
             */
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            /**
             * Set new timeout to execute callback after delay
             */
            timeoutRef.current = setTimeout(() => {
                callback(...args);
                timeoutRef.current = null;
            }, delay);
        },
        [callback, delay]
    ) as T;

    return debouncedCallback;
}

