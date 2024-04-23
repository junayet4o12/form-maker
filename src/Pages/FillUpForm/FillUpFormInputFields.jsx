/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import FillUpFormInputField from "./FillUpFormInputField";
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import FillUpDataCardsDatum from "../../Shared/FillUpDataCardsDatum";
import FillUpFormDataCard from "../../Shared/FillUpFormDataCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const FillUpFormInputFields = ({ inputFields, userEmail, _id }) => {
    const axiosPublic = useAxiosPublic();
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, } = useForm()
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const { user } = useAuth()
    const [data, setAllData] = useState([])
    const [everyData, setEveryData] = useState([])
    const onSubmit = async (data) => {
        // setSubmitting(true)
        const promisedData = everyData.map(async ({ key, value, type }) => {
            let restoredData = {}
            if (type === "file") {
                const image = { image: value[0] }
                const res = await axios.post(imgHostingApi, image, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                const imgUrl = res?.data?.data?.display_url;
                restoredData = {
                    key, value: imgUrl, type
                }
            }
            else {
                restoredData = { key, value, type }
            }
            return restoredData
        })

        const allData = await Promise.all(promisedData);
        setAllData(allData)
        const storedData = {
            ownerEmail: userEmail,
            formId: _id,
            storedTime: new Date().getTime(),
            allData,
            filledUpUserEmail: user?.email || 'Not logged in'
        }
        axiosPublic.post('/storeData', storedData)
            .then(res => {
                toast.success("Submitted Successfully!");
                setSubmitting(false)
                navigate(`/thanks/${_id}`)
            })
            .catch(err => {
                setSubmitting(false)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {
                inputFields?.map((inputField, idx) => <FillUpFormInputField inputField={inputField} key={idx} everyData={everyData} setEveryData={setEveryData} />)
            }
            <div className="px-2 sm:px-0 w-full min-w-[200px] max-w-[500px] mx-auto">
                {
                    submitting ? <p className={`btn btn-primary bg-primary/80 border-none hover:bg-primary w-full min-w-[200px] max-w-[500px] mx-auto my-5 `}><span className="loading loading-bars loading-base text-white"></span> <span className="loading loading-bars loading-base text-white"></span></p> : <button className={`btn btn-primary bg-primary/80 border-none hover:bg-primary w-full min-w-[200px] max-w-[500px] mx-auto my-5 `}>Submit</button>
                }
            </div>

        </form>
    );
};

export default FillUpFormInputFields;