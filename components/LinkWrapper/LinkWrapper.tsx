import { ReactNode } from 'react'
import styles from './LinkWrapper.module.scss'
export default function LinkWrapper({
    children,
    underline = false
}: {
    children: ReactNode
    underline?: boolean
}) {
    const className = `${styles.linkWrapper} ${
        underline ? styles.underline : ''
    }`
    return <span className={className}>{children}</span>
}
