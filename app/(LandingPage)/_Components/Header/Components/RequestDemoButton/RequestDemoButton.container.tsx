'use client';

import { RequestDemoButtonView } from './RequestDemoButton.view';

interface RequestDemoButtonContainerProps {
    onClick: () => void;
    label: string;
}

export function RequestDemoButtonContainer({ onClick, label }: RequestDemoButtonContainerProps): React.ReactElement {
    const handleClick = (): void => {
        onClick();
    };

    return <RequestDemoButtonView onClick={handleClick} label={label} />;
}

