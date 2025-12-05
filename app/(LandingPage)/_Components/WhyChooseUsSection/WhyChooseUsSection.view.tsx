'use client';

import WhyChooseUsReason from './Components/WhyChooseUsReason';
import { WhyChooseUsReasonMobile } from './Components/WhyChooseUsReasonMobile';
import type { WhyChooseUsReasonData } from './Constants/WhyChooseUsReasonsConstants';
import type { ResourcePriority } from '@/lib/types/ResourcePriority';

interface WhyChooseUsSectionViewProps {
    header: string;
    subtitle: string;
    reasonsData: readonly WhyChooseUsReasonData[];
    getImagePriority: (reasonIndex: number, breakdownIndex: number) => ResourcePriority;
    shouldPrioritizeImage: (reasonIndex: number, breakdownIndex: number) => boolean;
    updateReasonBreakdownIndex: (reasonIndex: number, breakdownIndex: number) => void;
    updateReasonViewportState: (reasonIndex: number, isInViewport: boolean) => void;
}

/**
 * Main WhyChooseUsSection component
 * 
 * Displays the section header, subtitle, and renders all reason components.
 * Coordinates image loading priorities across all reason components.
 */
export function WhyChooseUsSectionView({
    header,
    subtitle,
    reasonsData,
    getImagePriority,
    shouldPrioritizeImage,
    updateReasonBreakdownIndex,
    updateReasonViewportState,
}: WhyChooseUsSectionViewProps): React.ReactElement {
    return (
        <section
            id="benefits"
            className="w-full py-20 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: '#061B2D' }}
            aria-label="Why choose us section"
        >
            <div className="max-w-[1920px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-white font-normal text-[1.875rem] md:text-4xl lg:text-5xl mb-4">
                        {header}
                    </h2>
                    <p 
                        className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto"
                        style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* Reason Components */}
                <div>
                    {reasonsData.map((reasonData, index) => (
                        <div key={`reason-${index}-${reasonData.reasonHeader}`}>
                            {/* Desktop Reason Component */}
                            <div className="hidden md:block">
                                <WhyChooseUsReason
                                    reasonData={reasonData}
                                    reasonIndex={index}
                                    getImagePriority={(breakdownIndex: number) => getImagePriority(index, breakdownIndex)}
                                    shouldPrioritizeImage={(breakdownIndex: number) => shouldPrioritizeImage(index, breakdownIndex)}
                                    updateBreakdownIndex={updateReasonBreakdownIndex}
                                    updateViewportState={updateReasonViewportState}
                                />
                            </div>

                            {/* Mobile Reason Component */}
                            <div className="block md:hidden">
                                <WhyChooseUsReasonMobile
                                    reasonData={reasonData}
                                    reasonIndex={index}
                                    getImagePriority={(breakdownIndex: number) => getImagePriority(index, breakdownIndex)}
                                    shouldPrioritizeImage={(breakdownIndex: number) => shouldPrioritizeImage(index, breakdownIndex)}
                                    updateBreakdownIndex={updateReasonBreakdownIndex}
                                    updateViewportState={updateReasonViewportState}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

