'use client';

interface RequestDemoButtonViewProps {
    onClick: () => void;
    label: string;
}

export function RequestDemoButtonView({ onClick, label }: RequestDemoButtonViewProps): React.ReactElement {
    return (
        <button
            type="button"
            onClick={onClick}
            className="px-6 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
            style={{ height: '40px' }}
            aria-label="Request a demo"
        >
            {label}
        </button>
    );
}

