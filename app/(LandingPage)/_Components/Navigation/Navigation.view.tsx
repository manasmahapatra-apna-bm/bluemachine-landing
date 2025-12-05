'use client';

interface NavItem {
    id: string;
    label: string;
}

interface NavigationViewProps {
    navItems: NavItem[];
    activeSection: string;
    isMobileMenuOpen: boolean;
    onNavClick: (sectionId: string) => void;
    onToggleMobileMenu: () => void;
    onKeyDown: (event: React.KeyboardEvent, sectionId: string) => void;
}

import React from 'react';

export function NavigationView({
    navItems,
    activeSection,
    isMobileMenuOpen,
    onNavClick,
    onToggleMobileMenu,
    onKeyDown,
}: NavigationViewProps): React.ReactElement {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a
                            href="#hero"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavClick('hero');
                            }}
                            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                            aria-label="Go to home section"
                        >
                            BlueMachine
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavClick(item.id);
                                }}
                                onKeyDown={(e) => onKeyDown(e, item.id)}
                                className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                                    activeSection === item.id
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                                }`}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                        aria-controls="mobile-menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle mobile menu"
                        onClick={onToggleMobileMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMobileMenuOpen ? (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavClick(item.id);
                                }}
                                onKeyDown={(e) => onKeyDown(e, item.id)}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                                    activeSection === item.id
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
