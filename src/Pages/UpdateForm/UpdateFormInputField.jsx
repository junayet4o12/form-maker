/* eslint-disable react/prop-types */
// import React from 'react';
import { useState } from "react";
import { GrDocumentUpdate } from "react-icons/gr";
import UpdateModalForm from "./UpdateModalForm";
const UpdateFormInputField = ({ inputField, setInputFields, inputFields }) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle selection change
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleDeleteField = () => {
        setInputFields(inputFields.filter(field => field.id !== inputField.id))
    }
    return (
        <div className="relative w-full  flex flex-col gap-2 min-w-[200px] max-w-[500px] mx-auto bg-gray-200 p-2 px-4 rounded-md">
            <label className='ml-1'>{inputField?.label}</label>
            <div className="w-full flex items-center gap-2">
                {
                    inputField?.type === 'Input' && <input className="input input-bordered input-primary w-full h-11 py-1.5" type={inputField?.inputType} placeholder={inputField?.label} />
                }
                {
                    inputField?.type === 'Textarea' && <textarea className="input input-bordered input-primary w-full h-16 pt-1" placeholder={inputField?.label} ></textarea>
                }
                {
                    inputField?.type === 'Select' && <select
                        className="select select-primary w-full h-11">
                        {
                            inputField?.fields.map(field => <option key={field.id}>{field.value}</option>)
                        }
                    </select>
                }
                {
                    inputField?.type === 'Multiple Choice' && <div className="w-full bg-white py-1.5 px-3 rounded-lg">
                        {
                            inputField?.fields.map(field => <div className="py-1" key={field.id}>
                                <input type="radio" value={field.value}
                                    checked={selectedOption === field.value}
                                    onChange={handleOptionChange}
                                />
                                <label>{field.value}</label>
                            </div>)
                        }
                    </div>
                }

                <button onClick={handleDeleteField} className="btn text-xl px-3 bg-white">X</button>
                <button onClick={() => setOpenModal(true)} className="btn text-xl px-3 bg-white"><GrDocumentUpdate /></button>
            </div>
            <UpdateModalForm open={openModal} setOpen={setOpenModal} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />
        </div>
    );
};

export default UpdateFormInputField;