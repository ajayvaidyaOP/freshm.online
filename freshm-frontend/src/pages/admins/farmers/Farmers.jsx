import React from "react";


import {

Box,
Typography,
Button,
Card,
CardContent,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper

} from "@mui/material";


import {
useNavigate
} from "react-router-dom";



const farmers=[


{
id:1,
code:"FAR001",
name:"Ramesh Patil",
mobile:"9876543210",
village:"Nagpur",
status:"Active"
},


{
id:2,
code:"FAR002",
name:"Suresh Kumar",
mobile:"9876543211",
village:"Wardha",
status:"Active"
}


];



export default function Farmers(){


const navigate=useNavigate();



return(

<Box>


<Box

display="flex"

justifyContent="space-between"

mb={3}

>


<Typography

variant="h4"

fontWeight={700}

>

Farmers

</Typography>



<Button

variant="contained"

onClick={()=>navigate("/admin/farmers/add")}

>

+ Add Farmer

</Button>


</Box>




<Card>


<CardContent>


<TableContainer component={Paper}>


<Table>


<TableHead>


<TableRow>


<TableCell>
Farmer Code
</TableCell>


<TableCell>
Name
</TableCell>


<TableCell>
Mobile
</TableCell>


<TableCell>
Village
</TableCell>


<TableCell>
Status
</TableCell>


</TableRow>


</TableHead>



<TableBody>


{

farmers.map((farmer)=>(


<TableRow key={farmer.id}>


<TableCell>
{farmer.code}
</TableCell>


<TableCell>
{farmer.name}
</TableCell>


<TableCell>
{farmer.mobile}
</TableCell>


<TableCell>
{farmer.village}
</TableCell>


<TableCell>
{farmer.status}
</TableCell>


</TableRow>


))


}



</TableBody>


</Table>


</TableContainer>


</CardContent>


</Card>



</Box>

)

}