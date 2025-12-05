'use client';

import { HeaderView } from './Header.view';
import { getTranslations } from '@/lib/i18n';
import { scrollToSection } from '../Navigation/Utils/NavigationUtils';

export function HeaderContainer(): React.ReactElement {
    const translations = getTranslations('en');

    const handleRequestDemo = (): void => {
        // TODO: Implement demo request functionality
    };

    const handleNavClick = (sectionId: string): void => {
        // Map Header nav item IDs to actual section IDs
        const sectionIdMap: Record<string, string> = {
            'home': 'hero',
            'whyChooseUs': 'benefits',
        };
        
        const targetSectionId = sectionIdMap[sectionId] || sectionId;
        scrollToSection(targetSectionId);
    };

    return (
        <HeaderView
            logoPath="/SVGs/BMLogo.svg"
            navItems={[
                { id: 'home', label: translations.header.nav.home },
                { id: 'whyChooseUs', label: translations.header.nav.whyChooseUs },
            ]}
            requestDemoLabel={translations.header.requestDemo}
            onNavClick={handleNavClick}
            onRequestDemo={handleRequestDemo}
        />
    );
}

