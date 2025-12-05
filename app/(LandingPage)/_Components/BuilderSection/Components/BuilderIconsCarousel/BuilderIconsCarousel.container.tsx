'use client';

import { BuilderIconsCarouselView } from './BuilderIconsCarousel.view';
import { useCarousel } from '@/lib/hooks/useCarousel';
import { BUILDER_ICONS } from '../../Constants/BuilderIconsConstants';

export function BuilderIconsCarouselContainer(): React.ReactElement {
    const { isCarouselMode, containerRef } = useCarousel(BUILDER_ICONS.length, 150, 40);

    return (
        <BuilderIconsCarouselView
            icons={BUILDER_ICONS}
            isCarouselMode={isCarouselMode}
            containerRef={containerRef}
        />
    );
}
