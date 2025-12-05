'use client';

import Image from 'next/image';
import RequestDemoButton from './Components/RequestDemoButton';

interface NavItem {
    id: string;
    label: string;
}

interface HeaderViewProps {
    logoPath: string;
    navItems: NavItem[];
    requestDemoLabel: string;
    onNavClick: (sectionId: string) => void;
    onRequestDemo: () => void;
}

export function HeaderView({
    logoPath,
    navItems,
    requestDemoLabel,
    onNavClick,
    onRequestDemo,
}: HeaderViewProps): React.ReactElement {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
            <nav
                className="mx-auto rounded-full px-8 flex items-center justify-between"
                style={{
                    width: '85vw',
                    height: '72px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(32px)',
                    WebkitBackdropFilter: 'blur(32px)',
                }}
                aria-label="Main navigation"
            >
                <div className="flex-shrink-0">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavClick('home');
                        }}
                        className="flex items-center"
                        aria-label="Blue Machines home"
                    >
                        <Image
                            src={logoPath}
                            alt="Blue Machines Logo"
                            width={186}
                            height={28}
                            priority
                            className="h-7 w-auto"
                        />
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavClick(item.id);
                            }}
                            className="relative px-4 py-2 rounded-full text-white text-base font-normal transition-all duration-300 ease-in-out group"
                        >
                            <span
                                className="absolute inset-0 rounded-full bg-gray-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            />
                            <span className="relative z-10">{item.label}</span>
                        </a>
                    ))}
                </div>

                <div className="flex-shrink-0">
                    <RequestDemoButton onClick={onRequestDemo} label={requestDemoLabel} />
                </div>
            </nav>
        </header>
    );
}

