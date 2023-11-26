'use client';
import '@/styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReduxProvider, ThemeRegistry } from '@/providers';
import Popups from '@/containers/Popups';
import '@/modules/translations';

const inter = Inter({ subsets: ['latin'] });

function RootLayout({
    children,
    ...props
}: {
    children: React.ReactNode;
    params: {
        [key: string]: string | string[] | undefined;
    };
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <ThemeRegistry options={{ key: 'mui' }}>
                        {children}
                        <Popups />
                    </ThemeRegistry>
                </ReduxProvider>
            </body>
        </html>
    );
}

export default RootLayout;
