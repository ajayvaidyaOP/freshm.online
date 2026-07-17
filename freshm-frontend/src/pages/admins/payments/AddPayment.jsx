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



export default function AddPayment(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Add Payment

</Typography>




<Card>


<CardContent>


<Grid container spacing={3}>


<Grid item xs={12} md={6}>


<TextField

select

fullWidth

label="Payment To"

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

fullWidth

label="Party Name"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Amount"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Payment Mode"

/>


</Grid>



<Grid item xs={12}>


<Button

variant="contained"

>

Save Payment

</Button>


</Grid>


</Grid>


</CardContent>


</Card>



</Box>


)

}