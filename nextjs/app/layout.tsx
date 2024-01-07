import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'rainbowpui.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ maxWidth: '1000px', margin: 'auto' }}>{children}</body>
    </html>
  );
}
