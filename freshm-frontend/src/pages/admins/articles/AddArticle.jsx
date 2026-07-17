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



export default function AddArticle(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Add Article

</Typography>




<Card>


<CardContent>


<Grid container spacing={3}>


<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Article Name"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Unit"

placeholder="KG / TON / QUINTAL"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="Purchase Rate"

/>


</Grid>




<Grid item xs={12} md={6}>


<TextField

fullWidth

label="HSN Code"

/>


</Grid>



<Grid item xs={12}>


<Button

variant="contained"

>

Save Article

</Button>


</Grid>



</Grid>


</CardContent>


</Card>


</Box>


)

}