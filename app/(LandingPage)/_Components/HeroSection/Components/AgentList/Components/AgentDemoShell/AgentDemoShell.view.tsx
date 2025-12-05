'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentDemoShellViewProps {
    agent: AgentDemoMapping;
    thumbnailUrl: string | null;
    selectedAgentIndex: number;
    totalAgents: number;
    isPlaying: boolean;
    isVideoLoaded: boolean;
    onPlayClick: () => void;
    onVideoLoad: () => void;
    onVideoEnd: () => void;
}

export function AgentDemoShellView({
    agent,
    thumbnailUrl,
    selectedAgentIndex,
    totalAgents,
    isPlaying,
    isVideoLoaded,
    onPlayClick,
    onVideoLoad,
    onVideoEnd,
}: AgentDemoShellViewProps): React.ReactElement {
    const [thumbnails, setThumbnails] = useState<{ exiting: string | null; current: string | null }>({
        exiting: null,
        current: thumbnailUrl,
    });
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const previousThumbnailRef = useRef<string | null>(thumbnailUrl);
    const previousIndexRef = useRef<number>(selectedAgentIndex);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Handle thumbnail changes with simultaneous slide-out and slide-in animations
     * Direction is determined by comparing current and previous agent indices
     */
    useEffect(() => {
        if (thumbnailUrl !== previousThumbnailRef.current) {
            const previousThumbnail = previousThumbnailRef.current;
            const previousIndex = previousIndexRef.current;
            
            /**
             * Determine slide direction based on index change
             * Forward (next): slide in from right
             * Backward (previous): slide in from left
             * Handle wrap-around cases (last to first, first to last)
             */
            let direction: 'left' | 'right' = 'right';
            if (previousIndex !== selectedAgentIndex) {
                const diff = selectedAgentIndex - previousIndex;
                // Handle wrap-around: if moving from last to first (e.g., 4->0), it's forward (right)
                // If moving from first to last (e.g., 0->4), it's backward (left)
                if (Math.abs(diff) === totalAgents - 1) {
                    // Wrap-around case: negative diff means forward (last to first), positive means backward (first to last)
                    direction = diff < 0 ? 'right' : 'left';
                } else {
                    // Normal case: positive diff means forward (right), negative means backward (left)
                    direction = diff > 0 ? 'right' : 'left';
                }
            }
            setSlideDirection(direction);
            
            /**
             * Clear any existing timeout
             */
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            /**
             * Step 1: Set both thumbnails - exiting (previous) and current (new)
             * This ensures both are in the DOM
             */
            setThumbnails({
                exiting: previousThumbnail,
                current: thumbnailUrl,
            });
            
            /**
             * Step 2: Reset animation state
             */
            setIsAnimating(false);
            
            /**
             * Step 3: Start animation after ensuring both thumbnails are rendered in DOM
             * Small delay allows React to complete rendering before animation begins
             */
            const startTimeout = setTimeout(() => {
                /**
                 * Force browser reflow by accessing offsetHeight
                 * This ensures both thumbnails are fully rendered before animation starts
                 */
                if (typeof document !== 'undefined') {
                    document.body.offsetHeight;
                }
                
                setIsAnimating(true);
            }, 100);

            /**
             * Clean up exiting thumbnail after animation completes
             * Total timeout: 100ms start delay + 850ms animation + 100ms buffer = 1050ms
             */
            animationTimeoutRef.current = setTimeout(() => {
                setThumbnails({
                    exiting: null,
                    current: thumbnailUrl,
                });
                setIsAnimating(false);
                previousThumbnailRef.current = thumbnailUrl;
                previousIndexRef.current = selectedAgentIndex;
            }, 1050);

            return () => {
                clearTimeout(startTimeout);
                if (animationTimeoutRef.current) {
                    clearTimeout(animationTimeoutRef.current);
                }
            };
        } else if (thumbnailUrl && thumbnailUrl !== thumbnails.current) {
            /**
             * Update current thumbnail if it changed but no animation needed
             * This handles initial load or when thumbnail changes without previous thumbnail
             */
            setThumbnails({
                exiting: null,
                current: thumbnailUrl,
            });
            previousThumbnailRef.current = thumbnailUrl;
            previousIndexRef.current = selectedAgentIndex;
        }
        return undefined;
    }, [thumbnailUrl, selectedAgentIndex, totalAgents, thumbnails.current]);

    /**
     * Calculate transform for exiting thumbnail
     * Slides out opposite to the direction of entry
     */
    const exitingTransform = isAnimating 
        ? (slideDirection === 'right' ? 'translateX(-100%)' : 'translateX(100%)')
        : 'translateX(0)';
    
    /**
     * Calculate initial transform for entering thumbnail
     * Slides in from right if moving forward, from left if moving backward
     */
    const enteringInitialTransform = thumbnails.exiting 
        ? (slideDirection === 'right' ? 'translateX(100%)' : 'translateX(-100%)')
        : 'translateX(0)';
    
    /**
     * Calculate final transform for entering thumbnail
     */
    const enteringFinalTransform = isAnimating && thumbnails.exiting 
        ? 'translateX(0)' 
        : enteringInitialTransform;

    return (
        <div className="relative w-[calc(100%+1rem)] md:w-full md:max-w-4xl -mx-2 md:mx-auto">
            {/* Rotating Gradient Border Background - slightly larger than container */}
            <div
                className="absolute rounded-xl md:rounded-2xl animate-gradient-rotate -top-[0.03125rem] -left-[0.03125rem] -right-[0.03125rem] -bottom-[0.03125rem] md:-top-[0.15625rem] md:-left-[0.15625rem] md:-right-[0.15625rem] md:-bottom-[0.15625rem]"
                style={{
                    zIndex: 1,
                }}
            />
            
            {/* Gradient Border Container */}
            <div
                className="relative rounded-xl md:rounded-2xl demo-shell-border"
                style={{
                    background: 'linear-gradient(135deg, #00AA7B 0%, #0090FE 100%)',
                    zIndex: 2,
                }}
            >
                {/* Inner Container */}
                <div className="relative rounded-xl overflow-hidden aspect-video">
                    {/* Exiting Thumbnail - slides out to left */}
                    {thumbnails.exiting && (
                        <div
                            key={`exiting-${thumbnails.exiting}`}
                            className="absolute inset-0 z-10"
                            style={{
                                transform: exitingTransform,
                                opacity: 1,
                                transition: isAnimating 
                                    ? 'transform 850ms cubic-bezier(0.4, 0, 0.2, 1)' 
                                    : 'none',
                                willChange: 'transform',
                            }}
                        >
                        <Image
                                src={thumbnails.exiting}
                            alt={agent.agentDemoCaption}
                            fill
                            className="object-cover"
                            />
                        </div>
                    )}

                    {/* Current Thumbnail - slides in from right */}
                    {thumbnails.current && (
                        <div
                            key={`current-${thumbnails.current}`}
                            className="absolute inset-0 z-20"
                            style={{
                                transform: enteringFinalTransform,
                                opacity: 1,
                                transition: isAnimating && thumbnails.exiting
                                    ? 'transform 850ms cubic-bezier(0.4, 0, 0.2, 1)'
                                    : 'none',
                                willChange: 'transform',
                            }}
                        >
                            <Image
                                src={thumbnails.current}
                                alt={agent.agentDemoCaption}
                                fill
                                className="object-cover"
                                priority
                                fetchPriority="high"
                            />
                        </div>
                    )}

                    {/* Video Element (loaded on demand, no preloading) */}
                    {isVideoLoaded && (
                        <video
                            key={agent.agentDemoVideoURL}
                            src={agent.agentDemoVideoURL}
                            className="absolute inset-0 w-full h-full object-cover z-20"
                            controls={isPlaying}
                            autoPlay={isPlaying}
                            onLoadedData={onVideoLoad}
                            onEnded={onVideoEnd}
                            playsInline
                            preload="none"
                        />
                    )}

                    {/* Play Button Overlay */}
                    {!isPlaying && (
                        <button
                            type="button"
                            onClick={onPlayClick}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-transparent hover:bg-black/5 transition-colors duration-200 z-30"
                            aria-label={`Play ${agent.agentDemoCaption} demo`}
                        >
                            <div className="w-16 h-16 flex items-center justify-center">
                                <Image
                                    src="/SVGs/BMDemoCirclePlay.svg"
                                    alt="Play"
                                    width={64}
                                    height={64}
                                    className="drop-shadow-lg"
                                />
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
