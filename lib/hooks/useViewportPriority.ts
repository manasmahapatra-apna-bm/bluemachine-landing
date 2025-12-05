'use client';

import { useEffect, useRef } from 'react';
import { useHeroViewport } from './useHeroViewport';
import type { ResourcePriority } from '../types/ResourcePriority';
import { ResourcePriority as Priority } from '../types/ResourcePriority';

/**
 * Hook to manage viewport-based priority adjustments
 * 
 * Adjusts image loading priorities based on scroll position:
 * - When hero is visible: Prioritize agent thumbnails
 * - When hero exits viewport: Cancel agent loading, prioritize reason images
 * 
 * @param onPriorityChange - Callback when priorities should change
 */
export function useViewportPriority(
    onPriorityChange: (isHeroVisible: boolean) => void
): void {
    const { isHeroVisible } = useHeroViewport();
    const previousHeroVisibleRef = useRef<boolean>(true);

    useEffect(() => {
        /**
         * Only trigger callback when hero visibility changes
         */
        if (previousHeroVisibleRef.current !== isHeroVisible) {
            previousHeroVisibleRef.current = isHeroVisible;
            onPriorityChange(isHeroVisible);
        }
    }, [isHeroVisible, onPriorityChange]);
}

/**
 * Get adjusted priority based on viewport state
 * 
 * @param basePriority - Base priority level
 * @param isHeroVisible - Whether hero section is visible
 * @param isAgentThumbnail - Whether this is an agent thumbnail
 * @returns Adjusted priority
 */
export function getAdjustedPriority(
    basePriority: ResourcePriority,
    isHeroVisible: boolean,
    isAgentThumbnail: boolean
): ResourcePriority {
    /**
     * If hero is not visible and this is an agent thumbnail,
     * downgrade to LAZY (will be cancelled anyway)
     */
    if (!isHeroVisible && isAgentThumbnail) {
        return Priority.LAZY;
    }

    /**
     * Otherwise return base priority
     */
    return basePriority;
}

