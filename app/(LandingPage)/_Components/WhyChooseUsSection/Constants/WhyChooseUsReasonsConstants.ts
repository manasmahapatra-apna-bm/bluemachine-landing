/**
 * Image alignment options for reason components
 * Determines whether the reason image appears on the left or right side
 */
export enum ImageAlignment {
    LEFT = 'left',
    RIGHT = 'right',
}

/**
 * Individual breakdown item within a reason component
 * Contains title, description, and associated image
 */
export interface ReasonBreakdown {
    reasonBreakdownTitle: string;
    reasonBreakdownDescription: string;
    reasonDescriptionImage: string | null;
}

/**
 * Complete reason component data structure
 * Contains icon, header, image alignment, and breakdown items
 */
export interface WhyChooseUsReasonData {
    reasonIcon: string;
    reasonHeader: string;
    imageAlignment: ImageAlignment;
    reasonBreakdowns: readonly ReasonBreakdown[];
}

/**
 * Duration for gradient loader animation in milliseconds
 * This is the time each breakdown remains expanded before transitioning to the next
 */
export const BREAKDOWN_LOADER_DURATION_MS = 5000;

/**
 * Complete list of all why choose us reasons with their breakdowns
 * Each reason contains icon, header, image alignment preference, and breakdown items
 */
export const WHY_CHOOSE_US_REASONS: readonly WhyChooseUsReasonData[] = [
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/HumanGradeConversation.svg',
        reasonHeader: 'Human Grade Conversation',
        imageAlignment: ImageAlignment.RIGHT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Natural Language Understanding',
                reasonBreakdownDescription: 'Advanced NLP capabilities that understand context and intent with human-like precision.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason1.png',
            },
            {
                reasonBreakdownTitle: 'Contextual Awareness',
                reasonBreakdownDescription: 'Maintains conversation context across multiple interactions for seamless communication.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason3.png',
            },
            {
                reasonBreakdownTitle: 'Emotional Intelligence',
                reasonBreakdownDescription: 'Recognizes and responds to emotional cues to create more meaningful interactions.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason2.png',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/ControlPanel.svg',
        reasonHeader: 'Blue Machines Control Plane',
        imageAlignment: ImageAlignment.LEFT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Deterministic control',
                reasonBreakdownDescription: 'Deterministic control on top of probabilistic LLM behavior.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason2.png',
            },
            {
                reasonBreakdownTitle: 'Parallel deterministic pipelines',
                reasonBreakdownDescription: 'Execute multiple deterministic workflows simultaneously for enhanced performance.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason4.png',
            },
            {
                reasonBreakdownTitle: 'Plug-and-play modules',
                reasonBreakdownDescription: 'Easily integrate and swap components without disrupting existing workflows.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason3.png',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/EnterpriseReliability.svg',
        reasonHeader: 'Enterprise Reliability',
        imageAlignment: ImageAlignment.RIGHT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Hot-Swap DR',
                reasonBreakdownDescription: 'Calls continue seamlessly if any vendor fails.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason3.png',
            },
            {
                reasonBreakdownTitle: 'Full RBAC & encryption',
                reasonBreakdownDescription: 'Comprehensive role-based access control with end-to-end encryption for maximum security.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason5.png',
            },
            {
                reasonBreakdownTitle: 'Unlimited Scalability',
                reasonBreakdownDescription: 'Scale your infrastructure without limits to meet growing enterprise demands.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason4.png',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/FastestDeployment.svg',
        reasonHeader: 'Fastest Deployment Engine',
        imageAlignment: ImageAlignment.LEFT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Rapid Configuration',
                reasonBreakdownDescription: 'Deploy and configure your voice AI solution in minutes, not weeks.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason4.png',
            },
            {
                reasonBreakdownTitle: 'Zero-Downtime Updates',
                reasonBreakdownDescription: 'Update and deploy new features without interrupting active conversations.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason1.png',
            },
            {
                reasonBreakdownTitle: 'Automated Scaling',
                reasonBreakdownDescription: 'Automatically scale resources based on demand to ensure optimal performance.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason5.png',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/GovernanceLayer.svg',
        reasonHeader: 'Best-in-Class Eval & Governance Layer',
        imageAlignment: ImageAlignment.RIGHT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Comprehensive Monitoring',
                reasonBreakdownDescription: 'Real-time monitoring and analytics for complete visibility into system performance.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason5.png',
            },
            {
                reasonBreakdownTitle: 'Compliance Assurance',
                reasonBreakdownDescription: 'Built-in compliance tools to meet industry regulations and standards.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason2.png',
            },
            {
                reasonBreakdownTitle: 'Performance Optimization',
                reasonBreakdownDescription: 'Continuous evaluation and optimization to maintain peak system performance.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason1.png',
            },
        ],
    },
] as const;

