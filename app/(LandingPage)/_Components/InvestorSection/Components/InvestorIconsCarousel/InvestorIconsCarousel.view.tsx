'use client';

import Image from 'next/image';
import type { InvestorIcon } from '../../Constants/InvestorIconsConstants';

interface InvestorIconsCarouselViewProps {
    icons: readonly InvestorIcon[];
    isCarouselMode: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export function InvestorIconsCarouselView({
    icons,
    isCarouselMode,
    containerRef,
}: InvestorIconsCarouselViewProps): React.ReactElement {
    /**
     * Duplicate icons array 5 times for continuous scroll
     * When in carousel mode, we duplicate the icons 5 times to create a long continuous list
     */
    const displayIcons = isCarouselMode ? [...icons, ...icons, ...icons, ...icons, ...icons] : icons;

    return (
        <div className={`relative overflow-hidden ${isCarouselMode ? 'w-screen -mx-4 sm:-mx-6 lg:-mx-8' : 'w-full'}`}>
            {/* Icons Container */}
            <div
                ref={containerRef}
                className={`flex items-center gap-2 md:gap-3 ${
                    isCarouselMode ? 'justify-start pl-4 sm:pl-6 lg:pl-8' : 'justify-center'
                }`}
                style={isCarouselMode ? { 
                    willChange: 'transform',
                } : undefined}
            >
                {displayIcons.map((icon, index) => (
                    <div
                        key={`${icon.name}-${index}`}
                        className="flex-shrink-0 flex items-center justify-center w-[6.25rem] h-[2.5rem] md:w-[9.375rem] md:h-[3.75rem]"
                    >
                        <Image
                            src={icon.svgPath}
                            alt={icon.altText}
                            width={90}
                            height={25}
                            className="object-contain w-[3.75rem] md:w-[5.625rem] h-auto"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

