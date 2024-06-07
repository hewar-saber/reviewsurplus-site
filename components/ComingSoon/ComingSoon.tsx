import Buttons, { WithArrow } from '../Buttons/Buttons'
import CTA from '../CTA/CTA'
import styles from './ComingSoon.module.scss'

export default function ComingSoon() {
    return (
        <main className={styles.comingSoon}>
            <h1>Coming Soon</h1>
            <p>We are working on something awesome. Stay tuned!</p>
            <Buttons>
                <WithArrow href='/' type='secondary' fullHeight>
                    Home
                </WithArrow>
                <CTA />
            </Buttons>
        </main>
    )
}
