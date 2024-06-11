import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Secure Your Snowboard.',
    template: `%s - Secure Your Snowboard.`
  },
  keywords: ['snowboard registry', 'snowboard theft prevention', 'snowboard recovery', 'snowboard serial number', 'stolen snowboards', 'lost snowboards', 'snowboard registration', 'snowboard tracking', 'snowboard protection', 'snowboard identification'],
  creator: 'Ryan Meinzer',
  description: 'Secure your snowboard with SnowboardRegistry.com. Prevent theft and recover lost or stolen boards with our serial number tracking and identification system.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}