import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import FormBanner from "../../Shared/FormBanner";
import FillUpFormDataCard from "../../Shared/FillUpFormDataCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import IndividualData from "./IndividualData";
import TableFormateData from "./TableFormateData";
import ComponentsTitle from "../../Shared/ComponentsTitle";
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
            const res = await axiosSecure.get(`/singleUserFormData/${id}`)
            return res?.data
        }
    })
    const { data: formDetails, isLoading: formDetailsIsLoading } = useQuery({
        queryKey: [user, ` Filling up ${id}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/formDetails/${id}`)
            return res?.data
        }
    })
    if (storedFormDataIsLoading || formDetailsIsLoading) {
        return <Loading />
    }
    if (user?.email !== formDetails?.userEmail) {
        if (!formDetails?.viewers?.find(viewer => viewer === user?.email)) {
            signOut(auth)
            navigate('/accountPortal')
            return
        }

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
            

            <ComponentsTitle title1={'Stored Data'} title2={'Of'} title3={`"${formDetails?.title}"`} />
            <div>
                <ul className="flex gap-5 justify-center items-center pt-2 text-white">
                    <li className={`transition-all duration-300 cursor-pointer border-b-2 ${showIndividualDataHideTableFormat ? ' border-primary' : 'border-transparent'}`} onClick={handleSetShowIndividualDataHideTableFormat}>Individual Data({storedFormData?.length || 0})</li>
                    <li className={`transition-all duration-300 cursor-pointer border-b-2 ${!showIndividualDataHideTableFormat ? ' border-primary' : 'border-transparent'}`} onClick={handleSetHideIndividualDataShowTableFormat}>Table Format({storedFormData?.length || 0})</li>
                </ul>
            </div>
            {
                showIndividualDataHideTableFormat && <div>
                    <IndividualData storedFormData={storedFormData} allQuestions={allQuestions} />
                </div>
            }
            {
                !showIndividualDataHideTableFormat && <div className="flex justify-center items-center gap-2">
                    <TableFormateData storedFormData={storedFormData} allQuestions={allQuestions} formDetails={formDetails} />
                </div>
            }


        </div>
    );
};

export default SeeData;