import { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import animationData from '../../../public/Animation - 1713527958234.json'
const TimerLoader = () => {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            animationData: animationData,
            renderer: 'svg', // or 'canvas', 'html'
            loop: true, // Optional
            autoplay: true, // Optional
        });
    }, []);

    return (
        <div ref={container} />
    );
};

export default TimerLoader;