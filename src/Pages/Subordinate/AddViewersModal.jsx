/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
const AddViewersModal = ({ open, setOpen, id, refetch, viewers }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [email, setEmail] = useState('')
    const [isExistTheEmail, setIsExistTheEmail] = useState(false)
    const [isOwnerEmail, setIsOwnerEmail] = useState(false)
    const handleClose = () => {
        setEmail('')
        setOpen(false)
    }
    const isExist = (email) => {
        const check = viewers?.find(viewer => viewer === email);
        return !!check
    }
    const handleEmail = (e) => {
        setIsOwnerEmail(false)
        e.preventDefault();
        setEmail(e.target.value)
        if (user?.email === e.target.value) {
            return setIsOwnerEmail(true)
        }

        setIsExistTheEmail(isExist(e.target.value))

    }

    // const handleInputType = (e) => {
    //     e.preventDefault();
    //     setInputType(e.target.value)
    // }



    const handleSubmit = (e) => {
        e.preventDefault()
        if (isExistTheEmail || isOwnerEmail) {
            return
        }
        const toastId = toast.loading("Logged Outing...");
        const emailAddress = { email: e.target.email.value }
        axiosSecure.put(`/makeViewers/${id}`, emailAddress)
            .then(res => {
                toast.success(`${e.target.email.value} has added as a viewer!!`, { id: toastId });
                refetch()
                handleClose()
            })
            .catch(err => {
                toast.err(err?.message, { id: toastId });
            })
    }

    return (
        <div>
            <Dialog
                open={open}
                size={'sm'}
                handler={setOpen}
                className="max-h-[80vh] relative overflow-y-auto border-primary/50 border-[2px] border-double bg-black/50 rounded-sm scrollable-div2"

            >
                <form onSubmit={handleSubmit} className='flex gap-4 flex-col  py-5 rounded-lg px-5'>
                    <div className='text-lg font-extrabold text-white'>
                        Add Viewer
                    </div>
                    <div className=" w-full min-w-[200px] flex flex-col gap-2">
                        <label className='ml-1 text-white'>Viewer Email</label>
                        <input
                            onChange={handleEmail}
                            value={email}
                            required
                            type="email" placeholder="Email" name="email" className="w-full p-3 px-5 rounded-sm bg-black/20 block text-white border border-primary" />
                        {isExistTheEmail ? <p className="text-sm font-bold text-white ml-1">Oops! The User already exist in the viewer list !!</p> : ''}
                        {isOwnerEmail ? <p className="text-sm font-bold text-white ml-1">Oops! Its the Email of Form Owner !!</p> : ''}
                    </div>
                    <DialogFooter className="relative  py-2 w-full space-x-2 space-y-2 flex flex-wrap justify-end items-center gap-2">
                        <div className="w-full h-full absolute  blur-sm bg-black -z-10 bottom-0 left-0"></div>
                        <button className='text-white px-3 py-[7px] rounded-sm border border-primary bg-primary hover:border-primary  text-sm'><span className="text-sm">+ Add as Viewer</span></button>
                        <p
                            onClick={handleClose}
                            className="text-white px-3 py-[7px] rounded-sm border border-primary bg-primary/10 hover:border-primary  text-sm  cursor-pointer"
                        >
                            <span className="text-white text-sm capitalize font-normal">Cancel</span>
                        </p>
                        
                    </DialogFooter>
                </form>

            </Dialog>
        </div>
    );
};

export default AddViewersModal;