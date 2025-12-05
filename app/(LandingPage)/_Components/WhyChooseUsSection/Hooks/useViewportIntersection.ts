'use client';

import { useState, useEffect, useRef } from 'react';

interface UseViewportIntersectionReturn {
    isInViewport: boolean;
    elementRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to detect when a component enters the viewport
 * 
 * Uses Intersection Observer API to efficiently track when the element
 * becomes visible in the viewport. Useful for triggering animations
 * when components scroll into view.
 */
export function useViewportIntersection(
    threshold: number = 0.3,
    rootMargin: string = '-10% 0px -10% 0px'
): UseViewportIntersectionReturn {
    const [isInViewport, setIsInViewport] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentElement = elementRef.current;
        if (!currentElement) {
            return;
        }

        /**
         * Intersection Observer callback
         * Updates state when element enters or leaves viewport
         */
        const observerCallback = (entries: IntersectionObserverEntry[]): void => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsInViewport(true);
                } else {
                    /**
                     * Only set to false if element has scrolled past viewport
                     * This prevents flickering when element is partially visible
                     */
                    if (entry.boundingClientRect.top > window.innerHeight) {
                        setIsInViewport(false);
                    }
                }
            });
        };

        /**
         * Create Intersection Observer with specified options
         */
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin,
            threshold,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(currentElement);

        /**
         * Cleanup: disconnect observer when component unmounts
         */
        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin]);

    return {
        isInViewport,
        elementRef,
    };
}

