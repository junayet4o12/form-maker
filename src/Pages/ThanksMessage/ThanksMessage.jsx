// import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import FormBanner from "../../Shared/FormBanner";
const ThanksMessage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: formDetails, isLoading: formDetailsIsLoading, refetch } = useQuery({
        queryKey: [user, `Thanks for Fill up ${id}`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/formDetails/${id}`)
            return res?.data
        }
    })
    if (formDetailsIsLoading) {
        return <Loading />
    }
    console.log(formDetails);
    return (
        <div>
            <FormBanner img={formDetails?.formBgImg} title={'Thanks for fill up the form'} description={<div>

                <Link to={`/fillUpForm/${id}`} className="text-center underline hover:text-gray-300 cursor-pointer"> Fill up another form</Link>
            </div>} />
        </div>
    );
};

export default ThanksMessage;