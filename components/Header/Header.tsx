'use client'
import styles from './Header.module.scss'
import Link from 'next/link'
import CTA from '../CTA/CTA'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href='/' aria-label='Navigate to Home Page'>
                <picture>
                    <source
                        srcSet='/images/logo-white.svg'
                        media='(prefers-color-scheme: dark)'
                    />
                    <img alt='Logo' width={100} src={'/images/logo.svg'}></img>
                </picture>
            </Link>
            <div className={styles.links}>
                <Link href='#how' className={styles.link}>
                    How it Works
                </Link>
                <Link href='#work' className={styles.link}>
                    Our Work
                </Link>
                <Link href='#faq' className={styles.link}>
                    FAQ
                </Link>

                <CTA className={styles.cta} />
            </div>
        </header>
    )
}
