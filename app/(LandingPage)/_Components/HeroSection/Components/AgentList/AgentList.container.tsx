'use client';

import { useState } from 'react';
import { AgentListView } from './AgentList.view';
import { AGENT_DEMO_MAPPINGS } from './Constants/AgentDemoMappings';

export function AgentListContainer(): React.ReactElement {
    const [selectedAgentIndex, setSelectedAgentIndex] = useState<number>(0);

    const handleAgentSelect = (index: number): void => {
        setSelectedAgentIndex(index);
    };

    const selectedAgent = AGENT_DEMO_MAPPINGS[selectedAgentIndex];
    if (!selectedAgent) {
        throw new Error(`Agent at index ${selectedAgentIndex} not found`);
    }

    return (
        <AgentListView
            agents={AGENT_DEMO_MAPPINGS}
            selectedAgentIndex={selectedAgentIndex}
            selectedAgent={selectedAgent}
            onAgentSelect={handleAgentSelect}
        />
    );
}

