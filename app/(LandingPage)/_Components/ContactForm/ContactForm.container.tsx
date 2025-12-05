'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ContactFormView } from './ContactForm.view';
import { useContactForm } from './ContactFormProvider';
import { validateName, validateEmail, validateCompanyName } from './Utils/FormValidation';
import { validatePhoneNumber, parsePhoneNumber } from './Utils/PhoneNumberFormatter';
import { useDebouncedCallback } from './Hooks/useDebouncedCallback';
import { CONTACT_FORM_SUBMIT_DELAY_MS, CONTACT_FORM_AUTO_CLOSE_DELAY_MS, CONTACT_FORM_ERROR_COLOR } from './Constants/ContactFormConstants';
import { getTranslations } from '@/lib/i18n';

/**
 * Dummy form submission function
 * Simulates API call with a delay
 * 
 * @param formData - Form data to submit
 * @returns Promise that resolves after delay
 */
const submitContactForm = async (formData: {
    name: string;
    phone: string;
    email: string;
    company: string;
}): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate API call
            console.log('Form submitted:', formData);
            resolve();
        }, CONTACT_FORM_SUBMIT_DELAY_MS);
    });
};

/**
 * Contact form container component
 * 
 * Manages form state, validation, submission logic, and success state.
 * Coordinates with ContactFormProvider for open/close state.
 */
