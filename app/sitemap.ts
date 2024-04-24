import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${process.env.WEBSITE_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0
        },
        {
            url: `${process.env.WEBSITE_URL}/roofing-reputation-management`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        },
        {
            url: `${process.env.WEBSITE_URL}/plumber-reputation-management`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        },
        {
            url: `${process.env.WEBSITE_URL}/dental-reputation-management`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        },

        {
            url: `${process.env.WEBSITE_URL}/contractor-reputation-management`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        }
    ]
}
