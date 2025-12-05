'use client';

import { InvestorSectionView } from './InvestorSection.view';
import { getTranslations } from '@/lib/i18n';

export function InvestorSectionContainer(): React.ReactElement {
    const translations = getTranslations('en');

    return (
        <InvestorSectionView heading={translations.investorSection.heading} />
    );
}

