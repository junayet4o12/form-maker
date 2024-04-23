import React, { useState } from 'react';
import bannerImg from '../../assets/bannerImg.jpg'
import WarningModal from './WarningModal';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    // Function to handle selection change

    const { user } = useAuth()
    const handleOpen = () => {
        if (user) {
            navigate('/createForm')
        }
        else {
            setOpen(true);

        }
    }
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-medium">Welcome To <br /> <span className='font-bold text-primary'>Formify</span></h1>
                        <p className="mb-5">Welcome to Formify, your go-to platform for creating custom forms with ease. Streamline data collection and enhance collaboration effortlessly through our intuitive interface. Start crafting your forms today!</p>
                        <button onClick={() => handleOpen()} className="btn btn-primary bg-primary/80 border-none hover:bg-primary">Create Form</button>

                    </div>
                </div>
            </div>
            <WarningModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Banner;