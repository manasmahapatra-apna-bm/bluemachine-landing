'use client';

import { BuilderSectionView } from './BuilderSection.view';
import { getTranslations } from '@/lib/i18n';

export function BuilderSectionContainer(): React.ReactElement {
    const translations = getTranslations('en');

    return (
        <BuilderSectionView heading={translations.builderSection.heading} />
    );
}

