'use client';

import { ContactFormFieldsView } from './ContactFormFields.view';
import { formatPhoneNumber } from '../../Utils/PhoneNumberFormatter';

interface ContactFormFieldsContainerProps {
    formData: {
        name: string;
        phone: string;
        email: string;
        company: string;
    };
    errors: {
        name: string | null;
        phone: string | null;
        email: string | null;
        company: string | null;
    };
    touched: {
        name: boolean;
        phone: boolean;
        email: boolean;
        company: boolean;
    };
    isSubmitting: boolean;
    onFieldChange: (field: 'name' | 'phone' | 'email' | 'company', value: string) => void;
    onFieldBlur: (field: 'name' | 'phone' | 'email' | 'company') => void;
    translations: {
        title: string;
        subtitle: string;
        fields: {
            name: string;
            phone: string;
            email: string;
            company: string;
        };
        cta: string;
        ctaSubmitting: string;
    };
    errorColor: string;
}

/**
 * Container component for contact form fields
 * 
 * Handles phone number formatting logic and passes formatted values to view component.
 */
export function ContactFormFieldsContainer({
    formData,
    errors,
    touched,
    isSubmitting,
    onFieldChange,
    onFieldBlur,
    translations,
    errorColor,
}: ContactFormFieldsContainerProps): React.ReactElement {
    /**
     * Handle phone number field change with real-time formatting
     */
    const handlePhoneChange = (value: string): void => {
        const formatted = formatPhoneNumber(value);
        onFieldChange('phone', formatted);
    };

    /**
     * Create form data with formatted phone number for display
     */
    const displayFormData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
    };

    return (
        <ContactFormFieldsView
            formData={displayFormData}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            onFieldChange={(field, value) => {
                if (field === 'phone') {
                    handlePhoneChange(value);
                } else {
                    onFieldChange(field, value);
                }
            }}
            onFieldBlur={onFieldBlur}
            translations={translations}
            errorColor={errorColor}
        />
    );
}

