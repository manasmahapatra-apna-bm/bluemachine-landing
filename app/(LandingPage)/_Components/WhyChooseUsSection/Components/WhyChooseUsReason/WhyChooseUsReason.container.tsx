'use client';

import { WhyChooseUsReasonView } from './WhyChooseUsReason.view';
import { useViewportIntersection } from '../../Hooks/useViewportIntersection';
import { useBreakdownAnimation } from '../../Hooks/useBreakdownAnimation';
import type { WhyChooseUsReasonData } from '../../Constants/WhyChooseUsReasonsConstants';

interface WhyChooseUsReasonContainerProps {
    reasonData: WhyChooseUsReasonData;
}

export function WhyChooseUsReasonContainer({
    reasonData,
}: WhyChooseUsReasonContainerProps): React.ReactElement {
    const { isInViewport, elementRef } = useViewportIntersection(0.3, '-10% 0px -10% 0px');
    
    const {
        activeBreakdownIndex,
        isBreakdownExpanded,
        toggleBreakdown,
        isLoaderActive,
    } = useBreakdownAnimation(reasonData.reasonBreakdowns.length, isInViewport);

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

    return (
        <WhyChooseUsReasonView
            reasonData={reasonData}
            elementRef={elementRef}
            activeBreakdownIndex={activeBreakdownIndex}
            isBreakdownExpanded={isBreakdownExpanded}
            toggleBreakdown={toggleBreakdown}
            isLoaderActive={isLoaderActive}
            currentImagePath={getCurrentImagePath()}
        />
    );
}

