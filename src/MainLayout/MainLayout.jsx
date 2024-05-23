import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import createFormBanner from '../assets/createFormBanner.svg'
import shareFormImg from '../assets/shareFormBanner.svg'
import updateFormImg from '../assets/updateFormBanner.svg'
import manageFormImg from '../assets/manageFormBanner.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
const MainLayout = () => {
    const location = useLocation();
    const pathName = location.pathname
    return (
        <div className='relative'>
            <div className='fixed w-full z-10'>
                <NavBar />
            </div>
            <div className={`bg-black/70 ${pathName === '/' ? 'pt-0' : 'pt-[75px]'}`}>
                <div className={`${pathName === '/' ? '' : 'max-h-[calc(100vh-75px)] min-h-[calc(100vh-75px)] overflow-auto scrollable-div'}`}>
                    <Outlet />
                </div>
            </div>
            <div className='absolute top-0 w-full h-full -z-20'>
                <div className='w-full h-full bg-secondary/60'>
                    <div className='absolute w-full h-full   blur-md'>
                        <Swiper
                            className='h-full'
                            modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
                            effect={'fade'}
                            spaceBetween={0}
                            slidesPerView={1}


                            scrollbar={{ draggable: true }}
                            speed={2000}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}

                        >
                            <SwiperSlide>
                                <img src={createFormBanner} className="h-full object-cover w-full" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={shareFormImg} className="h-full object-cover w-full" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={updateFormImg} className="h-full object-cover w-full" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={manageFormImg} className="h-full object-cover w-full" />
                            </SwiperSlide>


                        </Swiper>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;