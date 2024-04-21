/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
    },
    experimental: {
        swcMinify: false,
        serverMinification: false
    }
}

export default nextConfig
