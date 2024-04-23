// import React from 'react';

import { useState } from "react";
import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
// import React from 'react';

const FillUpFormInputField = ({ inputField, everyData, setEveryData }) => {
    const [selectedOption, setSelectedOption] = useState('');
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
            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.files,
                type: inputField?.inputType || 'not an input field',
            }])
        } else if (inputField?.type === 'Multiple Choice') {
            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.value,
                type: inputField?.type || 'not an input field',

            }])
        } else {

            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.value,
                type: inputField?.inputType || inputField?.type,
            }])
        }
    }
    return (
        <div className="relative w-full  flex flex-col gap-2 min-w-[200px] max-w-[500px] mx-auto bg-gray-200 p-2 px-4 rounded-md">
            <label className='ml-1'>{inputField?.label}</label>
            <div className="w-full flex items-center gap-2">
                {
                    inputField?.type === 'Input' && <input className="input input-bordered input-primary w-full h-11 py-1.5"
                        onChange={handleChange}
                        required={inputField?.requirement}
                        type={inputField?.inputType} placeholder={inputField?.label} />
                }
                {
                    inputField?.type === 'Textarea' && <textarea
                        onChange={handleChange}
                        required={inputField?.requirement}
                        className="input input-bordered input-primary w-full h-28 pt-1" placeholder={inputField?.label} ></textarea>
                }
                {
                    inputField?.type === 'Select' && <select
                        onChange={handleChange}
                        required={inputField?.requirement}
                        className="select select-primary w-full h-11">
                        <option value={''}>Select</option>
                        {
                            inputField?.fields.map(field => <option key={field.id}>{field.value}</option>)
                        }
                    </select>
                }
                {
                    inputField?.type === 'Multiple Choice' && <div className="w-full bg-white py-1.5 px-3 rounded-lg relative">
                        <input value={selectedOption}
                            required={inputField?.requirement}
                            onChange={handleChange}
                            className="bg-transparent border-transparent text-transparent w-full min-h-full absolute -z-10" type="text" />
                        {
                            inputField?.fields.map(field => <div className="py-1 z-20" key={field.id}>
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