'use client';

import { useState, useMemo, useEffect } from 'react';
import { AgentListView } from './AgentList.view';
import { AGENT_DEMO_MAPPINGS } from './Constants/AgentDemoMappings';
import { useScreenSize } from '@/lib/hooks/useScreenSize';
import { useImageLoader } from '@/lib/hooks/useImageLoader';
import { useHeroViewport } from '@/lib/hooks/useHeroViewport';
import { ResourcePriority } from '@/lib/types/ResourcePriority';
import type { AgentDemoMapping } from './Constants/AgentDemoMappings';

export function AgentListContainer(): React.ReactElement {
    const [selectedAgentIndex, setSelectedAgentIndex] = useState<number>(0);
    const { isMobile } = useScreenSize();
    const { loadImage } = useImageLoader();
    const { isHeroVisible } = useHeroViewport();

    const handleAgentSelect = (index: number): void => {
        setSelectedAgentIndex(index);
    };

    /**
     * Get thumbnail URL based on screen size
     * Returns mobile URL if on mobile, desktop URL otherwise
     */
    const getThumbnailUrl = (agent: AgentDemoMapping): string | null => {
        return isMobile ? agent.agentThumbnailMobileImageURL : agent.agentThumbnailDesktopImageURL;
    };

    /**
     * Create agents with resolved thumbnail URLs based on screen size
     */
    const agentsWithResolvedThumbnails = useMemo(() => {
        return AGENT_DEMO_MAPPINGS.map((agent) => ({
            ...agent,
            resolvedThumbnailUrl: getThumbnailUrl(agent),
        }));
    }, [isMobile]);

    /**
     * Preload next agent thumbnail with MEDIUM priority (if on first fold)
     * Lazy load remaining agent thumbnails
     */
    useEffect(() => {
        if (!isHeroVisible) {
            return;
        }

        /**
         * Preload next agent thumbnail
         */
        const nextAgentIndex = (selectedAgentIndex + 1) % AGENT_DEMO_MAPPINGS.length;
        const nextAgent = agentsWithResolvedThumbnails[nextAgentIndex];
        if (nextAgent?.resolvedThumbnailUrl) {
            const nextThumbnailId = `agent-thumbnail-${nextAgent.agentName}`;
            loadImage(nextThumbnailId, nextAgent.resolvedThumbnailUrl, ResourcePriority.MEDIUM, {
                cancellable: true,
            });
        }

        /**
         * Lazy load remaining agent thumbnails
         */
        agentsWithResolvedThumbnails.forEach((agent, index) => {
            if (
                index !== selectedAgentIndex &&
                index !== nextAgentIndex &&
                agent.resolvedThumbnailUrl
            ) {
                const thumbnailId = `agent-thumbnail-${agent.agentName}`;
                loadImage(thumbnailId, agent.resolvedThumbnailUrl, ResourcePriority.LAZY, {
                    cancellable: true,
                });
            }
        });
    }, [selectedAgentIndex, agentsWithResolvedThumbnails, isHeroVisible, loadImage]);

    const selectedAgent = AGENT_DEMO_MAPPINGS[selectedAgentIndex];
    if (!selectedAgent) {
        throw new Error(`Agent at index ${selectedAgentIndex} not found`);
    }

    const selectedAgentWithThumbnail = agentsWithResolvedThumbnails[selectedAgentIndex];
    if (!selectedAgentWithThumbnail) {
        throw new Error(`Agent with thumbnail at index ${selectedAgentIndex} not found`);
    }

    return (
        <AgentListView
            agents={agentsWithResolvedThumbnails}
            selectedAgentIndex={selectedAgentIndex}
            selectedAgent={selectedAgentWithThumbnail}
            onAgentSelect={handleAgentSelect}
        />
    );
}

