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
import { toast } from 'react-hot-toast'
import FormBanner from "../../Shared/FormBanner";
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

    const handleShowData = () => {
        navigate(`/seeData/${id}`)
    }
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:5173/fillUpForm/${id}`);
            setIsCopied(true)
            toast.success('Shared Form link copied successfully!!', {
                icon: '✌️',
            })
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    console.log(formDetails);
    return (
        <div className={`transition-all duration-500 w-full py-10`}>
            <FormBanner img={formDetails?.formBgImg || formBg} title={formDetails?.title} description={formDetails?.description} />
            <div className="flex flex-col gap-5">
                {
                    formDetails?.inputFields.map(inputField => <InputField key={inputField.id} inputField={inputField} setInputFields={''} inputFields={''} />)
                }
                <div className=" max-w-[500px] mx-auto grid grid-cols-2 w-full gap-2 gap-y-5">
                    <button onClick={handleUpdate} className={`mx-auto btn w-max min-w-[130px] btn-primary bg-secondary/80 border-none hover:bg-secondary     ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Update</button>
                    <button onClick={handleDelete} className={`mx-auto btn w-max min-w-[130px] btn-primary bg-primary/80 border-none hover:bg-primary    ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Delete</button>
                    <button onClick={handleCopy} className={`mx-auto btn w-max min-w-[130px] btn-primary bg-primary/80 border-none hover:bg-primary    ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>{
                        isCopied ? 'Copied' : 'Copy'
                    } <span className="text-lg"><BiCopyAlt /></span></button>
                    <button onClick={handleShowData} className={`mx-auto btn w-max min-w-[130px] btn-primary bg-secondary/80 border-none hover:bg-secondary    ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>See Data</button>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;