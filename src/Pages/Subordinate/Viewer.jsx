/* eslint-disable react/prop-types */
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Viewer = ({ viewer, id, idx,refetch }) => {
    const axiosSecure = useAxiosSecure()
    const handleRemove = () => {
        axiosSecure.put(`/removeViewers/${id}`, {email: viewer})
            .then(res => {
                refetch()
            })
            .catch(err => {
            })
    }
    return (
        <div className='w-full max-w-[450px]  bg-primary/10 border-primary border rounded-sm text-white flex justify-center items-end flex-col flex-wrap gap-1 px-3 py-2'>
            <div className='flex gap-2 w-full'>
                <p className='font-bold text-sm'>{idx}.</p>
                <p className='font-bold text-sm'>{viewer}</p>
            </div>
            <div>
                <button onClick={handleRemove} className='btn btn-sm rounded-sm bg-primary/20 text-white border-primary hover:bg-primary/30 hover:border-primary'>Remove -</button>
            </div>
        </div>
    );
};

export default Viewer;