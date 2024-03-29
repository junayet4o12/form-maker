/* eslint-disable react/prop-types */
// import React from 'react';

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CreatedFormInputField from "../CreateForm/CreatedFormInputField";
import { useState } from "react";
import UpdateFormInputField from "./UpdateFormInputField";
import { useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import AddFieldModal from "./AddFieldModal";
const UpdateFullForm = ({ formDetails, refetch }) => {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { title, inputFields: fields, userEmail, description } = formDetails;
    const [formTitle, setFormTitle] = useState(title || '')
    const [inputFields, setInputFields] = useState(fields || []);
    const [formDescription, setFormDescription] = useState(description || '')
    const handleUpdate = () => {
        const data = {
            title: formTitle,
            description: formDescription,
            fields: inputFields
        }
        console.log(data);
        axiosPublic.put(`/updateForm/${formDetails?._id}`, data)
            .then(res => {
                console.log(res);
                if (res.statusText == 'OK') {
                    Swal.fire({
                        icon: "success",
                        title: "Form updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }

            })
    }
    return (
        <div className={`transition-all duration-500 w-full ${formTitle ? 'scale-x-100' : 'scale-x-0'} ${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}`}>
            <div className="text-3xl font-bold text-center capitalize py-5">{formTitle}</div>
            <div className="text-lg font-bold capitalize py-5 min-w-[200px] max-w-[500px] mx-auto">{formDescription}</div>
            <div className="flex flex-col gap-5">
                {
                    inputFields.map(inputField => <UpdateFormInputField key={inputField.id} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />)
                }
                <p onClick={()=> setOpenModal(true)} className=" w-max mx-auto btn text-3xl bg-primary/30">
                    <FaRegSquarePlus />
                </p>
                <div className=" max-w-[500px] mx-auto flex justify-center items-center gap-5">
                    <button onClick={handleUpdate} className={`btn btn-primary bg-secondary/80 border-none hover:bg-secondary w-full my-5  ${formTitle ? `${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}` : 'scale-x-0'} `}>Update Form</button>
                    <button onClick={() => navigate(-1)} className={`btn btn-primary bg-primary/80 border-none hover:bg-primary w-full my-5  ${formTitle ? `${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}` : 'scale-x-0'} `}>Cancel</button>
                </div>
            </div>
            <AddFieldModal open={openModal} setOpen={setOpenModal} inputFields={inputFields} setInputFields={setInputFields} />
        </div>
    );
};

export default UpdateFullForm;