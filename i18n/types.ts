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
    | 'contactForm'
    | 'footer';

export interface AgentInfo {
    name: string;
    caption: string;
}

export type Translations = {
    header: {
        requestDemo: string;
        arrow: string;
    };
    heroSection: {
        headline: string;
        description: string;
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
    contactForm: {
        title: string;
        subtitle: string;
        fields: {
            name: string;
            phone: string;
            email: string;
            company: string;
        };
        cta: string;
        ctaSubmitting: string;
        success: {
            title: string;
            message: string;
            done: string;
        };
        errors: {
            nameRequired: string;
            nameInvalid: string;
            phoneRequired: string;
            phoneInvalid: string;
            emailRequired: string;
            emailInvalid: string;
            companyRequired: string;
            companyInvalid: string;
        };
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
