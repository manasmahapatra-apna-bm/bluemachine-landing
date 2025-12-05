'use client';

import { RequestDemoButtonView } from './RequestDemoButton.view';

interface RequestDemoButtonContainerProps {
    label: string;
    onClick: () => void;
}

export function RequestDemoButtonContainer({
    label,
    onClick,
}: RequestDemoButtonContainerProps): React.ReactElement {
    return <RequestDemoButtonView label={label} onClick={onClick} />;
}

