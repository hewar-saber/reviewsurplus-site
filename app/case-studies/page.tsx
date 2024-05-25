import CaseStudies from '@/components/CaseStudies/CaseStudies'
import styles from './page.module.scss'
export default function Page() {
    return (
        <main className={styles.caseStudies}>
            <h1>Case Studies</h1>
            <CaseStudies />
        </main>
    )
}
