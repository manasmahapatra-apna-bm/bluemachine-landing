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
 * Base minimum height for mobile reason components in pixels
 * Used as a fallback minimum height to prevent layout shifts during expand/collapse
 * Can be tweaked as needed for optimal mobile layout
 */
export const MOBILE_REASON_BASE_MIN_HEIGHT_PX = 600;

/**
 * Complete list of all why choose us reasons with their breakdowns
 * Each reason contains icon, header, image alignment preference, and breakdown items
 */
export const WHY_CHOOSE_US_REASONS: readonly WhyChooseUsReasonData[] = [
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/HumanGradeConversation.svg',
        reasonHeader: 'AI Orchestration Layer',
        imageAlignment: ImageAlignment.RIGHT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Deterministic Model Orchestration',
                reasonBreakdownDescription: 'A hardened control plane coordinates STT → LLM → TTS pipelines in real time for stable, enterprise-grade conversations.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason1.png',
            },
            {
                reasonBreakdownTitle: 'Multilingual & Dialect Precision',
                reasonBreakdownDescription: 'The runtime stabilizes code-switching and dialect variations so conversations stay accurate under any linguistic load.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason3.png',
            },
            {
                reasonBreakdownTitle: 'Controlled LLM Execution',
                reasonBreakdownDescription: 'Deterministic guardrails constrain LLM outputs into predictable, policy-aligned behavior for regulated industries.',
                reasonDescriptionImage: 'https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/bm-export_0005_1c.webp',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/ControlPanel.svg',
        reasonHeader: 'Enterprise-Grade Reliability & Compliance',
        imageAlignment: ImageAlignment.LEFT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Hot-Swap Disaster Recovery',
                reasonBreakdownDescription: 'If any model or vendor fails, calls instantly switch to a live backup path with zero interruption',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason2.png',
            },
            {
                reasonBreakdownTitle: 'Built-In Compliance Guardrails',
                reasonBreakdownDescription: 'Compliance rules for SEBI, TRAI, IRDAI, FAA, and healthcare are enforced automatically at the runtime level.',
                reasonDescriptionImage: 'https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/bm-export_0004_2b.webp',
            },
            {
                reasonBreakdownTitle: 'Massive Horizontal Scalability',
                reasonBreakdownDescription: 'Distributed inference and multi-region routing let the system scale to nationwide volumes without performance loss.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason3.png',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/FastestDeployment.svg',
        reasonHeader: 'Fastest Deployment in the Industry',
        imageAlignment: ImageAlignment.RIGHT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Prebuilt Enterprise Connectors',
                reasonBreakdownDescription: '1,000+ deep enterprise connectors allow systems to integrate in minutes with minimal configuration.',
                reasonDescriptionImage: 'https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/bm-export_0003_3a.webp',
            },
            {
                reasonBreakdownTitle: 'Auto-Write Custom Integrations',
                reasonBreakdownDescription: 'Custom integration logic and data mappings are auto-generated, eliminating months of manual engineering work.',
                reasonDescriptionImage: 'https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/bm-export_0002_3b.webp',
            },
            {
                reasonBreakdownTitle: 'Instant Enterprise Setup',
                reasonBreakdownDescription: 'Most deployments require only access credentials, enabling teams to go live without heavy IT involvement.',
                reasonDescriptionImage: 'https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/bm-export_0001_3c.webp',
            },
        ],
    },
    {
        reasonIcon: '/SVGs/WhyChooseUsIcons/GovernanceLayer.svg',
        reasonHeader: 'Autonomous Eval & Data Operations Layer',
        imageAlignment: ImageAlignment.LEFT,
        reasonBreakdowns: [
            {
                reasonBreakdownTitle: 'Automatic CRM Data Updates',
                reasonBreakdownDescription: 'The system extracts outcomes from every conversation and writes clean, structured data back into enterprise CRMs.',
                reasonDescriptionImage: 'https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/bm-export_0000_4a.webp',
            },
            {
                reasonBreakdownTitle: 'Real-Time Policy Detection',
                reasonBreakdownDescription: 'Policy violations are identified instantly, logged with full audit trails, and routed to reviewers before they become compliance risks.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason2.png',
            },
            {
                reasonBreakdownTitle: 'Live Compliance Dashboards',
                reasonBreakdownDescription: 'Operational signals and exceptions are visualized instantly, giving CIOs a live control cockpit for Voice AI operations.',
                reasonDescriptionImage: '/Images/WhyChooseUsReasonImages/WhyChooseUsReason1.png',
            },
        ],
    },
] as const;

