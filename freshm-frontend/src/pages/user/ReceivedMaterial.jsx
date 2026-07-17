import React from "react";


import {

Box,
Card,
CardContent,
Typography,
Grid,
TextField,
Button,
MenuItem

} from "@mui/material";



export default function ReceivedMaterial(){


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

label="Select Article"

>


<MenuItem value="wheat">

Wheat

</MenuItem>



<MenuItem value="rice">

Rice

</MenuItem>



<MenuItem value="cotton">

Cotton

</MenuItem>


</TextField>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Vendor / Farmer Name"

/>


</Grid>





<Grid item xs={12} md={4}>


<TextField

fullWidth

label="Quantity"

/>


</Grid>





<Grid item xs={12} md={4}>


TextField

fullWidth

label="Rate"


</Grid>




<Grid item xs={12} md={4}>


<TextField

fullWidth

label="Total Amount"

/>


</Grid>





<Grid item xs={12}>


<Button

variant="contained"

>

Save Material Receipt

</Button>


</Grid>




</Grid>



</CardContent>


</Card>


</Box>


)

}