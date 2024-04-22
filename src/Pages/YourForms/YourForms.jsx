// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import ComponentsTitle from "../../Shared/ComponentsTitle";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import Form from "./Form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { FaWpforms } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const YourForms = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { data: yourForms, isLoading: yourFormsIsLoading } = useQuery({
        queryKey: [user, 'single user all forms'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUserForm/${user.email}`)
            return res?.data
        }
    })

    if (yourFormsIsLoading) {
        return <Loading />
    }

    return (
        <div className="pb-10 px-5">
            <ComponentsTitle title1={'The Special forms'} title2={'created by'} title3={'you'} description={`Manage created forms: view, update, delete, access details. Simplify form management from this interface. Effortless control over your forms.`} />

            <div className="flex flex-wrap justify-center items-center gap-5">
                <Card onClick={() => navigate('/createForm')} className="transition-all duration-300 mt-6 w-96 min-h-[350px] hover:text-black hover:shadow-xl hover:border hover:border-black cursor-pointer active:scale-90">
                    <CardBody className=" flex flex-col justify-center items-center h-full min-h-[350px]">
                        <div className="text-[100px] flex flex-col justify-center items-center pb-5">

                            <span className="h-[100px] flex justify-center items-center">+</span>
                            <span className="text-lg">Create Form</span>
                        </div>
                    </CardBody>

                </Card>
                {
                    yourForms.map(form => <Form key={form?._id} form={form} />)
                }
            </div>
        </div>
    );
};

export default YourForms;