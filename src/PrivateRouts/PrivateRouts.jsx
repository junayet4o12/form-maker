/* eslint-disable react/prop-types */
// import React from 'react';
  
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading/Loading";

const PrivateRouts = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loading/>
    }
    if (user) {
        return <div>
            {children}
        </div>

    }
    return <Navigate to={'/accountPortal'}></Navigate>;
};

export default PrivateRouts;