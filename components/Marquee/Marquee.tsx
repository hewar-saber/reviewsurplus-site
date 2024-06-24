import React, { useEffect, useRef } from 'react'
import styles from './Marquee.module.css'
import gsap from 'gsap'

type Props = {
    children: React.ReactNode
    rotate?: string
}

export default function Marquee({
    children,
    rotate = '0deg'
}: Props): React.JSX.Element {
    const marqueeRef = useRef<HTMLDivElement>(null)
    const marqueeInnerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const marqueeInner = marqueeInnerRef.current!
        const duration = marqueeInner.scrollWidth / 10

        gsap.to(marqueeInner, {
            xPercent: -50,
            ease: 'none',
            duration: duration,
            repeat: -1
        })
    }, [children])

    return (
        <div
            className={styles.marqueeParent}
            ref={marqueeRef}
            style={{
                transform: `rotate(${rotate})`
            }}
        >
            <div className={styles.marquee} ref={marqueeInnerRef}>
                <div className={styles.marqueeContent}>{children}</div>
                <div className={styles.marqueeContent}>{children}</div>
            </div>
        </div>
    )
}
