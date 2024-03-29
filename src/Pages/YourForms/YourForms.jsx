// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import ComponentsTitle from "../../Shared/ComponentsTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import Form from "./Form";

const YourForms = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data: yourForms, isLoading: yourFormsIsLoading } = useQuery({
        queryKey: [user, 'single user all forms'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleUserForm/${user.email}`)
            return res?.data
        }
    })

    if (yourFormsIsLoading) {
        return <Loading />
    }
    return (
        <div className="pb-10">
            <ComponentsTitle title1={'The Special forms'} title2={'created by'} title3={'you'} description={`Manage created forms: view, update, delete, access details. Simplify form management from this interface. Effortless control over your forms.`} />

            <div className="flex flex-wrap justify-center items-center gap-5">
                {
                    yourForms.map(form => <Form key={form?._id} form={form} />)
                }
            </div>
        </div>
    );
};

export default YourForms;