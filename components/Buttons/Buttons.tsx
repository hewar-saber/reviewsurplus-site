import styles from './Buttons.module.scss'
import arrowIcon from '@/public/icons/arrow-thick.svg'

export function WithArrow({
    children,
    type = 'primary',
    href
}: {
    children: React.ReactNode
    type?: 'primary' | 'secondary'
    href: string
}) {
    const className = `${styles.button} ${
        type === 'primary' ? styles.primary : styles.secondary
    }`
    return (
        <a className={className} href={href}>
            <img src={arrowIcon.src} alt='Arrow Icon' width={20} height={20} />
            {children}
        </a>
    )
}

export default function Buttons({ children }: { children: React.ReactNode }) {
    return <div className={styles.buttons}>{children}</div>
}
