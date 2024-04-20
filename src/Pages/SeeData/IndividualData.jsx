/* eslint-disable react/prop-types */
import { useState } from "react";
import FillUpFormDataCard from "../../Shared/FillUpFormDataCard";

const IndividualData = ({storedFormData, allQuestions}) => {
    const [splitData, setSplitData] = useState(0)
    return (
        <div>
            {
                storedFormData?.length>0 && <div className="flex justify-center items-center gap-7 py-3">
                <button className={`w-12 h-12   rounded-full   text-3xl ${splitData === 0 ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-400 bg-gray-200'}`}

                    onClick={() => {
                        if (splitData === 0) {
                            return
                        } else {
                            setSplitData(splitData - 1)
                        }
                    }}
                >{`<`}</button>
                {/* {
                    paginationArray?.map(number => <button key={number} className={`w-7 h-7  hover:bg-gray-400 rounded-full font-bold ${splitData === number ? 'bg-gray-400' : 'bg-gray-200'}`}
                        onClick={() => setSplitData(number)}
                    >{number + 1}</button>)
                } */}
                <button className={`text-2xl`}
                >{splitData + 1}/{storedFormData?.length}</button>

                <button className={`w-12 h-12 rounded-full   text-3xl ${splitData === storedFormData?.length - 1 ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-400 bg-gray-200'}`}
                    onClick={() => {
                        if (splitData === storedFormData?.length - 1) {
                            return
                        } else {
                            setSplitData(splitData + 1)
                        }
                    }}
                >{`>`}</button>
            </div>
            }

            <div className=" gap-5 p-5">

                {
                    storedFormData?.slice(splitData, splitData + 1)?.map((data, idx) => <FillUpFormDataCard data={data} idx={idx + 1} key={idx} allQuestions={allQuestions} />)
                }
                {
                    storedFormData?.length < 1 && <h2 className="text-3xl font-bold text-center py-10">No Data available!!</h2>
                }
            </div>
        </div>
    );
};

export default IndividualData;