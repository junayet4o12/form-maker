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
import { useState } from "react";
import ViewerForm from "./ViewerForm";

const YourForms = () => {
    const axiosSecure = useAxiosSecure()
    const [showYourFormsHideViewersForm, setShowYourFormsHideViewersForm] = useState(true)
    const { user } = useAuth()
    const navigate = useNavigate()
    const { data: yourForms, isLoading: yourFormsIsLoading, refetch: yourFormsRefetch } = useQuery({
        queryKey: [user, 'single user all forms'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUserForm/${user.email}`)
            return res?.data
        }
    })
    const { data: yourFormsAsViewer, isLoading: yourFormsAsViewerIsLoading, refetch: yourFormsAsViewerRefetch } = useQuery({
        queryKey: [user, 'single user all forms as Viewers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUserFormForViewers/${user.email}`)
            return res?.data
        }
    })

    if (yourFormsIsLoading || yourFormsAsViewerIsLoading) {
        return <Loading />
    }

    const handleSetShowYourFormsHideViewersForm = () => {
        setShowYourFormsHideViewersForm(true)
    }
    const handleSetHideYourFormsShowViewersForm = () => {
        setShowYourFormsHideViewersForm(false)
    }
    return (
        <div className="pb-10 px-5 overflow-hidden">
            <ComponentsTitle title1={'The Special forms'} title2={'created by'} title3={'you'} />
            <ul className="flex gap-5 justify-center items-center py-4 text-white">
                <li className={`transition-all duration-300 cursor-pointer border-b-2 ${showYourFormsHideViewersForm ? ' border-primary' : 'border-transparent'}`} onClick={handleSetShowYourFormsHideViewersForm}>Your Forms({yourForms?.length})</li>
                <li className={`transition-all duration-300 cursor-pointer border-b-2 ${!showYourFormsHideViewersForm ? ' border-primary' : 'border-transparent'}`} onClick={handleSetHideYourFormsShowViewersForm}>Your Forms As Viewers({yourFormsAsViewer?.length})</li>
            </ul>
            <div className="flex flex-wrap justify-center items-center gap-5">
                <Card onClick={() => navigate('/createForm')} className="transition-all duration-300 mt-6 w-96 min-h-[350px] hover:text-black hover:shadow-xl   cursor-pointer active:scale-90 rounded-sm relative bg-secondary/30 border-white/90 border-2 border-double hover:border-white">
                    <div className="w-full h-full absolute  blur-sm bg-black/90 -z-10 bottom-0 left-0"></div>
                    <CardBody className=" flex flex-col justify-center items-center h-full min-h-[350px] relative">

                        <div className="text-[100px] flex flex-col justify-center items-center pb-5 text-white">

                            <span className="h-[100px] flex justify-center items-center">+</span>
                            <span className="text-lg">Create Form</span>
                        </div>
                    </CardBody>

                </Card>
                {
                    showYourFormsHideViewersForm && yourForms.map((form, idx) => <Form key={form?._id} form={form} yourFormsRefetch={yourFormsRefetch} idx={idx} />)

                }
                {
                    !showYourFormsHideViewersForm && yourFormsAsViewer?.map((form, idx) => <ViewerForm key={form?._id} form={form} yourFormsRefetch={yourFormsAsViewerRefetch} idx={idx} />)


                }
            </div>
        </div>
    );
};

export default YourForms;