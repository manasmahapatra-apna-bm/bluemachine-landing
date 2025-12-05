export interface FooterNavLink {
    id: string;
    label: string;
    url: string;
}

export interface SocialMediaLink {
    id: string;
    iconPath: string;
    altText: string;
    url: string;
}

export interface CertificationBadge {
    id: string;
    imagePath: string;
    altText: string;
}

/**
 * Footer navigation links
 * Placeholder URLs ready to be replaced with actual links
 */
export const FOOTER_NAV_LINKS: readonly FooterNavLink[] = [
    { id: 'about', label: 'About', url: '#' },
    { id: 'privacyPolicy', label: 'Privacy Policy', url: '#' },
    { id: 'joinTeam', label: 'Join the team', url: '#' },
] as const;

/**
 * Social media links
 * Placeholder URLs ready to be replaced with actual links
 */
export const SOCIAL_MEDIA_LINKS: readonly SocialMediaLink[] = [
    { id: 'linkedin', iconPath: '/Images/FooterImages/SocialLinkedIn.png', altText: 'LinkedIn', url: '#' },
    { id: 'x', iconPath: '/Images/FooterImages/SocialX.png', altText: 'X (Twitter)', url: '#' },
] as const;

/**
 * Certification badges displayed in footer
 */
export const CERTIFICATION_BADGES: readonly CertificationBadge[] = [
    { id: 'soc2', imagePath: '/Images/FooterImages/SOC2.png', altText: 'AICPA SOC 2' },
    { id: 'iso', imagePath: '/Images/FooterImages/ISO.png', altText: 'ISO Certification' },
] as const;

