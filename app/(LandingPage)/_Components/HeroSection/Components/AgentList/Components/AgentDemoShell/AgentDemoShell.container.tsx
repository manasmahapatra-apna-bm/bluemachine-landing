'use client';

import { useState, useEffect } from 'react';
import { AgentDemoShellView } from './AgentDemoShell.view';
import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentDemoShellContainerProps {
    agent: AgentDemoMapping;
}

export function AgentDemoShellContainer({ agent }: AgentDemoShellContainerProps): React.ReactElement {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

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
            isPlaying={isPlaying}
            isVideoLoaded={isVideoLoaded}
            onPlayClick={handlePlayClick}
            onVideoLoad={handleVideoLoad}
            onVideoEnd={handleVideoEnd}
        />
    );
}

