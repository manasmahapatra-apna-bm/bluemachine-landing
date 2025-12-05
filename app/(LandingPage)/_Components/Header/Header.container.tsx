'use client';

import { HeaderView } from './Header.view';
import { getTranslations } from '@/lib/i18n';
import { useContactForm } from '../ContactForm';
import { useHeaderSectionTint } from './Hooks/useHeaderSectionTint';

export function HeaderContainer(): React.ReactElement {
    const translations = getTranslations('en');
    const { openContactForm } = useContactForm();
    const isDarkTintActive = useHeaderSectionTint();

    const handleRequestDemo = (): void => {
        openContactForm();
    };

    return (
        <HeaderView
            logoPath="/SVGs/BMLogo.svg"
            requestDemoLabel={translations.header.requestDemo}
            requestDemoArrow={translations.header.arrow}
            onRequestDemo={handleRequestDemo}
            isDarkTintActive={isDarkTintActive}
        />
    );
}

