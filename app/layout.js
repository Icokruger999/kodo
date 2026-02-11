export const metadata = {
  title: 'AI Supply Chain Agent',
  description: 'Automated restock management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
