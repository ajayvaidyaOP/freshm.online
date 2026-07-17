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



const purchases=[


{
id:1,
purchaseCode:"PUR001",
vendor:"Shree Traders",
article:"Wheat",
qty:"500 Kg",
amount:"₹25000",
status:"Pending"
},


{
id:2,
purchaseCode:"PUR002",
vendor:"Green Agro",
article:"Soybean",
qty:"300 Kg",
amount:"₹18000",
status:"Paid"
}


];



export default function Purchase(){


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

Purchase

</Typography>



<Button

variant="contained"

onClick={()=>navigate("/admin/purchase/add")}

>

+ Receive Material

</Button>


</Box>





<Card>


<CardContent>


<TableContainer component={Paper}>


<Table>


<TableHead>


<TableRow>


<TableCell>
Purchase Code
</TableCell>


<TableCell>
Vendor
</TableCell>


<TableCell>
Article
</TableCell>


<TableCell>
Quantity
</TableCell>


<TableCell>
Amount
</TableCell>


<TableCell>
Payment Status
</TableCell>


</TableRow>


</TableHead>




<TableBody>


{
purchases.map((item)=>(


<TableRow key={item.id}>


<TableCell>
{item.purchaseCode}
</TableCell>


<TableCell>
{item.vendor}
</TableCell>


<TableCell>
{item.article}
</TableCell>


<TableCell>
{item.qty}
</TableCell>


<TableCell>
{item.amount}
</TableCell>


<TableCell>
{item.status}
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