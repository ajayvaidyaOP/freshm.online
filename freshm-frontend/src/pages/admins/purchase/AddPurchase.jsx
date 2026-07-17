import React from "react";


import {

Box,
Typography,
Card,
CardContent,
Grid,
TextField,
Button,
MenuItem

} from "@mui/material";



export default function AddPurchase(){



return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Receive Material

</Typography>



<Card>


<CardContent>


<Grid container spacing={3}>


<Grid item xs={12} md={6}>


<TextField

select

fullWidth

label="Select Vendor/Farmer"

>


<MenuItem value="vendor">

Vendor

</MenuItem>


<MenuItem value="farmer">

Farmer

</MenuItem>


</TextField>


</Grid>




<Grid item xs={12} md={6}>


<TextField

select

fullWidth

label="Select Article"

>


<MenuItem value="wheat">

Wheat

</MenuItem>


<MenuItem value="rice">

Rice

</MenuItem>


</TextField>


</Grid>




<Grid item xs={12} md={4}>


<TextField

fullWidth

label="Quantity"

/>


</Grid>



<Grid item xs={12} md={4}>


<TextField

fullWidth

label="Rate"

/>


</Grid>



<Grid item xs={12} md={4}>


<TextField

fullWidth

label="Total Amount"

/>


</Grid>



<Grid item xs={12}>


<TextField

select

fullWidth

label="Payment Status"

>


<MenuItem value="pending">

Pending

</MenuItem>


<MenuItem value="paid">

Paid

</MenuItem>


</TextField>


</Grid>



<Grid item xs={12}>


<Button

variant="contained"

>

Generate Purchase Invoice

</Button>


</Grid>



</Grid>


</CardContent>


</Card>


</Box>


)

}