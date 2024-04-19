// import React from 'react';
import defaultImg from '../assets/bannerImg.jpg'
const FormBanner = ({ img, title, description }) => {
    return (
        <div className="relative min-h-[200px] max-w-[500px] min-w-[200px] mx-auto">
            <div className="h-full min-h-[200px] max-w-[500px] min-w-[200px] overflow-hidden relative">
                <img className="w-full h-full object-cover absolute" src={img || defaultImg} alt="" />
            </div>
            <div className="absolute top-0 w-full text-white bg-black/50 h-full p-4  pt-6 flex flex-col">
                <div className="text-4xl font-bold text-center capitalize">{title} </div>
                <hr className='my-1' />
                <div className="text-base font-medium capitalize py-3 min-w-[200px] max-w-[400px] mx-auto">{description}</div>
            </div>
        </div>
    );
};

export default FormBanner;