import React from "react";
import {Outlet} from 'react-router-dom';
import "./index.css";
import Navbar from "./Navbar";

const AdminLayout: React.FC = () => 
{
    return (<>
        <Navbar/>
        <Outlet/>
    </>);
}

export default AdminLayout;