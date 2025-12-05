'use client';

import { ReasonImageContainerView } from './ReasonImageContainer.view';
import type { ImageAlignment } from '../../../../Constants/WhyChooseUsReasonsConstants';

interface ReasonImageContainerContainerProps {
    currentImagePath: string | null;
    imageAlignment: ImageAlignment;
}

export function ReasonImageContainerContainer({
    currentImagePath,
    imageAlignment,
}: ReasonImageContainerContainerProps): React.ReactElement {
    return (
        <ReasonImageContainerView
            currentImagePath={currentImagePath}
            imageAlignment={imageAlignment}
        />
    );
}

