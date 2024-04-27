import { CSSProperties } from 'react'
import styles from './CTA.module.css'
export default function CTA({
    inPage = false,
    color,
    style
}: {
    inPage?: boolean
    color?: 'red'
    style?: CSSProperties
}) {
    return (
        <a
            href={inPage ? '#booking' : '/booking'}
            className={`${styles.cta} ${color ? styles.red : ''}`}
            style={style}
        >
            Book a Call
        </a>
    )
}
