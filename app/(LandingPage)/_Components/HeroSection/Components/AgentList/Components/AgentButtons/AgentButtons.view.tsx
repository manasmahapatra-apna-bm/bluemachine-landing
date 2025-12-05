'use client';

import { useRef, useEffect } from 'react';
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const scrollToCenter = (index: number): void => {
        const button = buttonRefs.current[index];
        const container = scrollContainerRef.current;
        
        if (!button || !container) return;

        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        // Calculate the center position
        const containerCenter = containerRect.left + containerRect.width / 2;
        const buttonCenter = buttonRect.left + buttonRect.width / 2;
        
        // Calculate scroll offset needed to center the button
        const scrollOffset = buttonCenter - containerCenter;
        
        // Smooth scroll
        container.scrollBy({
            left: scrollOffset,
            behavior: 'smooth',
        });
    };

    const handleButtonClick = (index: number): void => {
        onSelect(index);
        scrollToCenter(index);
    };

    // Auto-scroll to center when selectedIndex changes (only on mobile)
    useEffect(() => {
        if (selectedIndex >= 0 && window.innerWidth < 768) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                scrollToCenter(selectedIndex);
            }, 100);
        }
    }, [selectedIndex]);

    return (
        <>
            {/* Mobile: Horizontal Scroll Carousel */}
            <div 
                className="md:hidden"
                style={{ 
                    position: 'relative',
                    width: '100vw',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                }}
            >
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide flex-nowrap gap-3"
                    style={{
                        scrollPaddingLeft: '1rem',
                        scrollPaddingRight: '1rem',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                        scrollBehavior: 'smooth',
                    }}
                >
                    {agents.map((agent, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                            <button
                                key={agent.agentName}
                                ref={(el) => {
                                    buttonRefs.current[index] = el;
                                }}
                                type="button"
                                onClick={() => handleButtonClick(index)}
                                className="relative px-4 py-1.5 rounded-full font-normal text-sm overflow-hidden flex-shrink-0"
                                style={{
                                    background: isSelected ? '#B9DCFF' : 'rgba(255, 255, 255, 0.1)',
                                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                    color: isSelected ? '#111827' : 'white',
                                    boxShadow: isSelected ? '0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1), 0 0.25rem 0.375rem -0.125rem rgba(0, 0, 0, 0.05)' : 'none',
                                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                aria-pressed={isSelected}
                                aria-label={`Select ${agent.agentName}`}
                            >
                                {/* Text */}
                                <span className="relative z-10 whitespace-nowrap" style={{ transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                    {agent.agentName}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Desktop: Centered Flex Wrap */}
            <div className="hidden md:block w-full max-w-5xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {agents.map((agent, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                            <button
                                key={agent.agentName}
                                type="button"
                                onClick={() => onSelect(index)}
                                className="relative px-6 py-2 rounded-full font-normal text-base overflow-hidden"
                                style={{
                                    background: isSelected ? '#B9DCFF' : 'rgba(255, 255, 255, 0.1)',
                                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                                    color: isSelected ? '#111827' : 'white',
                                    boxShadow: isSelected ? '0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1), 0 0.25rem 0.375rem -0.125rem rgba(0, 0, 0, 0.05)' : 'none',
                                    transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                aria-pressed={isSelected}
                                aria-label={`Select ${agent.agentName}`}
                            >
                                {/* Text */}
                                <span className="relative z-10" style={{ transition: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                    {agent.agentName}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
