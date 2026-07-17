import React from "react";


import {

Box,
Typography,
Card,
CardContent,
Button,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
TableContainer,
Paper

} from "@mui/material";


import {
useNavigate
} from "react-router-dom";



const articles=[

{
id:1,
name:"Wheat",
unit:"KG",
rate:"₹40"
},

{
id:2,
name:"Rice",
unit:"KG",
rate:"₹55"
},

{
id:3,
name:"Cotton",
unit:"Quintal",
rate:"₹7000"
}

];



export default function Articles(){


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

Articles

</Typography>



<Button

variant="contained"

onClick={()=>navigate("/admin/articles/add")}

>

+ Add Article

</Button>



</Box>



<Card>


<CardContent>


<TableContainer component={Paper}>


<Table>


<TableHead>


<TableRow>


<TableCell>
Article Name
</TableCell>


<TableCell>
Unit
</TableCell>


<TableCell>
Rate
</TableCell>


</TableRow>


</TableHead>




<TableBody>


{

articles.map((item)=>(


<TableRow key={item.id}>


<TableCell>

{item.name}

</TableCell>


<TableCell>

{item.unit}

</TableCell>


<TableCell>

{item.rate}

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