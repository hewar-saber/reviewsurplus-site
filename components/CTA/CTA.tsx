import { CSSProperties } from 'react'
import styles from './CTA.module.scss'
import Link from 'next/link'
export default function CTA({
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
        <a
            href={inPage ? '#booking' : '/booking'}
            className={`${styles.cta} ${color ? styles.red : ''} 
            ${reverse ? styles.reverse : ''} ${className}`}
            style={style}
        >
            Book a Call
        </a>
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
            href='/case-studies'
            className={`${styles.secondary} ${color ? styles.red : ''} ${
                reverse ? styles.reverse : ''
            } ${className}`}
            style={style}
        >
            View Case Studies
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
