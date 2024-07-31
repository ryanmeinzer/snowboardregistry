import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { Metadata } from 'next'
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Secure Your Snowboard.',
    template: `%s - Secure Your Snowboard.`
  },
  keywords: ['snowboard registry', 'snowboard theft prevention', 'snowboard recovery', 'snowboard serial number', 'stolen snowboards', 'lost snowboards', 'snowboard registration', 'snowboard tracking', 'snowboard protection', 'snowboard identification'],
  creator: 'Ryan Meinzer',
  description: 'Register to guard against theft and help recover lost or found snowboards.',
  openGraph: {
    images: [{
      url: "/share-image.png",
    }],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
