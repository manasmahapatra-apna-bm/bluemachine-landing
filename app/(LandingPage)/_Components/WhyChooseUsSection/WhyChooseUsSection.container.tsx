'use client';

import { WhyChooseUsSectionView } from './WhyChooseUsSection.view';
import { getTranslations } from '@/lib/i18n';
import { WHY_CHOOSE_US_REASONS } from './Constants/WhyChooseUsReasonsConstants';
import { useReasonImageLoader } from '@/lib/hooks/useReasonImageLoader';
import { useState, useCallback } from 'react';

export function WhyChooseUsSectionContainer(): React.ReactElement {
    const translations = getTranslations('en');
    
    /**
     * Track active breakdown indices for all reasons
     * Used by reason image loader for sequential loading
     */
    const [activeBreakdownIndices, setActiveBreakdownIndices] = useState<number[]>(
        WHY_CHOOSE_US_REASONS.map(() => -1)
    );
    
    /**
     * Track viewport visibility for each reason
     */
    const [reasonViewportStates, setReasonViewportStates] = useState<boolean[]>(
        WHY_CHOOSE_US_REASONS.map(() => false)
    );

    /**
     * Get image URL for a specific reason and breakdown index
     */
    const getImageUrl = (reasonIndex: number, breakdownIndex: number): string | null => {
        const reason = WHY_CHOOSE_US_REASONS[reasonIndex];
        if (!reason) {
            return null;
        }
        return reason.reasonBreakdowns[breakdownIndex]?.reasonDescriptionImage || null;
    };

    /**
     * Check if any reason is in viewport
     */
    const isAnyReasonInViewport = reasonViewportStates.some((isVisible) => isVisible);

    /**
     * Use reason image loader hook
     */
    const { getImagePriority, shouldPrioritizeImage } = useReasonImageLoader({
        totalReasons: WHY_CHOOSE_US_REASONS.length,
        breakdownsPerReason: WHY_CHOOSE_US_REASONS[0]?.reasonBreakdowns.length || 3,
        getImageUrl,
        isInViewport: isAnyReasonInViewport,
        activeBreakdownIndices,
    });

    /**
     * Callback for reason components to update their active breakdown index
     * Memoized with useCallback to prevent infinite re-renders
     */
    const updateReasonBreakdownIndex = useCallback((reasonIndex: number, breakdownIndex: number): void => {
        setActiveBreakdownIndices((prev) => {
            const updated = [...prev];
            updated[reasonIndex] = breakdownIndex;
            return updated;
        });
    }, []);

    /**
     * Callback for reason components to update their viewport state
     * Memoized with useCallback to prevent infinite re-renders
     */
    const updateReasonViewportState = useCallback((reasonIndex: number, isInViewport: boolean): void => {
        setReasonViewportStates((prev) => {
            const updated = [...prev];
            updated[reasonIndex] = isInViewport;
            return updated;
        });
    }, []);

    return (
        <WhyChooseUsSectionView
            header={translations.whyChooseUsSection.header}
            subtitle={translations.whyChooseUsSection.subtitle}
            reasonsData={WHY_CHOOSE_US_REASONS}
            getImagePriority={getImagePriority}
            shouldPrioritizeImage={shouldPrioritizeImage}
            updateReasonBreakdownIndex={updateReasonBreakdownIndex}
            updateReasonViewportState={updateReasonViewportState}
        />
    );
}

