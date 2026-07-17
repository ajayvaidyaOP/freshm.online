import React from "react";

import {
Box,
Typography
} from "@mui/material";


export default function Unauthorized(){

return(

<Box

sx={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}

>


<Typography

variant="h4"

color="error"

>

You are not authorized to access this page

</Typography>


</Box>

)

}