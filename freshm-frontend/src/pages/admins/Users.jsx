import React from "react";

import {
Box,
Typography,
Button,
Card,
CardContent
} from "@mui/material";


export default function Users(){

return(

<Box>


<Typography
variant="h4"
fontWeight={700}
>

Users

</Typography>


<Button
  variant="contained"
  sx={{ mt: 3 }}
>
  + Add User
</Button>

<Box sx={{ height: 24 }} />

<Card>
  <CardContent>
    User Management Table
  </CardContent>
</Card>


</Box>

)

}