'use client';

import Image from 'next/image';
import AgentList from './Components/AgentList';
import { HERO_STYLES } from './Constants/HeroConstants';

interface HeroSectionViewProps {
    headline: string;
    description: string;
}

export function HeroSectionView({
    headline,
    description,
}: HeroSectionViewProps): React.ReactElement {
    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center pt-12 md:pt-[8.75rem] pb-8 md:pb-32 md:min-h-screen overflow-hidden"
            style={{ backgroundColor: '#0a1d34' }}
            aria-label="Hero section"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={HERO_STYLES.BACKGROUND_IMAGE}
                    alt="Hero background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Optional dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <div className={`relative z-10 ${HERO_STYLES.MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center`}>
                {/* Headline */}
                <h1
                    className="text-white font-semibold text-center leading-tight mt-[6.25rem] md:mt-[2.5rem] text-3xl md:text-[3.125rem]"
                >
                    {headline}
                </h1>

                {/* Description */}
                <p
                    className="text-white text-center mt-3 md:mt-4 text-base md:text-[1.375rem] w-full md:w-[60%]"
                >
                    {description}
                </p>

                {/* Agent List */}
                <div className="w-full mt-8 md:mt-12">
                    <AgentList />
                </div>
            </div>
        </section>
    );
}

