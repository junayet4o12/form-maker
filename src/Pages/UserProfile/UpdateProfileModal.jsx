/* eslint-disable react/prop-types */
// import React from 'react';

import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { Modal, TextField, Typography } from "@mui/material";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const UpdateProfileModal = ({ handleClose, open,  profile, refetch }) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const axiosSecure = useAxiosSecure()

    const onSubmit = (data) => {
        const name = data?.name;
        const email = profile?.email;
        const contactNumber = parseInt(data?.contactNumber);
        const age = parseInt(data?.age);
        const country = data?.country;

        const prfileData = {
            name,
            contactNumber,
            age,
            country
        }
        updateProfile(auth.currentUser, {
            displayName: name,

        })
            .then(() => {
                axiosSecure.put(`/updateUserData/${profile?._id}`, prfileData)
                    .then(res => {
                        if (res.statusText=='OK') {
                            Swal.fire({
                                icon: "success",
                                title: "Profile Updated Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                            handleClose()
                        }
                    })

            })
            .catch(err => {
                
            })
    
}
return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-[80%] sm:w-[650px] h-[70vh] sm:h-max overflow-y-scroll sm:overflow-visible m-4 px-4 py-4 rounded-lg">
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Update Your Profile
                </Typography>
                <div>
                    <TextField
                        sx={{ width: '100%' }}
                        {...register("name", { required: true })}
                        id="standard-required"
                        label="Your Name"
                        type="text"
                        defaultValue={profile?.name}
                        variant="standard"
                    />
                    {errors.name && <span className='text-red-500 text-sm font-bold'>Name is required</span>}
                </div>
                <TextField
                    required
                    id="standard-required"
                    label="Your Email"
                    disabled
                    defaultValue={profile?.email}
                    variant="standard"
                />
                <div>
                    <TextField
                        {...register("age", { required: true })}
                        sx={{ width: '100%' }}
                        id="standard-required"
                        label="Your Age"
                        type="number"
                        defaultValue={profile?.age}
                        variant="standard"
                    />
                    {errors.age && <span className='text-red-500 text-sm font-bold'>Age is required</span>}
                </div>
                <div>
                    <TextField
                        {...register("country", { required: true })}
                        sx={{ width: '100%' }}
                        id="standard-required"
                        label="Your Country"
                        defaultValue={profile?.country}
                        variant="standard"
                    />
                    {errors.country && <span className='text-red-500 text-sm font-bold'>Country is required</span>}
                </div>
                <div className="w-full">
                    <TextField
                        {...register("contactNumber", {
                            required: true,
                            minLength: 11,
                            maxLength: 11
                        })}
                        id="standard-required"
                        label="Your Contact Number"
                        type="number"
                        defaultValue={profile?.contactNumber}
                        variant="standard"
                        sx={{ width: '100%' }}
                    />
                    {errors?.contactNumber?.type === 'minLength' && <span className='text-red-500 text-sm font-bold'>Conetact number must be 11 charecters</span>}
                    {errors?.contactNumber?.type === 'maxLength' && <span className='text-red-500 text-sm font-bold'>Conetact number must be 11 charecters</span>}
                </div>
            </div>
            <div className="text-center flex  items-center gap-10">
                <button className="btn btn-neutral bg-blue-500 border-none rounded-sm profileUpdatebtn mt-5">Update</button>
                <button onClick={handleClose} className="btn btn-neutral bg-red-500 border-none rounded-sm closebtn mt-5">Close</button>
            </div>
        </form>
    </Modal>

);
};

export default UpdateProfileModal;