import React from "react";

import {
Box,
Grid,
Card,
CardContent,
Typography
} from "@mui/material";


import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


const palette = {
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
};

const data=[

{
month:"Jan",
purchase:40000,
payment:30000
},

{
month:"Feb",
purchase:65000,
payment:50000
},

{
month:"Mar",
purchase:85000,
payment:60000
},

{
month:"Apr",
purchase:45000,
payment:40000
}

];


export default function Reports(){


return(

<Box
  sx={{
    p: 4,
    background: palette.paperDim,
    minHeight: "100vh",
  }}
>

 <Typography
    sx={{
      fontFamily: "'Fraunces', serif",
      fontSize: 34,
      fontWeight: 600,
      color: palette.ink,
    }}
  >
    Reports Dashboard
  </Typography>



<Grid container spacing={3}>


<Grid item xs={12} md={4}>


<Card>

<CardContent>


<Typography color="text.secondary">

Total Purchase

</Typography>


<Typography

variant="h4"

fontWeight={700}

>

₹2,50,000

</Typography>


</CardContent>

</Card>


</Grid>




<Grid item xs={12} md={4}>


<Card>

<CardContent>


<Typography color="text.secondary">

Total Payments

</Typography>


<Typography

variant="h4"

fontWeight={700}

>

₹1,80,000

</Typography>


</CardContent>

</Card>


</Grid>




<Grid item xs={12} md={4}>


<Card>

<CardContent>


<Typography color="text.secondary">

Pending Amount

</Typography>


<Typography

variant="h4"

fontWeight={700}

>

₹70,000

</Typography>


</CardContent>

</Card>


</Grid>


</Grid>





<Box mt={5}>


<Card>


<CardContent>


<Typography

variant="h6"

mb={3}

>

Purchase vs Payment Report

</Typography>



<ResponsiveContainer

height={300}

width="100%"

>


<BarChart data={data}>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="purchase"

fill="#0B8F4D"

/>



<Bar

dataKey="payment"

fill="#D62828"

/>


</BarChart>


</ResponsiveContainer>


</CardContent>


</Card>


</Box>



</Box>


)

}