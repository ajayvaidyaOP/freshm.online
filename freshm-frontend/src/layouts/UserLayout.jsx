import React from "react";


import {

Box,
Toolbar

} from "@mui/material";


import UserSidebar 
from "../components/layout/user/UserSidebar";



export default function UserLayout({children}){


return(

<Box

display="flex"

>


<UserSidebar/>



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