import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Interactive Line Chart',
  description: 'Interactive line chart for A/B test statistics visualization'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
