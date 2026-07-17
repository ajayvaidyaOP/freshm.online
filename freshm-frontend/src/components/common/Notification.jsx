import React from "react";

import {
Snackbar,
Alert
} from "@mui/material";


export default function Notification({open,message}){


return(

<Snackbar

open={open}

autoHideDuration={3000}

>

<Alert

severity="success"

>

{message}

</Alert>


</Snackbar>


)

}