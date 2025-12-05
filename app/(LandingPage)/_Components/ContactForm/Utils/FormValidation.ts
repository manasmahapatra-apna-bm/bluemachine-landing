/**
 * Validation result interface for form fields
 */
export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

/**
 * Validation result with sanitized value
 */
export interface ValidationResultWithValue extends ValidationResult {
    sanitized?: string;
    formatted?: string;
}

/**
 * Validates and sanitizes name field
 * 
 * Rules:
 * - Non-empty string required
 * - Minimum 2 characters, maximum 100 characters
 * - Removes leading/trailing whitespace
 * - Allows letters, spaces, and hyphens only
 * - Removes special characters
 * 
 * @param name - The name string to validate
 * @returns Validation result with sanitized name
 */
export function validateName(name: string): ValidationResultWithValue {
    if (!name || typeof name !== 'string') {
        return {
            isValid: false,
            error: 'Name is required',
            sanitized: '',
        };
    }

    /**
     * Remove leading and trailing whitespace
     */
    let sanitized = name.trim();

    /**
     * Remove all characters except letters (including accented characters), spaces, and hyphens
     * Numbers and symbols are not allowed
     */
    sanitized = sanitized.replace(/[^a-zA-ZÀ-ÿ\s-]/g, '');

    /**
     * Replace multiple spaces with single space
     */
    sanitized = sanitized.replace(/\s+/g, ' ');

    /**
     * Check if name contains at least one letter (not just spaces/hyphens)
     */
    const hasLetters = /[a-zA-ZÀ-ÿ]/.test(sanitized);
    if (!hasLetters) {
        return {
            isValid: false,
            error: 'Name must contain at least one letter',
            sanitized: '',
        };
    }

    /**
     * Check minimum length
     */
    if (sanitized.length < 2) {
        return {
            isValid: false,
            error: 'Name must be at least 2 characters',
            sanitized,
        };
    }

    /**
     * Check maximum length
     */
    if (sanitized.length > 100) {
        return {
            isValid: false,
            error: 'Name must be less than 100 characters',
            sanitized: sanitized.substring(0, 100),
        };
    }

    return {
        isValid: true,
        error: null,
        sanitized,
    };
}

/**
 * Validates email address format
 * 
 * Rules:
 * - Non-empty string required
 * - Must match valid email format pattern
 * - Standard email validation regex
 * 
 * @param email - The email string to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
    if (!email || typeof email !== 'string') {
        return {
            isValid: false,
            error: 'Email is required',
        };
    }

    const trimmedEmail = email.trim();

    if (trimmedEmail.length === 0) {
        return {
            isValid: false,
            error: 'Email is required',
        };
    }

    /**
     * Email validation regex pattern
     * Matches standard email format: user@domain.com
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
        return {
            isValid: false,
            error: 'Please enter a valid email address',
        };
    }

    /**
     * Additional check for email length
     */
    if (trimmedEmail.length > 254) {
        return {
            isValid: false,
            error: 'Email address is too long',
        };
    }

    return {
        isValid: true,
        error: null,
    };
}

/**
 * Validates and sanitizes company name field
 * 
 * Rules:
 * - Non-empty string required
 * - Minimum 2 characters, maximum 100 characters
 * - Removes leading/trailing whitespace
 * - Allows alphanumeric characters, spaces, hyphens, and common business characters
 * - Removes special characters
 * 
 * @param company - The company name string to validate
 * @returns Validation result with sanitized company name
 */
export function validateCompanyName(company: string): ValidationResultWithValue {
    if (!company || typeof company !== 'string') {
        return {
            isValid: false,
            error: 'Company name is required',
            sanitized: '',
        };
    }

    /**
     * Remove leading and trailing whitespace
     */
    let sanitized = company.trim();

    /**
     * Allow alphanumeric, spaces, hyphens, periods, commas, ampersands, and apostrophes
     * Common business name characters
     */
    sanitized = sanitized.replace(/[^a-zA-Z0-9\s\-.,&']/g, '');

    /**
     * Replace multiple spaces with single space
     */
    sanitized = sanitized.replace(/\s+/g, ' ');

    /**
     * Check minimum length
     */
    if (sanitized.length < 2) {
        return {
            isValid: false,
            error: 'Company name must be at least 2 characters',
            sanitized,
        };
    }

    /**
     * Check maximum length
     */
    if (sanitized.length > 100) {
        return {
            isValid: false,
            error: 'Company name must be less than 100 characters',
            sanitized: sanitized.substring(0, 100),
        };
    }

    return {
        isValid: true,
        error: null,
        sanitized,
    };
}

