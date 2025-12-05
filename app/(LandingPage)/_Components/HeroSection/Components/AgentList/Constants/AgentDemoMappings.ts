export interface AgentDemoMapping {
    agentName: string;
    agentThumbnailDesktopImageURL: string | null;
    agentThumbnailMobileImageURL: string | null;
    agentDemoVideoURL: string;
    agentDemoCaption: string;
}

export const AGENT_DEMO_MAPPINGS: AgentDemoMapping[] = [
    {
        agentName: 'US Insurance',
        agentThumbnailDesktopImageURL: null,
        agentThumbnailMobileImageURL: null,
        agentDemoVideoURL: 'https://descriptusercontent.com/published/9bfcb4ad-88e6-4cbc-881b-d2f34f2b42b0/original.mp4',
        agentDemoCaption: 'Cart Abandonment',
    },
    {
        agentName: 'Customer Support - Airline',
        agentThumbnailDesktopImageURL: null,
        agentThumbnailMobileImageURL: null,
        agentDemoVideoURL: 'https://descriptusercontent.com/published/2d022d87-99b3-4ca9-93e3-07f5d1ec2891/original.mp4',
        agentDemoCaption: 'Customer Support',
    },
    {
        agentName: 'Medicine Replenishment - Healthcare',
        agentThumbnailDesktopImageURL: null,
        agentThumbnailMobileImageURL: null,
        agentDemoVideoURL: 'https://descriptusercontent.com/published/3edf15ce-c2c3-4505-ba15-5bf6093dd66d/original.mp4',
        agentDemoCaption: 'Medicine Replenishment',
    },
    {
        agentName: 'Mutual Fund Sales - BFSI',
        agentThumbnailDesktopImageURL: null,
        agentThumbnailMobileImageURL: null,
        agentDemoVideoURL: 'https://descriptusercontent.com/published/8d7f6aae-291b-4aa9-916b-553982761c9f/original.mp4',
        agentDemoCaption: 'Mutual Fund Sales',
    },
    {
        agentName: 'Technical Support - Home Appliances',
        agentThumbnailDesktopImageURL: null,
        agentThumbnailMobileImageURL: null,
        agentDemoVideoURL: 'https://descriptusercontent.com/published/4fd3ea20-19d5-4930-ae61-aadadd3accc7/original.mp4',
        agentDemoCaption: 'Technical Support',
    },
    {
        agentName: 'Debt Recovery - US BFSI',
        agentThumbnailDesktopImageURL: null,
        agentThumbnailMobileImageURL: null,
        agentDemoVideoURL: 'https://descriptusercontent.com/published/277ca950-a22e-44c9-8f43-937c4713278a/original.mp4',
        agentDemoCaption: 'Debt Recovery',
    },
] as const;

