'use client';

import Image from 'next/image';

interface ContactFormSuccessViewProps {
    translations: {
        title: string;
        message: string;
        done: string;
    };
    onDone: () => void;
}

/**
 * Contact form success state component
 * 
 * Displays success icon, message, and done button after successful form submission.
 * Shorter height than form content to trigger smooth height animation.
 */
export function ContactFormSuccessView({
    translations,
    onDone,
}: ContactFormSuccessViewProps): React.ReactElement {
    return (
        <div className="w-full flex flex-col items-center justify-center py-4 md:py-6">
            {/* Success Icon */}
            <div className="mb-4 md:mb-6">
                <Image
                    src="/SVGs/ContactFormSuvvessIcon.svg"
                    alt="Success"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                />
            </div>

            {/* Success Title */}
            <h2 className="text-white font-semibold text-xl md:text-2xl text-center mb-2 md:mb-3">
                {translations.title}
            </h2>

            {/* Success Message */}
            <p className="text-white text-center text-sm md:text-base mb-6 md:mb-8 opacity-80 max-w-md">
                {translations.message}
            </p>

            {/* Done Button */}
            <button
                type="button"
                onClick={onDone}
                className="w-full px-6 py-3 md:py-4 rounded-full text-white font-medium text-base md:text-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                style={{
                    backgroundColor: '#0090FE',
                }}
            >
                {translations.done}
            </button>
        </div>
    );
}

