'use client';

interface HeroCTAViewProps {
    onClick: () => void;
    text: string;
    arrow: string;
}

export function HeroCTAView({ onClick, text, arrow }: HeroCTAViewProps): React.ReactElement {
    return (
        <div className="relative inline-block">
            {/* Background Glow */}
            <div
                className="absolute inset-0 rounded-full blur-xl opacity-60"
                style={{
                    background: 'linear-gradient(135deg, #B2E6D6 0%, #8CC7FF 100%)',
                    transform: 'scale(1.2)',
                    zIndex: 0,
                }}
            />
            
            {/* Rotating Gradient Border Background - slightly larger than button */}
            <div
                className="absolute rounded-full animate-gradient-rotate"
                style={{
                    top: '-0.0625rem',
                    left: '-0.0625rem',
                    right: '-0.0625rem',
                    bottom: '-0.0625rem',
                    zIndex: 1,
                }}
            />
            
            {/* Button Container */}
            <div
                className="relative rounded-full px-8 py-4 overflow-hidden"
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
                    className="relative z-10 text-gray-900 font-semibold text-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                    aria-label="Request a demo"
                >
                    <span>{text}</span>
                    <span className="text-xl">{arrow}</span>
                </button>
            </div>
        </div>
    );
}
