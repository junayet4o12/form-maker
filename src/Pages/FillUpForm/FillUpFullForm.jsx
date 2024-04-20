/* eslint-disable react/prop-types */
// import React from 'react';

import { useEffect, useState } from "react";
import FormBanner from "../../Shared/FormBanner";
import { millisecondMaker } from "../../hooks/milisecondMaker";
import FillUpFormInputFields from "./FillUpFormInputFields";
import RemainingTime from "../../Shared/RemainingTime/RemainingTime";
import { makeVisibleTime } from "../../hooks/makeVisibleTime";
import { makeVisibleTime2 } from "../../hooks/makeVisibleTime2";
import TimerLoader from "../../Shared/LottieAnimation/TimerLoader";

const FillUpFullForm = ({ formDetails }) => {
    const { inputFields, userEmail, _id, enabledDate, enabledTime, disabledDate, disabledTime } = formDetails;
    const [disabledTimeInMillisecond, setDisabledTimeMillisecond] = useState(0)
    const [enabledTimeInMillisecond, setEnabledTimeMillisecond] = useState(0)
    useEffect(() => {
        const checkRemainingTime = millisecondMaker(disabledDate, disabledTime) - new Date().getTime();
        if (checkRemainingTime < 0) {
            setDisabledTimeMillisecond(-1)
        } else {
            setInterval(() => {
                const remainingTime = millisecondMaker(disabledDate, disabledTime) - new Date().getTime();
                setDisabledTimeMillisecond(remainingTime)
            }, 1000);
        }
    }, []);
    useEffect(() => {
        const checkRemainingTime = millisecondMaker(enabledDate, enabledTime) - new Date().getTime();
        if (checkRemainingTime < 0) {
            setEnabledTimeMillisecond(-1)
        } else {
            setInterval(() => {
                const remainingTime = millisecondMaker(enabledDate, enabledTime) - new Date().getTime();
                setEnabledTimeMillisecond(remainingTime)
            }, 1000);
        }
    }, []);
    return (
        <div className="py-10">
            <div className="relative min-h-[200px] max-w-[500px] min-w-[200px] mx-auto">
                <FormBanner img={formDetails?.formBgImg} title={formDetails?.title} description={formDetails?.description} />

                {
                    enabledTimeInMillisecond < 0 && <div className="absolute top-0 left-0 text-white text-sm flex gap-2 p-0.5 px-2 bg-black/50">
                        Form will end after: <RemainingTime time1={disabledDate} time2={disabledTime} />
                    </div>
                }
                {
                    enabledTimeInMillisecond >= 0 && <div className="absolute top-0 left-0 text-white text-sm flex gap-2 p-0.5 px-2 bg-black/50">
                    Form will start after: <RemainingTime time1={enabledDate} time2={enabledTime} />
                </div>
                }
                



            </div>
            {
                disabledTimeInMillisecond < 0 ? <div className=" flex justify-center items-center gap-2 flex-col py-5">
                    <h2 className="flex flex-col text-center"><span className="text-2xl font-bold">Times up at </span> <span className="text-base">{makeVisibleTime2(millisecondMaker(disabledDate, disabledTime))}</span></h2>
                    <p className="text-sm font-bold">This form is not available for collecting data anymore!!</p>
                </div> : enabledTimeInMillisecond >= 0 ? <div className=" flex justify-center items-center gap-2 flex-col py-5">
                    <h2 className="flex flex-col text-center"><span className="text-2xl font-bold">Form will be start at </span> <span className="text-base">{makeVisibleTime2(millisecondMaker(enabledDate, enabledTime))}</span></h2>
                </div> : <FillUpFormInputFields inputFields={inputFields} userEmail={userEmail}
                    _id={_id} />
            }
        </div>
    );
};

export default FillUpFullForm;