// import React from 'react';

import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import FillUpFullForm from "./FillUpFullForm";

const FillUpForm = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading, refetch } = useQuery({
        queryKey: [user, `full up the form ${id}`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/fillUpFormDetails/${id}`)
            return res?.data
        }
    })
    if (formDetailsIsLoading) {
        return <Loading />
    }
    return (
        <div>
            <div>
                <FillUpFullForm formDetails={formDetails} />
            </div>
        </div>
    );
};

export default FillUpForm;