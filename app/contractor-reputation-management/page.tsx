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
        'Contractor reputation management',
        'Contractor reviews',
        'Contractor reputation',
        'Contractor reputation management services',
        'Contractor reputation management companies',
        'Contractor reputation management tools',
        'Contractor reputation management software',
        'Contractor reputation management agency',
        'Contractor online reputation',
        'Contractor online reputation management',
        'Contractor online reputation monitoring',
        'Contractor online reputation repair',
        'Contractor online reputation management services',
        'Contractor online reputation management companies',
        'Contractor online reputation management tools',
        'Contractor online reputation management software',
        '5-star reviews for contractors',
        'Get more customers for contractors',
        'Contractor marketing'
    ],
    alternates: {
        canonical: url
    }
}

export default function Page() {
    const title = 'Get More Customers With More 5-Star Reviews'
    const text =
        'Get more contracting clients + become the top contractor in town with a ton of new 5-star reviews. Book a call today.'
    return (
        <NichePage title={title} text={text}>
            <img
                src='/images/contractor-more-reviews.png'
                alt='Illustration of more Google reviews'
            />
        </NichePage>
    )
}
