import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'rainbowpui.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
