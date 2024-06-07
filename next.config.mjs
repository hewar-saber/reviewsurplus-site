/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
        WEBSITE_URL: process.env.WEBSITE_URL,
        BOOKING_URL: process.env.BOOKING_URL
    },
    experimental: {
        swcMinify: false,
        serverMinification: false
    },
    redirects: async () => {
        return [
            {
                source: '/booking',
                destination: process.env.BOOKING_URL,
                permanent: true
            }
        ]
    }
}

export default nextConfig
