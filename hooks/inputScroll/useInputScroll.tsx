
type Messages = {
    [key: string]: any
}

export default function useInputScroll() {

    const scrollIntoView = (element: Element) => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                observer.disconnect()
            }
        }, {
            threshold: 1
        })

        observer.observe(element)
    }

    const scroll = (messages: Messages) => {
        const id = Object.keys(messages)[0];
        const element = document.querySelector(`#${id}`)
        if (!element)
            return
        scrollIntoView(element)
    }

    const scrollElement = (element: Element) => {
        scrollIntoView(element)
    }

    return {
        scroll,
        scrollElement
    }
}