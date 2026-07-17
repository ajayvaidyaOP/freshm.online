import React from "react";


import {
Drawer,
List,
ListItem,
ListItemButton,
ListItemIcon,
ListItemText,
Box,
Typography
} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";


const menu=[

{
title:"Dashboard",
icon:<DashboardIcon/>
},

{
title:"Companies",
icon:<BusinessIcon/>
},

{
title:"Admins",
icon:<AdminPanelSettingsIcon/>
},

{
title:"Settings",
icon:<SettingsIcon/>
}

];



export default function SuperAdminSidebar(){


return(

<Drawer

variant="permanent"

sx={{

width:260,

"& .MuiDrawer-paper":{

width:260,

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

<ListItem key={index} disablePadding>


<ListItemButton>


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