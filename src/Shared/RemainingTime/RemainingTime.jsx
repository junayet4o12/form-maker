/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { millisecondMaker } from "../../hooks/milisecondMaker";
import { hourMinuteSecond } from "../../hooks/hourMinuteSecond";

const RemainingTime = ({ time1, time2 }) => {
    const [time, setTime] = useState('')
    useEffect(() => {
        setInterval(() => {
            const remainingTime = millisecondMaker(time1, time2) - new Date().getTime();
            if (remainingTime < 0) {
                setTime(0)
            } else {
                setTime(remainingTime)
            }
        }, 1000);
    }, [])
    return (
        <div>
            <h1>{hourMinuteSecond(time)}</h1>
        </div>
    );
};

export default RemainingTime;