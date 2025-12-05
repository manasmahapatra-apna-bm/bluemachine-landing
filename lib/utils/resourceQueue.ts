import type { ImageLoadRequest } from '../types/ResourcePriority';
import { PRIORITY_VALUES } from '../types/ResourcePriority';

/**
 * Resource queue manager for prioritized image loading
 * 
 * Manages a priority queue of image loading requests and processes them
 * in order of priority. Supports sequential loading patterns and cancellation.
 */
export class ResourceQueue {
    private queue: ImageLoadRequest[] = [];
    private loading: Set<string> = new Set();
    private loaded: Set<string> = new Set();
    private failed: Set<string> = new Set();
    private cancelled: Set<string> = new Set();
    private maxConcurrentLoads: number = 3;

    /**
     * Add an image load request to the queue
     * 
     * @param request - Image load request to add
     */
    add(request: ImageLoadRequest): void {
        /**
         * Skip if already loaded, failed, or cancelled
         */
        if (
            this.loaded.has(request.id) ||
            this.failed.has(request.id) ||
            this.cancelled.has(request.id)
        ) {
            return;
        }

        /**
         * Remove existing request with same ID if present
         */
        this.queue = this.queue.filter((item) => item.id !== request.id);

        /**
         * Add new request and sort by priority
         */
        this.queue.push(request);
        this.queue.sort((a, b) => PRIORITY_VALUES[a.priority] - PRIORITY_VALUES[b.priority]);
    }

    /**
     * Remove a request from the queue and mark as cancelled
     * 
     * @param id - Request ID to cancel
     */
    cancel(id: string): void {
        this.queue = this.queue.filter((item) => item.id !== id);
        this.loading.delete(id);
        this.cancelled.add(id);
    }

    /**
     * Cancel all requests matching a filter function
     * 
     * @param filter - Function to determine which requests to cancel
     */
    cancelAll(filter: (request: ImageLoadRequest) => boolean): void {
        const toCancel = this.queue.filter(filter);
        toCancel.forEach((request) => {
            this.cancel(request.id);
        });
    }

    /**
     * Get next request to process based on priority
     * Returns null if queue is empty or max concurrent loads reached
     * 
     * @returns Next request to process or null
     */
    getNext(): ImageLoadRequest | null {
        /**
         * Check if we can start a new load
         */
        if (this.queue.length === 0 || this.loading.size >= this.maxConcurrentLoads) {
            return null;
        }

        /**
         * Get highest priority request
         */
        const request = this.queue.shift();
        if (!request) {
            return null;
        }

        /**
         * Mark as loading
         */
        this.loading.add(request.id);
        return request;
    }

    /**
     * Mark a request as successfully loaded
     * 
     * @param id - Request ID that loaded successfully
     */
    markLoaded(id: string): void {
        this.loading.delete(id);
        this.loaded.add(id);
    }

    /**
     * Mark a request as failed
     * 
     * @param id - Request ID that failed
     */
    markFailed(id: string): void {
        this.loading.delete(id);
        this.failed.add(id);
    }

    /**
     * Check if a request is already loaded
     * 
     * @param id - Request ID to check
     * @returns True if loaded
     */
    isLoaded(id: string): boolean {
        return this.loaded.has(id);
    }

    /**
     * Check if a request is currently loading
     * 
     * @param id - Request ID to check
     * @returns True if loading
     */
    isLoading(id: string): boolean {
        return this.loading.has(id);
    }

    /**
     * Check if a request has failed
     * 
     * @param id - Request ID to check
     * @returns True if failed
     */
    hasFailed(id: string): boolean {
        return this.failed.has(id);
    }

    /**
     * Check if a request was cancelled
     * 
     * @param id - Request ID to check
     * @returns True if cancelled
     */
    isCancelled(id: string): boolean {
        return this.cancelled.has(id);
    }

    /**
     * Get queue size
     * 
     * @returns Number of pending requests
     */
    getQueueSize(): number {
        return this.queue.length;
    }

    /**
     * Get number of currently loading requests
     * 
     * @returns Number of active loads
     */
    getLoadingCount(): number {
        return this.loading.size;
    }

    /**
     * Clear all requests from queue
     */
    clear(): void {
        this.queue = [];
    }

    /**
     * Reset all state (useful for testing)
     */
    reset(): void {
        this.queue = [];
        this.loading.clear();
        this.loaded.clear();
        this.failed.clear();
        this.cancelled.clear();
    }
}

