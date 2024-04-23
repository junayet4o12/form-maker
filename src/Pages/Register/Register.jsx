/* eslint-disable react/prop-types */
// import React from 'react';
import { motion } from "framer-motion"
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GiArchiveRegister } from 'react-icons/gi';
import { MdLogin } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import registerimg from '../../assets/register.svg'
import { MdDriveFileRenameOutline, MdOutlineInsertPhoto } from "react-icons/md";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import auth from "../../firebase/firebase.config";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Register = ({ isRegister }) => {
    const { logInNotRegister, setLogInNotRegister } = isRegister
    const { createUser } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [showpass, setshowpass] = useState(true);
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const navigate = useNavigate()
    // const axiosPublic = useAxiosPublic();
    const [err, seterr] = useState('')
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        seterr('')
        const image = { image: data?.image[0] }

        const res = await axios.post(imgHostingApi, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const imgurl = res?.data?.data?.display_url
        createUser(data.email, data.password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: imgurl

                })
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: imgurl


                        }
                        axiosPublic.post('/addUser', userInfo)
                            .then(res => {
                                if (res.status == 200) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    reset();
                                    navigate('/')
                                }
                            })

                    })
                    .catch(err => {
                    })
            })
            .catch(err => {
                seterr(err?.message)
            })
    }

    return (
        <div className="">

            <div className="w-full">
                <motion.form onSubmit={handleSubmit(onSubmit)}
                    initial={{ y: -100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full mx-auto">

                    <div className="mx-auto w-[100%] pt-5 pb-0 text-black">
                        <h2 className="text-4xl font-bold uppercase  text-center mb-6 text-gray-600 ">Register</h2>
                        <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium ">

                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm">Write your name</p>
                                <div className="relative w-full">

                                    <input name="name" {...register("name", { required: true })} className="bg-secondary/20 w-full p-3 px-10 rounded-none" type="text" placeholder="Name" />
                                    {errors.name && <span className='text-red-500'>Name is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><MdDriveFileRenameOutline></MdDriveFileRenameOutline></p>
                                </div>
                            </div>
                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm">Choose your profile pic</p>
                                <div className="relative w-full">
                                    <input name="image" {...register("image", { required: true })} className="bg-secondary/20 w-full p-3 px-10 rounded-none" type="file" placeholder="Image" />
                                    {errors.image && <span className='text-red-500'>Image is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><MdOutlineInsertPhoto></MdOutlineInsertPhoto ></p>
                                </div>
                            </div>
                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm">Write your email</p>
                                <div className="relative w-full">
                                    <input required name="email" {...register("email", { required: true })} className="bg-secondary/20 w-full p-3 px-10 rounded-none" type="email" placeholder="email" />
                                    {errors.email && <span className='text-red-500'>Email is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3 '><HiOutlineMail></HiOutlineMail></p>
                                </div>
                            </div>

                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm">Give a unique pass</p>
                                <div className="relative w-full">
                                    <input

                                        type={showpass ? 'password' : 'text'} name="password" {...register("password", {
                                            required: true,
                                            minLength: 8,
                                            maxLength: 20,
                                            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
                                        })} className="bg-secondary/20 w-full p-3 px-10 rounded-none" placeholder="password" />
                                    <p className='text-xl absolute top-3 left-3 '><RiLockPasswordLine></RiLockPasswordLine></p>
                                    <p onClick={() => (setshowpass(!showpass))} className={`absolute top-2 right-0 mr-2 cursor-pointer text-lg  p-1`}>{showpass ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</p>
                                    {errors?.password?.type === 'required' && <span className='text-red-500'>Password invalid</span>}
                                    {errors?.password?.type === 'minLength' && <span className='text-red-500'>Password must be minimum 8 characters</span>}
                                    {errors?.password?.type === 'maxLength' && <span className='text-red-500'>Password must be maximum 20 characters</span>}
                                    {errors?.password?.type === 'pattern' && <span className='text-red-500'>Password must contain at least one digit, one lowercase letter, and one uppercase letter.</span>}
                                    <p className='text-red-500 text-sm'>{err}</p>
                                    <div>

                                    </div>
                                    <div className='flex justify-between p-2 gap-3'>
                                        <p className='text-sm font-medium'>Already have an Account? <br /> <span onClick={() => setLogInNotRegister(true)} className='font-bold Register text-gray-700 hover:text-gray-900 cursor-pointer flex gap-1 hover:underline items-center'> <MdLogin></MdLogin>Log in</span></p>

                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col  justify-center items-center gap-2'>
                                <button type='submit' className='btn bg-gradient-to-r  w-full     text-white font-bold rounded-none border-none bg-secondary/90 hover:bg-secondary login'><GiArchiveRegister></GiArchiveRegister> Register</button>
                            </div>
                        </div>

                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default Register;