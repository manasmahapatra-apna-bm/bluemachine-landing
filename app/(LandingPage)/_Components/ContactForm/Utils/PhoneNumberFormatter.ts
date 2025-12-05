/**
 * Formats phone number as user types
 * 
 * Supports multiple formats:
 * - US format: (XXX) XXX-XXXX
 * - International format: +XX XXX XXX XXXX
 * 
 * Automatically detects format based on input and formats accordingly
 * 
 * @param value - Raw phone number input
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(value: string): string {
    /**
     * Remove all non-numeric characters except + for international numbers
     */
    const cleaned = value.replace(/[^\d+]/g, '');

    /**
     * If starts with +, treat as international number
     */
    if (cleaned.startsWith('+')) {
        return formatInternationalNumber(cleaned);
    }

    /**
     * Otherwise, treat as US number
     */
    return formatUSNumber(cleaned);
}

/**
 * Formats US phone number: (XXX) XXX-XXXX
 * 
 * @param value - Numeric phone number string
 * @returns Formatted US phone number
 */
function formatUSNumber(value: string): string {
    /**
     * Remove all non-numeric characters
     */
    const numbers = value.replace(/\D/g, '');

    /**
     * Limit to 10 digits for US numbers
     */
    const limited = numbers.substring(0, 10);

    /**
     * Format based on length
     */
    if (limited.length === 0) {
        return '';
    }

    if (limited.length <= 3) {
        return `(${limited}`;
    }

    if (limited.length <= 6) {
        return `(${limited.substring(0, 3)}) ${limited.substring(3)}`;
    }

    return `(${limited.substring(0, 3)}) ${limited.substring(3, 6)}-${limited.substring(6)}`;
}

/**
 * Formats international phone number: +XX XXX XXX XXXX
 * 
 * @param value - Phone number string starting with +
 * @returns Formatted international phone number
 */
function formatInternationalNumber(value: string): string {
    /**
     * Keep + and digits only
     */
    const cleaned = value.replace(/[^\d+]/g, '');

    if (cleaned.length <= 1) {
        return cleaned;
    }

    /**
     * Extract country code and number
     */
    const countryCode = cleaned.substring(0, 3); // +XX
    const number = cleaned.substring(3);

    /**
     * Format with spaces every 3-4 digits
     */
    const formattedNumber = number.replace(/(\d{3,4})(?=\d)/g, '$1 ');

    return `${countryCode} ${formattedNumber}`.trim();
}

/**
 * Parses formatted phone number to extract raw numeric string
 * 
 * @param formatted - Formatted phone number string
 * @returns Clean numeric string (with + for international)
 */
export function parsePhoneNumber(formatted: string): string {
    /**
     * Keep only digits and + sign
     */
    return formatted.replace(/[^\d+]/g, '');
}

/**
 * Validates phone number format
 * 
 * Rules:
 * - Non-empty string required
 * - US format: 10 digits
 * - International format: + followed by country code and number (minimum 8 digits total)
 * 
 * @param phone - The phone number string to validate
 * @returns Validation result with formatted phone number
 */
export function validatePhoneNumber(phone: string): {
    isValid: boolean;
    error: string | null;
    formatted: string;
} {
    if (!phone || typeof phone !== 'string') {
        return {
            isValid: false,
            error: 'Phone number is required',
            formatted: '',
        };
    }

    /**
     * Format the phone number
     */
    const formatted = formatPhoneNumber(phone);

    /**
     * Extract raw digits
     */
    const cleaned = parsePhoneNumber(formatted);

    /**
     * Check if it's international format (starts with +)
     */
    if (cleaned.startsWith('+')) {
        /**
         * International: + followed by at least 8 digits
         */
        const digits = cleaned.substring(1);
        if (digits.length < 8) {
            return {
                isValid: false,
                error: 'Please enter a valid phone number',
                formatted,
            };
        }

        if (digits.length > 15) {
            return {
                isValid: false,
                error: 'Phone number is too long',
                formatted,
            };
        }

        return {
            isValid: true,
            error: null,
            formatted,
        };
    }

    /**
     * US format: exactly 10 digits
     */
    if (cleaned.length === 10) {
        return {
            isValid: true,
            error: null,
            formatted,
        };
    }

    if (cleaned.length < 10) {
        return {
            isValid: false,
            error: 'Please enter a valid phone number',
            formatted,
        };
    }

    return {
        isValid: false,
        error: 'Phone number is too long',
        formatted,
    };
}

