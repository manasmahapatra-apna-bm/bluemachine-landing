'use client';

interface RequestDemoButtonViewProps {
    onClick: () => void;
    label: string;
    arrow: string;
}

export function RequestDemoButtonView({ onClick, label, arrow }: RequestDemoButtonViewProps): React.ReactElement {
    return (
        <div className="relative inline-block">
            {/* Rotating Gradient Border Background - slightly larger than button */}
            <div
                className="absolute rounded-full animate-gradient-rotate"
                style={{
                    top: '-0.125rem',
                    left: '-0.125rem',
                    right: '-0.125rem',
                    bottom: '-0.125rem',
                    zIndex: 1,
                }}
            />
            
            {/* Button Container */}
            <div
                className="relative rounded-full px-3 md:px-6 overflow-hidden h-10 md:h-14"
                style={{
                    background: 'linear-gradient(135deg, #B2E6D6 0%, #8CC7FF 100%)',
                    zIndex: 2,
                }}
            >
                {/* White overlay for button content */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full" />
                
                {/* Button Content */}
                <button
                    type="button"
                    onClick={onClick}
                    className="relative z-10 text-gray-900 font-medium flex items-center gap-1.5 md:gap-2 h-full px-3 md:px-6 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label="Request a demo"
                >
                    <span className="text-[14px] md:text-[16px]">
                        {label}
                    </span>
                    <span className="text-base md:text-lg">{arrow}</span>
                </button>
            </div>
        </div>
    );
}

