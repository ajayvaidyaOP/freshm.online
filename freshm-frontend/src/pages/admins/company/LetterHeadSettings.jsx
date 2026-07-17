import React from "react";


import {

Box,
Card,
CardContent,
Typography,
TextField,
Button

} from "@mui/material";



export default function LetterHeadSettings(){


return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Letter Head Settings

</Typography>




<Card>


<CardContent>



<Typography

variant="h6"

mb={2}

>

Company Header

</Typography>



<TextField

fullWidth

label="Company Logo URL"

margin="normal"

/>




<TextField

fullWidth

label="Header Title"

margin="normal"

/>




<TextField

fullWidth

label="Footer Text"

margin="normal"

/>




<Button

variant="contained"

sx={{mt:2}}

>

Save Letter Head

</Button>



</CardContent>


</Card>




<Box mt={4}>


<Card>


<CardContent>


<Typography

variant="h6"

>

Preview

</Typography>


<hr/>


<Typography

variant="h5"

fontWeight={700}

>

GREEN AGRO PVT LTD

</Typography>


<Typography>

GST: XXXXXXXX

</Typography>


<Typography>

Nagpur Maharashtra

</Typography>



</CardContent>


</Card>


</Box>



</Box>


)

}