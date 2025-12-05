/**
 * Haptic feedback utility for mobile devices
 * 
 * Uses the Vibration API to provide tactile feedback on button clicks.
 * Works on mobile devices that support vibration (iOS Safari, Android Chrome, etc.)
 * 
 * Note: iOS Chrome uses WebKit and may have limited Vibration API support.
 * The API must be called within a user interaction context (click, touch event).
 * 
 * @param pattern - Vibration pattern in milliseconds (default: [10] for a short pulse)
 */
export function triggerHapticFeedback(pattern: number | number[] = 10): void {
    /**
     * Check if Vibration API is supported and available
     * Must be called within a user interaction context (click, touch, etc.)
     */
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
            /**
             * Ensure pattern is always an array for better compatibility
             * Some browsers prefer array format
             */
            const vibrationPattern = Array.isArray(pattern) ? pattern : [pattern];
            
            /**
             * Trigger vibration
             * navigator.vibrate returns:
             * - true: vibration pattern was accepted
             * - false: vibration pattern was rejected (not supported or blocked)
             * - undefined: in some browsers
             */
            const result = navigator.vibrate(vibrationPattern);
            
            /**
             * If result is false, vibration was rejected
             * This is expected on some browsers/devices and we can ignore it
             */
            if (result === false) {
                // Vibration was rejected - browser doesn't support it or user blocked it
                return;
            }
        } catch (error) {
            /**
             * Silently fail if vibration is not supported or blocked
             * This can happen if:
             * - Browser doesn't support Vibration API (e.g., iOS Chrome limitations)
             * - User has disabled vibration in browser/device settings
             * - Not called within user interaction context (some browsers require this)
             * - Browser security restrictions
             */
            // Silently fail - haptic feedback is a nice-to-have feature
        }
    }
}

