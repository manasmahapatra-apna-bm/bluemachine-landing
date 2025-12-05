'use client';

import { HeroCTAView } from './HeroCTA.view';

interface HeroCTAContainerProps {
    onClick: () => void;
    text: string;
    arrow: string;
}

export function HeroCTAContainer({ onClick, text, arrow }: HeroCTAContainerProps): React.ReactElement {
    const handleClick = (): void => {
        onClick();
    };

    return <HeroCTAView onClick={handleClick} text={text} arrow={arrow} />;
}

