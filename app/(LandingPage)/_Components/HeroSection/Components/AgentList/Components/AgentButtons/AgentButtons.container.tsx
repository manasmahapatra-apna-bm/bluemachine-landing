'use client';

import { AgentButtonsView } from './AgentButtons.view';
import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentButtonsContainerProps {
    agents: readonly AgentDemoMapping[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export function AgentButtonsContainer({
    agents,
    selectedIndex,
    onSelect,
}: AgentButtonsContainerProps): React.ReactElement {
    const handleSelect = (index: number): void => {
        onSelect(index);
    };

    return (
        <AgentButtonsView
            agents={agents}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
        />
    );
}

