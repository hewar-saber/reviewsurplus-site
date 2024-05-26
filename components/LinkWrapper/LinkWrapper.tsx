import { ReactNode } from 'react'
import styles from './LinkWrapper.module.scss'
export default function LinkWrapper({ children }: { children: ReactNode }) {
    return <span className={styles.linkWrapper}>{children}</span>
}
