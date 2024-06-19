import styles from './Flex.module.css'

import { ReactNode } from 'react'

export function SmallRows({ children }: { children: ReactNode }) {
    return <div className={styles.smallRows}>{children}</div>
}

export function MediumRows({ children }: { children: ReactNode }) {
    return <div className={styles.mediumRows}>{children}</div>
}

export function BigRows({ children }: { children: ReactNode }) {
    return <div className={styles.bigRows}>{children}</div>
}
