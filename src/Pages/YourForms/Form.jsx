/* eslint-disable react/prop-types */
// import React from 'react';
import { FaWpforms } from "react-icons/fa6";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { makeVisibleTime } from "../../hooks/makeVisibleTime";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion"
const Form = ({ form, yourFormsRefetch, idx }) => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [isCopied, setIsCopied] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { data: storedFormData = [], isLoading: storedFormDataIsLoading, refetch } = useQuery({
        queryKey: [user, `this forms stored f Data ${form?._id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUserFormData/${form?._id}`)
            return res?.data
        }
    })
    const handleDetails = () => {
        navigate(`/formDetails/${form?._id}`)
    }
    const handleNavigateResponses = () => {
        navigate(`/responses/${form?._id}`)
    }
    if (user?.email !== form?.userEmail) {
        signOut(auth)
        navigate('/accountPortal')
        return
    }

    const handleUpdate = () => {
        navigate(`/updateForm/${form?._id}`)
    }
    const handleSubordinate = () => {
        navigate(`/subordinate/${form?._id}`)
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
                axiosSecure.delete(`deleteForm/${form?._id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Form has deleted",
                            icon: "success"
                        });
                        yourFormsRefetch()
                    })

            }
        });
    }
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`https://formify-99f7d.web.app/fillUpForm/${form?._id}`);
            setIsCopied(true)
            toast.success(`"${form.title}" Form link copied successfully for sharing to others!!`, {
                icon: '✌️',
            })
        } catch (err) {
            ''
        }
    };
    return (
        <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card

                className="mt-6 w-96 min-h-[430px] rounded-sm relative bg-secondary/30 border-white border-2 border-double">
                <div className="w-full h-full absolute  blur-sm bg-black/90 -z-10 bottom-0 left-0"></div>
                <CardBody className="flex-grow">
                    <div className="text-6xl text-white  py-3">
                        <FaWpforms />
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2 text-white">
                        {form.title}
                    </Typography>
                    <Typography className="text-gray-400">
                        Created time:  {makeVisibleTime(form?.createdDate) || 'Not given Yet'}
                    </Typography>
                    <Typography className="text-gray-400">
                        Total fields: {form?.inputFields?.length || 0}
                    </Typography>
                    {/* <Typography className="text-white">
                    Description: {form?.description.split(' ').slice(0, 7).join(' ') + '...' || 'Not given Yet'}
                </Typography> */}
                    <Typography className="text-gray-400">
                        Subordinates as a Viewer: {form?.viewers?.length || 0}
                    </Typography>
                    {/* <Typography className="text-white">
                    Viewers: {form?.viewers?.length}
                </Typography> */}
                </CardBody>
                <CardFooter className="pt-0 grid grid-cols-2 gap-x-5 gap-y-3">

                    <Button onClick={handleDetails} size="sm" variant="text" className="flex items-center gap-2 bg-secondary/95 hover:bg-secondary text-white px-2 rounded-sm">
                        Preview
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>


                    <Button onClick={handleNavigateResponses} size="sm" variant="text" className="flex items-center gap-2 bg-primary/95 hover:bg-primary text-white px-2 rounded-sm">
                        Responses <span className="flex items-center">({storedFormDataIsLoading ? <span className="loading loading-spinner loading-xs"></span> : (storedFormData?.length || 0)})</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>


                    <Button onClick={handleUpdate} size="sm" variant="text" className="flex items-center gap-2 bg-primary/95 hover:bg-primary text-white px-2 rounded-sm">
                        Update
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>


                    <Button onClick={handleDelete} size="sm" variant="text" className="flex items-center gap-2 bg-secondary/95 hover:bg-secondary text-white px-2 rounded-sm">
                        Delete
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                    <Button onClick={handleSubordinate} size="sm" variant="text" className="flex items-center gap-2 bg-secondary/95 hover:bg-secondary text-white px-2 rounded-sm">
                        Subordinate ({storedFormDataIsLoading ? <span className="loading loading-spinner loading-xs"></span> : (form?.viewers?.length || 0)})
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>


                    <Button onClick={handleCopy} size="sm" variant="text" className=" gap-2 border-primary border bg-primary/10 hover:bg-secondary/10 transition-all duration-300 text-white px-2 rounded-sm col-span-2 flex justify-center items-center">
                        Copy Share link
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>


                </CardFooter>
            </Card>
        </motion.div>

    );
};

export default Form;