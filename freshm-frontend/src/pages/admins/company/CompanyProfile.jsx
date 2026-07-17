import React from "react";

import {

Box,
Card,
CardContent,
Typography,
TextField,
Button,
Grid

} from "@mui/material";


export default function CompanyProfile(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Company Profile

</Typography>



<Card>


<CardContent>


<Grid container spacing={3}>


<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Company Name"

/>


</Grid>


<Grid item xs={12} md={6}>


<TextField

fullWidth

label="GST Number"

/>


</Grid>



<Grid item xs={12} md={6}>


<TextField

fullWidth

label="PAN Number"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Mobile Number"

/>


</Grid>



<Grid item xs={12}>


<TextField

fullWidth

multiline

rows={3}

label="Company Address"

/>


</Grid>



<Grid item xs={12}>


<Button

variant="contained"

>

Save Company Details

</Button>


</Grid>


</Grid>


</CardContent>


</Card>


</Box>


)

}