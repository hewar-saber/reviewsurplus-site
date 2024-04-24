import NichePage from '@/components/NichePage/NichePage'

export default function Page() {
    const title = 'Increase Revenue With More 5-Star Reviews.'
    const text =
        'Increase your revenue easily by collecting more 5-star reviews with our reputation management software. Book a call if you can handle more business.'
    return (
        <NichePage title={title} text={text}>
            <img
                src='/images/landing.png'
                alt='Illustration of more Google reviews'
            />
        </NichePage>
    )
}
