'use client'
import Image from 'next/image'
import Marquee from '../Marquee/Marquee'

export default function Projects() {
    return (
        <Marquee rotate='var(--rorate)'>
            <Image
                src='/images/Fotballbilletter.webp'
                alt='ReviewSurplus™ Online Reputation Management Software'
                width={800}
                height={500}
                layout='responsive'
                sizes='(max-width: 900px) 100vw, 50vw'
            />
            <Image
                src='/images/aic-website.webp'
                alt='ReviewSurplus™ Online Reputation Management Software'
                width={800}
                height={500}
                layout='responsive'
                sizes='(max-width: 900px) 100vw, 50vw'
            />
            <Image
                src='/images/Fotballbilletter-mockup.webp'
                alt='ReviewSurplus™ Online Reputation Management Software'
                width={800}
                height={500}
                layout='responsive'
                sizes='(max-width: 900px) 100vw, 50vw'
            />
            <Image
                src='/images/aic-website-mockup.webp'
                alt='ReviewSurplus™ Online Reputation Management Software'
                width={800}
                height={500}
                layout='responsive'
                sizes='(max-width: 900px) 100vw, 50vw'
            />
        </Marquee>
    )
}
