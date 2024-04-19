import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';

const MainLayout = () => {
    const location = useLocation();
    const pathName = location.pathname
    return (
        <div className='relative'>
            <div className='fixed w-full z-10'>
                <NavBar />
            </div>
            <div className={`${pathName==='/' ? 'pt-0' : 'pt-24'}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;