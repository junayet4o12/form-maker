/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from 'framer-motion'
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { MdLogin } from "react-icons/md";
import loginImg from '../../assets/login.svg'
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
const LogIn = ({ isLogIn }) => {
    const { logInNotRegister, setLogInNotRegister } = isLogIn
    const { loginUser } = useAuth()
    const [showPass, setShowPass] = useState(true);
    const [err, setErr] = useState('')
    const navigate = useNavigate();
    // data.email, data.password
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        setErr('')
        const email = data?.email;
        const password = data?.password;
        loginUser(email, password)
            .then(res => {
                Swal.fire({
                    title: "Logged in Successfully..",
                    showClass: {
                        popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
                    },
                    hideClass: {
                        popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
                    }
                });
                navigate('/', { replace: true })
            })
            .catch(err => {
                setErr(err?.message)
            })

    }

    return (
        <div className="w-full max-w-[450px]">

            <div className="">
                <motion.form onSubmit={handleSubmit(onSubmit)}
                    initial={{ y: -100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" mx-auto">

                    <div className="mx-auto w-[100%] pt-5 pb-0 text-black  ">
                        <h2 className="text-4xl font-bold uppercase  text-center mb-6 text-gray-600 ">Log In</h2>
                        <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium">



                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm">Write your email</p>
                                <div className="relative w-full">
                                    <input required name="email" {...register("email", { required: true })} className="bg-secondary/20 w-full p-3 px-10 rounded-none" type="email" placeholder="email" />
                                    
                                    {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}
                                    <p className='text-xl absolute top-3.5 left-3'><HiOutlineMail></HiOutlineMail></p>
                                </div>
                            </div>

                            <div className="w-full">
                                <p className="px-2 pb-1 text-sm">Write your given pass</p>
                                <div className="relative w-full  ">
                                    <input
                                        type={showPass ? 'password' : 'text'} name="password" {...register("password", {
                                            required: true
                                        })} className="w-full p-3 px-10 rounded-none bg-secondary/20" placeholder="password" />
                                    <p className='text-xl absolute top-3 left-3 '><RiLockPasswordLine></RiLockPasswordLine></p>
                                    <p onClick={() => (setShowPass(!showPass))} className={`absolute top-2 right-0 mr-2 cursor-pointer text-lg  p-1`}>{showPass ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</p>
                                    {errors?.password?.type === 'required' && <span className='text-red-500 text-sm'>Password invalid</span>}
                                    <span className='text-red-500 text-sm font-medium'>{err}</span>

                                    <div>

                                    </div>
                                    <div className='flex justify-between p-2 gap-3'>
                                        <p className='text-sm font-medium'>Don&apos;t have an account? <br /> <span onClick={() => setLogInNotRegister(false)} className='font-bold Register text-gray-700 hover:text-gray-900 cursor-pointer flex gap-1 hover:underline items-center'><GiArchiveRegister></GiArchiveRegister>Register</span></p>

                                    </div>
                                    
                                </div>
                            </div>
                            <div className='w-full flex flex-col  justify-center items-center gap-2'>
                                <button type='submit' className='btn bg-gradient-to-r  w-full     text-white font-bold rounded-none border-none bg-secondary/90 hover:bg-secondary login'><MdLogin></MdLogin> Log In</button>
                                {/* <p>Or</p>
                                <GoogleLogin/> */}
                            </div>
                        </div>

                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default LogIn;