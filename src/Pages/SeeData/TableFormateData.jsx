/* eslint-disable react/prop-types */

import { useState } from "react";
import TableBody from "./TableBody";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

const TableFormateData = ({ storedFormData: comingStoredFormData, allQuestions, formDetails }) => {

    const [filteringText, setFilteringText] = useState({})
    const [slicing, setSlicing] = useState(10)
    const [showingSlice, setShowingSlice] = useState(0)
    const [giveRealFormData, setGiveRealFormData] = useState(true)
    let storedFormDataAll = comingStoredFormData?.map((data, idx) => {
        const newData = {
            ...data,
            id: idx + 1
        }
        return newData
    })
    const [storedFormData, setStoredFormData] = useState(storedFormDataAll || [])


    const arrayForSorting = [...storedFormData]
    const shortedData = arrayForSorting.sort((a, b) => -a?.storedTime + b?.storedTime);
    const allInputFields = formDetails?.inputFields
    const allMultipleChoiceInputField = allInputFields?.filter(field => field?.type === 'Multiple Choice');
    const allSelectInputField = allInputFields?.filter(field => field?.type === 'Select');
    const allMultipleAndSelectFields = [...allMultipleChoiceInputField, ...allSelectInputField]
    const allMultipleAndSelectFieldsWithIdx = allMultipleAndSelectFields?.map((field, idx) => {
        return {
            ...field,
            idx: idx + 1
        }
    })
    const handleFilteringText = (e, idx, label) => {
        e.preventDefault();
        setShowingSlice(0)
        setFilteringText({
            idx: idx,
            value: e?.target.value
        })
        if (e?.target.value === '' || e?.target.value === 'dhewegvaddheteffassdasfgseeddfgvcdfashfheriurtsdddssd') {
            return setStoredFormData(storedFormDataAll)
        }
        const filteredStoredFormData = storedFormDataAll?.filter(data => data?.allData?.find(datum => datum?.key === label)?.value === e?.target?.value)
        const filteredStoredFormDataAll = filteredStoredFormData?.map((data, idx) => {
            const newData = {
                ...data,
                id: idx + 1
            }
            return newData
        })
        setStoredFormData(filteredStoredFormDataAll)
        // setFilteringText(e?.target?.value)
    }
    const handleNextData = () => {
        if (showingSlice + slicing >= storedFormData.length) {
            return
        }
        setShowingSlice(showingSlice + slicing)
    }
    const handlePrevData = () => {
        if (showingSlice - slicing < 0) {
            return
        }
        setShowingSlice(showingSlice - slicing)
    }
    const handleReducePerPage = () => {
        if (slicing === 5) {
            return
        } else {
            setShowingSlice(0)
            setSlicing(slicing - 5)
        }
    }
    const handleIncreasePerPage = () => {
        if (slicing === 20) {
            return
        } else {
            setShowingSlice(0)
            setSlicing(slicing + 5)
        }
    }

    return (
        <div className="overflow-x-hidden py-7 relative px-5 w-full">

            {
                storedFormData?.length > 0 && <>
                    <div className="overflow-x-auto rounded-sm">
                        <table className="table ">
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
                                    storedFormData?.slice(showingSlice, showingSlice + slicing)?.map((data, idx) => <TableBody data={data} idx={idx + 1} key={idx} allQuestions={allQuestions} />)
                                }
                            </tbody>
                        </table>

                    </div>


                </>
            }
            {
                storedFormData?.length < 1 && <h2 className="text-3xl font-bold text-center py-10 text-white">No Data available!!</h2>
            }
            {
                comingStoredFormData?.length > 0 && <div className="text-white grid md:grid-cols-2  items-center gap-5 gap-x-20 pb-3 w-full px-10 md:px-20">
                    <div className="relative p-2 flex flex-col w-max justify-center items-center gap-3 my-5   border-2  border-primary rounded-sm text-black">
                        <div className=" absolute top-0 left-0 w-full h-full -z-10 bg-black/80 blur-sm"></div>
                        <div className="flex gap-5  bg-white/30  rounded-sm p-1 px-2">
                            <button className={`pr-1  h-6   rounded-sm   text-xs font-bold flex justify-center items-center  hover:bg-white bg-gray-200`}
                                onClick={handlePrevData}
                            ><span className="text-2xl mr-[-4px] ml-[-4px]"><GrFormPrevious /></span> Prev</button>

                            <button className={`pl-1  h-6   rounded-sm   text-xs font-bold flex justify-center items-center  hover:bg-white bg-gray-200`}
                                onClick={handleNextData}
                            >Next <span className="text-2xl mr-[-4px] ml-[-4px]"><MdOutlineNavigateNext /></span></button>

                        </div>
                        <div className="flex gap-3 bg-white/30  rounded-sm p-1 px-2">
                            <button className={`pr-1  h-6   rounded-sm   text-xs font-bold flex justify-center items-center  hover:bg-white bg-gray-200`}
                                onClick={handleReducePerPage}
                            ><span className="text-2xl mr-[-2px]"><GrFormPrevious /></span></button>
                            <div className="px-2  h-6   rounded-sm   text-xs font-bold justify-center items-center  hover:bg-white bg-gray-200 flex flex-col">
                                <span>Per Page</span>
                                <span className="-mt-1">{slicing}</span>
                            </div>

                            <button className={`pl-1  h-6   rounded-sm   text-xs font-bold flex justify-center items-center  hover:bg-white bg-gray-200`}
                                onClick={handleIncreasePerPage}
                            ><span className="text-2xl ml-[-2px]"><MdOutlineNavigateNext /></span></button>

                        </div>
                    </div>
                    {
                        allMultipleAndSelectFieldsWithIdx?.map((field, idx) => <div key={idx} className="flex  flex-col w-full max-w-[500px] gap-1 p-2 border-2 border-primary rounded-sm relative">
                            <div className=" absolute top-0 left-0 w-full h-full -z-10 bg-black/80 blur-sm"></div>
                            <label className="text-sm">Filter by &quot;{field?.label}&quot;:</label>

                            <div className="">
                                <select
                                    id={field?.idx}
                                    value={filteringText?.idx === field?.idx ? filteringText?.value : ''}
                                    onChange={(e) => handleFilteringText(e, field?.idx, field?.label)}
                                    placeholder={`Select`} className="h-8 text-sm bg-primary/10 border  border-primary block rounded-sm w-40 ml-auto">
                                    <option disabled className="bg-black/70" value="">Select</option>
                                    <option className="bg-black/70" value="dhewegvaddheteffassdasfgseeddfgvcdfashfheriurtsdddssd">All</option>
                                    {
                                        field?.fields?.map(opt => <option className="bg-black/70" key={opt?.id} value={opt?.value}>{opt?.value}</option>)
                                    }
                                </select>
                            </div>
                        </div>)
                    }
                </div>
            }

        </div>
    );
};

export default TableFormateData;