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
            url: `${process.env.WEBSITE_URL}/online-reputation-management`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8
        }
    ]
}
