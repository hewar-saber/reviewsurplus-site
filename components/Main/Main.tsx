import { ReactNode } from 'react'
import styles from './Main.module.scss'

export default function Main({
    children,
    noPaddingTop = false
}: {
    children: ReactNode
    noPaddingTop?: boolean
}) {
    const className = `${styles.main} ${
        noPaddingTop ? styles.noPaddingTop : ''
    }`

    return <main className={className}>{children}</main>
}
