'use client';

import GradientLoader from '../GradientLoader';
import { BREAKDOWN_LOADER_DURATION_MS } from '../../../../Constants/WhyChooseUsReasonsConstants';
import type { ReasonBreakdown } from '../../../../Constants/WhyChooseUsReasonsConstants';

interface ReasonBreakdownViewProps {
    breakdown: ReasonBreakdown;
    isExpanded: boolean;
    isLoaderActive: boolean;
    onToggle: () => void;
}

/**
 * Individual breakdown item component with expand/collapse functionality
 * 
 * Displays a breakdown title and description that can be expanded or collapsed.
 * Shows a gradient loader when expanded. Includes a divider separator between
 * breakdowns. Supports click interaction to toggle expansion state.
 */
export function ReasonBreakdownView({
    breakdown,
    isExpanded,
    isLoaderActive,
    onToggle,
}: ReasonBreakdownViewProps): React.ReactElement {
    return (
        <div className="w-full">
            {/* Divider with Gradient Loader - Always above breakdown */}
            <div className="relative border-t border-gray-700">
                {isExpanded && isLoaderActive && (
                    <GradientLoader
                        duration={BREAKDOWN_LOADER_DURATION_MS}
                        isActive={isLoaderActive}
                    />
                )}
            </div>

            {/* Breakdown Title (Always Visible) */}
            <button
                type="button"
                onClick={onToggle}
                className="w-full text-left py-4 focus:outline-none transition-all duration-200"
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${breakdown.reasonBreakdownTitle}`}
            >
                <div className="text-white font-normal text-[18px]">
                    {breakdown.reasonBreakdownTitle}
                </div>
            </button>

            {/* Breakdown Content (Expandable) */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="pb-1">
                    <p className="text-white opacity-60 text-base leading-relaxed">
                        {breakdown.reasonBreakdownDescription}
                    </p>
                </div>
            </div>
        </div>
    );
}

