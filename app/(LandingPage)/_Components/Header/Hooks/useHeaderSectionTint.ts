'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect when header is over BuilderSection or InvestorSection
 * 
 * Uses IntersectionObserver to detect when these sections are visible
 * in the header's viewport area. Returns true when either section
 * intersects with the header area, triggering a darker tint.
 * 
 * @returns Boolean indicating if dark tint should be active
 */
export function useHeaderSectionTint(): boolean {
    const [isDarkTintActive, setIsDarkTintActive] = useState<boolean>(false);

    useEffect(() => {
        /**
         * Skip if not in browser environment
         */
        if (typeof window === 'undefined') {
            return;
        }

        /**
         * Find Builder and Investor section elements
         */
        const builderSection = document.getElementById('builder');
        const investorSection = document.getElementById('investor');

        if (!builderSection && !investorSection) {
            return;
        }

        /**
         * Check if sections are visible in header area
         * Header height is approximately 4.5rem (72px) on desktop, 4rem (64px) on mobile
         */
        const checkSectionsInHeaderArea = (): void => {
            const headerHeight = window.innerWidth >= 768 ? 72 : 64;
            
            let isActive = false;
            
            if (builderSection) {
                const rect = builderSection.getBoundingClientRect();
                /**
                 * Section is in header area if its top is above header height
                 * and its bottom is below the top of viewport
                 */
                if (rect.top < headerHeight && rect.bottom > 0) {
                    isActive = true;
                }
            }
            
            if (!isActive && investorSection) {
                const rect = investorSection.getBoundingClientRect();
                if (rect.top < headerHeight && rect.bottom > 0) {
                    isActive = true;
                }
            }
            
            setIsDarkTintActive(isActive);
        };

        /**
         * IntersectionObserver callback
         * Triggers check when sections enter/exit viewport
         */
        const handleIntersection = (): void => {
            checkSectionsInHeaderArea();
        };

        /**
         * IntersectionObserver configuration
         * Observes when sections enter/exit viewport
         */
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        /**
         * Initial check
         */
        checkSectionsInHeaderArea();

        /**
         * Create IntersectionObserver to detect when sections enter/exit viewport
         */
        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        /**
         * Observe both sections if they exist
         */
        if (builderSection) {
            observer.observe(builderSection);
        }
        if (investorSection) {
            observer.observe(investorSection);
        }

        /**
         * Also check on scroll for more accurate detection
         */
        const handleScroll = (): void => {
            checkSectionsInHeaderArea();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkSectionsInHeaderArea);

        /**
         * Cleanup: disconnect observer and remove event listeners
         */
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkSectionsInHeaderArea);
        };
    }, []);

    return isDarkTintActive;
}

