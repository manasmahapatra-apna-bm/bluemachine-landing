'use client';

import type { AgentDemoMapping } from '../../Constants/AgentDemoMappings';

interface AgentButtonsViewProps {
    agents: readonly AgentDemoMapping[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export function AgentButtonsView({
    agents,
    selectedIndex,
    onSelect,
}: AgentButtonsViewProps): React.ReactElement {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {agents.map((agent, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                        <button
                            key={agent.agentName}
                            type="button"
                            onClick={() => onSelect(index)}
                            className="relative px-6 py-2 rounded-full font-normal text-base overflow-hidden transition-all duration-500 ease-in-out"
                            style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                color: isSelected ? 'white' : '#111827',
                                boxShadow: isSelected ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
                            }}
                            aria-pressed={isSelected}
                            aria-label={`Select ${agent.agentName}`}
                        >
                            {/* Gradient overlay that fades in/out */}
                            <span
                                className="absolute inset-0 rounded-full transition-opacity duration-500 ease-in-out"
                                style={{
                                    background: 'linear-gradient(99deg, #00AA7B 0.18%, #0090FE 100.18%)',
                                    opacity: isSelected ? 1 : 0,
                                    zIndex: 0,
                                }}
                            />
                            {/* Text */}
                            <span className="relative z-10 transition-colors duration-500 ease-in-out">
                                {agent.agentName}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
