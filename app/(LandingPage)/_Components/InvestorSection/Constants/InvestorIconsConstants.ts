export interface InvestorIcon {
    name: string;
    svgPath: string;
    altText: string;
}

export const INVESTOR_ICONS: readonly InvestorIcon[] = [
    { name: 'Google', svgPath: '/SVGs/InvestorIcons/Google.svg', altText: 'Google' },
    { name: 'Apple', svgPath: '/SVGs/InvestorIcons/Apple.svg', altText: 'Apple' },
    { name: 'Amazon', svgPath: '/SVGs/InvestorIcons/Amazon.svg', altText: 'Amazon' },
    { name: 'Intel', svgPath: '/SVGs/InvestorIcons/Intel.svg', altText: 'Intel' },
    { name: 'Uber', svgPath: '/SVGs/InvestorIcons/Uber.svg', altText: 'Uber' },
] as const;

