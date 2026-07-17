import React from "react";


import {

Box,
Card,
CardContent,
Typography,
Button

} from "@mui/material";


import DownloadIcon from "@mui/icons-material/Download";



export default function FarmerDocuments(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Farmer Documents

</Typography>




<Card>


<CardContent>


<Typography>

Farmer Name : Ramesh Patil

</Typography>



<Typography mt={2}>

Documents

</Typography>



<Button

startIcon={<DownloadIcon/>}

variant="outlined"

sx={{mt:2}}

>

Download Aadhaar

</Button>



<Button

startIcon={<DownloadIcon/>}

variant="outlined"

sx={{mt:2,ml:2}}

>

Download PAN

</Button>



<Button

startIcon={<DownloadIcon/>}

variant="outlined"

sx={{mt:2,ml:2}}

>

Download Bank Statement

</Button>



</CardContent>


</Card>



</Box>


)

}