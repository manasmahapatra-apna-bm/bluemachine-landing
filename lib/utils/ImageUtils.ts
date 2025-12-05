/**
 * Image utility functions
 * 
 * Provides type-safe helpers for working with images
 * Supports both local public folder and CDN assets
 */

import { ASSET_PATHS } from '../constants/AssetPaths';

/**
 * Get full path for an image asset
 * Automatically handles CDN URL if configured via NEXT_PUBLIC_CDN_URL
 */
export function getImagePath(imagePath: string): string {
    // If path already includes http/https, return as-is (external URL)
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // Remove leading slash if present (ASSET_PATHS already includes it)
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    return `${ASSET_PATHS.images.base}/${cleanPath}`;
}

/**
 * Get full path for an SVG asset
 */
export function getSvgPath(svgPath: string): string {
    if (svgPath.startsWith('http://') || svgPath.startsWith('https://')) {
        return svgPath;
    }
    
    const cleanPath = svgPath.startsWith('/') ? svgPath.slice(1) : svgPath;
    return `${ASSET_PATHS.svgs.base}/${cleanPath}`;
}

/**
 * Type-safe image dimensions
 */
export interface ImageDimensions {
    width: number;
    height: number;
}

/**
 * Common image dimensions for responsive design
 */
export const IMAGE_SIZES = {
    hero: { width: 1920, height: 1080 },
    thumbnail: { width: 300, height: 300 },
    card: { width: 400, height: 300 },
    avatar: { width: 100, height: 100 },
} as const;

