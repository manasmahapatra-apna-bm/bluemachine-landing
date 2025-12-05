'use client';

import { HeroView } from './Hero.view';
import { getTranslations } from '@/lib/i18n';
import { scrollToSection } from '../Navigation/Utils/NavigationUtils';

export function HeroContainer(): React.ReactElement {
    const translations = getTranslations('en');

    const handleCTAClick = (): void => {
        scrollToSection('contact');
    };

    return (
        <HeroView
            headline={translations.hero.headline}
            subheadline={translations.hero.subheadline}
            ctaText={translations.hero.cta}
            onCTAClick={handleCTAClick}
        />
    );
}
