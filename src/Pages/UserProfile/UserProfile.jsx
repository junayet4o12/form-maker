// import React from 'react';

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import UpdateProfileModal from "./UpdateProfileModal";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { TextField, Typography } from "@mui/material";
const UserProfile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: userProfile = {}, refetch, isLoading } = useQuery({
        queryKey: ['participantsData', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/singleUser/${user?.email}`)
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading />
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const profileDataStyle = 'inner-border pb-1 transition-all duration-300'
    const profileDataLabelStyle = "text-[12.5px] text-gray-600"
    return (
        <p className="px-5">
            {/* <div className="flex justify-center items-center flex-col py-10 px-5">
                <div className="flex gap-y-5 gap-x-10 flex-wrap">
                    <PhotoProvider>
                        <PhotoView src={user?.photoURL}>
                            <img className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover overflow-hidden rounded-full shadow-xl cursor-pointer" src={user?.photoURL} alt="" />
                        </PhotoView>
                    </PhotoProvider>
                    <div className=" max-w-[350px] text-xl  md:text-2xl font-medium">
                        <h2 className="text-2xl font-bold  pt-3 text-white"> {userProfile?.name} </h2>
                        <h2 className="  pt-3  text-white"> Age: {userProfile?.age || 'Not Given!'} </h2>
                        <h2 className="  pt-3  text-white"> Country: {userProfile?.country || 'Not Given!'} </h2>
                    </div>
                </div>
                <div className=" p-5 my-7 max-w-[500px] text-white relative">
                    <div className="w-full h-full absolute  blur-sm bg-secondary/80 -z-10 bottom-0 left-0"></div>
                    <h1 className="font-bold text-2xl sm:text-3xl  pb-3">Contact Info</h1>
                    <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Email:</span> {userProfile?.email} </h2>
                    <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Contact No:</span> {userProfile?.contactNumber || 'Not Given!'} </h2>
                </div>
                <div>
                    <button onClick={handleOpen} className="btn btn-neutral bg-primary/95 hover:bg-primary border-none rounded-sm profileUpdatebtn">Update Profile</button>
                </div>
                <UpdateProfileModal open={open} handleClose={handleClose} profile={userProfile} refetch={refetch} />
            </div> */}
            <div className="bg-gray-200 w-full max-w-[750px] m-4 px-4 py-4 rounded-sm relative mx-auto rounded-tl-[60px] rounded-br-[60px] rounded-tr-[10px] rounded-bl-[10px]">

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                    <div className="sm:col-span-2">
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                            My Profile
                        </Typography>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="size-32  sm:size-40 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[40px] rounded-bl-[40px] border-2 border-white bg-primary/10 border-double flex justify-center items-center text-2xl  overflow-hidden relative">
                            <PhotoProvider>
                                <PhotoView src={user?.photoURL}>
                                    <img className='object-cover size-32  sm:size-40 cursor-pointer' src={user?.photoURL} />
                                </PhotoView>
                            </PhotoProvider>


                        </div>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Name</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.name}</p>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Email</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.email}</p>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Age</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.age || 'Not Updated'}</p>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Country</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.country || 'Not Updated'}</p>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Contact Number</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.contactNumber || 'Not Updated'}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={handleOpen} className="transition-all duration-300 bg-primary/80 px-5 py-2.5 rounded-sm font-bold  hover:bg-primary  active:scale-90 text-white text-sm">Update Profile</button>
                    </div>

                </div>
                <UpdateProfileModal open={open} handleClose={handleClose} profile={userProfile} refetch={refetch} />
                {/* <div className="absolute top-0 left-0 w-full -z-10 border border-primary border-double">
                    
                </div> */}
            </div>
        </p>
    );
};

export default UserProfile;