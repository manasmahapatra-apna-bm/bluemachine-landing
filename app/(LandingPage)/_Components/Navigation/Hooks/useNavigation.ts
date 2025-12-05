'use client';

import { useState, useEffect } from 'react';
import { SECTION_IDS } from '../Constants/NavigationConstants';

interface UseNavigationReturn {
    activeSection: string;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
}

/**
 * Custom hook for navigation state management
 * 
 * Tracks active section using IntersectionObserver API for efficient viewport detection
 * Manages mobile menu open/close state
 * Uses passive observation instead of scroll event listeners for better performance
 * 
 * @returns Navigation state and control functions
 */
export function useNavigation(): UseNavigationReturn {
    /**
     * Track currently active section based on viewport intersection
     * Defaults to hero section on initial load
     */
    const [activeSection, setActiveSection] = useState<string>(SECTION_IDS.HERO);
    
    /**
     * Track mobile menu visibility state
     * Used to show/hide mobile navigation menu
     */
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        /**
         * Get all section IDs that need to be observed
         * These correspond to navigation items in the header
         */
        const sectionIdsToObserve = Object.values(SECTION_IDS);
        
        /**
         * IntersectionObserver configuration
         * rootMargin: '-20% 0px -70% 0px' creates a trigger zone in the middle 10% of viewport
         * This ensures section is marked active when it's prominently visible
         * threshold: 0 means trigger as soon as any part enters the intersection area
         */
        const intersectionObserverOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0,
        };

        /**
         * Callback function called when observed elements intersect with viewport
         * Updates active section state when a section enters the intersection area
         * Uses IntersectionObserver instead of scroll listeners for better performance
         */
        const handleIntersectionChange = (entries: IntersectionObserverEntry[]): void => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        /**
         * Create IntersectionObserver instances for each section
         * Observes each section element and updates active section when it enters viewport
         * Returns null if element not found (handles React rendering delays)
         */
        const intersectionObservers = sectionIdsToObserve.map((sectionId) => {
            const targetElement = document.getElementById(sectionId);
            
            if (targetElement) {
                const observer = new IntersectionObserver(
                    handleIntersectionChange, 
                    intersectionObserverOptions
                );
                observer.observe(targetElement);
                return observer;
            }
            
            return null;
        });

        /**
         * Cleanup function
         * Disconnects all observers when component unmounts or dependencies change
         * Prevents memory leaks and unnecessary observation
         */
        return () => {
            intersectionObservers.forEach((observer) => {
                if (observer) {
                    observer.disconnect();
                }
            });
        };
    }, []);

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = (): void => {
        setIsMobileMenuOpen(false);
    };

    return {
        activeSection,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
    };
}
