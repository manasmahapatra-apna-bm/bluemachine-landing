'use client';

import Image from 'next/image';
import ReasonBreakdown from '../WhyChooseUsReason/Components/ReasonBreakdown';
import { ReasonImageContainerMobile } from './Components/ReasonImageContainerMobile';
import { MOBILE_REASON_BASE_MIN_HEIGHT_PX } from '../../Constants/WhyChooseUsReasonsConstants';
import type { WhyChooseUsReasonData } from '../../Constants/WhyChooseUsReasonsConstants';

interface WhyChooseUsReasonMobileViewProps {
    reasonData: WhyChooseUsReasonData;
    elementRef: React.RefObject<HTMLDivElement | null>;
    activeBreakdownIndex: number;
    isBreakdownExpanded: (index: number) => boolean;
    toggleBreakdown: (index: number) => void;
    isLoaderActive: boolean;
    currentImagePath: string | null;
    shouldPrioritizeImage: boolean;
    reasonIndex: number;
}

/**
 * Mobile reason component with vertical layout
 * 
 * Displays reason icon, header, image, and breakdown items in a vertical stack.
 * Layout order: Title + Icon → Image → Breakdowns
 * Uses constant min-height to prevent layout shifts during expand/collapse.
 */
export function WhyChooseUsReasonMobileView({
    reasonData,
    elementRef,
    activeBreakdownIndex,
    isBreakdownExpanded,
    toggleBreakdown,
    isLoaderActive,
    currentImagePath,
    shouldPrioritizeImage,
    reasonIndex,
}: WhyChooseUsReasonMobileViewProps): React.ReactElement {
    return (
        <div 
            ref={elementRef} 
            className="w-full py-4 flex justify-center md:hidden"
            style={{
                minHeight: `${MOBILE_REASON_BASE_MIN_HEIGHT_PX}px`,
            }}
        >
            <div
                className="w-full px-4 rounded-lg"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                }}
            >
                {/* Title and Icon Section */}
                <div className="pt-6 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Image
                            src={reasonData.reasonIcon}
                            alt={`${reasonData.reasonHeader} icon`}
                            width={32}
                            height={32}
                            className="object-contain w-8 h-8 flex-shrink-0"
                        />
                        <h2 
                            className="font-semibold text-[1.25rem] bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(99deg, #B2E6D6 0.18%, #8CC7FF 100.18%)',
                            }}
                        >
                            {reasonData.reasonHeader}
                        </h2>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full h-[20.625rem] mb-6">
                    <ReasonImageContainerMobile
                        currentImagePath={currentImagePath}
                        reasonIndex={reasonIndex}
                        priority={shouldPrioritizeImage}
                    />
                </div>

                {/* Breakdown Items Container */}
                <div className="space-y-0 rounded-lg px-3 pb-4">
                    {reasonData.reasonBreakdowns.map((breakdown, index) => (
                        <ReasonBreakdown
                            key={`${reasonData.reasonHeader}-breakdown-${index}`}
                            breakdown={breakdown}
                            isExpanded={isBreakdownExpanded(index)}
                            isLoaderActive={isLoaderActive && activeBreakdownIndex === index}
                            onToggle={() => toggleBreakdown(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

