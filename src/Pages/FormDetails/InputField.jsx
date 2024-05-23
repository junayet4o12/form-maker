/* eslint-disable react/prop-types */
// import React from 'react';

import { useState } from "react";

const InputField = ({ inputField }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    return (
        <div className="relative w-full  flex flex-col gap-2 min-w-[200px] mx-auto bg-black/20 border border-primary p-2 px-4 rounded-sm">
            <label className='ml-1 text-white'>{inputField?.label}</label>
            <div className="w-full flex items-center gap-2">
                {
                    inputField?.type === 'Input' && <input className="input input-bordered input-error w-full h-11 py-1.5 rounded-sm bg-black/20 text-white border-primary border" type={inputField?.inputType} placeholder={inputField?.label} />
                }
                {
                    inputField?.type === 'Textarea' && <textarea className="input input-bordered input-error w-full h-16 pt-1 rounded-sm bg-black/20 text-white border-primary border" placeholder={inputField?.label} ></textarea>
                }
                {
                    inputField?.type === 'Select' && <select
                        className="select select-error w-full h-11 rounded-sm bg-black/20 text-white border-primary border">
                        {
                            inputField?.fields.map(field => <option key={field.id} className="bg-black/50">{field.value}</option>)
                        }
                    </select>
                }
                {
                    inputField?.type === 'Multiple Choice' && <div className="w-full  py-1.5 px-3 rounded-sm bg-black/20 text-white border-primary border">
                        {
                            inputField?.fields.map(field => <div className="py-1 space-x-2" key={field.id}>
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

export default InputField;