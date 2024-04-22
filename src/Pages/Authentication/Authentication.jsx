// import React from 'react';

import { MdLogin } from "react-icons/md";
import LogIn from "../LogIn/LogIn";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import { GiArchiveRegister } from "react-icons/gi";
import { useState } from "react";
import Register from "../Register/Register";

const Authentication = () => {
    const [logInNotRegister, setLogInNotRegister] = useState(true)
    return (
        <div className="flex justify-center items-center md:items-end gap-x-3 gap-y-5 flex-col-reverse md:flex-row p-7">


            {
                logInNotRegister ? <button onClick={() => setLogInNotRegister(false)} type='submit' className='btn bg-gradient-to-r       text-white font-bold  border-none bg-secondary/90 hover:bg-secondary login w-full max-w-[450px] md:max-w-[200px] md:min-w-[200px] rounded-none'><GiArchiveRegister />Register</button> : <button onClick={() => setLogInNotRegister(true)} type='submit' className='btn bg-gradient-to-r       text-white font-bold  border-none bg-secondary/90 hover:bg-secondary login w-full max-w-[450px] md:max-w-[200px] md:min-w-[200px] rounded-none'><MdLogin></MdLogin>Log In</button>
            }
            <p className="font-bold md:hidden">Or</p>
            <GoogleLogin />
            <div className="md:flex-1 max-w-[450px] w-full">
                {
                    logInNotRegister ? <LogIn isLogIn={{logInNotRegister, setLogInNotRegister}} /> : <Register isRegister={{logInNotRegister, setLogInNotRegister}} />
                }
            </div>
        </div>
    );
};

export default Authentication;