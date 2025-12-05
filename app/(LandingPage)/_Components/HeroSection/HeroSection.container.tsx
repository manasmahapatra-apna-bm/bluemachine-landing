'use client';

import { HeroSectionView } from './HeroSection.view';
import { getTranslations } from '@/lib/i18n';

export function HeroSectionContainer(): React.ReactElement {
    const translations = getTranslations('en');

    const handleCTAClick = (): void => {
        // TODO: Implement CTA functionality
    };

    return (
        <HeroSectionView
            headline={translations.heroSection.headline}
            supportingText={translations.heroSection.supportingText}
            ctaText={translations.heroSection.cta.text}
            ctaArrow={translations.heroSection.cta.arrow}
            onCTAClick={handleCTAClick}
        />
    );
}

