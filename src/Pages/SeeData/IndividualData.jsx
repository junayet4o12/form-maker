/* eslint-disable react/prop-types */
import { useState } from "react";
import FillUpFormDataCard from "../../Shared/FillUpFormDataCard";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const IndividualData = ({ storedFormData, allQuestions }) => {
    const [splitData, setSplitData] = useState(0)
    return (
        <div>
            {
                storedFormData?.length > 0 && <div className="flex justify-center items-center gap-7 py-3">
                    <button className={`pr-1  h-8   rounded-sm   text-xs font-bold flex justify-center items-center  ${splitData === 0 ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-white bg-gray-200'}`}

                        onClick={() => {
                            if (splitData === 0) {
                                return
                            } else {
                                setSplitData(splitData - 1)
                            }
                        }}
                    ><span className="text-2xl mr-[-2px]"><GrFormPrevious /></span> Prev</button>
                    
                    <button className={`text-2xl text-black bg-white h-8 px-4 rounded-sm`}
                    >{splitData + 1}/{storedFormData?.length}</button>

                    <button className={`pl-1 h-8   rounded-sm   text-xs font-bold flex justify-center items-center ${splitData === storedFormData?.length - 1 ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-white bg-gray-200'}`}
                        onClick={() => {
                            if (splitData === storedFormData?.length - 1) {
                                return
                            } else {
                                setSplitData(splitData + 1)
                            }
                        }}
                    >Next <span className="text-2xl ml-[-2px]"><MdOutlineNavigateNext/></span></button>
                </div>
            }

            <div className=" gap-5 py-5 relative">

                {/* {
                    storedFormData?.slice(splitData, splitData + 1)?.map((data, idx) => <FillUpFormDataCard data={data} idx={idx + 1} key={idx} allQuestions={allQuestions} />)
                } */}
                {
                    storedFormData?.map((data, idx) =>  <FillUpFormDataCard key={idx} splitData={splitData} data={data} idx={idx + 1} allQuestions={allQuestions} />)
                }
                {
                    storedFormData?.length < 1 && <h2 className="text-3xl font-bold text-center py-10 text-white">No Data available!!</h2>
                }
            </div>
        </div>
    );
};

export default IndividualData;