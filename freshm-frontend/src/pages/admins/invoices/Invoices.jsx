import React from "react";


import {

Box,
Typography,
Card,
CardContent,
Button

} from "@mui/material";


import DownloadIcon from "@mui/icons-material/Download";



export default function Invoices(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Invoices

</Typography>




<Card>


<CardContent>


<Typography>

Purchase Invoice #PI001

</Typography>


<Typography>

Vendor : ABC Traders

</Typography>


<Typography>

Amount : ₹50,000

</Typography>




<Button

variant="contained"

startIcon={<DownloadIcon/>}

sx={{mt:2}}

>

Download Invoice PDF

</Button>



</CardContent>


</Card>



</Box>


)

}