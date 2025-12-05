/**
 * Priority levels for resource loading
 * Used to determine loading order and timing for images
 */
export enum ResourcePriority {
    /**
     * Critical priority - Load immediately, above the fold content
     * Examples: Selected agent thumbnail, first reason image
     */
    CRITICAL = 'CRITICAL',
    
    /**
     * High priority - Load as soon as possible
     * Examples: First image of all reasons
     */
    HIGH = 'HIGH',
    
    /**
     * Medium priority - Load after critical/high resources
     * Examples: Next agent thumbnail, second reason images
     */
    MEDIUM = 'MEDIUM',
    
    /**
     * Low priority - Load when bandwidth allows
     * Examples: Third reason images
     */
    LOW = 'LOW',
    
    /**
     * Lazy priority - Load on demand or when idle
     * Examples: Remaining agent thumbnails, non-visible content
     */
    LAZY = 'LAZY',
}

/**
 * Resource type for loading system
 * Currently only IMAGE is supported (videos handled by browser)
 */
export enum ResourceType {
    IMAGE = 'IMAGE',
}

/**
 * Priority value mapping for sorting
 * Lower number = higher priority
 */
export const PRIORITY_VALUES: Record<ResourcePriority, number> = {
    [ResourcePriority.CRITICAL]: 0,
    [ResourcePriority.HIGH]: 1,
    [ResourcePriority.MEDIUM]: 2,
    [ResourcePriority.LOW]: 3,
    [ResourcePriority.LAZY]: 4,
};

/**
 * Image loading request structure
 */
export interface ImageLoadRequest {
    /**
     * Unique identifier for the image request
     */
    id: string;
    
    /**
     * Image URL to load
     */
    url: string;
    
    /**
     * Priority level for loading
     */
    priority: ResourcePriority;
    
    /**
     * Resource type (always IMAGE for now)
     */
    type: ResourceType;
    
    /**
     * Optional callback when image loads successfully
     */
    onLoad?: () => void;
    
    /**
     * Optional callback when image fails to load
     */
    onError?: (error: Error) => void;
    
    /**
     * Whether this request can be cancelled
     */
    cancellable?: boolean;
}

