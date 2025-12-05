'use client';

import { ReasonBreakdownView } from './ReasonBreakdown.view';
import type { ReasonBreakdown as ReasonBreakdownType } from '../../../../Constants/WhyChooseUsReasonsConstants';

interface ReasonBreakdownContainerProps {
    breakdown: ReasonBreakdownType;
    isExpanded: boolean;
    isLoaderActive: boolean;
    onToggle: () => void;
}

export function ReasonBreakdownContainer({
    breakdown,
    isExpanded,
    isLoaderActive,
    onToggle,
}: ReasonBreakdownContainerProps): React.ReactElement {
    const handleToggle = (): void => {
        onToggle();
    };

    return (
        <ReasonBreakdownView
            breakdown={breakdown}
            isExpanded={isExpanded}
            isLoaderActive={isLoaderActive}
            onToggle={handleToggle}
        />
    );
}

