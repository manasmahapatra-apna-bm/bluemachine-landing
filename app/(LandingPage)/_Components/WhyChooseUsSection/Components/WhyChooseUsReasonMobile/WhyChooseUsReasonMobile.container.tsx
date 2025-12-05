'use client';

import { useEffect } from 'react';
import { WhyChooseUsReasonMobileView } from './WhyChooseUsReasonMobile.view';
import { useViewportIntersection } from '../../Hooks/useViewportIntersection';
import { useBreakdownAnimation } from '../../Hooks/useBreakdownAnimation';
import type { WhyChooseUsReasonData } from '../../Constants/WhyChooseUsReasonsConstants';
import type { ResourcePriority } from '@/lib/types/ResourcePriority';

interface WhyChooseUsReasonMobileContainerProps {
    reasonData: WhyChooseUsReasonData;
    reasonIndex: number;
    getImagePriority: (breakdownIndex: number) => ResourcePriority;
    shouldPrioritizeImage: (breakdownIndex: number) => boolean;
    updateBreakdownIndex: (reasonIndex: number, breakdownIndex: number) => void;
    updateViewportState: (reasonIndex: number, isInViewport: boolean) => void;
}

/**
 * Container component for mobile reason component
 * 
 * Manages viewport intersection detection, breakdown animation state,
 * and image loading priorities. Coordinates with parent section component
 * for image loading optimization.
 */
export function WhyChooseUsReasonMobileContainer({
    reasonData,
    reasonIndex,
    getImagePriority: _getImagePriority,
    shouldPrioritizeImage,
    updateBreakdownIndex,
    updateViewportState,
}: WhyChooseUsReasonMobileContainerProps): React.ReactElement {
    const { isInViewport, elementRef } = useViewportIntersection(0.3, '-10% 0px -10% 0px');
    
    const {
        activeBreakdownIndex,
        isBreakdownExpanded,
        toggleBreakdown,
        isLoaderActive,
    } = useBreakdownAnimation(reasonData.reasonBreakdowns.length, isInViewport);

    /**
     * Update parent component with current breakdown index
     * Used for coordinating image loading priorities across all reason components
     */
    useEffect(() => {
        updateBreakdownIndex(reasonIndex, activeBreakdownIndex);
    }, [reasonIndex, activeBreakdownIndex, updateBreakdownIndex]);

    /**
     * Update parent component with viewport state
     * Used for determining which reason components are visible
     */
    useEffect(() => {
        updateViewportState(reasonIndex, isInViewport);
    }, [reasonIndex, isInViewport, updateViewportState]);

    /**
     * Get current image path based on active breakdown
     * Returns first breakdown image when not in viewport, otherwise returns active breakdown image
     */
    const getCurrentImagePath = (): string | null => {
        /**
         * When not in viewport (activeBreakdownIndex === -1), show first breakdown image
         */
        if (activeBreakdownIndex === -1) {
            return reasonData.reasonBreakdowns[0]?.reasonDescriptionImage || null;
        }
        return reasonData.reasonBreakdowns[activeBreakdownIndex]?.reasonDescriptionImage || null;
    };

    /**
     * Get priority flag for current image
     * Used for optimizing image loading based on viewport visibility
     */
    const currentImageBreakdownIndex = activeBreakdownIndex === -1 ? 0 : activeBreakdownIndex;
    const shouldPrioritize = shouldPrioritizeImage(currentImageBreakdownIndex);

    return (
        <WhyChooseUsReasonMobileView
            reasonData={reasonData}
            elementRef={elementRef}
            activeBreakdownIndex={activeBreakdownIndex}
            isBreakdownExpanded={isBreakdownExpanded}
            toggleBreakdown={toggleBreakdown}
            isLoaderActive={isLoaderActive}
            currentImagePath={getCurrentImagePath()}
            shouldPrioritizeImage={shouldPrioritize}
            reasonIndex={reasonIndex}
        />
    );
}

