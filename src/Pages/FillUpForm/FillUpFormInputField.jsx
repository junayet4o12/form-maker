// import React from 'react';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { storeDataInLocalStorage } from "../../hooks/manageLocalStorage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

/* eslint-disable react/prop-types */
// import React from 'react';

const FillUpFormInputField = ({ inputField, everyData, setEveryData, _id, alreadyFilledUpData }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const thisFieldData = alreadyFilledUpData?.find(datum => inputField?.label == datum?.key)

    const [selectedOption, setSelectedOption] = useState(thisFieldData?.value || '');
    const [inputFieldValue, setInputFieldValue] = useState(thisFieldData?.value || '')
    const handleOptionChange = (e) => {
        e.preventDefault();
        setSelectedOption(e.target.value)
        handleChange(e)
    };
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const handleChange = (e) => {
        e?.preventDefault();
        const newArray = everyData.filter(data => data.key !== inputField?.label)
        if (inputField?.inputType === 'file') {
            setInputFieldValue(e.target.files)
            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.files,
                type: inputField?.inputType || 'not an input field',
            }])
            // storeDataInLocalStorage(_id, [...newArray, {
            //     key: inputField?.label,
            //     value: e.target.files,
            //     type: inputField?.inputType || 'not an input field',
            // }])
        } else if (inputField?.type === 'Multiple Choice') {
            setInputFieldValue(e.target.value)
            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.value,
                type: inputField?.type || 'not an input field',

            }])
            if (user) {
                axiosSecure.put(`/fillingUpForm/${user?.email}/${_id}`, [...newArray, {
                    key: inputField?.label,
                    value: e.target.value,
                    type: inputField?.type || 'not an input field',

                }])
                    .then(() => {

                    })
                    .catch(() => {
                        storeDataInLocalStorage(_id, [...newArray, {
                            key: inputField?.label,
                            value: e.target.value,
                            type: inputField?.type || 'not an input field',

                        }])
                    })
            } else {
                storeDataInLocalStorage(_id, [...newArray, {
                    key: inputField?.label,
                    value: e.target.value,
                    type: inputField?.type || 'not an input field',

                }])
            }


        } else {
            setInputFieldValue(e.target.value)
            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.value,
                type: inputField?.inputType || inputField?.type,
            }])

            if (user) {
                axiosSecure.put(`/fillingUpForm/${user?.email}/${_id}`, [...newArray, {
                    key: inputField?.label,
                    value: e.target.value,
                    type: inputField?.inputType || inputField?.type,
                }])
                    .then(() => {

                    })
                    .catch(() => {
                        storeDataInLocalStorage(_id, [...newArray, {
                            key: inputField?.label,
                            value: e.target.value,
                            type: inputField?.inputType || inputField?.type,
                        }])
                    })
            } else {
                storeDataInLocalStorage(_id, [...newArray, {
                    key: inputField?.label,
                    value: e.target.value,
                    type: inputField?.inputType || inputField?.type,
                }])
            }
        }


    }
    return (
        <div className="relative w-full  flex flex-col gap-2 min-w-[200px] mx-auto bg-black/20 border border-primary p-2 px-4 rounded-sm">
            <label className='ml-1 text-white'>{inputField?.label}</label>
            <div className="w-full flex items-center gap-2">
                {
                    inputField?.type === 'Input' && <input value={inputFieldValue} className="input input-bordered input-error w-full h-11 py-1.5 rounded-sm bg-black/20 text-white border-primary border"
                        onChange={handleChange}
                        required={inputField?.requirement}
                        type={inputField?.inputType} placeholder={inputField?.label} />
                }
                {
                    inputField?.type === 'Textarea' && <textarea
                        value={inputFieldValue}
                        onChange={handleChange}
                        required={inputField?.requirement}
                        className="input input-bordered input-error w-full h-16 pt-1 rounded-sm bg-black/20 text-white border-primary border" placeholder={inputField?.label} ></textarea>
                }
                {
                    inputField?.type === 'Select' && <select
                        value={inputFieldValue}
                        onChange={handleChange}
                        required={inputField?.requirement}
                        className="select select-error w-full h-11 rounded-sm bg-black/20 text-white border-primary border">
                        <option className="bg-black/50" value={''}>Select</option>
                        {
                            inputField?.fields.map(field => <option key={field.id} className="bg-black/50">{field.value}</option>)
                        }
                    </select>
                }
                {
                    inputField?.type === 'Multiple Choice' && <div className="w-full  py-1.5 px-3 rounded-sm bg-black/20 text-white border-primary border">
                        <input value={selectedOption}
                            required={inputField?.requirement}
                            onChange={handleChange}
                            className="bg-transparent border-transparent text-transparent w-full min-h-full absolute -z-10" type="text" />
                        {
                            inputField?.fields.map(field => <div className="py-1 z-20 space-x-2" key={field.id}>
                                <input type="radio" value={field.value}
                                    checked={selectedOption === field.value}
                                    onChange={handleOptionChange}
                                />
                                <label>{field.value}</label>
                            </div>)
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default FillUpFormInputField;