import { ReactNode } from 'react'
import styles from './Highlight.module.css'

export default function Highlight({ children }: { children: ReactNode }) {
    return <strong className={styles.highlight}>{children}</strong>
}
