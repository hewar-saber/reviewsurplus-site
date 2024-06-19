'use client'
import Image from 'next/image'
import styles from './Projects.module.css'
import Marquee from 'react-fast-marquee'

export default function Projects() {
    return (
        <Marquee
            speed={100}
            style={{
                gap: 'var(--group-medium)'
            }}
            {...{}}
            pauseOnClick
        >
            <div className={styles.projects}>
                <Image
                    src='/images/Fotballbilletter.webp'
                    alt='ReviewSurplus™ Online Reputation Management Software'
                    width={800}
                    height={500}
                    layout='responsive'
                    sizes='(max-width: 900px) 150vw, 50vw'
                />
                <Image
                    src='/images/aic-website.webp'
                    alt='ReviewSurplus™ Online Reputation Management Software'
                    width={800}
                    height={500}
                    layout='responsive'
                    sizes='(max-width: 900px) 150vw, 50vw'
                />
                <Image
                    src='/images/Fotballbilletter-mockup.webp'
                    alt='ReviewSurplus™ Online Reputation Management Software'
                    width={800}
                    height={500}
                    layout='responsive'
                    sizes='(max-width: 900px) 150vw, 50vw'
                />
                <Image
                    src='/images/aic-website-mockup.webp'
                    alt='ReviewSurplus™ Online Reputation Management Software'
                    width={800}
                    height={500}
                    layout='responsive'
                    sizes='(max-width: 900px) 150vw, 50vw'
                />
            </div>
        </Marquee>
    )
}
