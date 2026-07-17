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



const payments=[


{
id:1,
party:"ABC Traders",
type:"Vendor",
amount:"₹50,000",
status:"Pending"
},


{
id:2,
party:"Ramesh Farmer",
type:"Farmer",
amount:"₹25,000",
status:"Paid"
}


];



export default function Payments(){


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

Payments

</Typography>



<Button

variant="contained"

onClick={()=>navigate("/admin/payments/add")}

>

+ Add Payment

</Button>


</Box>




<Card>


<CardContent>


<TableContainer component={Paper}>


<Table>


<TableHead>


<TableRow>


<TableCell>
Party Name
</TableCell>


<TableCell>
Type
</TableCell>


<TableCell>
Amount
</TableCell>


<TableCell>
Status
</TableCell>


</TableRow>


</TableHead>



<TableBody>


{

payments.map((payment)=>(


<TableRow key={payment.id}>


<TableCell>
{payment.party}
</TableCell>


<TableCell>
{payment.type}
</TableCell>


<TableCell>
{payment.amount}
</TableCell>


<TableCell>
{payment.status}
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