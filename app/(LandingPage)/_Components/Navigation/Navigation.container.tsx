'use client';

import { useNavigation } from './Hooks/useNavigation';
import { scrollToSection } from './Utils/NavigationUtils';
import { NavigationView } from './Navigation.view';
import { NAVIGATION_ITEMS } from './Constants/NavigationConstants';
import { getTranslations } from '@/lib/i18n';

export function NavigationContainer(): React.ReactElement {
    const { activeSection, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigation();
    const translations = getTranslations('en');

    const handleNavClick = (sectionId: string): void => {
        scrollToSection(sectionId);
        closeMobileMenu();
    };

    const handleKeyDown = (event: React.KeyboardEvent, sectionId: string): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleNavClick(sectionId);
        }
    };

    const navItems = NAVIGATION_ITEMS.map((item) => {
        const key = item.label.split('.')[1] as 'home' | 'benefits' | 'contact';
        return {
            ...item,
            label: translations.nav[key],
        };
    });

    return (
        <NavigationView
            navItems={navItems}
            activeSection={activeSection}
            isMobileMenuOpen={isMobileMenuOpen}
            onNavClick={handleNavClick}
            onToggleMobileMenu={toggleMobileMenu}
            onKeyDown={handleKeyDown}
        />
    );
}
