'use client';

import AgentButtons from './Components/AgentButtons';
import AgentDemoShell from './Components/AgentDemoShell';
import type { AgentDemoMapping } from './Constants/AgentDemoMappings';

interface AgentWithResolvedThumbnail extends AgentDemoMapping {
    resolvedThumbnailUrl: string | null;
}

interface AgentListViewProps {
    agents: readonly AgentWithResolvedThumbnail[];
    selectedAgentIndex: number;
    selectedAgent: AgentWithResolvedThumbnail;
    onAgentSelect: (index: number) => void;
}

export function AgentListView({
    agents,
    selectedAgentIndex,
    selectedAgent,
    onAgentSelect,
}: AgentListViewProps): React.ReactElement {
    return (
        <div className="w-full max-w-[1920px] mx-auto space-y-6 md:space-y-8 px-4 sm:px-6 md:px-0">
            <AgentButtons
                agents={agents}
                selectedIndex={selectedAgentIndex}
                onSelect={onAgentSelect}
            />
            <AgentDemoShell agent={selectedAgent} />
        </div>
    );
}

