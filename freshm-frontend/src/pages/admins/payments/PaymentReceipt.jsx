import React from "react";


import {

Box,
Typography,
Card,
CardContent,
Button

} from "@mui/material";


import DownloadIcon from "@mui/icons-material/Download";



export default function PaymentReceipt(){


return(

<Box>


<Typography

variant="h4"

mb={3}

fontWeight={700}

>

Payment Receipt

</Typography>




<Card>


<CardContent>


<Typography variant="h6">

GREEN AGRO PVT LTD

</Typography>



<hr/>


<Typography>

Paid To:
ABC Traders

</Typography>


<Typography>

Amount:
₹50,000

</Typography>


<Typography>

Payment Status:
PAID

</Typography>




<Button

variant="contained"

startIcon={<DownloadIcon/>}

sx={{mt:3}}

>

Download Receipt PDF

</Button>



</CardContent>


</Card>



</Box>


)

}