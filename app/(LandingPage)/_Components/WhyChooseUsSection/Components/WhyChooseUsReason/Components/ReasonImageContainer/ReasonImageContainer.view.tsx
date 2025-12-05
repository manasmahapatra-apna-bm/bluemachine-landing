'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import type { ImageAlignment } from '../../../../Constants/WhyChooseUsReasonsConstants';

interface ReasonImageContainerViewProps {
    currentImagePath: string | null;
    imageAlignment: ImageAlignment;
    priority: boolean;
}

/**
 * Image container component with slide-in/slide-out animation
 * 
 * Displays the current breakdown image with smooth slide animations:
 * - Previous image slides out to the left
 * - New image slides in from the right
 * Both animations happen simultaneously for a seamless transition.
 */
export function ReasonImageContainerView({
    currentImagePath,
    imageAlignment,
    priority,
}: ReasonImageContainerViewProps): React.ReactElement {
    const [images, setImages] = useState<{ exiting: string | null; current: string | null }>({
        exiting: null,
        current: currentImagePath,
    });
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const previousPathRef = useRef<string | null>(currentImagePath);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Handle image changes with simultaneous slide-out and slide-in animations
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
             * This ensures both are in the DOM
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
             * Step 3: Force a reflow to ensure both images are rendered
             * Then start the animation
             */
            /**
             * Start animation after ensuring both images are rendered in DOM
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
    }, [currentImagePath]);

    if (!currentImagePath && !images.exiting && !images.current) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
                <p className="text-gray-400 text-sm">No image available</p>
            </div>
        );
    }

    /**
     * Determine border radius based on image alignment
     * Left-aligned images get rounded left corners, right-aligned get rounded right corners
     * Increased radius for desktop mode (lg breakpoint)
     */
    const roundedCornersClass = imageAlignment === 'left' 
        ? 'rounded-l-lg lg:rounded-l-2xl' 
        : 'rounded-r-lg lg:rounded-r-2xl';

    /**
     * Determine slide animation direction based on image alignment
     * Right-aligned images slide in from right and out to left
     * Left-aligned images slide in from left and out to right
     */
    const isRightAligned = imageAlignment === 'right';
    
    /**
     * Calculate transform for exiting image based on alignment
     * Right-aligned: slides out to left (translateX(0) -> translateX(-100%))
     * Left-aligned: slides out to right (translateX(0) -> translateX(100%))
     */
    const exitingTransform = isRightAligned 
        ? (isAnimating ? 'translateX(-100%)' : 'translateX(0)')
        : (isAnimating ? 'translateX(100%)' : 'translateX(0)');
    
    /**
     * Calculate initial transform for entering image
     * Right-aligned: starts from right (translateX(100%))
     * Left-aligned: starts from left (translateX(-100%))
     * If no exiting image, starts at center (translateX(0))
     */
    const enteringInitialTransform = isRightAligned 
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
        <div className={`relative w-full h-full overflow-hidden ${roundedCornersClass}`}>
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

