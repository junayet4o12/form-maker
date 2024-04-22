/* eslint-disable react/prop-types */

import { useState } from "react";
import TableBody from "./TableBody";

const TableFormateData = ({ storedFormData, allQuestions }) => {

    const arrayForSorting = [...storedFormData]
    const shortedData = arrayForSorting.sort((a, b) => -a?.storedTime + b?.storedTime);
    const [giveRealFormData, setGiveRealFormData] = useState(true)
    return (
        <div className="overflow-x-hidden py-7">
            <div>
                {/* <button onClickCapture={()=> setGiveRealFormData(!giveRealFormData)}  className="btn bg-secondary/90 text-white btn-sm  rounded-sm hover:bg-secondary">Sort by Date</button> */}
            </div>
            {
                storedFormData?.length > 0 && <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-primary text-white">
                            <tr>
                                <th></th>
                                {
                                    allQuestions?.map((ques, idx) => <th key={idx}>{ques}</th>
                                    )
                                }
                                <th>Submit Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                (giveRealFormData ? storedFormData : shortedData)?.map((data, idx) => <TableBody data={data} idx={idx + 1} key={idx} allQuestions={allQuestions} />)
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                storedFormData?.length < 1 && <h2 className="text-3xl font-bold text-center py-10">No Data available!!</h2>
            }
        </div>
    );
};

export default TableFormateData;