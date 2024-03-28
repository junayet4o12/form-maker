/* eslint-disable react/prop-types */
// import React from 'react';

const CreatedFormInputField = ({ inputField }) => {
    console.log(inputField);
    return (
        <div className="relative w-full min-w-[200px] flex flex-col gap-2 max-w-[500px] mx-auto">
            <label className='ml-1'>{inputField?.label}</label>
            {
                inputField?.type === 'Input' && <input className="input input-bordered input-primary w-full h-11" type={inputField?.inputType} placeholder={inputField?.label} />
            }
            {
                inputField?.type === 'Textarea' && <textarea className="input input-bordered input-primary w-full h-16 pt-1"  placeholder={inputField?.label} ></textarea>
            }
        </div>
    );
};

export default CreatedFormInputField;