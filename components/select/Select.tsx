'use client'
import { Dispatch, SetStateAction, JSX, ChangeEvent } from "react"
import styles from "./Select.module.css"
import { Option } from '@/types'

type props = {
    placeholder: string
    id: string
    messages: { [key: string]: any }
    setMessages: Dispatch<SetStateAction<object>>
    options: Option[]
    values: any
    setValues: Dispatch<SetStateAction<any>>
    [x: string]: any
    firstValueDisabled?: boolean
}


export default function Select({ values, setValues, messages, setMessages, placeholder, id, options, firstValueDisabled = true, ...props }: props): JSX.Element {

    const defaultValue = "Not Chosen"

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        if (value === defaultValue) {
            if (firstValueDisabled)
                return
            setValues({ ...values, [id]: '' })
        }
        setValues({ ...values, [id]: value })
        if (id in messages) {
            setMessages({ ...messages, [id]: '' })
        }
    }

    const value = values[id] || defaultValue
    const display = options.find(option => option.value === value)?.display ?? value

    return (
        <div className={styles.input}>
            <label htmlFor={id} className={styles.label}>{placeholder}</label>
            <div className={styles.customSelectParent}>
                <select id={id} onChange={handleChange} value={value}>
                    <option value={defaultValue} disabled={firstValueDisabled}>{defaultValue}</option>
                    {options.map(({ value, display, disabled }) => {
                        return <option value={value} disabled={Boolean(disabled)} key={value.toString()}>{display ?? value}</option>
                    })}
                </select>
                <div className={`${styles.customSelect} ${messages[id] ? styles.errorSelect : ''}`}>
                    <span>
                        {display}
                    </span>
                    <div className={styles.arrowDown}></div>
                </div>
            </div>
            <div className={styles.error}>{messages[id] ?? ''}</div>
        </div>
    )
}