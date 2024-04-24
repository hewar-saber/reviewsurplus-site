import NichePage from '@/components/NichePage/NichePage'
import { Metadata } from 'next'

const title = 'Get More Business With More 5-Star Reviews'
const description =
    'Become The Top Plumbing Service In Town with a ton of new 5-star reviews. Book a call today to get more customers.'
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
    category: 'Marketing for Roofers',
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
        'Contactor reputation management',
        'Contactor reviews',
        'Contactor reputation',
        'Contactor reputation management services',
        'Contactor reputation management companies',
        'Contactor reputation management tools',
        'Contactor reputation management software',
        'Contactor reputation management agency',
        'Contactor online reputation',
        'Contactor online reputation management',
        'Contactor online reputation monitoring',
        'Contactor online reputation repair',
        'Contactor online reputation management services',
        'Contactor online reputation management companies',
        'Contactor online reputation management tools',
        'Contactor online reputation management software',
        '5-star reviews for contractors',
        'Get more customers for contractors',
        'Roofing marketing'
    ],
    alternates: {
        canonical: url
    }
}

export default function Page() {
    const title = 'Get More Business With More 5-Star Reviews'
    const text =
        'Become The Top Contractor In Town with a ton of new 5-star reviews. Book a call today to get more customers.'
    return (
        <NichePage title={title} text={text}>
            <img
                src='/images/contractor-more-reviews.png'
                alt='Illustration of more Google reviews'
            />
        </NichePage>
    )
}
