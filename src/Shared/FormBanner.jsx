// import React from 'react';

const FormBanner = ({ img, title, description }) => {
    return (
        <div className="relative min-h-[200px] max-w-[500px] min-w-[200px] mx-auto">
            <div className="h-full min-h-[200px] max-w-[500px] min-w-[200px] overflow-hidden relative">
                <img className="w-full h-full object-cover absolute" src={img} alt="" />
            </div>
            <div className="absolute top-0 w-full text-white bg-black/30 h-full p-4">
                <div className="text-3xl font-bold text-center capitalize py-5">{title}</div>
                <div className="text-lg font-bold capitalize py-5 min-w-[200px] max-w-[500px] mx-auto">{description}</div>
            </div>
        </div>
    );
};

export default FormBanner;