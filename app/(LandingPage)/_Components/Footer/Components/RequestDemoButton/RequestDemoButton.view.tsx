'use client';

import { triggerHapticFeedback } from '@/lib/utils/hapticFeedback';

interface RequestDemoButtonViewProps {
    label: string;
    onClick: () => void;
}

/**
 * Request Demo Button component for Footer
 * 
 * Displays a rounded button with blue background and white text.
 * Matches footer design requirements.
 */
export function RequestDemoButtonView({ label, onClick }: RequestDemoButtonViewProps): React.ReactElement {
    return (
        <div
            onClick={() => {
                triggerHapticFeedback();
                onClick();
            }}
            className="inline-block px-6 py-3 rounded-full text-white font-medium text-base transition-all duration-200 hover:opacity-90 cursor-pointer"
            style={{
                backgroundColor: '#0090FE',
                outline: 'none',
                border: 'none',
                boxShadow: 'none',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerHapticFeedback();
                    onClick();
                }
            }}
            aria-label={label}
        >
            {label}
        </div>
    );
}

