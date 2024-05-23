// import React from 'react';
import { motion } from "framer-motion"
import { MdLogin } from "react-icons/md";
import LogIn from "../LogIn/LogIn";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { GiArchiveRegister } from "react-icons/gi";
import { useState } from "react";
import Register from "../Register/Register";
import LoginImg from '../../assets/login.svg'
import RegisterImg from '../../assets/register.svg'
const Authentication = () => {
    const [logInNotRegister, setLogInNotRegister] = useState(true)
    return (
        <div className=" gap-x-3 gap-y-5 p-7 authenticationPage max-w-[1000px] mx-auto">

            {/* flex justify-center items-center md:items-end gap-x-3 gap-y-5 flex-col-reverse md:flex-row p-7 */}
            <div className="authenticationImg">
                <motion.img
                    initial={{ y: 100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`max-h-[320px] mx-auto ${logInNotRegister ? ' hidden md:block' : 'hidden'}`} src={LoginImg} alt="" />
                <motion.img
                    initial={{ y: 100, }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`max-h-[320px] mx-auto ${!logInNotRegister ? ' hidden md:block' : 'hidden'}`} src={RegisterImg} alt="" />


            </div>
            <div className="logInBtn">
                {
                    logInNotRegister ? <button onClick={() => setLogInNotRegister(false)} type='submit' className='btn bg-gradient-to-r       text-white font-bold  border-none bg-primary/80 hover:bg-primary rounded-sm border border-primary/90 hover:border-primary login w-full  md:min-w-[200px]'><GiArchiveRegister />Register</button> : <button onClick={() => setLogInNotRegister(true)} type='submit' className='btn bg-gradient-to-r       text-white font-bold  border-none bg-primary/80 hover:bg-primary rounded-sm border border-primary/90 hover:border-primary login w-full  md:min-w-[200px]'><MdLogin></MdLogin>Log In</button>
                }
            </div>
            <p className="font-bold md:hidden text-white">Or</p>
            <div className="googleLoginBtn">
                <GoogleLogin />
            </div>
            <div className="md:flex-1 max-w-[450px] w-full Form">
                {
                    logInNotRegister ? <LogIn isLogIn={{ logInNotRegister, setLogInNotRegister }} /> : <Register isRegister={{ logInNotRegister, setLogInNotRegister }} />
                }
            </div>
        </div>
    );
};

export default Authentication;