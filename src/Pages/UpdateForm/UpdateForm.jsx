// import React from 'react';

import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UpdateFullForm from "./UpdateFullFrom";

const UpdateForm = () => {
    const [inputFields, setInputFields] = useState([])
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading, refetch } = useQuery({
        queryKey: [user, `update ${id}`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/formDetails/${id}`)
            return res?.data
        }
    })
    if (formDetailsIsLoading) {
        return <Loading />
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