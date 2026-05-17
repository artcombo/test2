import type { Metadata } from 'next'
// ── CSS chunks — split by concern for maintainability ──
import './styles/base.css'     // design tokens, reset, body, grid bg
import './styles/header.css'   // header, logo, search, discord btn
import './styles/tabs.css'     // mode tabs, filter row, region buttons
import './styles/podium.css'   // top-3 podium cards, mode-strip, section label
import './styles/table.css'    // leaderboard table, rank badges, tier tags, responsive
import './styles/profile.css'  // profile modal overlay
import './styles/loader.css'   // cinematic intro loader, wipe animation
import './styles/gamemode.css' // gamemode grid, tier columns, table toggle, retired theme
import './styles/news.css'    // news sidebar — additive only

// ── Update this to your deployed Netlify URL ──────────────────────────────
const SITE_URL = 'https://bloxdtiers.netlify.app'

export const metadata: Metadata = {
  title: 'Bloxd Tiers — Rankings',
  description: 'Community PvP tier rankings for Bloxd. Track the best Sword, Pot, UHC, Soup, Bedwars and Skywars players.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Bloxd Tiers',
    description: 'Community PvP rankings for Bloxd — Sword · Pot · UHC · Soup · Bedwars · Skywars',
    url: SITE_URL,
    siteName: 'Bloxd Tiers',
    images: [
      {
        url: `${SITE_URL}/sword-og.png`,
        width: 1200,
        height: 630,
        alt: 'Bloxd Tiers PvP Rankings',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloxd Tiers',
    description: 'Community PvP rankings for Bloxd — Sword · Pot · UHC · Soup · Bedwars · Skywars',
    images: [`${SITE_URL}/sword-og.png`],
  },
  icons: {
    icon: `${SITE_URL}/sword.png`,
    shortcut: `${SITE_URL}/sword.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Exo+2:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
