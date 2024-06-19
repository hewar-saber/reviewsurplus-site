import { ReactNode } from 'react'
import styles from './SmallCard.module.scss'
export default function SmallCard({
    imgSrc,
    imgAlt,
    imgWidth = 40,
    title,
    description,
    darkThemeSrc
}: {
    imgSrc: string
    darkThemeSrc: string
    imgAlt: string
    imgWidth?: number
    title: string
    description: string
}) {
    console.log('darkThemeSrc', darkThemeSrc)
    return (
        <figure className={styles.smallCard}>
            <picture>
                <source
                    srcSet={darkThemeSrc}
                    media='(prefers-color-scheme: dark)'
                />
                <img src={imgSrc} alt={imgAlt} width={imgWidth} />
            </picture>
            <figcaption>
                <b className={styles.title}>{title}</b>
                <p>{description}</p>
            </figcaption>
        </figure>
    )
}

export function Cards({ children }: { children: ReactNode }) {
    return <div className={styles.cards}>{children}</div>
}
