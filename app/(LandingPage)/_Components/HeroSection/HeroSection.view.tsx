'use client';

import Image from 'next/image';
import HeroCTA from './Components/HeroCTA';
import AgentList from './Components/AgentList';
import { HERO_STYLES } from './Constants/HeroConstants';

interface HeroSectionViewProps {
    headline: string;
    supportingText: string;
    ctaText: string;
    ctaArrow: string;
    onCTAClick: () => void;
}

export function HeroSectionView({
    headline,
    supportingText,
    ctaText,
    ctaArrow,
    onCTAClick,
}: HeroSectionViewProps): React.ReactElement {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center pt-[140px] pb-32 overflow-hidden"
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
            <div className={`relative z-10 ${HERO_STYLES.MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center ${HERO_STYLES.SPACING.ELEMENT_GAP}`}>
                {/* Headline */}
                <h1
                    className="text-white font-normal text-center leading-tight"
                    style={{
                        fontSize: '50px',
                    }}
                >
                    {headline}
                </h1>

                {/* CTA Button */}
                <div>
                    <HeroCTA onClick={onCTAClick} text={ctaText} arrow={ctaArrow} />
                </div>

                {/* Divider */}
                <div className="w-full flex justify-center pt-0">
                    <div
                        className="rounded-xl"
                        style={{
                            width: '78px',
                            height: '4px',
                            background: 'linear-gradient(99deg, #B2E6D6 0.18%, #8CC7FF 100.18%)',
                        }}
                    />
                </div>

                {/* Supporting Text */}
                <div className="w-full mt-0">
                    <p
                        className="text-white text-center"
                        style={{
                            fontSize: '26px',
                        }}
                    >
                        {supportingText}
                    </p>
                </div>

                {/* Agent List */}
                <div className="w-full">
                    <AgentList />
                </div>
            </div>
        </section>
    );
}

