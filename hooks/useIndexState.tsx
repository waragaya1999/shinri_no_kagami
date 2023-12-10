import {useState} from "react";

export const useIndexState = () => {
    const [windowSize, setWindowSize] = useState({width: 0, height: 0})

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    return {windowSize, handleResize} as const
}