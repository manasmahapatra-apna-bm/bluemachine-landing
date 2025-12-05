'use client';

import Image from 'next/image';
import RequestDemoButton from './Components/RequestDemoButton';

interface HeaderViewProps {
    logoPath: string;
    requestDemoLabel: string;
    requestDemoArrow: string;
    onRequestDemo: () => void;
    isDarkTintActive: boolean;
}

export function HeaderView({
    logoPath,
    requestDemoLabel,
    requestDemoArrow,
    onRequestDemo,
    isDarkTintActive,
}: HeaderViewProps): React.ReactElement {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-3 md:px-6 lg:px-8 pt-2 md:pt-4 pointer-events-none">
            <nav
                className="liquid-glass mx-auto rounded-full px-3 sm:px-4 md:px-8 flex items-center justify-between pointer-events-auto w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-[80vw] lg:w-[80vw] max-w-full h-16 md:h-[4.5rem]"
                style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    backgroundColor: isDarkTintActive 
                        ? 'rgba(0, 0, 0, 0.25)' 
                        : 'rgba(255, 255, 255, 0)',
                    transition: 'background-color 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                aria-label="Main navigation"
            >
                <div className="flex-shrink-0 flex items-center">
                    <Image
                        src={logoPath}
                        alt="Blue Machines Logo"
                        width={186}
                        height={28}
                        priority
                        className="w-auto"
                        style={{
                            height: 'clamp(0.75rem, 1.5vw + 0.5rem, 1.75rem)',
                        }}
                    />
                </div>

                <div className="flex-shrink-0 flex items-center mr-2 md:mr-[-1.25rem]">
                    <RequestDemoButton onClick={onRequestDemo} label={requestDemoLabel} arrow={requestDemoArrow} />
                </div>
            </nav>
        </header>
    );
}

