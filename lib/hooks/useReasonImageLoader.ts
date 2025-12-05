'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useImageLoader } from './useImageLoader';
import type { ResourcePriority } from '../types/ResourcePriority';
import { ResourcePriority as Priority } from '../types/ResourcePriority';
import { BREAKDOWN_LOADER_DURATION_MS } from '../../app/(LandingPage)/_Components/WhyChooseUsSection/Constants/WhyChooseUsReasonsConstants';

/**
 * Configuration for reason image loading
 */
interface ReasonImageLoaderConfig {
    /**
     * Total number of reasons
     */
    totalReasons: number;
    
    /**
     * Number of breakdowns per reason (assumed same for all)
     */
    breakdownsPerReason: number;
    
    /**
     * Function to get image URL for a specific reason and breakdown index
     */
    getImageUrl: (reasonIndex: number, breakdownIndex: number) => string | null;
    
    /**
     * Whether component is in viewport
     */
    isInViewport: boolean;
    
    /**
     * Current active breakdown index for each reason
     */
    activeBreakdownIndices: number[];
}

/**
 * Hook to manage sequential loading of reason breakdown images
 * 
 * Implements sequential loading pattern:
 * - First image of all reasons → HIGH priority
 * - Second image of all reasons → MEDIUM priority (after first batch)
 * - Third image of all reasons → LOW priority (after second batch)
 * - Preloads next image 2 seconds before animation completes
 * 
 * @param config - Configuration for reason image loading
 */
export function useReasonImageLoader(config: ReasonImageLoaderConfig): {
    /**
     * Get priority for a specific reason breakdown image
     */
    getImagePriority: (reasonIndex: number, breakdownIndex: number) => ResourcePriority;
    
    /**
     * Check if image should be loaded with priority (for Next.js Image component)
     */
    shouldPrioritizeImage: (reasonIndex: number, breakdownIndex: number) => boolean;
} {
    const { loadImage, isImageLoaded } = useImageLoader();
    const {
        totalReasons,
        breakdownsPerReason,
        getImageUrl,
        isInViewport,
        activeBreakdownIndices,
    } = config;

    const loadedBatchesRef = useRef<Set<number>>(new Set());
    const preloadTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

    /**
     * Load a batch of images (all images at a specific breakdown index across all reasons)
     */
    const loadBatch = useCallback((breakdownIndex: number, priority: ResourcePriority): void => {
        if (!isInViewport || loadedBatchesRef.current.has(breakdownIndex)) {
            return;
        }

        /**
         * Load first image of each reason for this breakdown index
         */
        for (let reasonIndex = 0; reasonIndex < totalReasons; reasonIndex++) {
            const imageUrl = getImageUrl(reasonIndex, breakdownIndex);
            if (!imageUrl) {
                continue;
            }

            const imageId = `reason-${reasonIndex}-breakdown-${breakdownIndex}`;
            
            /**
             * Skip if already loaded
             */
            if (isImageLoaded(imageId)) {
                continue;
            }

            /**
             * Load image with specified priority
             */
            loadImage(imageId, imageUrl, priority);
        }

        /**
         * Mark batch as loaded
         */
        loadedBatchesRef.current.add(breakdownIndex);
    }, [totalReasons, getImageUrl, isInViewport, loadImage, isImageLoaded]);

    /**
     * Load first batch immediately when component enters viewport
     */
    useEffect(() => {
        if (isInViewport && !loadedBatchesRef.current.has(0)) {
            loadBatch(0, Priority.HIGH);
        }
    }, [isInViewport, loadBatch]);

    /**
     * Load subsequent batches based on active breakdown indices
     */
    useEffect(() => {
        if (!isInViewport) {
            return;
        }

        /**
         * Find maximum active breakdown index across all reasons
         */
        const maxActiveIndex = Math.max(...activeBreakdownIndices, -1);
        
        /**
         * Load second batch if any reason is showing second breakdown
         */
        if (maxActiveIndex >= 1 && !loadedBatchesRef.current.has(1)) {
            loadBatch(1, Priority.MEDIUM);
        }

        /**
         * Load third batch if any reason is showing third breakdown
         */
        if (maxActiveIndex >= 2 && !loadedBatchesRef.current.has(2)) {
            loadBatch(2, Priority.LOW);
        }
    }, [activeBreakdownIndices, isInViewport, loadBatch]);

    /**
     * Preload next image before animation completes
     * Preloads 2 seconds before BREAKDOWN_LOADER_DURATION_MS completes
     */
    useEffect(() => {
        if (!isInViewport) {
            return;
        }

        /**
         * Clear existing preload timeouts
         */
        preloadTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
        preloadTimeoutsRef.current.clear();

        /**
         * For each reason, preload next breakdown image
         */
        activeBreakdownIndices.forEach((activeIndex, reasonIndex) => {
            if (activeIndex < 0) {
                return;
            }

            const nextBreakdownIndex = (activeIndex + 1) % breakdownsPerReason;
            const imageUrl = getImageUrl(reasonIndex, nextBreakdownIndex);
            
            if (!imageUrl) {
                return;
            }

            const imageId = `reason-${reasonIndex}-breakdown-${nextBreakdownIndex}`;
            
            /**
             * Skip if already loaded or loading
             */
            if (isImageLoaded(imageId)) {
                return;
            }

            /**
             * Calculate preload delay (2 seconds before animation completes)
             */
            const preloadDelay = Math.max(0, BREAKDOWN_LOADER_DURATION_MS - 2000);

            /**
             * Set timeout to preload image
             */
            const timeout = setTimeout(() => {
                /**
                 * Determine priority based on breakdown index
                 */
                const priority = nextBreakdownIndex === 0 
                    ? Priority.HIGH 
                    : nextBreakdownIndex === 1 
                    ? Priority.MEDIUM 
                    : Priority.LOW;

                loadImage(imageId, imageUrl, priority);
                preloadTimeoutsRef.current.delete(imageId);
            }, preloadDelay);

            preloadTimeoutsRef.current.set(imageId, timeout);
        });

        /**
         * Cleanup timeouts on unmount or when dependencies change
         */
        return () => {
            preloadTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
            preloadTimeoutsRef.current.clear();
        };
    }, [activeBreakdownIndices, breakdownsPerReason, getImageUrl, isInViewport, loadImage, isImageLoaded]);

    /**
     * Get priority for a specific image
     */
    const getImagePriority = useCallback((
        _reasonIndex: number,
        breakdownIndex: number
    ): ResourcePriority => {
        /**
         * First image of all reasons: HIGH priority
         */
        if (breakdownIndex === 0) {
            return Priority.HIGH;
        }

        /**
         * Second image: MEDIUM priority
         */
        if (breakdownIndex === 1) {
            return Priority.MEDIUM;
        }

        /**
         * Third and beyond: LOW priority
         */
        return Priority.LOW;
    }, []);

    /**
     * Check if image should use Next.js priority prop
     * Only first image of each reason gets priority
     */
    const shouldPrioritizeImage = useCallback((
        _reasonIndex: number,
        breakdownIndex: number
    ): boolean => {
        return breakdownIndex === 0;
    }, []);

    return {
        getImagePriority,
        shouldPrioritizeImage,
    };
}

