import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/tailwind.css'
import 'react-tooltip/dist/react-tooltip.css'
import { ThemeProvider } from '@/utils/themeContext';
import { Inter, Roboto_Mono, Nunito, Signika, Tilt_Neon } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const signika = Signika({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-signika',
})

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const tilt_neon = Tilt_Neon({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-tilt-neon', 
})

export default function RootLayout({ children }) {
  return (
    <html lang="en"
          className={`${inter.variable} ${nunito.variable} ${roboto_mono.variable} ${signika.variable} ${tilt_neon.variable}`}>
    <Analytics/>
    <ThemeProvider>
      <body>{children}</body>
    </ThemeProvider>  
    </html>
  );
}
