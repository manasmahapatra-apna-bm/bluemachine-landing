'use client';

import { RequestDemoButtonView } from './RequestDemoButton.view';

interface RequestDemoButtonContainerProps {
    onClick: () => void;
    label: string;
    arrow: string;
}

export function RequestDemoButtonContainer({ onClick, label, arrow }: RequestDemoButtonContainerProps): React.ReactElement {
    const handleClick = (): void => {
        onClick();
    };

    return <RequestDemoButtonView onClick={handleClick} label={label} arrow={arrow} />;
}

