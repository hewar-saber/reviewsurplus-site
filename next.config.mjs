/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
        WEBSITE_URL: process.env.WEBSITE_URL
    },
    experimental: {
        swcMinify: false,
        serverMinification: false
    }
}

export default nextConfig
