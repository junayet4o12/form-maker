/* eslint-disable react/prop-types */
// import React from 'react';
import { FaWpforms } from "react-icons/fa6";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { makeVisibleTime } from "../../hooks/makeVisibleTime";
import { useNavigate } from "react-router-dom";

const Form = ({ form }) => {
    const navigate = useNavigate()
    const handleDetails = () => {
        navigate(`/formDetails/${form?._id}`)
    }
    return (
        <Card className="mt-6 w-96">
            <CardBody>
                <div className="text-6xl text-black  py-3">
                    <FaWpforms />
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {form.title}
                </Typography>
                <Typography>
                    Created time:  {makeVisibleTime(form?.createdDate) || 'Not given Yet'}
                </Typography>
                <Typography>
                    Total fields: {form?.inputFields?.length || 0}
                </Typography>
                <Typography>
                    Description: {form?.description || 'Not given Yet'}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <a className="inline-block">
                    <Button onClick={handleDetails} size="sm" variant="text" className="flex items-center gap-2">
                        Details
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
                </a>
            </CardFooter>
        </Card>

    );
};

export default Form;