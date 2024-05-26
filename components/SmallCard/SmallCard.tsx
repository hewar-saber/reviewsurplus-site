import { ReactNode } from 'react'
import styles from './SmallCard.module.scss'
export default function SmallCard({
    imgSrc,
    imgAlt,
    imgWidth = 40,
    title,
    description
}: {
    imgSrc: string
    imgAlt: string
    imgWidth?: number
    title: string
    description: string
}) {
    return (
        <figure className={styles.smallCard}>
            <img src={imgSrc} alt={imgAlt} width={imgWidth} />
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
