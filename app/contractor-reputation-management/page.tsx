import NichePage from '@/components/NichePage/NichePage'
import { Metadata } from 'next'

const title = 'Get More Business With More 5-Star Reviews'
const description =
    'Become The Top Roofer In Town with a ton of new 5-star reviews. Book a call today to get more customers.'
const url = `${process.env.WEBSITE_URL}/contractor-reputation-management`
const images = [
    {
        url: `${process.env.WEBSITE_URL}/images/contractor-more-reviews.png`,
        alt: title
    }
]
export const metadata: Metadata = {
    title,
    description,
    twitter: {
        card: 'summary_large_image',
        title,
        images
    },
    publisher: 'Review Surplus',
    category: 'Marketing for Contractors',
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
        'Online reputation management agency',
        'roofing reputation management',
        'roofing reviews',
        'roofing reputation',
        'roofing reputation management services',
        'roofing reputation management companies',
        'roofing reputation management tools',
        'roofing reputation management software',
        'roofing reputation management agency',
        'roofing online reputation',
        'roofing online reputation management',
        'roofing online reputation monitoring',
        'roofing online reputation repair',
        'roofing online reputation management services',
        'roofing online reputation management companies',
        'roofing online reputation management tools',
        'roofing online reputation management software',
        '5-star reviews for roofers',
        'Get more customers for roofers',
        'Roofing marketing'
    ],
    alternates: {
        canonical: url
    }
}

export default function Page() {
    const title = 'Get More Customers With More 5-Star Reviews'
    const text =
        'Become The Top Roofer In Town with a ton of new 5-star reviews. Book a call today to get more customers.'
    return (
        <NichePage title={title} text={text}>
            <img
                src='/images/contractor-more-reviews.png'
                alt='Illustration of more Google reviews'
            />
        </NichePage>
    )
}
