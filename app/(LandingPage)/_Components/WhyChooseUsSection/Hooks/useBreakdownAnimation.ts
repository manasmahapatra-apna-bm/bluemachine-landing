'use client';

import { useState, useEffect, useRef } from 'react';
import { BREAKDOWN_LOADER_DURATION_MS } from '../Constants/WhyChooseUsReasonsConstants';

interface UseBreakdownAnimationReturn {
    activeBreakdownIndex: number;
    isBreakdownExpanded: (index: number) => boolean;
    toggleBreakdown: (index: number) => void;
    isLoaderActive: boolean;
    shouldStartAnimation: boolean;
}

/**
 * Hook to manage sequential breakdown expansion animation
 * 
 * Handles automatic sequential expansion of breakdowns when component
 * enters viewport. Supports manual toggling which pauses auto-expansion
 * temporarily. Manages loader animation state and timing.
 */
export function useBreakdownAnimation(
    totalBreakdowns: number,
    isInViewport: boolean
): UseBreakdownAnimationReturn {
    const [activeBreakdownIndex, setActiveBreakdownIndex] = useState<number>(-1);
    const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);
    const [shouldStartAnimation, setShouldStartAnimation] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isPausedRef = useRef<boolean>(false);

    /**
     * Check if a specific breakdown is currently expanded
     */
    const isBreakdownExpanded = (index: number): boolean => {
        return activeBreakdownIndex === index;
    };

    /**
     * Manually toggle breakdown expansion
     * Pauses auto-expansion temporarily when user interacts
     */
    const toggleBreakdown = (index: number): void => {
        /**
         * If clicking on currently active breakdown, collapse it
         */
        if (activeBreakdownIndex === index) {
            setActiveBreakdownIndex(-1);
            setIsLoaderActive(false);
            
            /**
             * Clear any pending timeouts and resume auto-expansion
             */
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            isPausedRef.current = false;
            
            /**
             * Resume animation from next breakdown after a short delay
             */
            setTimeout(() => {
                if (isInViewport && !isPausedRef.current) {
                    const nextIndex = (index + 1) % totalBreakdowns;
                    setActiveBreakdownIndex(nextIndex);
                    setIsLoaderActive(true);
                }
            }, 300);
        } else {
            /**
             * Expand clicked breakdown
             */
            setActiveBreakdownIndex(index);
            setIsLoaderActive(true);
            
            /**
             * Pause auto-expansion temporarily
             */
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            isPausedRef.current = true;
            
            /**
             * Resume auto-expansion after loader completes
             */
            timeoutRef.current = setTimeout(() => {
                isPausedRef.current = false;
                setIsLoaderActive(false);
                
                /**
                 * Move to next breakdown after current loader completes
                 */
                setTimeout(() => {
                    if (isInViewport && !isPausedRef.current) {
                        const nextIndex = (index + 1) % totalBreakdowns;
                        setActiveBreakdownIndex(nextIndex);
                        setIsLoaderActive(true);
                    }
                }, 300);
            }, BREAKDOWN_LOADER_DURATION_MS);
        }
    };

    /**
     * Handle sequential auto-expansion when component enters viewport
     */
    useEffect(() => {
        /**
         * Start animation when component enters viewport
         */
        if (isInViewport && activeBreakdownIndex === -1 && !isPausedRef.current) {
            setShouldStartAnimation(true);
            setActiveBreakdownIndex(0);
            setIsLoaderActive(true);
        }

        /**
         * Stop animation when component leaves viewport
         * Reset all animation state including paused state
         */
        if (!isInViewport) {
            setShouldStartAnimation(false);
            setActiveBreakdownIndex(-1);
            setIsLoaderActive(false);
            isPausedRef.current = false;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, [isInViewport, activeBreakdownIndex]);

    /**
     * Handle sequential breakdown expansion timing
     * Automatically moves to next breakdown after loader completes
     */
    useEffect(() => {
        if (!shouldStartAnimation || isPausedRef.current || activeBreakdownIndex === -1) {
            return;
        }

        /**
         * Set timeout to move to next breakdown after loader duration
         */
        timeoutRef.current = setTimeout(() => {
            if (!isPausedRef.current && isInViewport) {
                setIsLoaderActive(false);
                
                /**
                 * Small delay before expanding next breakdown for smooth transition
                 */
                setTimeout(() => {
                    if (!isPausedRef.current && isInViewport) {
                        const nextIndex = (activeBreakdownIndex + 1) % totalBreakdowns;
                        setActiveBreakdownIndex(nextIndex);
                        setIsLoaderActive(true);
                    }
                }, 300);
            }
        }, BREAKDOWN_LOADER_DURATION_MS);

        /**
         * Cleanup timeout on unmount or when dependencies change
         */
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [activeBreakdownIndex, shouldStartAnimation, isInViewport, totalBreakdowns]);

    return {
        activeBreakdownIndex,
        isBreakdownExpanded,
        toggleBreakdown,
        isLoaderActive,
        shouldStartAnimation,
    };
}

