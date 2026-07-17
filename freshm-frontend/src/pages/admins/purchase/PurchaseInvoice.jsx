import React from "react";


import {

Box,
Typography,
Card,
CardContent,
Button

} from "@mui/material";


import DownloadIcon from "@mui/icons-material/Download";



export default function PurchaseInvoice(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Purchase Invoice

</Typography>



<Card>


<CardContent>


<Typography

variant="h6"

>

GREEN AGRO PVT LTD

</Typography>


<Typography>

GST: 27XXXXX

</Typography>


<Typography>

Address: Nagpur Maharashtra

</Typography>



<hr/>



<Typography>

Vendor:
ABC Traders

</Typography>


<Typography>

Material:
Wheat

</Typography>



<Typography>

Quantity:
500 KG

</Typography>



<Typography>

Total:
₹50,000

</Typography>




<Button

variant="contained"

startIcon={<DownloadIcon/>}

sx={{mt:3}}

>

Download Purchase Invoice PDF

</Button>



</CardContent>


</Card>



</Box>


)

}