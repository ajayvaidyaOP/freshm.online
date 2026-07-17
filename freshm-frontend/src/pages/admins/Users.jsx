import React from "react";

import {
Box,
Typography,
Button,
Card,
CardContent
} from "@mui/material";


export default function Users(){

return(

<Box>


<Typography
variant="h4"
fontWeight={700}
>

Users

</Typography>


<Button
variant="contained"
sx={{mt:3}}
>

+ Add User

</Button>



<Card sx={{mt:3}}>

<CardContent>

User Management Table

</CardContent>


</Card>


</Box>

)

}