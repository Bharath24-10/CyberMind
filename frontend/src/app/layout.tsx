import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Management Admin Panel',
  description: 'Manage job postings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            fontFamily: 'Inter, sans-serif',
            primaryColor: 'blue',
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
