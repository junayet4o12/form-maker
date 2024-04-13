// import React from 'react';

import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import CreatedFormInputField from "../CreateForm/CreatedFormInputField";
import InputField from "./InputField";
import Swal from "sweetalert2";
import formBg from '../../assets/bannerImg.jpg'
import { BiCopyAlt } from "react-icons/bi";
import { useState } from "react";
import { backendUrl } from "../../hooks/backendUrl";
const FormDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [isCopied, setIsCopied] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading } = useQuery({
        queryKey: [user, id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/formDetails/${id}`)
            return res?.data
        }
    })
    const handleUpdate = () => {
        navigate(`/updateForm/${id}`)
    }
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`deleteForm/${id}`)
                    .then(res => {
                        console.log(res);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Form has deleted",
                            icon: "success"
                        });
                        navigate('/yourForms')
                    })

            }
        });
    }
    if (formDetailsIsLoading) {
        return <Loading />
    }


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:5173/fillUpForm/${id}`);
            setIsCopied(true)
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    console.log(formDetails);
    return (
        <div className={`transition-all duration-500 w-full`}>
            <div className="relative min-h-[200px] max-w-[500px] min-w-[200px] mx-auto">
                <div className="h-full min-h-[200px] max-w-[500px] min-w-[200px] overflow-hidden relative">
                    <img className="w-full h-full object-cover absolute" src={formDetails?.formBgImg || formBg} alt="" />
                </div>
                <div className="absolute top-0 w-full text-white bg-black/30 h-full p-4">
                    <div className="text-3xl font-bold text-center capitalize py-5">{formDetails?.title}</div>
                    <div className="text-lg font-bold capitalize py-5 min-w-[200px] max-w-[500px] mx-auto">{formDetails?.description}</div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {
                    formDetails?.inputFields.map(inputField => <InputField key={inputField.id} inputField={inputField} setInputFields={''} inputFields={''} />)
                }
                <div className=" max-w-[500px] mx-auto flex flex-wrap justify-center items-center gap-x-10">
                    <button onClick={handleUpdate} className={`btn w-max min-w-[130px] btn-primary bg-secondary/80 border-none hover:bg-secondary  my-5  ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Update</button>
                    <button onClick={handleDelete} className={`btn w-max min-w-[130px] btn-primary bg-primary/80 border-none hover:bg-primary my-5  ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Delete</button>
                    <button onClick={handleCopy} className={`btn w-max min-w-[130px] btn-primary bg-primary/80 border-none hover:bg-primary my-5  ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>{
                        isCopied ? 'Copied' : 'Copy'
                    } <span className="text-lg"><BiCopyAlt /></span></button>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;