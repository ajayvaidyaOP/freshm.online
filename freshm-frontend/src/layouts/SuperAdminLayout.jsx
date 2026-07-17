import React from "react";

import {
Box,
Toolbar
} from "@mui/material";

import SuperAdminSidebar from "../components/layout/SuperAdminSidebar";
import Topbar from "../components/layout/Topbar";


export default function SuperAdminLayout({children}){

return(

<Box sx={{display:"flex"}}>


<SuperAdminSidebar/>


<Topbar/>


<Box

component="main"

sx={{

flexGrow:1,

p:3,

background:"#F4F7F6",

minHeight:"100vh"

}}

>


<Toolbar/>


{children}


</Box>


</Box>

)

}