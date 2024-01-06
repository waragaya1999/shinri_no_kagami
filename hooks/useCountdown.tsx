import { useEffect, useState } from "react"

export const useCountdown = () => {
    const initialValue = 4
    const [countdown, setCountdown] = useState(initialValue)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        let timer: any
        if (isActive && countdown >= 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        } else {
            setCountdown(initialValue)
            setIsActive(false)
        }

        return () => clearTimeout(timer)
    }, [countdown, isActive])

    const startCountdown = () => {
        setIsActive(true)
    }
    return { startCountdown, countdown, isActive }
}
