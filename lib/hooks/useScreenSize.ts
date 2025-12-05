'use client';

import { useState, useEffect } from 'react';

interface UseScreenSizeReturn {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export function useScreenSize(): UseScreenSizeReturn {
    const [screenSize, setScreenSize] = useState<UseScreenSizeReturn>({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
    });

    useEffect(() => {
        const handleResize = (): void => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setScreenSize({
                width,
                height,
                isMobile: width < 640,
                isTablet: width >= 640 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        // Set initial size
        handleResize();

        // Debounce resize handler
        let timeoutId: NodeJS.Timeout;
        const debouncedResize = (): void => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return screenSize;
}

