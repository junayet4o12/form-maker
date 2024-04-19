/* eslint-disable react/prop-types */
// import React from 'react';

const CreatedFormInputField = ({ inputField, setInputFields, inputFields }) => {
    const handleDeleteField = () => {
        setInputFields(inputFields.filter(field => field.id !== inputField.id))
    }
    return (
        <div className="relative w-full  flex flex-col gap-2 min-w-[200px] max-w-[500px] mx-auto">
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

                <button onClick={handleDeleteField} className="btn text-xl px-3">X</button>
            </div>
        </div>
    );
};

export default CreatedFormInputField;