'use client';

import Image from 'next/image';
import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentDemoShellViewProps {
    agent: AgentDemoMapping;
    isPlaying: boolean;
    isVideoLoaded: boolean;
    onPlayClick: () => void;
    onVideoLoad: () => void;
    onVideoEnd: () => void;
}

export function AgentDemoShellView({
    agent,
    isPlaying,
    isVideoLoaded,
    onPlayClick,
    onVideoLoad,
    onVideoEnd,
}: AgentDemoShellViewProps): React.ReactElement {
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Gradient Border Container */}
            <div
                className="relative rounded-2xl p-1"
                style={{
                    background: 'linear-gradient(135deg, #00AA7B 0%, #0090FE 100%)',
                }}
            >
                {/* Inner Container */}
                <div className="relative rounded-xl overflow-hidden aspect-video">
                    {/* Background: Thumbnail or Gradient */}
                    {agent.agentThumbnailImageURL ? (
                        <Image
                            src={agent.agentThumbnailImageURL}
                            alt={agent.agentDemoCaption}
                            fill
                            className="object-cover"
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

                    {/* Video Element (lazy loaded) */}
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
                            <div className="w-16 h-16 flex items-center justify-center mb-6">
                                <Image
                                    src="/SVGs/BMDemoCirclePlay.svg"
                                    alt="Play"
                                    width={64}
                                    height={64}
                                    className="drop-shadow-lg"
                                />
                            </div>
                            
                            {/* Caption - Centered below play button */}
                            <div className="text-center">
                                <p className="font-bold text-[32px] -mb-1" style={{ color: 'rgba(4, 17, 45, 0.6)' }}>{agent.agentDemoCaption}</p>
                                <p className="font-bold text-[32px]" style={{ color: 'rgba(4, 17, 45, 0.6)' }}>{agent.agentName}</p>
                            </div>
                        </button>
                    )}

                    {/* Caption when video is playing */}
                    {isPlaying && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-40 text-center">
                            <p className="font-bold text-xl -mb-10" style={{ color: 'rgba(4, 17, 45, 0.6)' }}>{agent.agentDemoCaption}</p>
                            <p className="font-bold text-lg" style={{ color: 'rgba(4, 17, 45, 0.6)' }}>{agent.agentName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
