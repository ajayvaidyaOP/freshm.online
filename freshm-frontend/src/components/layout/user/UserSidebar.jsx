import React from "react";

import {
Drawer,
Box,
Typography,
List,
ListItem,
ListItemButton,
ListItemIcon,
ListItemText
} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptIcon from "@mui/icons-material/Receipt";


import {
useNavigate
} from "react-router-dom";



const menu=[

{
title:"Dashboard",
path:"/user/dashboard",
icon:<DashboardIcon/>
},

{
title:"Received Material",
path:"/user/material",
icon:<InventoryIcon/>
},


{
title:"Payments",
path:"/user/payments",
icon:<PaymentsIcon/>
},


{
title:"Invoices",
path:"/user/invoices",
icon:<ReceiptIcon/>
}

];



export default function UserSidebar(){


const navigate=useNavigate();



return(

<Drawer

variant="permanent"

sx={{

width:240,


"& .MuiDrawer-paper":{

width:240,

background:"#0E3B2E",

color:"#fff"

}

}}

>


<Box

height={90}

display="flex"

alignItems="center"

justifyContent="center"

>


<Typography

variant="h5"

fontWeight={700}

>

GREEN ERP

</Typography>


</Box>




<List>


{

menu.map((item,index)=>(


<ListItem

key={index}

disablePadding

>


<ListItemButton

onClick={()=>navigate(item.path)}

>


<ListItemIcon

sx={{color:"#fff"}}

>

{item.icon}

</ListItemIcon>



<ListItemText

primary={item.title}

/>



</ListItemButton>



</ListItem>


))

}



</List>


</Drawer>


)

}