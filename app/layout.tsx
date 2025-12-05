import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-outfit',
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
        <html lang="en" className={outfit.variable}>
            <body className={outfit.className}>{children}</body>
        </html>
    );
}
