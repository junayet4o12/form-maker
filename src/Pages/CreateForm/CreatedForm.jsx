/* eslint-disable react/prop-types */
// import React from 'react';

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CreatedFormInputField from "./CreatedFormInputField";

const CreatedForm = ({ formTitle, inputFields, setInputFields, setFormTitle, formDescription, setFormDescription }) => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const handleCreateForm = () => {
        const allData = {
            title: formTitle,
            description: formDescription,
            inputFields: inputFields,
            userEmail: user?.email,
            createdDate: new Date().getTime(),
        }
        Swal.fire({
            title: "Are you sure to create the form?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Create"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.post('/createForm', allData)
                    .then(res => {
                        if (res.statusText == 'OK') {
                            Swal.fire({
                                icon: "success",
                                title: "Form has created successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setInputFields([])
                            setFormTitle('')
                            setFormDescription('')
                        }
                    })
            }
        });

        console.log(allData);
    }
    return (
        <div className={`transition-all duration-500 w-full ${formTitle ? 'scale-x-100' : 'scale-x-0'} ${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}`}>
            <div className="text-3xl font-bold text-center capitalize py-5">{formTitle}</div>
            <div className="text-lg font-bold capitalize py-5 min-w-[200px] max-w-[500px] mx-auto">{formDescription}</div>
            <div className="flex flex-col gap-5">
                {
                    inputFields.map(inputField => <CreatedFormInputField key={inputField.id} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />)
                }
                <div className="w-full max-w-[500px] mx-auto">
                    <button onClick={handleCreateForm} className={`btn btn-primary bg-primary/80 border-none hover:bg-primary w-full my-5  ${formTitle ? `${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}` : 'scale-x-0'} `}>Create Form</button>
                </div>
            </div>
        </div>
    );
};

export default CreatedForm;