export type TranslationKey = 
    | 'header'
    | 'heroSection'
    | 'builderSection'
    | 'investorSection'
    | 'whyChooseUsSection'
    | 'agentList'
    | 'nav'
    | 'hero'
    | 'benefits'
    | 'contact'
    | 'footer';

export interface AgentInfo {
    name: string;
    caption: string;
}

export type Translations = {
    header: {
        nav: {
            home: string;
            whyChooseUs: string;
        };
        requestDemo: string;
    };
    heroSection: {
        headline: string;
        supportingText: string;
        cta: {
            text: string;
            arrow: string;
        };
    };
    builderSection: {
        heading: string;
    };
    investorSection: {
        heading: string;
    };
    whyChooseUsSection: {
        header: string;
        subtitle: string;
    };
    agentList: {
        title: string;
        agents: AgentInfo[];
    };
    nav: {
        home: string;
        benefits: string;
        contact: string;
    };
    hero: {
        headline: string;
        subheadline: string;
        cta: string;
    };
    benefits: {
        title: string;
        subtitle: string;
        items: Array<{
            title: string;
            description: string;
        }>;
    };
    contact: {
        title: string;
        subtitle: string;
        name: string;
        email: string;
        message: string;
        submit: string;
        success: string;
        error: string;
    };
    footer: {
        tagline: string;
        requestDemo: string;
        nav: {
            about: string;
            privacyPolicy: string;
            joinTeam: string;
        };
        copyright: string;
    };
};

export type Locale = 'en';
