'use client';

import InvestorIconsCarousel from './Components/InvestorIconsCarousel';

interface InvestorSectionViewProps {
    heading: string;
}

export function InvestorSectionView({ heading }: InvestorSectionViewProps): React.ReactElement {
    return (
        <section
            id="investor"
            className="w-full py-8 md:py-16 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: '#E2EBFC' }}
            aria-label="Investor section"
        >
            <div className="max-w-[1920px] mx-auto flex flex-col items-center space-y-4 md:space-y-8">
                {/* Heading */}
                <h2 className="text-gray-900 font-normal text-center text-[1.25rem] md:text-[26px] leading-tight">
                    {heading}
                </h2>

                {/* Divider */}
                <div className="w-full flex justify-center">
                    <div
                        className="rounded-xl md:w-[4.875rem] md:h-[0.25rem]"
                        style={{
                            width: '3.5rem',
                            height: '0.1875rem',
                            background: 'linear-gradient(99deg, #B2E6D6 0.18%, #8CC7FF 100.18%)',
                        }}
                    />
                </div>

                {/* Icons Carousel */}
                <div className="w-full">
                    <InvestorIconsCarousel />
                </div>
            </div>
        </section>
    );
}

