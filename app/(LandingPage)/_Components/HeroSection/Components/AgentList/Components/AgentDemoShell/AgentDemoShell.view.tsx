'use client';

import Image from 'next/image';
import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentDemoShellViewProps {
    agent: AgentDemoMapping;
    thumbnailUrl: string | null;
    isPlaying: boolean;
    isVideoLoaded: boolean;
    onPlayClick: () => void;
    onVideoLoad: () => void;
    onVideoEnd: () => void;
}

export function AgentDemoShellView({
    agent,
    thumbnailUrl,
    isPlaying,
    isVideoLoaded,
    onPlayClick,
    onVideoLoad,
    onVideoEnd,
}: AgentDemoShellViewProps): React.ReactElement {

    return (
        <div className="relative w-[calc(100%+1rem)] md:w-full md:max-w-4xl mx-auto -mx-2 md:mx-auto">
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
                    {/* Background: Thumbnail or Gradient */}
                    {thumbnailUrl ? (
                        <Image
                            src={thumbnailUrl}
                            alt={agent.agentDemoCaption}
                            fill
                            className="object-cover"
                            priority
                            fetchPriority="high"
                        />
                    ) : (
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(135deg, #B2E6D6 0%, #8CC7FF 100%)',
                            }}
                        />
                    )}

                    {/* White Gradient Overlay */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.2) 100%)',
                        }}
                    />

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
