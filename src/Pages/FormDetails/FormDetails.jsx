// import React from 'react';

import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import InputField from "./InputField";
import Swal from "sweetalert2";
import formBg from '../../assets/bannerImg.jpg'
import FormBanner from "../../Shared/FormBanner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
const FormDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
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
    return (
        <div className={`transition-all duration-500 w-full py-10 px-5`}>
            <FormBanner img={formDetails?.formBgImg || formBg} title={formDetails?.title} description={formDetails?.description} />
            <div className="flex flex-col gap-5 max-w-[700px] mx-auto">
                {
                    formDetails?.inputFields.map(inputField => <InputField key={inputField.id} inputField={inputField} setInputFields={''} inputFields={''} />)
                }
                <div className=" max-w-[700px] mx-auto grid grid-cols-2 w-full gap-2 gap-y-5   py-5 rounded-sm bg-black/20 border border-primary">
                    <button onClick={handleUpdate} className={`mx-auto btn w-max min-w-[130px] btn-primary border-primary/80 hover:border-primary bg-primary/10 text-white hover:bg-primary/20  rounded-sm     ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Update</button>
                    <button onClick={handleDelete} className={`mx-auto btn w-max min-w-[130px] btn-primary bg-primary/95 border-none hover:bg-primary rounded-sm    ${user?.email === formDetails.userEmail ? `scale-100` : 'scale-x-0'} `}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default FormDetails;