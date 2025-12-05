export interface AgentDemoMapping {
    agentName: string;
    agentThumbnailImageURL: string | null;
    agentDemoVideoURL: string;
    agentDemoCaption: string;
}

export const AGENT_DEMO_MAPPINGS: AgentDemoMapping[] = [
    {
        agentName: 'US Insurance',
        agentThumbnailImageURL: null,
        agentDemoVideoURL: '/videos/us-insurance-demo.mp4',
        agentDemoCaption: 'Cart Abandonment',
    },
    {
        agentName: 'Customer Support - Airline',
        agentThumbnailImageURL: null,
        agentDemoVideoURL: '/videos/customer-support-airline-demo.mp4',
        agentDemoCaption: 'Customer Support',
    },
    {
        agentName: 'Medicine Replenishment - Healthcare',
        agentThumbnailImageURL: null,
        agentDemoVideoURL: '/videos/medicine-replenishment-demo.mp4',
        agentDemoCaption: 'Medicine Replenishment',
    },
    {
        agentName: 'Mutual Fund Sales - BFSI',
        agentThumbnailImageURL: null,
        agentDemoVideoURL: '/videos/mutual-fund-sales-demo.mp4',
        agentDemoCaption: 'Mutual Fund Sales',
    },
    {
        agentName: 'Technical Support - Home Appliances',
        agentThumbnailImageURL: null,
        agentDemoVideoURL: '/videos/technical-support-demo.mp4',
        agentDemoCaption: 'Technical Support',
    },
    {
        agentName: 'Debt Recovery - US BFSI',
        agentThumbnailImageURL: null,
        agentDemoVideoURL: '/videos/debt-recovery-demo.mp4',
        agentDemoCaption: 'Debt Recovery',
    },
] as const;

