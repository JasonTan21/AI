import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CLL Project Pilot',
  description:
    'Engineering project lifecycle concept for the CLL COE AI Challenge 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
