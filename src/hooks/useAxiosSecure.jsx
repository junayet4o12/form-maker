import axios from "axios";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { backendUrl } from "./backendUrl";
import useAuth from "./useAuth";

// import React from 'react';
const axiosSecure = axios.create({
    baseURL: backendUrl
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    axiosSecure.interceptors.request.use((res) => {
        const token = localStorage.getItem('token')
        res.headers.authorization = `bearer ${token}`
        res.headers.ownerEmail = user?.email
        return res
    }, (err) => {
        Promise.reject(err)
    })
    axiosSecure.interceptors.response.use((res) => {
        return res;
    }, (err) => {
        const status = err.response.status;
        if (status === 401 || status === 403)
            signOut(auth)
        navigate('/accountPortal')
        return Promise.reject(err);
    });
    return axiosSecure
};

export default useAxiosSecure;