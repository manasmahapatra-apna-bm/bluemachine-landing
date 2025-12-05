/**
 * Haptic feedback utility for mobile devices
 * 
 * Uses the Vibration API to provide tactile feedback on button clicks.
 * Only works on mobile devices that support vibration.
 * 
 * @param pattern - Vibration pattern in milliseconds (default: [10] for a short pulse)
 */
export function triggerHapticFeedback(pattern: number | number[] = 10): void {
    /**
     * Check if Vibration API is supported and available
     */
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
            /**
             * Trigger vibration
             * Pattern can be a single number (duration) or array (pattern of vibrations and pauses)
             */
            navigator.vibrate(pattern);
        } catch (error) {
            /**
             * Silently fail if vibration is not supported or blocked
             */
            // Vibration API might be blocked by browser settings
        }
    }
}

