'use client';

import Image from 'next/image';
import RequestDemoButton from './Components/RequestDemoButton';
import type { FooterNavLink, SocialMediaLink, CertificationBadge } from './Constants/FooterConstants';

interface FooterViewProps {
    logoPath: string;
    tagline: string;
    requestDemoLabel: string;
    navLinks: readonly FooterNavLink[];
    socialMediaLinks: readonly SocialMediaLink[];
    certificationBadges: readonly CertificationBadge[];
    copyright: string;
    onNavClick: (url: string) => void;
    onSocialClick: (url: string) => void;
    onRequestDemo: () => void;
}

/**
 * Footer component view
 * 
 * Displays certification badges, company branding, navigation links,
 * social media icons, and copyright notice. Fully responsive with
 * mobile-first design.
 */
export function FooterView({
    logoPath,
    tagline,
    requestDemoLabel,
    navLinks,
    socialMediaLinks,
    certificationBadges,
    copyright,
    onNavClick,
    onSocialClick,
    onRequestDemo,
}: FooterViewProps): React.ReactElement {
    return (
        <footer
            className="w-full px-4 sm:px-6 lg:px-20 pt-8 lg:pt-20"
            style={{ backgroundColor: '#061B2D' }}
            aria-label="Site footer"
        >
            <div className="max-w-[1920px] mx-auto">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 lg:gap-16 mb-12">
                    {/* Left Column */}
                    <div className="flex flex-col items-start space-y-6">
                        {/* Certification Badges */}
                        <div className="flex items-center gap-4">
                            {certificationBadges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0"
                                >
                                    <Image
                                        src={badge.imagePath}
                                        alt={badge.altText}
                                        width={80}
                                        height={80}
                                        className="object-contain p-2"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0 mt-2">
                            <Image
                                src={logoPath}
                                alt="Blue Machines Logo"
                                width={186}
                                height={28}
                                className="h-7 w-auto"
                            />
                        </div>

                        {/* Tagline */}
                        <p className="text-white text-base lg:text-lg text-left max-w-md">
                            {tagline}
                        </p>

                        {/* Request Demo Button */}
                        <div className="w-full md:w-auto">
                            <RequestDemoButton label={requestDemoLabel} onClick={onRequestDemo} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-start md:items-end space-y-8">
                        {/* Navigation Links */}
                        <nav aria-label="Footer navigation">
                            <ul className="flex flex-col items-start md:items-end space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={link.url}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onNavClick(link.url);
                                            }}
                                            className="text-white text-base lg:text-lg hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061B2D] rounded"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-4">
                            {socialMediaLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSocialClick(social.url);
                                    }}
                                    className="flex items-center justify-center transition-opacity duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#061B2D] rounded"
                                >
                                    <Image
                                        src={social.iconPath}
                                        alt={social.altText}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                </a>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/20 -mx-4 sm:-mx-6 lg:-mx-20 px-4 sm:px-6 lg:px-20 flex items-center justify-center h-[52px] lg:h-[70px]">
                    <p className="text-white text-sm text-center opacity-80">
                        {copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}

