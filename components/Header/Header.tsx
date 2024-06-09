'use client'
import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import CTA, { CaseStudyCTA } from '../CTA/CTA'
import { useEffect, useState } from 'react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isMenuOpen])

    return (
        <header className={styles.header}>
            <Link href='/' aria-label='Navigate to Home Page'>
                <img alt='Logo' width={100} src={'/images/logo.svg'}></img>
            </Link>
            <div className={styles.links}>
                <Link href='/webdesign' className={styles.link}>
                    Web Design & SEO
                </Link>
                <Link
                    href='/online-reputation-management'
                    className={styles.link}
                >
                    Reputation Management
                </Link>
                <CaseStudyCTA className={styles.secondaryCta} />
                <CTA className={styles.cta} />
                <button
                    className={`${styles.menu} ${
                        isMenuOpen ? styles.open : ''
                    }`}
                    aria-label='Open Menu'
                    onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                </button>
            </div>
            {isMenuOpen && (
                <div className={styles.menuContainer}>
                    <Link href='/webdesign-and-seo' className={styles.link}>
                        Web Design & SEO
                    </Link>
                    <Link
                        href='/online-reputation-management'
                        className={styles.link}
                    >
                        Reputation Management
                    </Link>
                    <CaseStudyCTA className={styles.secondaryCta} />
                    <CTA className={styles.cta} />
                </div>
            )}
        </header>
    )
}
