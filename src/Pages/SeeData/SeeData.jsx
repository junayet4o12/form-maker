import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import FormBanner from "../../Shared/FormBanner";
import FillUpFormDataCard from "../../Shared/FillUpFormDataCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import IndividualData from "./IndividualData";
import TableFormateData from "./TableFormateData";
const SeeData = () => {
    // /singleUserFormData/:id/:email
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [showIndividualDataHideTableFormat, setShowIndividualDataHideTableFormat] = useState(true)
    const { data: storedFormData = [], isLoading: storedFormDataIsLoading, refetch } = useQuery({
        queryKey: [user, `this forms stored Data ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUserFormData/${id}/${user?.email}`)
            return res?.data
        }
    })
    const { data: formDetails, isLoading: formDetailsIsLoading } = useQuery({
        queryKey: [user, `Thanks for Fill up ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/formDetails/${id}`)
            return res?.data
        }
    })
    if (storedFormDataIsLoading || formDetailsIsLoading) {
        return <Loading />
    }
    if (user?.email !== formDetails?.userEmail) {
        signOut(auth)
        navigate('/accountPortal')
        return
    }
    // function generateArray(n) {
    //     return Array.from(Array(n).keys());
    // }

    // // Example usage:
    // const paginationArray = generateArray(storedFormData.length);
    const allQuestions = formDetails?.inputFields?.map(ques => ques.label);
    const handleSetShowIndividualDataHideTableFormat = () => {
        setShowIndividualDataHideTableFormat(true)
    }
    const handleSetHideIndividualDataShowTableFormat = () => {
        setShowIndividualDataHideTableFormat(false)
    }
    return (
        <div >
            {/* img, title, description */}
            <FormBanner img={formDetails?.formBgImg} title={formDetails?.title} description={formDetails?.description} />

            <h2 className="text-2xl font-bold text-center pt-5">Stored Data</h2>
            <div>
                <ul className="flex gap-5 justify-center items-center py-4">
                    <li className={`transition-all duration-300 cursor-pointer border-b-2 ${showIndividualDataHideTableFormat ? ' border-primary' : 'border-transparent'}`} onClick={handleSetShowIndividualDataHideTableFormat}>Individual Data</li>
                    <li className={`transition-all duration-300 cursor-pointer border-b-2 ${!showIndividualDataHideTableFormat ? ' border-primary' : 'border-transparent'}`} onClick={handleSetHideIndividualDataShowTableFormat}>Table Format</li>
                </ul>
            </div>
            {
                showIndividualDataHideTableFormat && <div>
                    <IndividualData storedFormData={storedFormData} allQuestions={allQuestions} />
                </div>
            }
            {
                !showIndividualDataHideTableFormat && <div className="flex justify-center items-center gap-2">
                    <TableFormateData storedFormData={storedFormData} allQuestions={allQuestions} />
                </div>
            }


        </div>
    );
};

export default SeeData;