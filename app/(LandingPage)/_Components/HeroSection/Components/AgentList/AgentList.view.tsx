'use client';

import AgentButtons from './Components/AgentButtons';
import AgentDemoShell from './Components/AgentDemoShell';
import type { AgentDemoMapping } from './Constants/AgentDemoMappings';

interface AgentListViewProps {
    agents: readonly AgentDemoMapping[];
    selectedAgentIndex: number;
    selectedAgent: AgentDemoMapping;
    onAgentSelect: (index: number) => void;
}

export function AgentListView({
    agents,
    selectedAgentIndex,
    selectedAgent,
    onAgentSelect,
}: AgentListViewProps): React.ReactElement {
    return (
        <div className="w-full max-w-[1920px] mx-auto space-y-8">
            <AgentButtons
                agents={agents}
                selectedIndex={selectedAgentIndex}
                onSelect={onAgentSelect}
            />
            <AgentDemoShell agent={selectedAgent} />
        </div>
    );
}

