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
                            inputField?.fields.map(field => <option key={field.id}>{field.value}</option>)
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

                <button onClick={handleDeleteField} className="btn text-xl px-3 bg-primary/10 text-white border border-primary hover:bg-primary/20 hover:border-primary rounded-sm h-[40px] w-[45px]">X</button>
                <button onClick={() => setOpenModal(true)} className="btn text-xl px-3 bg-primary/10 text-white border border-primary hover:bg-primary/20 hover:border-primary  rounded-sm h-[40px] w-[45px]"><GrDocumentUpdate /></button>
            </div>
            <UpdateModalForm open={openModal} setOpen={setOpenModal} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />
        </div>
    );
};

export default UpdateFormInputField;