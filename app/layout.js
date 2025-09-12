import './globals.css'

export const metadata = {
  title: 'Radio Garden API Wrapper',
  description: 'Unofficial Radio Garden API wrapper with documentation and testing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}