/* eslint-disable react/prop-types */

import TableBody from "./TableBody";

const TableFormateData = ({ storedFormData, allQuestions }) => {

    return (
        <div className="overflow-x-hidden py-7">
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            {
                                allQuestions?.map((ques, idx) => <th key={idx}>{ques}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            storedFormData?.map((data, idx) => <TableBody data={data} idx={idx + 1} key={idx} allQuestions={allQuestions} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableFormateData;