'use client';

import { useState, useEffect } from 'react';
import { AgentDemoShellView } from './AgentDemoShell.view';
import { useImageLoader } from '@/lib/hooks/useImageLoader';
import { useHeroViewport } from '@/lib/hooks/useHeroViewport';
import { ResourcePriority } from '@/lib/types/ResourcePriority';
import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentDemoShellContainerProps {
    agent: AgentDemoMapping & { resolvedThumbnailUrl?: string | null };
    selectedAgentIndex: number;
    totalAgents: number;
}

export function AgentDemoShellContainer({ agent, selectedAgentIndex, totalAgents }: AgentDemoShellContainerProps): React.ReactElement {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
    const { loadImage } = useImageLoader();
    const { isHeroVisible } = useHeroViewport();

    /**
     * Get thumbnail URL (use resolvedThumbnailUrl if available, otherwise fallback to desktop)
     */
    const thumbnailUrl = agent.resolvedThumbnailUrl ?? agent.agentThumbnailDesktopImageURL;
    const thumbnailId = `agent-thumbnail-${agent.agentName}`;

    /**
     * Load selected agent thumbnail with CRITICAL priority
     */
    useEffect(() => {
        if (thumbnailUrl && isHeroVisible) {
            loadImage(thumbnailId, thumbnailUrl, ResourcePriority.CRITICAL, {
                cancellable: true,
            });
        }
    }, [thumbnailUrl, thumbnailId, isHeroVisible, loadImage]);

    useEffect(() => {
        setIsPlaying(false);
        setIsVideoLoaded(false);
    }, [agent.agentName]);

    const handlePlayClick = (): void => {
        if (!isVideoLoaded) {
            setIsVideoLoaded(true);
        }
        setIsPlaying(true);
    };

    const handleVideoLoad = (): void => {
        setIsVideoLoaded(true);
    };

    const handleVideoEnd = (): void => {
        setIsPlaying(false);
    };

    return (
        <AgentDemoShellView
            agent={agent}
            thumbnailUrl={thumbnailUrl}
            selectedAgentIndex={selectedAgentIndex}
            totalAgents={totalAgents}
            isPlaying={isPlaying}
            isVideoLoaded={isVideoLoaded}
            onPlayClick={handlePlayClick}
            onVideoLoad={handleVideoLoad}
            onVideoEnd={handleVideoEnd}
        />
    );
}

