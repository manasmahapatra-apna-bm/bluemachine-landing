export interface BuilderIcon {
    name: string;
    svgPath: string;
    altText: string;
}

export const BUILDER_ICONS: readonly BuilderIcon[] = [
    { name: 'Google', svgPath: '/SVGs/BuilderIcons/Google.svg', altText: 'Google' },
    { name: 'Apple', svgPath: '/SVGs/BuilderIcons/Apple.svg', altText: 'Apple' },
    { name: 'Amazon', svgPath: '/SVGs/BuilderIcons/Amazon.svg', altText: 'Amazon' },
    { name: 'Intel', svgPath: '/SVGs/BuilderIcons/Intel.svg', altText: 'Intel' },
    { name: 'Uber', svgPath: '/SVGs/BuilderIcons/Uber.svg', altText: 'Uber' },
] as const;

