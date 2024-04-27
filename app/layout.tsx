import './globals.css'
import Header from '@/components/Header/Header'
import { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'

const title = 'Review Surplus'
const description =
    'Get more revenue with more 5-star reviews. Manage your online reputation with Review Surplus.'
const url = process.env.WEBSITE_URL
const images = [
    {
        url: `${process.env.WEBSITE_URL}/images/og.png`,
        alt: title,
        width: 1000,
        height: 500
    }
]
export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        type: 'website',
        url,
        title,
        description,
        images
    },
    twitter: {
        card: 'summary_large_image',
        title,
        images
    },
    publisher: 'Review Surplus',
    category: 'Business',
    keywords: [
        'Review Surplus',
        'Review',
        'Surplus',
        'Get more revenue',
        '5-star reviews',
        'Manage your online reputation',
        'Online reputation',
        'More positive reviews',
        'protect your online reputation',
        'Online reputation management',
        'protect against negative reviews',
        'Online reputation monitoring',
        'Online reputation repair',
        'Online reputation management services',
        'Online reputation management companies',
        'Online reputation management tools',
        'Online reputation management software',
        'Online reputation management agency'
    ],
    alternates: {
        canonical: process.env.WEBSITE_URL
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <head>
                {/* Favicon stuff */}

                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest' />
                <link
                    rel='mask-icon'
                    href='/safari-pinned-tab.svg'
                    color='#ff0000'
                />
                <meta
                    name='apple-mobile-web-app-title'
                    content='Review Surplus'
                />
                <meta name='application-name' content='Review Surplus' />
                <meta name='msapplication-TileColor' content='#ff0000' />
                <meta name='theme-color' content='#ffffff' />
                {process.env.NODE_ENV === 'production' && (
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `

                            (function(f, b, e, v, n, t, s) {
                                if (f.fbq) return;
                                n = f.fbq = function() {
                                  n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                                };
                                if (!f._fbq) f._fbq = n;
                                n.push = n;
                                n.loaded = true;
                                n.version = '2.0';
                                n.queue = [];
                                t = b.createElement(e);
                                t.async = true;
                                t.src = v;
                                s = b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t, s);
                              })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                  
                              fbq('init', '899628412174054');
                              fbq('track', 'PageView');
                        `
                        }}
                        id='facebook-pixel'
                        strategy='afterInteractive'
                    />
                )}
            </head>
            <body className={GeistSans.className}>
                <Header />
                {children}
            </body>
        </html>
    )
}
