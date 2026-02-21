import './globals.css';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Avinash Shinde — Creative Developer',
    description: 'Portfolio of Avinash Shinde — A Creative Developer focusing on building functional and aesthetically pleasing web experiences.',
    openGraph: {
        title: 'Avinash Shinde — Creative Developer',
        description: 'Portfolio of Avinash Shinde — A Creative Developer focusing on building functional and aesthetically pleasing web experiences.',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="grain">
                <SmoothScrollProvider>
                    <CustomCursor />
                    <Navbar />
                    <main>{children}</main>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
