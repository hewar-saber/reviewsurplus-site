import { ReactNode } from 'react'
import styles from './SmallCard.module.scss'
export default function SmallCard({
    imgSrc,
    imgAlt,
    imgWidth = 40,
    imgHeight = 40,
    title,
    description
}: {
    imgSrc: string
    imgAlt: string
    imgWidth?: number
    imgHeight?: number
    title: string
    description: string
}) {
    return (
        <figure className={styles.smallCard}>
            <img
                src={imgSrc}
                alt={imgAlt}
                width={imgWidth}
                height={imgHeight}
            />
            <figcaption>
                <b>{title}</b>
                <p>{description}</p>
            </figcaption>
        </figure>
    )
}

export function Cards({ children }: { children: ReactNode }) {
    return <div className={styles.cards}>{children}</div>
}
