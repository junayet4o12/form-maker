/* eslint-disable react/prop-types */
// import React from 'react';

import { formatTimeTo12HourFormat } from "../hooks/formatTimeTo12HourFormat";

const FillUpDataCardsDatum = ({ data }) => {
    const showData = data?.type === 'time' ? formatTimeTo12HourFormat(data?.value) : data?.value || 'not given';
    return (
        <div>
            
            {
                data?.type === 'file' ? <div className="flex flex-col gap-2 py-2">
                    <img className="w-full max-w-[200px] overflow-hidden object-cover rounded-md" src={data?.value} alt="" />
                </div> : <div className="flex gap-x-2 flex-wrap"><span>{showData}</span></div>
            }
        </div>
    );
};

export default FillUpDataCardsDatum;