'use client';

import { useEffect } from 'react';
import { WhyChooseUsReasonView } from './WhyChooseUsReason.view';
import { useViewportIntersection } from '../../Hooks/useViewportIntersection';
import { useBreakdownAnimation } from '../../Hooks/useBreakdownAnimation';
import type { WhyChooseUsReasonData } from '../../Constants/WhyChooseUsReasonsConstants';
import type { ResourcePriority } from '@/lib/types/ResourcePriority';

interface WhyChooseUsReasonContainerProps {
    reasonData: WhyChooseUsReasonData;
    reasonIndex: number;
    getImagePriority: (breakdownIndex: number) => ResourcePriority;
    shouldPrioritizeImage: (breakdownIndex: number) => boolean;
    updateBreakdownIndex: (reasonIndex: number, breakdownIndex: number) => void;
    updateViewportState: (reasonIndex: number, isInViewport: boolean) => void;
}

export function WhyChooseUsReasonContainer({
    reasonData,
    reasonIndex,
    getImagePriority: _getImagePriority,
    shouldPrioritizeImage,
    updateBreakdownIndex,
    updateViewportState,
}: WhyChooseUsReasonContainerProps): React.ReactElement {
    const { isInViewport, elementRef } = useViewportIntersection(0.3, '-10% 0px -10% 0px');
    
    const {
        activeBreakdownIndex,
        isBreakdownExpanded,
        toggleBreakdown,
        isLoaderActive,
    } = useBreakdownAnimation(reasonData.reasonBreakdowns.length, isInViewport);

    /**
     * Update parent component with current breakdown index
     */
    useEffect(() => {
        updateBreakdownIndex(reasonIndex, activeBreakdownIndex);
    }, [reasonIndex, activeBreakdownIndex, updateBreakdownIndex]);

    /**
     * Update parent component with viewport state
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
     */
    const currentImageBreakdownIndex = activeBreakdownIndex === -1 ? 0 : activeBreakdownIndex;
    const shouldPrioritize = shouldPrioritizeImage(currentImageBreakdownIndex);

    return (
        <WhyChooseUsReasonView
            reasonData={reasonData}
            elementRef={elementRef}
            activeBreakdownIndex={activeBreakdownIndex}
            isBreakdownExpanded={isBreakdownExpanded}
            toggleBreakdown={toggleBreakdown}
            isLoaderActive={isLoaderActive}
            currentImagePath={getCurrentImagePath()}
            shouldPrioritizeImage={shouldPrioritize}
        />
    );
}

