// import React from 'react';

import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
// import React from 'react';

const FillUpFormInputField = ({ inputField, everyData, setEveryData }) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const handleChange = (e) => {
        e.preventDefault();
        const newArray = everyData.filter(data => data.key !== inputField?.label)
        if (inputField?.inputType === 'file') {
            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.files,
                type: inputField?.inputType || 'not an input field'
            }])
            console.log(everyData);
        } else {

            setEveryData([...newArray, {
                key: inputField?.label,
                value: e.target.value,
                type: inputField?.inputType || inputField?.type
            }])
            console.log(everyData);
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
                        {
                            inputField?.fields.map(field => <option key={field.id}>{field.value}</option>)
                        }
                    </select>
                }
            </div>
        </div>
    );
};

export default FillUpFormInputField;