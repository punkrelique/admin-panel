import React from 'react';
import { Outlet } from 'react-router'
import { Login, isLogged } from '../pages/login/Login'

const ProtectedRoutes = () => {
    return (
         isLogged() ? <Outlet/> : <Login/>
    );
};

export default ProtectedRoutes;