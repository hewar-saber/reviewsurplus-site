import {
    ButtonHTMLAttributes,
    CSSProperties,
    PointerEvent,
    ReactNode
} from 'react'
import styles from './Button.module.css'

type Props = {
    children: ReactNode
    loading?: Boolean
    type?: 'PRIMARY' | 'SECONDARY'
    active?: Boolean
    style?: CSSProperties
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    onClick?: (e: PointerEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export default function Button({
    children,
    type = 'PRIMARY',
    loading = false,
    active = false,
    buttonType,
    onClick = () => {},
    style = {},
    disabled = false
}: Props) {
    if (type == 'PRIMARY') {
        return (
            <button
                className={`${styles.primary} ${loading ? styles.loading : ''}`}
                onClick={onClick}
                style={style}
                type={buttonType ?? 'submit'}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
    if (type == 'SECONDARY') {
        return (
            <button
                className={`${styles.secondary} ${
                    active ? styles.active : ''
                } ${loading ? styles.loading : ''}`}
                onClick={onClick}
                type={buttonType ?? 'button'}
                style={style}
                disabled={disabled}
            >
                {!loading && children}
            </button>
        )
    }

    return <button>{children}</button>
}
