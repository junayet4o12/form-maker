/* eslint-disable react/prop-types */
// import React from 'react';
import axios from 'axios'
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState, useRef } from "react";
import UpdateFormInputField from "./UpdateFormInputField";
import { useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import AddFieldModal from "./AddFieldModal";
import { PiSelectionBackgroundLight } from "react-icons/pi";
import defaultFormBg from '../../assets/bannerImg.jpg'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const UpdateFullForm = ({ formDetails, refetch }) => {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { title, inputFields: fields, userEmail, description } = formDetails;
    const [formTitle, setFormTitle] = useState(title || '')
    const [inputFields, setInputFields] = useState(fields || []);
    const [formDescription, setFormDescription] = useState(description || '')
    const [formBgPlaceholder, setFormBgPlaceholder] = useState(formDetails.formBgImg || defaultFormBg)
    const [formBg, setFormBg] = useState('')
    const [formBgFile0, setFormBgFile0] = useState('')
    const fileInput = useRef(null)
    const [enabledDate, setEnabledDate] = useState(formDetails?.enabledDate || '')
    const [enabledTime, setEnabledTime] = useState(formDetails?.enabledTime || '')
    const [disabledDate, setDisabledDate] = useState(formDetails?.disabledDate || '')
    const [disabledTime, setDisabledTime] = useState(formDetails?.disabledTime || '')
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const defaultFormBgLiveLink = 'https://i.ibb.co/WsKMhTB/banner-Img.jpg'
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setFormBgPlaceholder(event.target.result);
            setFormBgFile0(file)
        };
        setFormBg(reader.readAsDataURL(file))
        // reader.readAsDataURL(file);
    };
    const handleFormBg = () => {
        fileInput.current.click()
    }
    const handleFormTitle = (e) => {
        e.preventDefault();
        setFormTitle(e.target.value.slice(0, 70))
    }
    const handleFormDescription = (e) => {
        e.preventDefault();
        setFormDescription(e.target.value.slice(0, 200))
    }
    const handleUpdate = async () => {
        let formBgImg = '';
        const toastId = toast.loading("Updating...");
        if (formBgPlaceholder === defaultFormBg) {
            formBgImg = defaultFormBgLiveLink
        }
        else if (formBgPlaceholder === formDetails.formBgImg) {
            formBgImg = formDetails.formBgImg;
        } else {
            const image = { image: formBgFile0 }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                formBgImg = res?.data?.data?.display_url
            }
            catch (err) {
                toast.error(err?.message, { id: toastId });
            }
        }
        const data = {
            formBgImg,
            title: formTitle,
            description: formDescription,
            fields: inputFields,
            enabledDate,
            enabledTime,
            disabledDate,
            disabledTime
        }
        axiosSecure.put(`/updateForm/${formDetails?._id}`, data)
            .then(res => {
                
                if (res.status == 200) {
                    toast.success("Form Updated Successfully!!", { id: toastId });
                    Swal.fire({
                        icon: "success",
                        title: "Form updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }

            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return (
        <div className={`transition-all duration-500 w-full max-w-[700px] mx-auto`}>

            <div className='flex gap-4 flex-col mb-4'>
                <div className="w-full min-w-[200px]  flex flex-col gap-2 relative mx-auto">
                    <label className="text-3xl text-white">Form Background Image</label>
                    <input
                        ref={fileInput}
                        className='hidden'
                        onChange={handleFileChange}
                        type="file"

                        accept="image/jpeg, image/png"
                        name="productImage" id="image" />
                    <div className='relative'>
                        <img onClick={handleFormBg} className='w-full  object-cover h-[200px] cursor-pointer' src={formBgPlaceholder} alt="" />
                        <button onClick={() => {
                            setFormBgPlaceholder(defaultFormBg)
                        }} className="transition-all duration-300 p-1 rounded-sm hover:rounded-md font-bold active:scale-90 flex flex-col justify-center items-center text-xs bg-primary/80 hover:bg-primary text-white  w-max absolute top-5 right-5 border-none">Default Img <span className="text-2xl"><PiSelectionBackgroundLight /></span></button>
                    </div>
                    <label className="text-3xl text-white">Form Title</label>
                    <input
                        onChange={handleFormTitle}
                        value={formTitle}
                        placeholder="Title"
                        className="input input-error bg-black/20 text-white border border-primary h-[60px] text-3xl rounded-sm"
                    />
                    <p className="text-white">{formTitle?.length}/70</p>
                </div>
                <div className="relative w-full min-w-[200px]  flex flex-col gap-2 mx-auto">
                    <label className="text-3xl text-white">Form Description</label>
                    <textarea
                        onChange={handleFormDescription}
                        value={formDescription}
                        label=" Form Description"
                        placeholder="Description"
                        className="textarea textarea-error bg-black/20 text-white border border-primary h-[100px] text-lg rounded-sm"
                    />
                    <p className="text-white">{formDescription?.length}/200</p>
                </div>
                <div className="relative min-w-[200px]  flex flex-col gap-2 mx-auto w-full">
                    <label className="text-3xl text-white">Form enabled time</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Date</label>
                            <input value={enabledDate}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setEnabledDate(e.target.value)
                                }}
                                type="date" className="input input-error bg-black/20 text-white border border-primary h-[40px] text-base rounded-sm" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Time</label>
                            <input value={enabledTime}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setEnabledTime(e.target.value)
                                }}
                                type="time" className="input input-error bg-black/20 text-white border border-primary h-[40px] text-base rounded-sm" />
                        </div>
                    </div>
                </div>
                <div className="relative min-w-[200px]  flex flex-col gap-2 mx-auto w-full">
                    <label className="text-3xl text-white">Form disabled time</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Date</label>
                            <input
                                value={disabledDate}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setDisabledDate(e.target.value)
                                }}
                                type="date" className="input input-error bg-black/20 text-white border border-primary h-[40px] text-base rounded-sm" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Time</label>
                            <input
                                value={disabledTime}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setDisabledTime(e.target.value)
                                }}
                                type="time" className="input input-error bg-black/20 text-white border border-primary h-[40px] text-base rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {
                    inputFields.map(inputField => <UpdateFormInputField key={inputField.id} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />)
                }
                <div className='py-3 px-5 rounded-sm space-y-5 bg-black/20 border border-primary'>
                    <p onClick={() => setOpenModal(true)} className=" w-full mx-auto btn text-3xl border border-primary/80 hover:border-primary bg-primary/10 text-white hover:bg-primary/20 rounded-sm">
                        <span className="text-xl">Add field</span>   <FaRegSquarePlus />
                    </p>
                    <div className="  mx-auto grid grid-cols-2 justify-center items-center gap-x-5">
                        <button
                            disabled={formTitle ? inputFields.length > 0 ? enabledDate && enabledTime && disabledDate && disabledTime ? false : true : true : true}
                            onClick={handleUpdate}
                            className={`btn btn-primary bg-primary/90 border-none hover:bg-primary   rounded-sm w-full`}>Update Form</button>
                        <button onClick={() => navigate(-1)} className={`btn btn-primary border border-primary/80 hover:border-primary bg-primary/10 text-white hover:bg-primary/20 w-full   ${formTitle ? `${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}` : 'scale-x-0'} rounded-sm w-full`}>Cancel</button>
                    </div>
                </div>
            </div>
            <AddFieldModal open={openModal} setOpen={setOpenModal} inputFields={inputFields} setInputFields={setInputFields} />
        </div>
    );
};

export default UpdateFullForm;