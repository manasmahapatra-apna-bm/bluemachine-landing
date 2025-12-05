'use client';

import { InvestorIconsCarouselView } from './InvestorIconsCarousel.view';
import { useCarousel } from '@/lib/hooks/useCarousel';
import { INVESTOR_ICONS } from '../../Constants/InvestorIconsConstants';

export function InvestorIconsCarouselContainer(): React.ReactElement {
    const { isCarouselMode, containerRef } = useCarousel(INVESTOR_ICONS.length, 150, 40);

    return (
        <InvestorIconsCarouselView
            icons={INVESTOR_ICONS}
            isCarouselMode={isCarouselMode}
            containerRef={containerRef}
        />
    );
}

