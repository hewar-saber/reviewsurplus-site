import styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import CTA from '../CTA/CTA'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href='/' aria-label='Navigate to Home Page'>
                <Image
                    alt='Logo'
                    width={parseInt(`${208 * 0.6}`)}
                    height={parseInt(`${89 * 0.6}`)}
                    src={'/images/logo.svg'}
                ></Image>
            </Link>
            <CTA
                style={{
                    maxWidth: '150px'
                }}
            />
        </header>
    )
}
