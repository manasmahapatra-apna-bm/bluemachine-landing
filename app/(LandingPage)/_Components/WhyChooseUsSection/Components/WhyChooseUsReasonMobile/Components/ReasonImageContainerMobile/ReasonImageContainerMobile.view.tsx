'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface ReasonImageContainerMobileViewProps {
    currentImagePath: string | null;
    reasonIndex: number;
    priority: boolean;
}

/**
 * Mobile image container component with alternating slide-in/slide-out animation
 * 
 * Displays the current breakdown image with smooth slide animations:
 * - Previous image slides out while new image slides in simultaneously
 * - Animation direction alternates based on reasonIndex:
 *   - Even indices (0, 2, 4...): slide in from right, slide out to left
 *   - Odd indices (1, 3, 5...): slide in from left, slide out to right
 * Both animations happen simultaneously for a seamless transition.
 */
export function ReasonImageContainerMobileView({
    currentImagePath,
    reasonIndex,
    priority,
}: ReasonImageContainerMobileViewProps): React.ReactElement {
    const [images, setImages] = useState<{ exiting: string | null; current: string | null }>({
        exiting: null,
        current: currentImagePath,
    });
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const previousPathRef = useRef<string | null>(currentImagePath);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Determine animation direction based on reason index
     * Even indices: right-to-left (slide in from right, slide out to left)
     * Odd indices: left-to-right (slide in from left, slide out to right)
     */
    const isRightToLeftAnimation = reasonIndex % 2 === 0;

    /**
     * Handle image changes with simultaneous slide-out and slide-in animations
     * Maintains the same dual-image pattern as desktop version
     */
    useEffect(() => {
        if (currentImagePath !== previousPathRef.current) {
            const previousPath = previousPathRef.current;
            
            /**
             * Clear any existing timeout
             */
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            /**
             * Step 1: Set both images - exiting (previous) and current (new)
             * This ensures both are in the DOM for simultaneous animation
             */
            setImages({
                exiting: previousPath,
                current: currentImagePath,
            });
            
            /**
             * Step 2: Reset animation state
             */
            setIsAnimating(false);
            
            /**
             * Step 3: Start animation after ensuring both images are rendered in DOM
             * Small delay allows React to complete rendering before animation begins
             */
            const startTimeout = setTimeout(() => {
                /**
                 * Force browser reflow by accessing offsetHeight
                 * This ensures both images are fully rendered before animation starts
                 */
                if (typeof document !== 'undefined') {
                    document.body.offsetHeight;
                }
                
                setIsAnimating(true);
            }, 100);

            /**
             * Clean up exiting image after animation completes
             * Total timeout: 100ms start delay + 850ms animation + 100ms buffer = 1050ms
             */
            animationTimeoutRef.current = setTimeout(() => {
                setImages({
                    exiting: null,
                    current: currentImagePath,
                });
                setIsAnimating(false);
                previousPathRef.current = currentImagePath;
            }, 1050);

            return () => {
                clearTimeout(startTimeout);
                if (animationTimeoutRef.current) {
                    clearTimeout(animationTimeoutRef.current);
                }
            };
        } else if (currentImagePath && currentImagePath !== images.current) {
            /**
             * Update current image if it changed but no animation needed
             * This handles initial load or when image path changes without previous image
             */
            setImages({
                exiting: null,
                current: currentImagePath,
            });
            previousPathRef.current = currentImagePath;
        }
        return undefined;
    }, [currentImagePath, images.current]);

    if (!currentImagePath && !images.exiting && !images.current) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
                <p className="text-gray-400 text-sm">No image available</p>
            </div>
        );
    }

    /**
     * Calculate transform for exiting image based on animation direction
     * Right-to-left: slides out to left (translateX(0) -> translateX(-100%))
     * Left-to-right: slides out to right (translateX(0) -> translateX(100%))
     */
    const exitingTransform = isRightToLeftAnimation 
        ? (isAnimating ? 'translateX(-100%)' : 'translateX(0)')
        : (isAnimating ? 'translateX(100%)' : 'translateX(0)');
    
    /**
     * Calculate initial transform for entering image
     * Right-to-left: starts from right (translateX(100%))
     * Left-to-right: starts from left (translateX(-100%))
     * If no exiting image, starts at center (translateX(0))
     */
    const enteringInitialTransform = isRightToLeftAnimation 
        ? (images.exiting ? 'translateX(100%)' : 'translateX(0)')
        : (images.exiting ? 'translateX(-100%)' : 'translateX(0)');
    
    /**
     * Calculate final transform for entering image
     * When animating with exiting image: moves to center (translateX(0))
     * Otherwise: uses initial transform position
     */
    const enteringFinalTransform = isAnimating && images.exiting 
        ? 'translateX(0)' 
        : enteringInitialTransform;

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg">
            {images.exiting && (
                <div
                    key={`exiting-${images.exiting}`}
                    className="absolute inset-0 z-10"
                    style={{
                        transform: exitingTransform,
                        /**
                         * Keep opacity at 1 (fully opaque) - no fade out effect
                         * Only slide animation, no opacity change
                         */
                        opacity: 1,
                        /**
                         * Smooth transition animation for exiting image
                         * Uses cubic-bezier easing for natural motion
                         * Only animates transform, no opacity animation
                         * willChange optimizes performance by hinting browser about upcoming changes
                         */
                        transition: isAnimating 
                            ? 'transform 850ms cubic-bezier(0.4, 0, 0.2, 1)' 
                            : 'none',
                        willChange: 'transform',
                    }}
                >
                    <Image
                        src={images.exiting}
                        alt="Reason breakdown illustration"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {images.current && (
                <div
                    key={`current-${images.current}`}
                    className="absolute inset-0 z-20"
                    style={{
                        transform: enteringFinalTransform,
                        opacity: isAnimating && images.exiting 
                            ? 1 
                            : images.exiting 
                            ? 0 
                            : 1,
                        /**
                         * Smooth transition animation for entering image
                         * Only animates when there's an exiting image to create seamless transition
                         * Uses hardware-accelerated transforms for optimal performance
                         */
                        transition: isAnimating && images.exiting
                            ? 'transform 850ms cubic-bezier(0.4, 0, 0.2, 1), opacity 850ms cubic-bezier(0.4, 0, 0.2, 1)'
                            : 'none',
                        willChange: 'transform, opacity',
                    }}
                >
                    <Image
                        src={images.current}
                        alt="Reason breakdown illustration"
                        fill
                        className="object-cover"
                        priority={priority}
                        fetchPriority={priority ? 'high' : 'auto'}
                    />
                </div>
            )}
        </div>
    );
}

