'use client';

import { ReasonImageContainerMobileView } from './ReasonImageContainerMobile.view';

interface ReasonImageContainerMobileContainerProps {
    currentImagePath: string | null;
    reasonIndex: number;
    priority: boolean;
}

/**
 * Container component for mobile reason image container
 * 
 * Wraps the view component and handles any container-level logic.
 * Currently passes props directly to view component.
 */
export function ReasonImageContainerMobileContainer({
    currentImagePath,
    reasonIndex,
    priority,
}: ReasonImageContainerMobileContainerProps): React.ReactElement {
    return (
        <ReasonImageContainerMobileView
            currentImagePath={currentImagePath}
            reasonIndex={reasonIndex}
            priority={priority}
        />
    );
}

