'use client';

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
        <button
            type="button"
            onClick={onClick}
            className="px-6 py-3 rounded-full text-white font-medium text-base transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061B2D]"
            style={{
                backgroundColor: '#0090FE',
            }}
            aria-label={label}
        >
            {label}
        </button>
    );
}

