'use client';

interface ContactFormFieldsViewProps {
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
 * Contact form fields component
 * 
 * Displays all form input fields with labels, validation errors, and submit button.
 * Handles user input and displays errors for touched fields.
 */
export function ContactFormFieldsView({
    formData,
    errors,
    touched,
    isSubmitting,
    onFieldChange,
    onFieldBlur,
    translations,
    errorColor,
}: ContactFormFieldsViewProps): React.ReactElement {
    /**
     * Check if form is valid
     * Form is valid when all fields have no errors
     */
    const isFormValid = !errors.name && !errors.phone && !errors.email && !errors.company &&
        formData.name.trim() !== '' &&
        formData.phone.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.company.trim() !== '';

    return (
        <div className="w-full flex flex-col" style={{ height: '100%', minHeight: 0 }}>
            {/* Fixed Header Section */}
            <div className="flex-shrink-0">
                {/* Title */}
                <h2 className="text-white font-semibold text-2xl md:text-3xl text-center mb-2">
                    {translations.title}
                </h2>

                {/* Subtitle */}
                <p className="text-white text-center text-sm md:text-base mb-6 md:mb-8 opacity-80">
                    {translations.subtitle}
                </p>
            </div>

            {/* Scrollable Form Fields */}
            <div className="flex-1 overflow-y-auto min-h-0" style={{ maxHeight: 'calc(90vh - 300px)' }}>
                <div className="space-y-4 md:space-y-6 pr-1">
                {/* Name Field */}
                <div>
                    <label htmlFor="contact-name" className="block text-white text-sm md:text-base mb-2">
                        {translations.fields.name}
                        <span className="text-white ml-1">*</span>
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => onFieldChange('name', e.target.value)}
                        onBlur={() => onFieldBlur('name')}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your name"
                    />
                    {touched.name && errors.name && (
                        <p className="mt-1 text-sm" style={{ color: errorColor }}>
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Phone Number Field */}
                <div>
                    <label htmlFor="contact-phone" className="block text-white text-sm md:text-base mb-2">
                        {translations.fields.phone}
                        <span className="text-white ml-1">*</span>
                    </label>
                    <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => onFieldChange('phone', e.target.value)}
                        onBlur={() => onFieldBlur('phone')}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="(XXX) XXX-XXXX"
                    />
                    {touched.phone && errors.phone && (
                        <p className="mt-1 text-sm" style={{ color: errorColor }}>
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="contact-email" className="block text-white text-sm md:text-base mb-2">
                        {translations.fields.email}
                        <span className="text-white ml-1">*</span>
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => onFieldChange('email', e.target.value)}
                        onBlur={() => onFieldBlur('email')}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your.email@company.com"
                    />
                    {touched.email && errors.email && (
                        <p className="mt-1 text-sm" style={{ color: errorColor }}>
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Company Field */}
                <div>
                    <label htmlFor="contact-company" className="block text-white text-sm md:text-base mb-2">
                        {translations.fields.company}
                        <span className="text-white ml-1">*</span>
                    </label>
                    <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => onFieldChange('company', e.target.value)}
                        onBlur={() => onFieldBlur('company')}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Enter your company name"
                    />
                    {touched.company && errors.company && (
                        <p className="mt-1 text-sm" style={{ color: errorColor }}>
                            {errors.company}
                        </p>
                    )}
                </div>
                
                {/* Extra padding at bottom for scrollable space */}
                <div style={{ height: '5px' }} />
            </div>
            </div>

            {/* Fixed CTA Button - Full Width */}
            <div className="flex-shrink-0 mt-6 md:mt-8">
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full px-6 py-3 md:py-4 rounded-full text-gray-900 font-medium text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    style={{
                        background: 'linear-gradient(135deg, #B2E6D6 0%, #8CC7FF 100%)',
                        outline: 'none',
                        border: 'none',
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                            <span>{translations.ctaSubmitting}</span>
                        </>
                    ) : (
                        <>
                            <span>{translations.cta}</span>
                            <span className="text-xl">→</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

