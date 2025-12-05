'use client';

interface GradientLoaderViewProps {
    duration: number;
    isActive: boolean;
}

/**
 * Gradient loader component that displays an animated progress bar
 * 
 * Shows a gradient progress bar that animates from 0% to 100% over
 * the specified duration. Used to indicate breakdown expansion timing.
 * The progress bar is rounded and fills from left to right.
 */
export function GradientLoaderView({ duration, isActive }: GradientLoaderViewProps): React.ReactElement {
    if (!isActive) {
        return <></>;
    }

    return (
        <div className="absolute -top-[2.5px] left-0 right-0 h-[6px] overflow-hidden">
            <div
                className="h-full rounded-full"
                style={{
                    width: '0%',
                    background: 'linear-gradient(99deg, #00AA7B 0.18%, #0090FE 100.18%)',
                    animation: isActive ? `loader-progress ${duration}ms linear forwards` : 'none',
                }}
            />
        </div>
    );
}