export function ContactFormContainer(): React.ReactElement {
    const { isOpen, closeContactForm } = useContactForm();
    const translations = getTranslations('en');

    /**
     * Form data state
     */
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
    });

    /**
     * Form errors state
     */
    const [errors, setErrors] = useState({
        name: null as string | null,
        phone: null as string | null,
        email: null as string | null,
        company: null as string | null,
    });

    /**
     * Touched fields state (track which fields user has interacted with)
     */
    const [touched, setTouched] = useState({
        name: false,
        phone: false,
        email: false,
        company: false,
    });

    /**
     * Submission and success states
     */
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Handle field value change
     * Updates form data and clears error for that field
     */
    const handleFieldChange = useCallback((field: 'name' | 'phone' | 'email' | 'company', value: string): void => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        /**
         * Clear error when user starts typing
         */
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: null,
            }));
        }
    }, [errors]);

    /**
     * Handle field blur (when field loses focus)
     * Validates the field and sets error if invalid
     */
    const handleFieldBlur = useCallback((field: 'name' | 'phone' | 'email' | 'company'): void => {
        setTouched((prev) => ({
            ...prev,
            [field]: true,
        }));

        const value = formData[field];

        /**
         * Validate based on field type
         */
        if (field === 'name') {
            const result = validateName(value);
            setErrors((prev) => ({
                ...prev,
                name: result.error,
            }));
            if (result.sanitized && result.sanitized !== value) {
                setFormData((prev) => ({
                    ...prev,
                    name: result.sanitized!,
                }));
            }
        } else if (field === 'phone') {
            const result = validatePhoneNumber(value);
            setErrors((prev) => ({
                ...prev,
                phone: result.error,
            }));
            if (result.formatted !== value) {
                setFormData((prev) => ({
                    ...prev,
                    phone: result.formatted,
                }));
            }
        } else if (field === 'email') {
            const result = validateEmail(value);
            setErrors((prev) => ({
                ...prev,
                email: result.error,
            }));
        } else if (field === 'company') {
            const result = validateCompanyName(value);
            setErrors((prev) => ({
                ...prev,
                company: result.error,
            }));
            if (result.sanitized && result.sanitized !== value) {
                setFormData((prev) => ({
                    ...prev,
                    company: result.sanitized!,
                }));
            }
        }
    }, [formData]);

    /**
     * Validate entire form
     * Returns true if all fields are valid
     */
    const validateForm = useCallback((): boolean => {
        const nameResult = validateName(formData.name);
        const phoneResult = validatePhoneNumber(formData.phone);
        const emailResult = validateEmail(formData.email);
        const companyResult = validateCompanyName(formData.company);

        setErrors({
            name: nameResult.error,
            phone: phoneResult.error,
            email: emailResult.error,
            company: companyResult.error,
        });

        /**
         * Mark all fields as touched when validating on submit
         */
        setTouched({
            name: true,
            phone: true,
            email: true,
            company: true,
        });

        return nameResult.isValid && phoneResult.isValid && emailResult.isValid && companyResult.isValid;
    }, [formData]);

    /**
     * Handle form submission
     * Validates form, submits data, shows success state, and auto-closes
     */
    const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        /**
         * Validate form before submission
         */
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            /**
             * Prepare form data for submission
             * Parse phone number to get raw numeric value
             */
            const submissionData = {
                name: formData.name.trim(),
                phone: parsePhoneNumber(formData.phone),
                email: formData.email.trim(),
                company: formData.company.trim(),
            };

            /**
             * Submit form (dummy promise)
             */
            await submitContactForm(submissionData);

            /**
             * Show success state
             */
            setIsSuccess(true);
            setIsSubmitting(false);

            /**
             * Auto-close after delay
             */
            autoCloseTimeoutRef.current = setTimeout(() => {
                handleClose();
            }, CONTACT_FORM_AUTO_CLOSE_DELAY_MS);
        } catch (error) {
            /**
             * Handle submission error
             */
            console.error('Form submission error:', error);
            setIsSubmitting(false);
        }
    }, [formData, validateForm]);

    /**
     * Handle form close
     * Closes modal/bottom sheet first, then resets form state after exit animation completes
     */
    const handleClose = useCallback((): void => {
        /**
         * Clear auto-close timeout if exists
         */
        if (autoCloseTimeoutRef.current) {
            clearTimeout(autoCloseTimeoutRef.current);
            autoCloseTimeoutRef.current = null;
        }

        /**
         * Close modal/bottom sheet immediately to start exit animation
         */
        closeContactForm();

        /**
         * Reset form state after exit animation completes (300ms)
         * This ensures the success state remains visible during exit animation
         */
        setTimeout(() => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            company: '',
        });
        setErrors({
            name: null,
            phone: null,
            email: null,
            company: null,
        });
        setTouched({
            name: false,
            phone: false,
            email: false,
            company: false,
        });
        setIsSubmitting(false);
        setIsSuccess(false);
        }, 300);
    }, [closeContactForm]);

    /**
     * Debounced submit handler to prevent rapid clicks
     */
    const debouncedSubmit = useDebouncedCallback(handleSubmit, 300);

    /**
     * Cleanup timeout on unmount
     */
    useEffect(() => {
        return () => {
            if (autoCloseTimeoutRef.current) {
                clearTimeout(autoCloseTimeoutRef.current);
            }
        };
    }, []);

    /**
     * Reset form when modal closes
     * Wait for exit animation to complete (300ms) before resetting state
     */
    useEffect(() => {
        if (!isOpen) {
            // Wait for exit animation to complete before resetting state
            // Exit animation duration is 300ms
            const resetTimeout = setTimeout(() => {
            setIsSuccess(false);
            setFormData({
                name: '',
                phone: '',
                email: '',
                company: '',
            });
            setErrors({
                name: null,
                phone: null,
                email: null,
                company: null,
            });
            setTouched({
                name: false,
                phone: false,
                email: false,
                company: false,
            });
            }, 300);

            return () => {
                clearTimeout(resetTimeout);
            };
        }
        return undefined;
    }, [isOpen]);

    return (
        <ContactFormView
            isOpen={isOpen}
            isSuccess={isSuccess}
            formData={formData}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
            onFieldChange={handleFieldChange}
            onFieldBlur={handleFieldBlur}
            onSubmit={debouncedSubmit}
            onClose={handleClose}
            translations={translations.contactForm}
            errorColor={CONTACT_FORM_ERROR_COLOR}
        />
    );
}

