'use client';

import { ContactFormProvider, ContactForm } from './index';

interface ContactFormWrapperProps {
    children: React.ReactNode;
}

/**
 * Client component wrapper for ContactFormProvider
 * 
 * This allows the page to remain a Server Component while providing
 * the ContactFormProvider context to child components.
 * Only this wrapper needs to be a Client Component.
 */
export function ContactFormWrapper({ children }: ContactFormWrapperProps): React.ReactElement {
    return (
        <ContactFormProvider>
            {children}
            <ContactForm />
        </ContactFormProvider>
    );
}

