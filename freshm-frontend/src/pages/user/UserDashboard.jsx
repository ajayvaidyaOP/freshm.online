import React from "react";


import {

Box,
Typography,
Grid,
Card,
CardContent

} from "@mui/material";



export default function UserDashboard(){


const cards=[

{
title:"Material Received",
value:"2500 Kg"
},

{
title:"Pending Payment",
value:"₹45000"
},

{
title:"Completed Payment",
value:"₹120000"
}

];



return(

<Box>


<Typography

variant="h4"

fontWeight={700}

mb={3}

>

User Dashboard

</Typography>




<Grid container spacing={3}>


{

cards.map((item,index)=>(


<Grid

item

xs={12}

md={4}

key={index}

>


<Card>


<CardContent>


<Typography>

{item.title}

</Typography>


<Typography

variant="h5"

fontWeight={700}

>

{item.value}

</Typography>


</CardContent>


</Card>


</Grid>


))


}


</Grid>



</Box>

)

}