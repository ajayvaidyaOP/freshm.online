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



const vendors=[


{
id:1,
code:"VEN001",
name:"Shree Traders",
owner:"Rajesh",
mobile:"9876543210",
status:"Active"
},


{
id:2,
code:"VEN002",
name:"Green Agro",
owner:"Amit",
mobile:"9876543211",
status:"Active"
}


];



export default function Vendors(){


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

Vendors

</Typography>



<Button

variant="contained"

onClick={()=>navigate("/admin/vendors/add")}

>

+ Add Vendor

</Button>


</Box>





<Card>


<CardContent>


<TableContainer component={Paper}>


<Table>


<TableHead>


<TableRow>


<TableCell>
Vendor Code
</TableCell>


<TableCell>
Vendor Name
</TableCell>


<TableCell>
Owner
</TableCell>


<TableCell>
Mobile
</TableCell>


<TableCell>
Status
</TableCell>


</TableRow>


</TableHead>




<TableBody>


{

vendors.map((vendor)=>(


<TableRow key={vendor.id}>


<TableCell>
{vendor.code}
</TableCell>


<TableCell>
{vendor.name}
</TableCell>


<TableCell>
{vendor.owner}
</TableCell>


<TableCell>
{vendor.mobile}
</TableCell>


<TableCell>
{vendor.status}
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