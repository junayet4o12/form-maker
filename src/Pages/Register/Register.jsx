/* eslint-disable react/prop-types */
// import React from 'react';
import { motion } from "framer-motion"
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GiArchiveRegister } from 'react-icons/gi';
import { MdLogin } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdDriveFileRenameOutline } from "react-icons/md";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import auth from "../../firebase/firebase.config";
import addPhotoImg from '../../assets/addPhotoImg.png'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const Register = ({ isRegister }) => {

    const { setLogInNotRegister } = isRegister
    const { createUser } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [photoError, setPhotoError] = useState('')
    const [showpass, setshowpass] = useState(true);
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const navigate = useNavigate()
    // const axiosPublic = useAxiosPublic();
    const [err, setErr] = useState('')
    const [ProfilePhotoPlaceholder, setProfilePhotoPlaceholder] = useState(addPhotoImg)
    const [showDefaultImg, setShowDefaultImg] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState('')
    const [profileFile0, setProfileFile0] = useState('')
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
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
            setPhotoError('')
            setProfilePhotoPlaceholder(event.target.result);
            setProfileFile0(file)
        };
        setProfilePhoto(reader.readAsDataURL(file))
        // reader.readAsDataURL(file);
    };
    const handleFormBg = () => {
        const image = document.getElementById('image')
        image?.click()
        // imageInput.current.click()
    }
    const handleDefaultImg = (img) => {
        setPhotoError('')
        setProfilePhotoPlaceholder(img)

    }
    const onSubmit = async (data) => {
        setPhotoError('')
        setErr('')
        let imgUrl = ''
        const toastId = toast.loading("Registering...");
        if (ProfilePhotoPlaceholder === addPhotoImg) {
            return setPhotoError(<p className="text-sm text-primary  px-2 py-1  bg-white/90 mt-1 border border-primary">Please Select a profile Pic</p>)
        } else if (allDefaultImgLink.includes(ProfilePhotoPlaceholder)) {
            imgUrl = ProfilePhotoPlaceholder
        } else {

            const image = { image: profileFile0 }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                imgUrl = res?.data?.data?.display_url
            }
            catch (err) {
                toast.error(err?.message, { id: toastId });
            }
        }
        createUser(data.email, data.password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: imgUrl

                })
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: imgUrl


                        }
                        axiosPublic.post('/addUser', userInfo)
                            .then(res => {
                                if (res.status == 200) {
                                    toast.success("Registered Successfully!!", { id: toastId });
                                   
                                    reset();
                                    navigate('/')
                                }
                            })
                            .catch(err => {
                                toast.error(err?.message, { id: toastId });
                            })

                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                    })
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
                setErr(err?.message)
            })
    }
    const inputFieldStyle = `w-full p-3 px-10 rounded-sm bg-black/20 block text-white border border-primary`
    const inputFieldLogoStyle = 'text-xl absolute top-3.5 left-3 text-white'
    const imageInput = useRef(null)
    return (
        <div className="w-full">

            <div className="w-full">
                <motion.form onSubmit={handleSubmit(onSubmit)}
                    initial={{ y: -100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full mx-auto">

                    <div className="mx-auto w-[100%] pt-5 pb-0 text-black">
                        <h2 className="text-4xl font-bold uppercase  text-center mb-6 text-white/90 ">Register</h2>
                        <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium ">

                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm text-white">Write your name</p>
                                <div className="relative w-full">

                                    <input name="name" {...register("name", { required: true })} className={`${inputFieldStyle}`} type="text" placeholder="Name" />
                                    {errors.name && <p className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>Name is required</p>}
                                    <p className={`${inputFieldLogoStyle}`}><MdDriveFileRenameOutline></MdDriveFileRenameOutline></p>
                                </div>
                            </div>
                            <div className="w-full z-10">
                                <p className="px-2 pb-1 text-sm text-white">Choose your profile pic</p>
                                <div className="">

                                    <div className='flex flex-wrap gap-10 items-center'>
                                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-white bg-primary/10 border-double flex justify-center items-center text-2xl text-gray-500 overflow-hidden relative">
                                            <img className='object-cover w-full h-full z-10' src={ProfilePhotoPlaceholder} alt={ProfilePhotoPlaceholder} />

                                            <div className="w-full h-full -z-10 border-2 border-black absolute top-0 left-0 hidden">
                                                <input
                                                    id="image"
                                                    ref={imageInput}
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
                                                className='btn-sm flex justify-center items-center px-3 font-bold border border-primary hover:border-primary  bg-white/90 hover:bg-white   rounded-sm w-max cursor-pointer'>Choose image
                                            </p>
                                            <div className='relative'>
                                                <p onClick={() => setShowDefaultImg(true)} className='text-white font-bold cursor-pointer'> {`> Or choose one of our defaults`}</p>
                                                <div className={`transition-all duration-300 ${showDefaultImg ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} grid grid-cols-2 gap-2 gap-y-5 w-[210px] absolute top-7 left-14  rounded-sm p-1 pt-8 pb-3 border-2 border-primary origin-top`}>
                                                    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-black/80 blur-sm"></div>
                                                    <p onClick={() => setShowDefaultImg(false)} className='transition-all duration-300 text-white col-span-2 ml-auto cursor-pointer h-7 w-7 flex justify-center items-center text-lg font-bold rounded-md bg-black/20 hover:bg-black/50 absolute right-3 top-1'>X</p>
                                                    {
                                                        allDefaultImgLink.map((img, idx) => <img className={`transition-all duration-300 w-[67px] h-[67px] rounded-full object-cover p-0.5   cursor-pointer hover:border-[3px] hover:border-white mx-auto ${ProfilePhotoPlaceholder === img ? 'border-[3px] border-white' : ''}`} key={idx} src={img} onClick={() => handleDefaultImg(img)} />)
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="py-3 font-light">{photoError}</div>
                                </div>

                            </div>
                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm text-white">Write your email</p>
                                <div className="relative w-full">
                                    <input required name="email" {...register("email", { required: true })} className={`${inputFieldStyle}`} type="email" placeholder="email" />
                                    {errors.email && <p className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>Email is required</p>}
                                    <p className={`${inputFieldLogoStyle}`}><HiOutlineMail></HiOutlineMail></p>
                                </div>
                            </div>

                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm text-white">Give a unique pass</p>
                                <div className="relative w-full">
                                    <input

                                        type={showpass ? 'password' : 'text'} name="password" {...register("password", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 20,
                                            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
                                        })} className={`${inputFieldStyle} mb-2`} placeholder="password" />
                                    <p className={`${inputFieldLogoStyle}`}><RiLockPasswordLine></RiLockPasswordLine></p>
                                    <p onClick={() => (setshowpass(!showpass))} className={`absolute top-2 right-0 mr-2 cursor-pointer text-lg  p-1 text-white`}>{showpass ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</p>
                                    {errors?.password?.type === 'required' && <span className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>Password invalid</span>}
                                    {errors?.password?.type === 'minLength' && <span className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>Password must be minimum 8 characters</span>}
                                    {errors?.password?.type === 'maxLength' && <span className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>Password must be maximum 20 characters</span>}
                                    {errors?.password?.type === 'pattern' && <span className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>Password must contain at least one digit, one lowercase letter, and one uppercase letter.</span>}
                                    {
                                        err && <p className='text-primary px-2 py-1  bg-white/90 mt-1 border border-primary'>{err}</p>
                                    }
                                    <div>

                                    </div>
                                    <div className='flex justify-between p-2 gap-3'>
                                        <p className='text-sm font-medium text-white'>Already have an Account? <br /> <span onClick={() => setLogInNotRegister(true)} className='font-bold Register text-white/80 hover:text-white cursor-pointer flex gap-1 hover:underline items-center'> <MdLogin></MdLogin>Log in</span></p>

                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col  justify-center items-center gap-2'>
                                <button type='submit' className='btn bg-gradient-to-r  w-full     text-white font-bold bg-primary/80 hover:bg-primary rounded-sm border border-primary/90 hover:border-primary login'><GiArchiveRegister></GiArchiveRegister> Register</button>
                            </div>
                        </div>

                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Register;