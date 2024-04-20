/* eslint-disable react/prop-types */
// import React from 'react';

import FillUpDataCardsDatum from "../../Shared/FillUpDataCardsDatum";

const TableBody = ({ allQuestions, data, idx }) => {
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

        <tr>
            <th>{idx}</th>
            {
                allQuestions?.map((a, idx) => <td key={idx}> <span><FillUpDataCardsDatum data={dataForSharingToSibling(a)} /></span> </td>)
            }
        </tr>

    );
};

export default TableBody;