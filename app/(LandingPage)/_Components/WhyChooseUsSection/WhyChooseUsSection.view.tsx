'use client';

import WhyChooseUsReason from './Components/WhyChooseUsReason';
import type { WhyChooseUsReasonData } from './Constants/WhyChooseUsReasonsConstants';

interface WhyChooseUsSectionViewProps {
    header: string;
    subtitle: string;
    reasonsData: readonly WhyChooseUsReasonData[];
}

/**
 * Main WhyChooseUsSection component
 * 
 * Displays the section header, subtitle, and renders all reason components.
 * Each reason component handles its own viewport detection and animations.
 */
export function WhyChooseUsSectionView({
    header,
    subtitle,
    reasonsData,
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
                    <h2 className="text-white font-normal text-4xl lg:text-5xl mb-4">
                        {header}
                    </h2>
                    <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Reason Components */}
                <div>
                    {reasonsData.map((reasonData, index) => (
                        <WhyChooseUsReason
                            key={`reason-${index}-${reasonData.reasonHeader}`}
                            reasonData={reasonData}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

