'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ResourceQueue } from '../utils/resourceQueue';
import type { ImageLoadRequest, ResourcePriority } from '../types/ResourcePriority';
import { ResourceType } from '../types/ResourcePriority';
import { useHeroViewport } from './useHeroViewport';

/**
 * Hook return type for image loading state
 */
export interface UseImageLoaderReturn {
    /**
     * Check if an image is loaded
     */
    isImageLoaded: (id: string) => boolean;
    
    /**
     * Check if an image is currently loading
     */
    isImageLoading: (id: string) => boolean;
    
    /**
     * Request an image to be loaded with specified priority
     */
    loadImage: (id: string, url: string, priority: ResourcePriority, options?: {
        onLoad?: () => void;
        onError?: (error: Error) => void;
        cancellable?: boolean;
    }) => void;
    
    /**
     * Cancel an image load request
     */
    cancelImage: (id: string) => void;
    
    /**
     * Cancel all images matching a filter
     */
    cancelAllImages: (filter: (id: string) => boolean) => void;
}

/**
 * Custom hook for intelligent image loading with priority management
 * 
 * Manages image loading queue with priorities, viewport awareness, and cancellation.
 * Integrates with Next.js Image component and Fetch Priority API.
 * 
 * @returns Image loader functions and state
 */
export function useImageLoader(): UseImageLoaderReturn {
    const queueRef = useRef<ResourceQueue>(new ResourceQueue());
    const loadingImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
    const { isHeroVisible } = useHeroViewport();

    /**
     * Process next image in queue
     */
    const processQueue = useCallback((): void => {
        const queue = queueRef.current;
        const nextRequest = queue.getNext();

        if (!nextRequest) {
            return;
        }

        /**
         * Skip if already loaded or cancelled
         */
        if (queue.isLoaded(nextRequest.id) || queue.isCancelled(nextRequest.id)) {
            processQueue();
            return;
        }

        /**
         * Create image element for preloading
         */
        const img = new Image();
        loadingImagesRef.current.set(nextRequest.id, img);

        /**
         * Handle successful load
         */
        img.onload = (): void => {
            queue.markLoaded(nextRequest.id);
            loadingImagesRef.current.delete(nextRequest.id);
            nextRequest.onLoad?.();
            
            /**
             * Process next item in queue
             */
            processQueue();
        };

        /**
         * Handle load error
         */
        img.onerror = (): void => {
            const error = new Error(`Failed to load image: ${nextRequest.url}`);
            queue.markFailed(nextRequest.id);
            loadingImagesRef.current.delete(nextRequest.id);
            nextRequest.onError?.(error);
            
            /**
             * Process next item in queue
             */
            processQueue();
        };

        /**
         * Set fetch priority if supported
         * Maps priority levels to fetchPriority values
         */
        if ('fetchPriority' in img) {
            const fetchPriorityMap: Record<ResourcePriority, 'high' | 'low' | 'auto'> = {
                CRITICAL: 'high',
                HIGH: 'high',
                MEDIUM: 'auto',
                LOW: 'low',
                LAZY: 'low',
            };
            (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 
                fetchPriorityMap[nextRequest.priority];
        }

        /**
         * Start loading image
         */
        img.src = nextRequest.url;
    }, []);

    /**
     * Request an image to be loaded
     */
    const loadImage = useCallback((
        id: string,
        url: string,
        priority: ResourcePriority,
        options?: {
            onLoad?: () => void;
            onError?: (error: Error) => void;
            cancellable?: boolean;
        }
    ): void => {
        const request: ImageLoadRequest = {
            id,
            url,
            priority,
            type: ResourceType.IMAGE,
            ...(options?.onLoad && { onLoad: options.onLoad }),
            ...(options?.onError && { onError: options.onError }),
            cancellable: options?.cancellable ?? true,
        };

        queueRef.current.add(request);
        
        /**
         * Process queue immediately for high priority requests
         */
        if (priority === 'CRITICAL' || priority === 'HIGH') {
            processQueue();
        } else {
            /**
             * Use requestIdleCallback for lower priority requests
             */
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                window.requestIdleCallback(processQueue, { timeout: 1000 });
            } else {
                /**
                 * Fallback for browsers without requestIdleCallback
                 */
                setTimeout(processQueue, 100);
            }
        }
    }, [processQueue]);

    /**
     * Cancel an image load request
     */
    const cancelImage = useCallback((id: string): void => {
        const queue = queueRef.current;
        const img = loadingImagesRef.current.get(id);
        
        /**
         * Remove image element if loading
         */
        if (img) {
            img.onload = null;
            img.onerror = null;
            img.src = '';
            loadingImagesRef.current.delete(id);
        }
        
        /**
         * Cancel in queue
         */
        queue.cancel(id);
    }, []);

    /**
     * Cancel all images matching a filter
     */
    const cancelAllImages = useCallback((filter: (id: string) => boolean): void => {
        const queue = queueRef.current;
        
        /**
         * Cancel all matching requests
         */
        queue.cancelAll((request) => filter(request.id));
        
        /**
         * Cancel any currently loading images
         */
        loadingImagesRef.current.forEach((img, id) => {
            if (filter(id)) {
                img.onload = null;
                img.onerror = null;
                img.src = '';
                loadingImagesRef.current.delete(id);
            }
        });
    }, []);

    /**
     * Cancel agent thumbnails when hero exits viewport
     */
    useEffect(() => {
        if (!isHeroVisible) {
            /**
             * Cancel all agent thumbnail loads
             * Agent thumbnail IDs follow pattern: agent-thumbnail-{index}
             */
            cancelAllImages((id) => id.startsWith('agent-thumbnail-'));
        }
    }, [isHeroVisible, cancelAllImages]);

    /**
     * Process queue on mount and when queue changes
     */
    useEffect(() => {
        /**
         * Initial queue processing
         */
        processQueue();
        
        /**
         * Set up interval to process queue periodically
         * This handles cases where requestIdleCallback isn't available
         */
        const interval = setInterval(() => {
            if (queueRef.current.getQueueSize() > 0 && queueRef.current.getLoadingCount() < 3) {
                processQueue();
            }
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [processQueue]);

    return {
        isImageLoaded: (id: string) => queueRef.current.isLoaded(id),
        isImageLoading: (id: string) => queueRef.current.isLoading(id),
        loadImage,
        cancelImage,
        cancelAllImages,
    };
}

