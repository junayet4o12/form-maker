// import React from 'react';

import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UpdateFullForm from "./UpdateFullFrom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const UpdateForm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading, refetch } = useQuery({
        queryKey: [user, `update ${id}`],
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
    return (
        <div className="p-10">
            <div>
                <UpdateFullForm formDetails={formDetails} refetch={refetch} />
            </div>
        </div>
    );
};

export default UpdateForm;