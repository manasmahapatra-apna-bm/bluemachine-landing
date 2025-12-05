'use client';

import { ContactFormSuccessView } from './ContactFormSuccess.view';

interface ContactFormSuccessContainerProps {
    translations: {
        title: string;
        message: string;
        done: string;
    };
    onDone: () => void;
}

/**
 * Container component for contact form success state
 * 
 * Wraps the view component and handles any container-level logic.
 * Currently passes props directly to view component.
 */
export function ContactFormSuccessContainer({
    translations,
    onDone,
}: ContactFormSuccessContainerProps): React.ReactElement {
    return (
        <ContactFormSuccessView
            translations={translations}
            onDone={onDone}
        />
    );
}

