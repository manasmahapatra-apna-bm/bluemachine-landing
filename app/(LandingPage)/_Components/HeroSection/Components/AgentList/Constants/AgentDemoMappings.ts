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
        agentThumbnailDesktopImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/US%20insurance.png",
        agentThumbnailMobileImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/US%20insurance.png",
        agentDemoVideoURL: 'https://descriptusercontent.com/published/9bfcb4ad-88e6-4cbc-881b-d2f34f2b42b0/original.mp4',
        agentDemoCaption: 'Cart Abandonment',
    },
    {
        agentName: 'Customer Support - Airline',
        agentThumbnailDesktopImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Customer%20Support%20-%20Airline.png",
        agentThumbnailMobileImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Customer%20Support%20-%20Airline.png",
        agentDemoVideoURL: 'https://descriptusercontent.com/published/2d022d87-99b3-4ca9-93e3-07f5d1ec2891/original.mp4',
        agentDemoCaption: 'Customer Support',
    },
    {
        agentName: 'Medicine Replenishment - Healthcare',
        agentThumbnailDesktopImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Medicine%20Replenishment%20-%20Healthcare.png",
        agentThumbnailMobileImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Medicine%20Replenishment%20-%20Healthcare.png",
        agentDemoVideoURL: 'https://descriptusercontent.com/published/3edf15ce-c2c3-4505-ba15-5bf6093dd66d/original.mp4',
        agentDemoCaption: 'Medicine Replenishment',
    },
    {
        agentName: 'Mutual Fund Sales - BFSI',
        agentThumbnailDesktopImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Mutual%20Fund%20Sales%20-%20BFSI.png",
        agentThumbnailMobileImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Mutual%20Fund%20Sales%20-%20BFSI.png",
        agentDemoVideoURL: 'https://descriptusercontent.com/published/8d7f6aae-291b-4aa9-916b-553982761c9f/original.mp4',
        agentDemoCaption: 'Mutual Fund Sales',
    },
    {
        agentName: 'Technical Support - Home Appliances',
        agentThumbnailDesktopImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Technical%20Support%20-%20Home%20Appliances.png",
        agentThumbnailMobileImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Technical%20Support%20-%20Home%20Appliances.png",
        agentDemoVideoURL: 'https://descriptusercontent.com/published/4fd3ea20-19d5-4930-ae61-aadadd3accc7/original.mp4',
        agentDemoCaption: 'Technical Support',
    },
    {
        agentName: 'Debt Recovery - US BFSI',
        agentThumbnailDesktopImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Debt%20Collection%20-%20US%20Recovery.png",
        agentThumbnailMobileImageURL: "https://storage.googleapis.com/mumbai_apnatime_prod/cloudinary/bluemachines-landing/Debt%20Collection%20-%20US%20Recovery.png",
        agentDemoVideoURL: 'https://descriptusercontent.com/published/277ca950-a22e-44c9-8f43-937c4713278a/original.mp4',
        agentDemoCaption: 'Debt Recovery',
    },
] as const;

