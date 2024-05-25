import Link from 'next/link'
import styles from './footer.module.css'
import Buttons from '../Buttons/Buttons'
import CTA, { CaseStudyCTA } from '../CTA/CTA'
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.aboutSection}>
                <Link
                    href='/'
                    style={{
                        textDecoration: 'none',
                        width: 'min-content',
                        margin: '0 auto'
                    }}
                >
                    <img
                        src='/images/logo.svg'
                        alt='ReviewSurplus'
                        className={styles.logo}
                        width={200}
                    />
                </Link>
                <p>
                    Many businesses struggle to get traffic, and then convert
                    the traffic to paying customers. We help businesses achieve
                    exactly this with sales optimized websites & increased
                    Google reviews.
                </p>
            </div>
            <div className={styles.section}>
                <Buttons>
                    <CaseStudyCTA />
                    <CTA />
                </Buttons>
            </div>

            <div className={styles.section}>
                <b>Services</b>
                <div className={styles.links}>
                    <Link href={'/services/webdesign-and-seo'}>
                        Web Design & SEO
                    </Link>
                    <Link href={'/services/online-reputation-management'}>
                        Reputation Management
                    </Link>
                </div>
            </div>
            <div className={styles.section}>
                <b>Explore</b>
                <div className={styles.links}>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/booking'}>Book a Call</Link>
                </div>
            </div>
            <div className={styles.section}>
                <Link href={'/privacy'}>Privacy Policy</Link>
            </div>
            <div className={styles.socialLinks}>
                <div className={styles.copy}>© 2023 ReviewSurplus</div>
            </div>
        </footer>
    )
}
