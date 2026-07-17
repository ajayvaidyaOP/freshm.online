import React from "react";


import {

Box,
Card,
CardContent,
Typography,
Grid,
TextField,
Button

} from "@mui/material";


export default function AddFarmer(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Add Farmer

</Typography>



<Card>


<CardContent>


<Grid container spacing={3}>


<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Farmer Name"

/>


</Grid>



<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Mobile Number"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Aadhar Number"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="PAN Number"

/>


</Grid>





<Grid item xs={12}>


<TextField

fullWidth

multiline

rows={3}

label="Address"

/>


</Grid>






<Grid item xs={12}>


<Typography

fontWeight={600}

mb={1}

>

Upload Documents

</Typography>



</Grid>




<Grid item xs={12} md={4}>


<Button

variant="outlined"

component="label"

fullWidth

>


Upload Aadhaar


<input

hidden

type="file"

/>


</Button>



</Grid>






<Grid item xs={12} md={4}>


<Button

variant="outlined"

component="label"

fullWidth

>


Upload PAN


<input

hidden

type="file"

/>


</Button>



</Grid>






<Grid item xs={12} md={4}>


<Button

variant="outlined"

component="label"

fullWidth

>


Upload Bank Statement


<input

hidden

type="file"

/>


</Button>



</Grid>






<Grid item xs={12}>


<Button

variant="contained"

sx={{mt:2}}

>

Generate Farmer Code & Save


</Button>


</Grid>




</Grid>



</CardContent>


</Card>


</Box>


)

}