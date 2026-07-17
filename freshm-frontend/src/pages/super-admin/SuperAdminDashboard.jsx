import React from "react";

import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";


import BusinessIcon from "@mui/icons-material/Business";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import AgricultureIcon from "@mui/icons-material/Agriculture";


const cards = [

{
    title:"Total Companies",
    value:"25",
    icon:<BusinessIcon/>,
    color:"#0B8F4D"
},

{
    title:"Total Admins",
    value:"25",
    icon:<AdminPanelSettingsIcon/>,
    color:"#D62828"
},

{
    title:"Total Users",
    value:"150",
    icon:<PeopleIcon/>,
    color:"#1565C0"
},

{
    title:"Total Farmers",
    value:"3500",
    icon:<AgricultureIcon/>,
    color:"#2E7D32"
}

];


const companies=[

{
    id:1,
    name:"Fresh Agro Pvt Ltd",
    admin:"Rahul",
    users:15,
    status:"Active"
},

{
    id:2,
    name:"Green Farm Ltd",
    admin:"Amit",
    users:20,
    status:"Active"
},

{
    id:3,
    name:"Dubai Export Co",
    admin:"Suresh",
    users:10,
    status:"Inactive"
}

];


export default function SuperAdminDashboard(){


return (

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

Super Admin Dashboard

</Typography>


<Button
variant="contained"
color="primary"
>

+ Create Admin

</Button>


</Box>



<Grid container spacing={3}>


{
cards.map((item,index)=>(


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

{item.title}

</Typography>


<Typography
variant="h4"
fontWeight={700}
>

{item.value}

</Typography>


</Box>


<Box

sx={{

background:item.color,

color:"#fff",

width:55,

height:55,

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center"

}}

>

{item.icon}

</Box>


</Box>


</CardContent>


</Card>


</Grid>


))

}


</Grid>





<Box mt={5}>


<Typography
variant="h5"
mb={2}
fontWeight={600}
>

Companies

</Typography>



<TableContainer component={Paper}>


<Table>


<TableHead>

<TableRow>

<TableCell>
Company Name
</TableCell>

<TableCell>
Admin
</TableCell>

<TableCell>
Users
</TableCell>

<TableCell>
Status
</TableCell>


</TableRow>

</TableHead>



<TableBody>


{
companies.map((company)=>(


<TableRow key={company.id}>


<TableCell>
{company.name}
</TableCell>


<TableCell>
{company.admin}
</TableCell>


<TableCell>
{company.users}
</TableCell>


<TableCell>

{company.status}

</TableCell>


</TableRow>


))

}


</TableBody>


</Table>


</TableContainer>


</Box>


</Box>

)

}