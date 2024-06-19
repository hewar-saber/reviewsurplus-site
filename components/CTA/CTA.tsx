import { CSSProperties } from 'react'
import styles from './CTA.module.scss'
import Link from 'next/link'
import { SmallRows } from '../Flex/Flex'
export default function CTA({
    color,
    style,
    reverse = false,
    className = '',
    label = '100% Free, no obligation',
    labelEnabled = false
}: {
    color?: 'red'
    style?: CSSProperties
    reverse?: boolean
    className?: string
    label?: string
    labelEnabled?: boolean
}) {
    const bookingUrl = process.env.BOOKING_URL
    return (
        <SmallRows>
            <a
                href={bookingUrl}
                className={`${styles.cta} ${color ? styles.red : ''} 
            ${reverse ? styles.reverse : ''} ${className}`}
                style={style}
            >
                Book a Call
            </a>

            {labelEnabled && <p className={styles.label}>{label}</p>}
        </SmallRows>
    )
}

export function CaseStudyCTA({
    inPage = false,
    color,
    style,
    reverse = false,
    className = ''
}: {
    inPage?: boolean
    color?: 'red'
    style?: CSSProperties
    reverse?: boolean
    className?: string
}) {
    return (
        <Link
            href='/projects'
            className={`${styles.secondary} ${color ? styles.red : ''} ${
                reverse ? styles.reverse : ''
            } ${className}`}
            style={style}
        >
            View Projects
        </Link>
    )
}

export function LearnMoreCTA({
    inPage = false,
    color,
    style,
    className = '',
    href
}: {
    href: string
    inPage?: boolean
    color?: 'red'
    style?: CSSProperties
    className?: string
}) {
    return (
        <Link
            href={href}
            className={`${styles.secondary} ${
                color ? styles.red : ''
            } ${className}`}
            style={style}
        >
            Learn More
        </Link>
    )
}
