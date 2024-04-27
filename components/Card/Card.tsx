import { ReactElement, ReactNode } from "react"
import styles from './Card.module.css'

type CardProps = {
    children: ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <figure>{children}</figure>
    )
}

type CardsProps = {
    children: ReactElement<CardProps> | ReactElement<CardProps>[]
}

export const Cards: React.FC<CardsProps> = ({ children }) => {
    return (
        <section className={styles.cards}>
            {children}
        </section>
    )
}
