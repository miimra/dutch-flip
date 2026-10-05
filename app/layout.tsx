import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Dutch Flip — A little Dutch, every day', description: 'Learn everyday Dutch, one flashcard at a time.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f8f7f2' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body>{children}</body></html>;
}
