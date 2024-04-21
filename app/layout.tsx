import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={roboto.className}>
                <Header />
                {children}
            </body>
        </html>
    )
}
