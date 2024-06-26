/* eslint-disable react/prop-types */
// import React from 'react';

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { PiSelectionBackgroundLight } from "react-icons/pi";
import AddFieldModal from "../UpdateForm/AddFieldModal";
import UpdateFormInputField from "../UpdateForm/UpdateFormInputField";
import addFormBg from '../../assets/addPhoto.jpg'
import defaultFormBg from '../../assets/bannerImg.jpg'
import axios from "axios";
import toast from "react-hot-toast";

const CreatedForm = () => {
    const [formMakingIsLoading, setFormMakingIsLoading] = useState(false)
    const { user } = useAuth()
    const [inputFields, setInputFields] = useState([])
    const [formTitle, setFormTitle] = useState('');
    const [formBgPlaceholder, setFormBgPlaceholder] = useState(addFormBg)
    const [formBg, setFormBg] = useState('')
    const [formBgFile0, setFormBgFile0] = useState('')
    const [formDescription, setFormDescription] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const axiosSecure = useAxiosSecure()
    const fileInput = useRef(null)
    const [enabledDate, setEnabledDate] = useState('')
    const [enabledTime, setEnabledTime] = useState('')
    const [disabledDate, setDisabledDate] = useState('')
    const [disabledTime, setDisabledTime] = useState('')
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
    const handleCopy = async (id) => {
        try {
            await navigator.clipboard.writeText(`https://formify-99f7d.web.app/fillUpForm/${id}`);
            toast.success('Shared Form link copied successfully!!', {
                icon: '✌️',
            })
        } catch (err) {
        }
    };
    const handleCreateForm = async () => {
        const isNotCreatable = formTitle ? inputFields.length > 0 ? enabledDate && enabledTime && disabledDate && disabledTime ? false : true : true : true
        if (isNotCreatable) {
            return Swal.fire({
                title: "Please Give a title, set Disabled and Enabled time and create at list one Input Field!!",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok"
            })
        }
        Swal.fire({
            title: "Are you sure to create the form?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Create"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Creating...");
                setFormMakingIsLoading(true)
                let formBgImg = '';
                if (formBgPlaceholder === addFormBg) {
                    formBgImg = defaultFormBgLiveLink
                }
                else if (formBgPlaceholder === defaultFormBg) {
                    formBgImg = defaultFormBgLiveLink
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
                const allData = {
                    title: formTitle,
                    description: formDescription,
                    inputFields: inputFields,
                    userEmail: user?.email,
                    createdDate: new Date().getTime(),
                    formBgImg,
                    enabledDate,
                    enabledTime,
                    disabledDate,
                    disabledTime
                }
                axiosSecure.post('/createForm', allData)
                    .then(res => {
                        toast.success("Form Created Successfully!!", { id: toastId });
                        setFormMakingIsLoading(false)
                        if (res.status == 200) {
                            Swal.fire({
                                title: "Your Form has created!!",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Copy Shared link"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleCopy(res?.data?._id)
                                }
                            });
                            setInputFields([])
                            setFormTitle('')
                            setFormDescription('')
                            setEnabledDate('')
                            setEnabledTime('')
                            setDisabledDate('')
                            setDisabledTime('')
                        }
                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                        setFormMakingIsLoading(false)
                    })
            }
        });
    }
    return (
        <div className={`transition-all duration-500 min-w-[200px] max-w-[700px] mx-auto`}>
            <div className='flex gap-4 flex-col '>
                <div className="w-full min-w-[200px] max-w-[700px] flex flex-col gap-2 relative">
                    <label className="text-xl md:text-2xl text-white">Form Background Image</label>
                    <input
                        ref={fileInput}
                        className='hidden '
                        onChange={handleFileChange}
                        type="file" name="productImage" id="image"
                        accept="image/jpeg, image/png"
                    />
                    <div className="relative">
                        <img onClick={handleFormBg} className='w-full  object-cover h-[230px] cursor-pointer' src={formBgPlaceholder} alt="" />
                        <button onClick={() => {
                            setFormBgPlaceholder(defaultFormBg)
                        }} className="transition-all duration-300 p-1 rounded-sm hover:rounded-md font-bold active:scale-90 flex flex-col justify-center items-center text-xs bg-primary/80 hover:bg-primary text-white  w-max absolute top-5 right-5 border-none">Default Img <span className="text-2xl"><PiSelectionBackgroundLight /></span></button>
                    </div>
                    <label className="text-xl md:text-2xl text-white">Form Title</label>
                    <input
                        onChange={handleFormTitle}
                        value={formTitle}
                        placeholder="Title"
                        className="input input-error h-[60px] text-3xl rounded-sm bg-black/20 text-white border-primary"
                    />
                    <p className="text-white">{formTitle?.length}/70</p>
                </div>
                <div className="relative min-w-[200px] max-w-[700px] flex flex-col gap-2">
                    <label className="text-xl md:text-2xl text-white">Form Description</label>
                    <textarea
                        onChange={handleFormDescription}
                        value={formDescription}
                        label=" Form Description"
                        placeholder="Description"
                        className="textarea textarea-error h-[100px] text-lg rounded-sm bg-black/20 text-white border-primary"
                    />
                    <p className="text-white">{formDescription?.length}/200</p>
                </div>
                <div className="relative min-w-[200px] max-w-[700px] flex flex-col gap-2">
                    <label className="text-xl md:text-2xl text-white">Form enabled time</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Date</label>
                            <input value={enabledDate}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setEnabledDate(e.target.value)
                                }}
                                type="date" className="input input-error h-[40px] text-base rounded-sm bg-black/20 text-white border-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Time</label>
                            <input value={enabledTime}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setEnabledTime(e.target.value)
                                }}
                                type="time" className="input input-error h-[40px] text-base rounded-sm bg-black/20 text-white border-primary" />
                        </div>
                    </div>
                </div>
                <div className="relative min-w-[200px] max-w-[700px] flex flex-col gap-2">
                    <label className="text-xl md:text-2xl text-white">Form disabled time</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Date</label>
                            <input
                                value={disabledDate}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setDisabledDate(e.target.value)
                                }}
                                type="date" className="input input-error h-[40px] text-base rounded-sm bg-black/20 text-white border-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-base text-white">Time</label>
                            <input
                                value={disabledTime}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setDisabledTime(e.target.value)
                                }}
                                type="time" className="input input-error h-[40px] text-base rounded-sm bg-black/20 text-white border-primary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-5">
                {
                    inputFields.map(inputField => <UpdateFormInputField key={inputField.id} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />)
                }

                <div className="w-full mx-auto bg-black/20 py-4 px-10 rounded-sm space-y-5 border border-primary">
                    <div className=" mx-auto w-full">
                        <p
                            title="Add a field"
                            onClick={() => setOpenModal(true)} className=" w-full mx-auto btn text-3xl border border-primary/80 hover:border-primary bg-primary/10 text-white hover:bg-primary/20 rounded-sm">
                            <span className="text-xl">Add field</span> <FaRegSquarePlus />
                        </p>
                    </div>
                    {
                        formMakingIsLoading ? <button

                            className={`bg-primary/90 border-none hover:bg-primary w-full h-[48px]     rounded-sm text-white font-bold transition-all duration-300 active:scale-90`}>Creating Form</button> : <button
                                // disabled={formTitle ? inputFields.length > 0 ? enabledDate && enabledTime && disabledDate && disabledTime ? false : true : true : true}
                                onClick={handleCreateForm} className={`bg-primary/90 border-none hover:bg-primary w-full h-[48px] rounded-sm text-white font-bold transition-all duration-300 active:scale-90`}>Create Form</button>
                    }
                </div>
            </div>
            <AddFieldModal open={openModal} setOpen={setOpenModal} inputFields={inputFields} setInputFields={setInputFields} />
        </div>
    );
};

export default CreatedForm;