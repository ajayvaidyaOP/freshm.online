import React from "react";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";


import PeopleIcon from "@mui/icons-material/People";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";


const cards = [

{
    title:"Total Vendors",
    value:"325",
    icon:<PeopleIcon/>,
    color:"#0B8F4D"
},

{
    title:"Total Farmers",
    value:"1250",
    icon:<AgricultureIcon/>,
    color:"#2E7D32"
},

{
    title:"Today's Purchase",
    value:"₹4,25,000",
    icon:<ShoppingCartIcon/>,
    color:"#D62828"
},

{
    title:"Pending Payments",
    value:"₹2,18,500",
    icon:<PaymentsIcon/>,
    color:"#F9A825"
}

];


const chartData=[

{
month:"Jan",
purchase:4000
},

{
month:"Feb",
purchase:6500
},

{
month:"Mar",
purchase:5000
},

{
month:"Apr",
purchase:8500
},

{
month:"May",
purchase:7200
},

];


export default function Dashboard(){


return (

<Box>


<Typography
variant="h4"
mb={3}
>

Dashboard

</Typography>



<Grid container spacing={3}>


{
cards.map((card,index)=>(


<Grid
item
xs={12}
sm={6}
md={3}
key={index}
>


<Card>


<CardContent>


<Box

display="flex"

justifyContent="space-between"

alignItems="center"

>


<Box>

<Typography
color="text.secondary"
>

{card.title}

</Typography>


<Typography
variant="h5"
mt={1}
fontWeight={700}
>

{card.value}

</Typography>


</Box>


<Box

sx={{

background:card.color,

color:"#fff",

width:50,

height:50,

display:"flex",

alignItems:"center",

justifyContent:"center",

borderRadius:"50%"

}}

>

{card.icon}

</Box>



</Box>


</CardContent>


</Card>


</Grid>


))

}


</Grid>





<Box mt={4}>


<Card>


<CardContent>


<Typography
variant="h6"
mb={3}
>

Monthly Purchase Analytics

</Typography>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={chartData}>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="purchase"

fill="#0B8F4D"

radius={[8,8,0,0]}

/>


</BarChart>


</ResponsiveContainer>



</CardContent>


</Card>


</Box>


</Box>

)

}