'use client';

import { triggerHapticFeedback } from '@/lib/utils/hapticFeedback';

interface HeroCTAViewProps {
    onClick: () => void;
    text: string;
    arrow: string;
}

export function HeroCTAView({ onClick, text, arrow }: HeroCTAViewProps): React.ReactElement {
    return (
        <div className="relative inline-block overflow-hidden rounded-full">
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
                    overflow: 'hidden',
                }}
            />
            
            {/* Button Container */}
            <div
                className="relative rounded-full px-8 py-4 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #B2E6D6 0%, #8CC7FF 100%)',
                    zIndex: 2,
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                }}
            >
                {/* White overlay for button content */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full" />
                
                {/* Button Content */}
                <div
                    onClick={() => {
                        triggerHapticFeedback();
                        onClick();
                    }}
                    className="relative z-10 text-gray-900 font-semibold text-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 cursor-pointer"
                    style={{
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                        background: 'transparent',
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
                    aria-label="Request a demo"
                >
                    <span>{text}</span>
                    <span className="text-xl">{arrow}</span>
                </div>
            </div>
        </div>
    );
}
