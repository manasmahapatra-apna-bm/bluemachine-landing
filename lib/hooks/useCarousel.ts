'use client';

import { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '@/lib/hooks/useScreenSize';

interface UseCarouselReturn {
    isCarouselMode: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook to detect when carousel mode is needed and manage auto-scrolling
 * 
 * Automatically detects if icons overflow the viewport width and enables
 * smooth horizontal auto-scrolling when needed.
 * Uses JavaScript animation with seamless reset for truly infinite scrolling.
 */
export function useCarousel(totalItems: number, itemWidth: number = 150, gap: number = 40): UseCarouselReturn {
    const { width: viewportWidth } = useScreenSize();
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const scrollPositionRef = useRef<number>(0);
    const [isCarouselMode, setIsCarouselMode] = useState<boolean>(false);

    /**
     * Calculate total width needed for all items (single set)
     * Includes item width and gaps between items
     */
    const calculateTotalWidth = (): number => {
        const totalItemsWidth = totalItems * itemWidth;
        const totalGapsWidth = (totalItems - 1) * gap;
        return totalItemsWidth + totalGapsWidth;
    };

    /**
     * Determine if carousel mode is needed based on viewport width
     * Only calculate after client-side hydration to prevent SSR mismatch
     */
    useEffect(() => {
        const shouldBeCarouselMode = viewportWidth > 0 && calculateTotalWidth() > viewportWidth;
        setIsCarouselMode(shouldBeCarouselMode);
    }, [viewportWidth, totalItems, itemWidth, gap]);

    /**
     * Simple auto-scroll animation function
     * Continuously scrolls the container horizontally
     */
    const autoScroll = (): void => {
        if (!containerRef.current || !isCarouselMode) {
            return;
        }

        const container = containerRef.current;
        const scrollSpeed = 0.5; // pixels per frame

        // Increment position continuously
        scrollPositionRef.current += scrollSpeed;

        // Apply transform
        container.style.transform = `translateX(-${scrollPositionRef.current}px)`;

        animationFrameRef.current = requestAnimationFrame(autoScroll);
    };

    /**
     * Start auto-scrolling when carousel mode is enabled
     */
    useEffect(() => {
        if (isCarouselMode) {
            scrollPositionRef.current = 0;
            animationFrameRef.current = requestAnimationFrame(autoScroll);
        } else {
            /**
             * Reset transform when not in carousel mode
             */
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateX(0)';
            }
        }

        /**
         * Cleanup: cancel animation frame when component unmounts or mode changes
         */
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isCarouselMode, viewportWidth]);

    return {
        isCarouselMode,
        containerRef,
    };
}

