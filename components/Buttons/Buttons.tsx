import { CSSProperties } from 'react'
import styles from './Buttons.module.scss'
import arrowIcon from '@/public/icons/arrow-thick.svg'

export function WithArrow({
    children,
    type = 'primary',
    href,
    fullHeight = false
}: {
    children: React.ReactNode
    type?: 'primary' | 'secondary'
    href: string
    fullHeight?: boolean
}) {
    const className = `${styles.button} ${
        type === 'primary' ? styles.primary : styles.secondary
    } ${fullHeight ? styles.fullHeight : ''}`
    return (
        <a className={className} href={href}>
            <img src={arrowIcon.src} alt='Arrow Icon' width={20} height={20} />
            {children}
        </a>
    )
}

export default function Buttons({
    style = {},
    children
}: {
    style?: CSSProperties
    children: React.ReactNode
}) {
    return (
        <div className={styles.buttons} style={style}>
            {children}
        </div>
    )
}
