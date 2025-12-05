import { WhyChooseUsSectionView } from './WhyChooseUsSection.view';
import { getTranslations } from '@/lib/i18n';
import { WHY_CHOOSE_US_REASONS } from './Constants/WhyChooseUsReasonsConstants';

export function WhyChooseUsSectionContainer(): React.ReactElement {
    const translations = getTranslations('en');

    return (
        <WhyChooseUsSectionView
            header={translations.whyChooseUsSection.header}
            subtitle={translations.whyChooseUsSection.subtitle}
            reasonsData={WHY_CHOOSE_US_REASONS}
        />
    );
}

