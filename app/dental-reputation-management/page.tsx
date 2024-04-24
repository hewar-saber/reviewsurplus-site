import NichePage from '@/components/NichePage/NichePage'
import { Metadata } from 'next'

const title = 'More 5-Star Reviews for Your Dental Practice'
const description =
    'Become The Top Dental Practice In Town with a ton of new 5-star reviews.'
const url = `${process.env.WEBSITE_URL}/dental-reputation-management`
const images = [
    {
        url: `${process.env.WEBSITE_URL}/images/dental-more-reviews.png`,
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
    category: 'Marketing for Dentists',
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
        'dental reputation management',
        'dental reviews',
        'dental reputation',
        'dental reputation management services',
        'dental reputation management companies',
        'dental reputation management tools',
        'dental reputation management software',
        'dental reputation management agency',
        'dental online reputation',
        'dental online reputation management',
        'dental online reputation monitoring',
        'dental online reputation repair',
        'dental online reputation management services',
        'dental online reputation management companies',
        'dental online reputation management tools',
        'dental online reputation management software',
        '5-star reviews for dentists',
        'Get more customers for dentists',
        'dental marketing'
    ],
    alternates: {
        canonical: url
    }
}

export default function Page() {
    const title = "Patient's Favorite Dentist in Your Area? More 5-Star Reviews"
    const text =
        'Become the top dental practice in town with a ton of new 5-star reviews. Book a call today to get the recognition you deserve.'
    return (
        <NichePage title={title} text={text}>
            <img
                src='/images/dental-practice-more-reviews.webp'
                alt='Illustration of more Google reviews'
            />
        </NichePage>
    )
}
