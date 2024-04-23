// import React from 'react';

import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import InputField from "./InputField";
import Swal from "sweetalert2";
import formBg from '../../assets/bannerImg.jpg'
import { BiCopyAlt } from "react-icons/bi";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import FormBanner from "../../Shared/FormBanner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
const FormDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const [isCopied, setIsCopied] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading } = useQuery({
        queryKey: [user, id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/formDetailsForUpdateAndDelete/${id}`)
            return res?.data
        }
    })

    if (formDetailsIsLoading) {
        return <Loading />
    }
    if (user?.email !== formDetails?.userEmail) {
        signOut(auth)
        navigate('/accountPortal')
        return
    }
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
                axiosSecure.delete(`deleteForm/${id}`)
                    .then(res => {
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
    const handleShowData = () => {
        navigate(`/responses/${id}`)
    }
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`https://formify-99f7d.web.app/fillUpForm/${id}`);
            setIsCopied(true)
            toast.success('Shared Form link copied successfully!!', {
                icon: '✌️',
            })
        } catch (err) {
        }
    };
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
                    <button onClick={handleShowData} className={`mx-auto btn w-max min-w-[130px] btn-primary bg-secondary/80 border-none hover:bg-secondary    ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Responses</button>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;