'use client';

import Image from 'next/image';
import ReasonBreakdown from './Components/ReasonBreakdown';
import ReasonImageContainer from './Components/ReasonImageContainer';
import type { WhyChooseUsReasonData } from '../../Constants/WhyChooseUsReasonsConstants';

interface WhyChooseUsReasonViewProps {
    reasonData: WhyChooseUsReasonData;
    elementRef: React.RefObject<HTMLDivElement | null>;
    activeBreakdownIndex: number;
    isBreakdownExpanded: (index: number) => boolean;
    toggleBreakdown: (index: number) => void;
    isLoaderActive: boolean;
    currentImagePath: string | null;
}

/**
 * Individual reason component with two-column layout
 * 
 * Displays reason icon, header, breakdown items, and associated image.
 * Supports left or right image alignment. Handles breakdown expansion
 * animations and image transitions.
 */
export function WhyChooseUsReasonView({
    reasonData,
    elementRef,
    activeBreakdownIndex,
    isBreakdownExpanded,
    toggleBreakdown,
    isLoaderActive,
    currentImagePath,
}: WhyChooseUsReasonViewProps): React.ReactElement {
    const isImageOnLeft = reasonData.imageAlignment === 'left';

    return (
        <div ref={elementRef} className="w-full py-8 flex justify-center">
            <div
                className="w-[70vw] max-w-full px-4 sm:px-6 lg:px-8 rounded-lg"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                }}
            >
                <div
                    className={`grid items-start ${
                        isImageOnLeft
                            ? 'grid-cols-1 lg:grid-cols-[60%_40%] gap-0 lg:gap-0'
                            : 'grid-cols-1 lg:grid-cols-[40%_60%] gap-8'
                    }`}
                >
                    {/* Image Column - Left Side */}
                    {isImageOnLeft && (
                        <div className={`w-full h-[500px] lg:h-[600px] order-1 lg:order-1 ${isImageOnLeft ? '-ml-4 sm:-ml-6 lg:-ml-8' : ''}`}>
                            <ReasonImageContainer
                                currentImagePath={currentImagePath}
                                imageAlignment={reasonData.imageAlignment}
                            />
                        </div>
                    )}

                    {/* Content Column */}
                    <div className={`flex flex-col h-full justify-between ${isImageOnLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
                        {/* Reason Icon and Header */}
                        <div className="pt-[24px]">
                            <div className="mb-1">
                                <Image
                                    src={reasonData.reasonIcon}
                                    alt={`${reasonData.reasonHeader} icon`}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <h2 
                                className="font-semibold text-[26px] lg:text-[26px] bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: 'linear-gradient(99deg, #B2E6D6 0.18%, #8CC7FF 100.18%)',
                                }}
                            >
                                {reasonData.reasonHeader}
                            </h2>
                        </div>

                        {/* Breakdown Items Container */}
                        <div
                            className="space-y-0 rounded-lg px-3 py-4"
                        >
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

                    {/* Image Column - Right Side */}
                    {!isImageOnLeft && (
                        <div className={`w-full h-[500px] lg:h-[600px] order-1 lg:order-2 ${!isImageOnLeft ? '-mr-4 sm:-mr-6 lg:-mr-8' : ''}`}>
                            <ReasonImageContainer
                                currentImagePath={currentImagePath}
                                imageAlignment={reasonData.imageAlignment}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

