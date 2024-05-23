// import React from 'react';
import defaultImg from '../assets/bannerImg.jpg'
const FormBanner = ({ img, title, description }) => {
    return (
        <div className="relative min-h-[230px] max-w-[700px]  min-w-[200px] mx-auto p-1 border-2 border-double border-black  bg-white mb-2 rounded-sm">
            <div className="h-full min-h-[230px]  min-w-[200px] overflow-hidden relative object-cover">
                <img className="w-full h-full object-cover absolute" src={img || defaultImg} alt="" />
                <div className="absolute top-0 w-full text-white bg-black/50 h-full p-4  pt-6 flex flex-col">
                    <div className="text-lg sm:text-xl md:text-3xl font-bold text-center capitalize">{title} </div>
                    <hr className='my-1' />
                    <div className="text-sm md:text-base font-medium capitalize py-3 min-w-[200px] w-full px-10 mx-auto">{description}</div>
                </div>
            </div>

        </div>
    );
};

export default FormBanner;