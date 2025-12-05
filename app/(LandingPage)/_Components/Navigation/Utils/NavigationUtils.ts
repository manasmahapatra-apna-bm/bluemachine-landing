/**
 * Easing function for smooth scroll animation
 * Implements ease-in-out-cubic for natural, professional-feeling motion
 * 
 * @param progress - Animation progress from 0 to 1
 * @returns Eased progress value
 */
function easeInOutCubic(progress: number): number {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

/**
 * Smoothly scrolls to a target element using RequestAnimationFrame
 * Provides hardware-accelerated, frame-synced scrolling with custom easing
 * 
 * @param targetScrollPosition - Target scroll position in pixels
 * @param scrollDurationMs - Duration of scroll animation in milliseconds
 */
function smoothScrollToPosition(
    targetScrollPosition: number,
    scrollDurationMs: number = 600
): void {
    const startScrollPosition = window.scrollY;
    const scrollDistance = targetScrollPosition - startScrollPosition;
    let animationStartTime: number | null = null;

    /**
     * Animation frame callback that runs on each frame
     * Uses RequestAnimationFrame for smooth, synchronized animation
     */
    function animateScroll(currentTime: number): void {
        if (animationStartTime === null) {
            animationStartTime = currentTime;
        }

        const elapsedTime = currentTime - animationStartTime;
        const progress = Math.min(elapsedTime / scrollDurationMs, 1);
        const easedProgress = easeInOutCubic(progress);

        const currentScrollPosition = startScrollPosition + scrollDistance * easedProgress;
        window.scrollTo(0, currentScrollPosition);

        /**
         * Continue animation until progress reaches 1
         * This ensures the animation completes smoothly
         */
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

/**
 * Scrolls to a section element with smooth animation and header offset
 * Handles React rendering delays by retrying if element not found initially
 * Uses hardware-accelerated scrolling for optimal performance
 * 
 * @param sectionId - The ID of the target section element
 */
export function scrollToSection(sectionId: string): void {
    /**
     * Attempts to scroll to the target element
     * Calculates position accounting for fixed header offset
     */
    const attemptScrollToElement = (): void => {
        const targetElement = document.getElementById(sectionId);
        
        if (!targetElement) {
            return;
        }

        /**
         * Fixed header height in pixels
         * Used to offset scroll position so content isn't hidden behind header
         */
        const fixedHeaderHeightPx = 80;
        
        /**
         * Calculate target scroll position
         * getBoundingClientRect().top gives position relative to viewport
         * window.scrollY gives current scroll position
         * Subtracting header height ensures content appears below header
         */
        const elementTopPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const targetScrollPosition = elementTopPosition - fixedHeaderHeightPx;
        
        /**
         * Ensure scroll position is never negative
         * Prevents scrolling above page top
         */
        const clampedScrollPosition = Math.max(0, targetScrollPosition);

        /**
         * Use custom smooth scroll function for better control and performance
         * Falls back to native smooth scroll if RAF not available
         */
        if (typeof requestAnimationFrame !== 'undefined') {
            smoothScrollToPosition(clampedScrollPosition);
        } else {
            /**
             * Fallback to native smooth scroll for older browsers
             */
            window.scrollTo({
                top: clampedScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    /**
     * Try scrolling immediately
     * Works if element is already rendered in DOM
     */
    attemptScrollToElement();

    /**
     * Retry after short delay if element not found
     * Handles React hydration and rendering delays
     * Uses minimal delay to avoid noticeable lag
     */
    const reactRenderDelayMs = 50;
    setTimeout(() => {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            attemptScrollToElement();
        }
    }, reactRenderDelayMs);
}

/**
 * Extracts section ID from URL hash
 * Returns null if no hash present or in SSR environment
 * 
 * @returns Section ID string or null
 */
export function getSectionFromHash(): string | null {
    /**
     * Check if running in browser environment
     * Prevents SSR errors when accessing window object
     */
    if (typeof window === 'undefined') {
        return null;
    }

    /**
     * Extract hash from URL and remove leading '#'
     * Returns empty string if no hash, which converts to null
     */
    const urlHash = window.location.hash.slice(1);
    return urlHash || null;
}
