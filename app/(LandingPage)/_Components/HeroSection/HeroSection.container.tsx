'use client';

import { HeroSectionView } from './HeroSection.view';
import { getTranslations } from '@/lib/i18n';

export function HeroSectionContainer(): React.ReactElement {
    const translations = getTranslations('en');

    return (
        <HeroSectionView
            headline={translations.heroSection.headline}
            description={translations.heroSection.description}
        />
    );
}

