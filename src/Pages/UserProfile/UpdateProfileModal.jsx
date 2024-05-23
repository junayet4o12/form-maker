/* eslint-disable react/prop-types */
// import React from 'react';

import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { Modal, TextField, Typography } from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";



const UpdateProfileModal = ({ handleClose, open, profile, refetch }) => {
    const { refetchUser, setRefetchUser } = useAuth()
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const [ProfilePhotoPlaceholder, setProfilePhotoPlaceholder] = useState(profile?.image)
    const [showDefaultImg, setShowDefaultImg] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState('')
    const [profileFile0, setProfileFile0] = useState('')
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const axiosSecure = useAxiosSecure()
    const allDefaultImgLink = [
        'https://i.ibb.co/JBGvy1H/default-Profile1.jpg',
        ' https://i.ibb.co/MN1J0Yd/default-Profile2.jpg',
        'https://i.ibb.co/sy1nx4V/default-Profile3.jpg',
        'https://i.ibb.co/wzkgPG8/default-Profile4.jpg'
    ]
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfilePhotoPlaceholder(event.target.result);
            setProfileFile0(file)
        };
        setProfilePhoto(reader.readAsDataURL(file))
        // reader.readAsDataURL(file);
    };
    const handleFormBg = () => {
        const image = document.getElementById('image2')
        image?.click()
        // imageInput.current.click()
    }
    const handleDefaultImg = (img) => {
        setProfilePhotoPlaceholder(img)

    }
    const onSubmit = async (data) => {
        let imageUrl = profile?.image
        const toastId = toast.loading("Updating...");
        if (ProfilePhotoPlaceholder === profile?.image) {
            imageUrl = profile?.image
        } else if (allDefaultImgLink.includes(ProfilePhotoPlaceholder)) {
            imageUrl = ProfilePhotoPlaceholder
        } else {
            const image = { image: profileFile0 }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                imageUrl = res?.data?.data?.display_url
            }
            catch (err) {
                toast.error(err?.message, { id: toastId });
            }
        }
        const name = data?.name;
        const image = imageUrl
        const email = profile?.email;
        const contactNumber = data?.contactNumber;
        const age = parseInt(data?.age);
        const country = data?.country;

        const profileData = {
            name,
            contactNumber,
            age,
            country,
            image
        }
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl

        })
            .then(() => {
                axiosSecure.put(`/updateUserData/${profile?._id}`, profileData)
                    .then(res => {
                        if (res.status == 200) {
                            toast.success("Profile Updated Successfully!!", { id: toastId });
                            Swal.fire({
                                icon: "success",
                                title: "Profile Updated Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setRefetchUser(refetchUser + 1)
                            refetch()
                            handleClose()
                        }
                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                    })

            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })

    }
    const inputFieldStyle = `w-full p-3 px-10 rounded-sm bg-black/20 block text-white border border-primary`
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border-primary/50 border-[3px] border-double w-[80%] sm:w-[650px] h-[70vh] sm:h-max overflow-y-scroll sm:overflow-visible m-4 px-4 py-4 rounded-sm scrollable-div2 relative z-10">

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Update Your Profile
                    </Typography>

                    <div className="sm:col-span-2">
                        <div className="w-full z-10">
                            <p className="px-2 pb-1 text-sm">Change your profile pic</p>
                            <div className="">

                                <div className='flex gap-5 items-center'>
                                    <div className="ml-[-10px] size-28 sm:size-32  rounded-tl-[50px] rounded-br-[50px] rounded-tr-[30px] rounded-bl-[30px] border-2 border-white bg-primary/10 border-double flex justify-center items-center text-2xl text-gray-500 overflow-hidden relative">
                                        <img className='object-cover size-28 sm:size-32 z-10' src={ProfilePhotoPlaceholder} alt={ProfilePhotoPlaceholder} />

                                        <div className="w-full h-full -z-10 border-2 border-black absolute top-0 left-0 hidden">
                                            <input
                                                id="image2"
                                                onChange={handleFileChange}
                                                className={`${inputFieldStyle}`}
                                                // required
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                placeholder="Image" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-5'>
                                        <p
                                            onClick={handleFormBg}
                                            className='btn-sm flex justify-center items-center px-1 border border-primary hover:border-primary  bg-primary/20 hover:bg-primary/30 rounded-sm w-max'>Choose image
                                        </p>
                                        <div className='relative'>
                                            <p onClick={() => setShowDefaultImg(true)} className=' text-xs sm:text-sm font-bold cursor-pointer'> {`> Or choose one of our defaults`}</p>
                                            <div className={`transition-all duration-300 ${showDefaultImg ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} grid grid-cols-2 gap-2 gap-y-2 sm:gap-y-5 w-[170px] sm:w-[210px] absolute top-9 left-[-90px] xs:left-0  rounded-sm p-1 pt-8 pb-3 border-2 border-primary origin-top z-10`}>
                                                <div className="absolute top-0 left-0 w-full h-full -z-10 bg-black/80 blur-sm"></div>
                                                <p onClick={() => setShowDefaultImg(false)} className='transition-all duration-300 text-white col-span-2 ml-auto cursor-pointer h-7 w-7 flex justify-center items-center text-lg font-bold rounded-md bg-black/20 hover:bg-black/50 absolute right-3 top-1'>X</p>
                                                {
                                                    allDefaultImgLink.map((img, idx) => <img className={`transition-all duration-300 w-[67px] h-[67px] rounded-full object-cover p-0.5   cursor-pointer hover:border-[3px] hover:border-white mx-auto ${ProfilePhotoPlaceholder === img ? 'border-[3px] border-white' : ''}`} key={idx} src={img} onClick={() => handleDefaultImg(img)} />)
                                                }
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div >
                        <TextField
                            sx={{ width: '100%' }}
                            {...register("name", { required: true })}
                            id="standard-required"
                            label="Your Name"
                            type="text"
                            defaultValue={profile?.name}
                            variant="standard"
                            className="inputFieldStyle"

                        />
                        {errors.name && <span className='text-red-500 text-sm font-bold'>Name is required</span>}
                    </div>
                    <TextField
                        required
                        id="standard-required"
                        label="Your Email"
                        disabled
                        defaultValue={profile?.email}
                        variant="standard"
                    />
                    <div>
                        <TextField
                            {...register("age", { required: true })}
                            sx={{ width: '100%' }}
                            id="standard-required"
                            label="Your Age"
                            type="number"
                            defaultValue={profile?.age}
                            variant="standard"
                        />
                        {errors.age && <span className='text-red-500 text-sm font-bold'>Age is required</span>}
                    </div>
                    <div>
                        <TextField
                            {...register("country", { required: true })}
                            sx={{ width: '100%' }}
                            id="standard-required"
                            label="Your Country"
                            defaultValue={profile?.country}
                            variant="standard"
                        />
                        {errors.country && <span className='text-red-500 text-sm font-bold'>Country is required</span>}
                    </div>
                    <div className="w-full">
                        <TextField
                            {...register("contactNumber", {
                                required: true,
                                minLength: 11,
                                maxLength: 11
                            })}
                            id="standard-required"
                            label="Your Contact Number"
                            type="number"
                            defaultValue={profile?.contactNumber}
                            variant="standard"
                            sx={{ width: '100%' }}
                        />
                        {errors?.contactNumber?.type === 'minLength' && <span className='text-red-500 text-sm font-bold'>Contact number must be 11 characters</span>}
                        {errors?.contactNumber?.type === 'maxLength' && <span className='text-red-500 text-sm font-bold'>Contact number must be 11 characters</span>}
                    </div>
                </div>
                <div className="text-center flex  items-center gap-10">
                    <button className="btn btn-neutral bg-secondary/90 hover:bg-secondary border-none rounded-sm  mt-5">Update</button>
                    <button onClick={() => {
                        setProfilePhotoPlaceholder(profile?.image)
                        handleClose()
                    }} className="btn btn-neutral bg-primary/90 hover:bg-primary border-none rounded-sm  mt-5">Close</button>
                </div>
                {/* <div className="absolute top-0 left-0 w-full -z-10 border border-primary border-double">
                    
                </div> */}
            </form>

        </Modal>

    );
};

export default UpdateProfileModal;