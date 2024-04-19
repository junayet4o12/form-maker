// import React from 'react';

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import UpdateProfileModal from "./UpdateProfileModal";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
    if(isLoading){
        return <Loading/>
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="flex justify-center items-center flex-col py-10">
            <div className="flex gap-y-5 gap-x-10 flex-wrap">
                <img className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] object-cover overflow-hidden rounded-full shadow-xl" src={user?.photoURL} alt="" />
                <div className=" max-w-[350px] text-xl  md:text-2xl font-medium">
                    <h2 className="text-2xl font-bold  pt-3 text-black"> {userProfile?.name} </h2>
                    <h2 className="  pt-3  text-black"> Age: {userProfile?.age || 'Not Given!'} </h2>
                    <h2 className="  pt-3  text-black"> Country: {userProfile?.country || 'Not Given!'} </h2>
                </div>
            </div>
            <div className="bg-blue-100 p-5 my-7 max-w-[500px]">
                <h1 className="font-bold text-2xl sm:text-3xl  pb-3">Contact Info</h1>
                <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Email:</span> {userProfile?.email} </h2>
                <h2 className="text-base sm:text-xl font-medium pt-3"><span className="underline font-bold">Contact No.:</span> {userProfile?.contactNumber || 'Not Given!'} </h2>
            </div>
            <div>
                <button onClick={handleOpen} className="btn btn-neutral bg-blue-400 border-none rounded-sm profileUpdatebtn">Update Profile</button>
            </div>
            <UpdateProfileModal open={open} handleClose={handleClose} profile={userProfile} refetch={refetch}/>
        </div>
    );
};

export default UserProfile;