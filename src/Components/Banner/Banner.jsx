import { useState } from 'react';
import createFormBanner from '../../assets/createFormBanner.svg'
import shareFormImg from '../../assets/shareFormBanner.svg'
import updateFormImg from '../../assets/updateFormBanner.svg'
import manageFormImg from '../../assets/manageFormBanner.svg'
import WarningModal from './WarningModal';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y, Autoplay, EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { IoIosCreate } from "react-icons/io";
import { FaShareFromSquare } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdManageHistory } from "react-icons/md";
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


        <div className="grid md:grid-cols-2 min-h-[calc(100vh-0px)] max-h-[calc(100vh-0px)] bg-black/10 md:bg-black/30   text-white relative overflow-hidden">
            <div className='absolute w-full h-full  -z-10 blur-md  md:blur-lg'>
                <Swiper
                    className='h-full'
                    modules={[Navigation, Scrollbar, A11y, EffectCube, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}


                    scrollbar={{ draggable: true }}
                    speed={1000}
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
            <div className='p-5 flex justify-center items-center gap-5'>
                <div className='space-y-6'>
                    <h2 className='font-bold text-4xl sm:text-5xl tracking-wider'>Welcome to Formify</h2>
                    <p className='sm:text-lg font-medium'>It is a web application that allows you to create your own form <br /> and collect data from others. It's  faster than Google Forms.</p>
                    <button onClick={() => handleOpen()} className='transition-all duration-300 bg-primary/80 px-3 py-2.5 rounded-sm font-bold  hover:bg-primary  active:scale-90'>Create Form</button>
                </div>
            </div>
            <div className="rounded-bl-[50px] md:rounded-bl-[100px] lg:rounded-bl-[200px] hidden md:block overflow-hidden bg-white min-h-[calc(100vh-0px)] max-h-[calc(100vh-0px)]"
            // style={{ backgroundImage: `url(${bannerImg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <Swiper
                    className='h-full'
                    modules={[Navigation, Scrollbar, A11y, EffectCube, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}


                    speed={1000}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                >
                    <SwiperSlide>
                        <div className='relative w-full h-full'>
                            <img src={createFormBanner} className="h-full object-cover w-full" />
                            <div className='absolute w-full h-full  bg-black/70 top-0 flex justify-center items-center'>
                                <h2 className='text-4xl font-bold uppercase flex justify-center items-center gap-5 flex-col'><span className='text-center text-7xl'><IoIosCreate /></span> Create Form</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative w-full h-full'>
                            <img src={shareFormImg} className="h-full object-cover w-full" />
                            <div className='absolute w-full h-full  bg-black/70 top-0 flex justify-center items-center'>
                                <h2 className='text-4xl font-bold uppercase flex justify-center items-center gap-5 flex-col'><span className='text-center text-7xl'><FaShareFromSquare /></span> Share Form</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative w-full h-full'>
                            <img src={updateFormImg} className="h-full object-cover w-full" />
                            <div className='absolute w-full h-full  bg-black/70 top-0 flex justify-center items-center'>
                                <h2 className='text-4xl font-bold uppercase flex justify-center items-center gap-5 flex-col'><span className='text-center text-7xl'><GrDocumentUpdate /></span> Update Form</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='relative w-full h-full'>
                            <img src={manageFormImg} className="h-full object-cover w-full" />
                            <div className='absolute w-full h-full  bg-black/70 top-0 flex justify-center items-center'>
                                <h2 className='text-4xl font-bold uppercase flex justify-center items-center gap-5 flex-col'><span className='text-center text-7xl'><MdManageHistory /></span> Manage Data</h2>
                            </div>
                        </div>
                    </SwiperSlide>


                </Swiper>
            </div>
            <WarningModal open={open} setOpen={setOpen} />
        </div>

    );
};

export default Banner;