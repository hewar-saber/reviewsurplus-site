import NichePage from '@/components/NichePage/NichePage'
import { Metadata } from 'next'

const title = 'Get More Customers With More 5-Star Reviews'
const description =
    'Become The Top Plumbing Service In Town with a ton of new 5-star reviews. Book a call today to get more customers.'
const url = `${process.env.WEBSITE_URL}/plumber-reputation-management`
const images = [
    {
        url: `${process.env.WEBSITE_URL}/images/plumber-more-reviews.png`,
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
    category: 'Marketing for Plumbers',
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
        'Plumber reputation management',
        'Plumber reviews',
        'Plumber reputation',
        'Plumber reputation management services',
        'Plumber reputation management companies',
        'Plumber reputation management tools',
        'Plumber reputation management software',
        'Plumber reputation management agency',
        'Plumber online reputation',
        'Plumber online reputation management',
        'Plumber online reputation monitoring',
        'Plumber online reputation repair',
        'Plumber online reputation management services',
        'Plumber online reputation management companies',
        'Plumber online reputation management tools',
        'Plumber online reputation management software',
        '5-star reviews for plumbers',
        'Get more customers for plumbers',
        'Plumber marketing'
    ],
    alternates: {
        canonical: url
    }
}

export default function Page() {
    const title = 'Get More Customers With More 5-Star Reviews'
    const text =
        'Become The Top Plumbing Service In Town with a ton of new 5-star reviews. Book a call today to get more customers.'
    return (
        <NichePage title={title} text={text}>
            <img
                src='/images/plumber-more-reviews.png'
                alt='Illustration of more Google reviews'
            />
        </NichePage>
    )
}
