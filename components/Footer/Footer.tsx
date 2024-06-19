import Link from 'next/link'
import styles from './footer.module.css'
import arrow from '@/public/icons/arrow-iso.svg'
import arrowWhite from '@/public/icons/white-arrow-iso.svg'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.copy}>© 2024 ReviewSurplus</div>
            <Link href='/online-reputation-management'>
                <picture>
                    <source
                        srcSet={arrowWhite.src}
                        media='(prefers-color-scheme: dark)'
                    />
                    <img src={arrow.src} alt='arrow' />
                </picture>
                Online Reputation Management
            </Link>
        </footer>
    )
}
