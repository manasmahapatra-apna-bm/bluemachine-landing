/**
 * Centralized asset path constants
 * 
 * Benefits:
 * - Single source of truth for asset paths
 * - Easy to switch to CDN later (just change base URL)
 * - Type-safe asset references
 * - Prevents typos in asset paths
 */

const ASSET_BASE_PATH = process.env['NEXT_PUBLIC_CDN_URL'] || '';

export const ASSET_PATHS = {
    images: {
        base: `${ASSET_BASE_PATH}/Images`,
        // Add specific image paths as needed
        // hero: `${ASSET_BASE_PATH}/Images/hero.jpg`,
    },
    icons: {
        base: `${ASSET_BASE_PATH}/Icons`,
        favicon: `${ASSET_BASE_PATH}/Icons/favicon.ico`,
        appleTouchIcon: `${ASSET_BASE_PATH}/Icons/apple-touch-icon.png`,
    },
    svgs: {
        base: `${ASSET_BASE_PATH}/SVGs`,
        // Add specific SVG paths as needed
        // logo: `${ASSET_BASE_PATH}/SVGs/logo.svg`,
    },
    fonts: {
        base: `${ASSET_BASE_PATH}/Fonts`,
    },
} as const;
