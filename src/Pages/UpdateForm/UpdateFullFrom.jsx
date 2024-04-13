/* eslint-disable react/prop-types */
// import React from 'react';
import axios from 'axios'
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CreatedFormInputField from "../CreateForm/CreatedFormInputField";
import { useState, useRef } from "react";
import UpdateFormInputField from "./UpdateFormInputField";
import { useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import AddFieldModal from "./AddFieldModal";
import { PiSelectionBackgroundLight } from "react-icons/pi";
import addFormBg from '../../assets/addPhoto.jpg'
import defaultFormBg from '../../assets/bannerImg.jpg'
const UpdateFullForm = ({ formDetails, refetch }) => {
    const { user } = useAuth()
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { title, inputFields: fields, userEmail, description } = formDetails;
    const [formTitle, setFormTitle] = useState(title || '')
    const [inputFields, setInputFields] = useState(fields || []);
    const [formDescription, setFormDescription] = useState(description || '')
    const [formBgPlaceholder, setFormBgPlaceholder] = useState(formDetails.formBgImg || defaultFormBg)
    const [formBg, setFormBg] = useState('')
    const [formBgFile0, setFormBgFile0] = useState('')
    const fileInput = useRef(null)

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
        setFormTitle(e.target.value)
    }
    const handleFormDescription = (e) => {
        e.preventDefault();
        setFormDescription(e.target.value)
    }
    const handleUpdate = async () => {
        let formBgImg = '';
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
            formBgImg = res?.data?.data?.display_url
        }
        const data = {
            formBgImg,
            title: formTitle,
            description: formDescription,
            fields: inputFields
        }
        console.log(data);
        axiosPublic.put(`/updateForm/${formDetails?._id}`, data)
            .then(res => {
                console.log(res);
                if (res.statusText == 'OK') {
                    Swal.fire({
                        icon: "success",
                        title: "Form updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }

            })
    }
    return (
        <div className={`transition-all duration-500 w-full`}>

            <div className='flex gap-4 flex-col '>
                <div className="w-full min-w-[200px] max-w-[500px] flex flex-col gap-2 relative mx-auto">
                    <label className="text-3xl">Form Background Image</label>
                    <input
                        ref={fileInput}
                        className='hidden'
                        onChange={handleFileChange}
                        type="file" name="productImage" id="image" />
                    <img onClick={handleFormBg} className='w-full  object-cover h-[200px] cursor-pointer' src={formBgPlaceholder} alt="" />
                    <button onClick={() => {
                        setFormBgPlaceholder(defaultFormBg)
                    }} className="transition-all duration-300 p-1 rounded-sm hover:rounded-md font-bold active:scale-90 flex flex-col justify-center items-center text-xs bg-primary/80 hover:bg-primary text-white  w-max absolute top-14 right-5 border-none">Default Img <span className="text-2xl"><PiSelectionBackgroundLight /></span></button>
                    <label className="text-3xl">Form Title</label>
                    <input
                        onChange={handleFormTitle}
                        value={formTitle}
                        placeholder="Title"
                        className="input input-primary h-[60px] text-3xl"
                    />
                </div>
                <div className="relative w-full min-w-[200px] max-w-[500px] flex flex-col gap-2 mx-auto">
                    <label className="text-3xl">Form Description</label>
                    <textarea
                        onChange={handleFormDescription}
                        value={formDescription}
                        label=" Form Description"
                        placeholder="Description"
                        className="textarea textarea-primary h-[100px] text-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {
                    inputFields.map(inputField => <UpdateFormInputField key={inputField.id} inputField={inputField} setInputFields={setInputFields} inputFields={inputFields} />)
                }
                <p onClick={() => setOpenModal(true)} className=" w-max mx-auto btn text-3xl bg-primary/30">
                    <FaRegSquarePlus />
                </p>
                <div className=" max-w-[500px] mx-auto flex justify-center items-center gap-5">
                    <button onClick={handleUpdate} className={`btn btn-primary bg-secondary/80 border-none hover:bg-secondary w-full my-5  ${formTitle ? `${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}` : 'scale-x-0'} `}>Update Form</button>
                    <button onClick={() => navigate(-1)} className={`btn btn-primary bg-primary/80 border-none hover:bg-primary w-full my-5  ${formTitle ? `${inputFields.length > 0 ? 'scale-x-100' : 'scale-x-0'}` : 'scale-x-0'} `}>Cancel</button>
                </div>
            </div>
            <AddFieldModal open={openModal} setOpen={setOpenModal} inputFields={inputFields} setInputFields={setInputFields} />
        </div>
    );
};

export default UpdateFullForm;