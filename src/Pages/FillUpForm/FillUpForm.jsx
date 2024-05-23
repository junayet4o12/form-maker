// import React from 'react';

import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import FillUpFullForm from "./FillUpFullForm";
import { storedData } from "../../hooks/manageLocalStorage";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FillUpForm = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading, refetch } = useQuery({
        queryKey: [user, `full up the form ${id}`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/fillUpFormDetails/${id}`)
            return res?.data
        }
    })
    const { data: fillingUpFormData, isLoading: fillingUpFormDataLoading } = useQuery({
        queryKey: [user, `filling up form data ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/fillingUpFormUserData/${user?.email || 'userIsNotLogIn'}/${id}`)
            return res?.data
        }
    })
    if (formDetailsIsLoading || fillingUpFormDataLoading) {
        return <Loading />
    }
    const alreadyFilledUpData = fillingUpFormData === 'UserNotLoggedIn' ? storedData(id) : fillingUpFormData;
    return (
        <div>
            <div className="p-5">
                <FillUpFullForm formDetails={formDetails} alreadyFilledUpData={alreadyFilledUpData} />
            </div>
        </div>
    );
};

export default FillUpForm;