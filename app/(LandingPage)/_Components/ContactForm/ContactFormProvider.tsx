'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Contact form context value interface
 * Provides state and functions for managing contact form visibility
 */
interface ContactFormContextValue {
    isOpen: boolean;
    openContactForm: () => void;
    closeContactForm: () => void;
}

/**
 * Contact form context
 * Used to share contact form open/close state across components
 */
const ContactFormContext = createContext<ContactFormContextValue | undefined>(undefined);

/**
 * Contact form provider component
 * 
 * Manages the global state for contact form visibility.
 * Wraps the application to provide contact form state to all child components.
 * 
 * @param children - Child components that need access to contact form context
 */
export function ContactFormProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * Open contact form modal/bottom sheet
     * Called when user clicks "Request Demo" button in header or footer
     */
    const openContactForm = useCallback((): void => {
        setIsOpen(true);
    }, []);

    /**
     * Close contact form modal/bottom sheet
     * Called when user clicks close button or backdrop
     */
    const closeContactForm = useCallback((): void => {
        setIsOpen(false);
    }, []);

    return (
        <ContactFormContext.Provider
            value={{
                isOpen,
                openContactForm,
                closeContactForm,
            }}
        >
            {children}
        </ContactFormContext.Provider>
    );
}

/**
 * Custom hook to access contact form context
 * 
 * Provides access to contact form state and control functions.
 * Must be used within ContactFormProvider.
 * 
 * @returns Contact form context value with isOpen state and control functions
 * @throws Error if used outside ContactFormProvider
 * 
 * @example
 * ```tsx
 * const { openContactForm } = useContactForm();
 * <button onClick={openContactForm}>Request Demo</button>
 * ```
 */
export function useContactForm(): ContactFormContextValue {
    const context = useContext(ContactFormContext);

    if (context === undefined) {
        throw new Error('useContactForm must be used within ContactFormProvider');
    }

    return context;
}

