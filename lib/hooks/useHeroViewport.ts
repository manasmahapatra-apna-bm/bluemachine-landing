'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track hero section viewport visibility
 * 
 * Uses Intersection Observer to detect when hero section enters/exits viewport
 * Used to adjust image loading priorities based on scroll position
 * 
 * @param threshold - Intersection threshold (0-1), default 0.1 means 10% visible
 * @returns Object with hero visibility state
 */
export function useHeroViewport(threshold: number = 0.1): {
    isHeroVisible: boolean;
    hasScrolledPastHero: boolean;
} {
    const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
    const [hasScrolledPastHero, setHasScrolledPastHero] = useState<boolean>(false);

    useEffect(() => {
        /**
         * Skip if not in browser environment
         */
        if (typeof window === 'undefined') {
            return;
        }

        /**
         * Find hero section element
         */
        const heroElement = document.getElementById('hero');
        if (!heroElement) {
            return;
        }

        /**
         * Intersection Observer options
         * rootMargin: '-20% 0px' means trigger when hero is less than 20% visible
         * This detects when user has scrolled past the hero section
         */
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '-20% 0px',
            threshold: threshold,
        };

        /**
         * Handle intersection changes
         */
        const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
            entries.forEach((entry) => {
                /**
                 * Hero is visible if it intersects with viewport
                 */
                setIsHeroVisible(entry.isIntersecting);
                
                /**
                 * User has scrolled past hero if it's not intersecting
                 * and was previously visible (to avoid false positives on initial load)
                 */
                if (!entry.isIntersecting) {
                    setHasScrolledPastHero(true);
                } else {
                    /**
                     * If hero becomes visible again (user scrolled back up),
                     * reset the flag
                     */
                    setHasScrolledPastHero(false);
                }
            });
        };

        /**
         * Create and start observing
         */
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        observer.observe(heroElement);

        /**
         * Cleanup on unmount
         */
        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    return {
        isHeroVisible,
        hasScrolledPastHero,
    };
}

