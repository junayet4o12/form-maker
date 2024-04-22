/* eslint-disable react/prop-types */
// import React from 'react';

import FillUpDataCardsDatum from "../../Shared/FillUpDataCardsDatum";
import { makeVisibleTime2 } from "../../hooks/makeVisibleTime2";

const TableBody = ({ allQuestions, data, idx: query }) => {
    const rearrangedData = [];
    allQuestions.forEach(item => {
        const foundObject = data?.allData.find(obj => obj.key === item);
        if (foundObject) {
            rearrangedData.push(foundObject);
        }
    });
    const dataForSharingToSibling = (a) => {
        const datum = rearrangedData?.find(b => b?.key == a);
        return datum

    }
    return (

        <tr className={`${query % 2 === 0 ? 'bg-secondary/20' : 'bg-secondary text-white'}`}>
            <th>{query}</th>
            {
                allQuestions?.map((a, idx) => <td key={idx}> <span><FillUpDataCardsDatum data={dataForSharingToSibling(a)} /></span> </td>)
            }
            <td>{makeVisibleTime2(data?.storedTime)}</td>
        </tr>

    );
};

export default TableBody;