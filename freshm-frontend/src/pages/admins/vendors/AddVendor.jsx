import React,{useState} from "react";


import {

Box,
Card,
CardContent,
Typography,
TextField,
Button

} from "@mui/material";



export default function AddVendor(){


const [code,setCode]=useState("");



function generateCode(){


const random =
Math.floor(
Math.random()*9000
)+1000;


setCode(
"VEN-"+random
);


}



return(


<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

Add Vendor

</Typography>




<Card>


<CardContent>



<TextField

fullWidth

label="Vendor Company Name"

margin="normal"

/>




<TextField

fullWidth

label="Contact Person"

margin="normal"

/>




<TextField

fullWidth

label="GST Number"

margin="normal"

/>





<TextField

fullWidth

label="Vendor Code"

value={code}

margin="normal"

InputProps={{

readOnly:true

}}


/>



<Button

variant="contained"

onClick={generateCode}

sx={{mt:2}}

>

Generate Vendor Code


</Button>




</CardContent>


</Card>


</Box>


)

}