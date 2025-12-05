'use client';

import { useEffect, useRef } from 'react';
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
 */
export function useCarousel(totalItems: number, itemWidth: number = 150, gap: number = 40): UseCarouselReturn {
    const { width: viewportWidth } = useScreenSize();
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const scrollPositionRef = useRef<number>(0);

    /**
     * Calculate total width needed for all items
     * Includes item width and gaps between items
     * No container padding when in carousel mode (edge-to-edge)
     */
    const calculateTotalWidth = (): number => {
        const totalItemsWidth = totalItems * itemWidth;
        const totalGapsWidth = (totalItems - 1) * gap;
        return totalItemsWidth + totalGapsWidth;
    };

    /**
     * Determine if carousel mode is needed based on viewport width
     */
    const isCarouselMode = viewportWidth > 0 && calculateTotalWidth() > viewportWidth;

    /**
     * Auto-scroll animation function
     * Smoothly scrolls the container horizontally in a continuous loop
     */
    const autoScroll = (): void => {
        if (!containerRef.current || !isCarouselMode) {
            return;
        }

        const container = containerRef.current;
        const singleSetWidth = calculateTotalWidth();
        const scrollSpeed = 0.5; // pixels per frame

        scrollPositionRef.current += scrollSpeed;

        /**
         * Reset scroll position when it exceeds one set of icons
         * Since we duplicate icons, this creates a seamless infinite scroll effect
         */
        if (scrollPositionRef.current >= singleSetWidth) {
            scrollPositionRef.current = 0;
        }

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

