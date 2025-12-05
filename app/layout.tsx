import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import './globals.css';

const sourceSans3 = Source_Sans_3({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-source-sans-3',
    display: 'swap',
    preload: true,
});

export const metadata: Metadata = {
    title: 'BlueMachine Landing',
    description: 'Transform your business with cutting-edge solutions',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactElement {
    return (
        <html lang="en" className={sourceSans3.variable}>
            <body className={sourceSans3.className}>{children}</body>
        </html>
    );
}
