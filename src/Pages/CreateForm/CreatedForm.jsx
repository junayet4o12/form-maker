/* eslint-disable react/prop-types */
// import React from 'react';

import CreatedFormInputField from "./CreatedFormInputField";

const CreatedForm = ({ formTitle, inputFields }) => {
    return (
        <div className={`${formTitle ? 'w-1/2' : ''} ${inputFields.length > 0 ? 'w-1/2' : ''}`}>
            <div className="text-3xl font-bold text-center capitalize py-5">{formTitle}</div>
            <div className="flex flex-col gap-5">
                {
                    inputFields.map(inputField => <CreatedFormInputField key={inputField} inputField={inputField} />)
                }
            </div>
        </div>
    );
};

export default CreatedForm;