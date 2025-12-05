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
     * Duplicate icons array for seamless infinite scroll
     * When in carousel mode, we duplicate the icons to create a continuous loop
     */
    const displayIcons = isCarouselMode ? [...icons, ...icons] : icons;

    return (
        <div className={`relative overflow-hidden ${isCarouselMode ? 'w-screen -mx-4 sm:-mx-6 lg:-mx-8' : 'w-full'}`}>
            {/* Icons Container */}
            <div
                ref={containerRef}
                className={`flex items-center gap-3 ${
                    isCarouselMode ? 'justify-start pl-4 sm:pl-6 lg:pl-8' : 'justify-center'
                }`}
            >
                {displayIcons.map((icon, index) => (
                    <div
                        key={`${icon.name}-${index}`}
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{ width: '150px', height: '60px' }}
                    >
                        <Image
                            src={icon.svgPath}
                            alt={icon.altText}
                            width={90}
                            height={25}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

