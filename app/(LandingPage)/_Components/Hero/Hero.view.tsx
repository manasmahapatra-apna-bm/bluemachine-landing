'use client';

interface HeroViewProps {
    headline: string;
    subheadline: string;
    ctaText: string;
    onCTAClick: () => void;
}

export function HeroView({ headline, subheadline, ctaText, onCTAClick }: HeroViewProps): React.ReactElement {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16"
            aria-label="Hero section"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                        {headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {subheadline}
                    </p>
                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={onCTAClick}
                            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                            aria-label="Get started"
                        >
                            {ctaText}
                            <svg
                                className="ml-2 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
