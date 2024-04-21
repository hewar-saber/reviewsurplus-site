import { CSSProperties, ChangeEvent, Dispatch, ReactNode, RefObject, SetStateAction } from "react"

import styles from "./Input.module.css"


type Messages = {
    [key: string | number]: any
}

type props = {
    placeholder: string
    id: string
    type?: string
    messages: Messages
    setMessages: Dispatch<SetStateAction<Messages>>
    [key: string | number]: any
    values: any
    setValues: Dispatch<SetStateAction<any>>
    children?: ReactNode
    changeCallback?: (e: ChangeEvent<HTMLInputElement>) => any
    onFocus?: () => any
    onBlur?: () => any
    style?: CSSProperties
    disabled?: boolean
}

export default function Input({ placeholder, id, type = "text", messages, setMessages, values, setValues, children, style = {}, onFocus, onBlur, changeCallback, disabled = false, ...props }: props): JSX.Element {
    return (
        <div className={`${styles.input} input-parent`}>
            <label htmlFor={id}>{placeholder}</label>
            <div className={styles.__input__}>
                <input type={type} id={id} value={values[id] ?? ''} onChange={e => {
                    setMessages(prevMessages => {
                        const { [id]: _, ...messages } = prevMessages
                        return messages
                    })
                    setValues({ ...values, [id]: e.target.value })
                    changeCallback?.(e)
                }} {...props} className={`${messages[id] ? styles.inputError : ''}`} onFocus={onFocus} onBlur={onBlur} style={style} readOnly={disabled} />
                {children}
            </div>
            <div className={styles.error}>{messages[id] ?? ""}</div>
        </div>
    )
}