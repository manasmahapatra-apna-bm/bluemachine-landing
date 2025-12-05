'use client';

import { FooterView } from './Footer.view';
import { getTranslations } from '@/lib/i18n';
import { useContactForm } from '../ContactForm';
import {
    FOOTER_NAV_LINKS,
    SOCIAL_MEDIA_LINKS,
    CERTIFICATION_BADGES,
} from './Constants/FooterConstants';

export function FooterContainer(): React.ReactElement {
    const translations = getTranslations('en');
    const { openContactForm } = useContactForm();

    /**
     * Handle navigation link clicks
     * Placeholder function - ready for actual navigation implementation
     */
    const handleNavClick = (_url: string): void => {
        // TODO: Implement navigation functionality
    };

    /**
     * Handle social media link clicks
     * Placeholder function - ready for actual link implementation
     */
    const handleSocialClick = (_url: string): void => {
        // TODO: Implement social media link functionality
    };

    /**
     * Handle request demo button click
     * Opens contact form modal/bottom sheet
     */
    const handleRequestDemo = (): void => {
        openContactForm();
    };

    /**
     * Map navigation links with translations
     */
    const navLinksWithTranslations = FOOTER_NAV_LINKS.map((link) => ({
        ...link,
        label: translations.footer.nav[link.id as keyof typeof translations.footer.nav] || link.label,
    }));

    return (
        <FooterView
            logoPath="/SVGs/BMLogo.svg"
            tagline={translations.footer.tagline}
            requestDemoLabel={translations.footer.requestDemo}
            navLinks={navLinksWithTranslations}
            socialMediaLinks={SOCIAL_MEDIA_LINKS}
            certificationBadges={CERTIFICATION_BADGES}
            copyright={translations.footer.copyright}
            onNavClick={handleNavClick}
            onSocialClick={handleSocialClick}
            onRequestDemo={handleRequestDemo}
        />
    );
}

