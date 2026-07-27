// import React, { useState } from "react";
// import { createProduct } from "../../../services/productService";

// import {

// Box,
// Card,
// CardContent,
// Typography,
// Grid,
// TextField,
// Button

// } from "@mui/material";



// export default function AddArticle(){
//     const [formData, setFormData] = useState({
//   productName: "",
//   articleName: "",
//   size: "",
//   destination: "",
//   description: "",
// });
// const handleChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// };

// const handleSave = async () => {
//   try {
//     await createProduct(formData);

//     alert("Article Saved Successfully!");

//     setFormData({
//       productName: "",
//       articleName: "",
//       size: "",
//       destination: "",
//       description: "",
//     });

//   } catch (error) {
//     console.error(error);
//     alert("Failed to Save Article");
//   }
// };


// return(

// <Box>


// <Typography

// variant="h4"

// fontWeight={700}

// mb={3}

// >

// Add Article

// </Typography>




// <Card>


// <CardContent>


// <Grid container spacing={3}>


// <Grid item xs={12} md={6}>

// <TextField
//   fullWidth
//   label="Product Name"
//   name="productName"
//   value={formData.productName}
//   onChange={handleChange}
// />

// </Grid>




// <Grid item xs={12} md={6}>


// <TextField
//   fullWidth
//   label="Article Name"
//   name="articleName"
//   value={formData.articleName}
//   onChange={handleChange}
// />


// </Grid>




// <Grid item xs={12} md={6}>


// <TextField
//   fullWidth
//   label="Size"
//   name="size"
//   value={formData.size}
//   onChange={handleChange}
// />

// </Grid>




// <Grid item xs={12} md={6}>


// <TextField
//   fullWidth
//   label="Destination"
//   name="destination"
//   value={formData.destination}
//   onChange={handleChange}
// />


// </Grid>

// <Grid item xs={12}>
//   <TextField
//     fullWidth
//     multiline
//     rows={3}
//     label="Description"
//     name="description"
//     value={formData.description}
//     onChange={handleChange}
//   />
// </Grid>



// <Grid item xs={12}>


// <Button
//   variant="contained"
//   onClick={handleSave}
// >
//   Save Article
// </Button>


// </Grid>



// </Grid>


// </CardContent>


// </Card>


// </Box>


// )

// }





import React, { useState } from "react";
import { createProduct } from "../../../services/productService";

import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  InputAdornment,
} from "@mui/material";

import {
  Inventory2,
  Category,
  Straighten,
  Place,
  Description,
  Save,
} from "@mui/icons-material";


const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  sage: "#7E9A88",
  line: "rgba(201,162,75,0.35)",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fff",
    "& fieldset": {
      borderColor: "rgba(0,0,0,.12)",
    },
    "&:hover fieldset": {
      borderColor: palette.sage,
    },
    "&.Mui-focused fieldset": {
      borderColor: palette.forest,
      borderWidth: 1.5,
    },
  },
};

export default function AddArticle(){
    const [formData, setFormData] = useState({
  productName: "",
  articleName: "",
  size: "",
  destination: "",
  description: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSave = async () => {
  try {
    await createProduct(formData);

    alert("Article Saved Successfully!");

    setFormData({
      productName: "",
      articleName: "",
      size: "",
      destination: "",
      description: "",
    });

  } catch (error) {
    console.error(error);
    alert("Failed to Save Article");
  }
};


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
  Add Article
</Typography>

<Typography
  sx={{
    color: palette.inkSoft,
    mt: 1,
    mb: 4,
  }}
>
  Create and manage article information.
</Typography>



<Card
  elevation={0}
  sx={{
    borderRadius: 4,
    background: palette.paper,
    border: `1px solid ${palette.line}`,
    boxShadow: "0 20px 50px rgba(11,47,34,.08)",
  }}
>
  <CardContent sx={{ p: 4 }}>
<Grid container spacing={3}>


<Grid item xs={12} md={6}>

<TextField
  fullWidth
  label="Product Name"
  name="productName"
  value={formData.productName}
  onChange={handleChange}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Inventory2 color="action" />
      </InputAdornment>
    ),
  }}
/>

</Grid>




<Grid item xs={12} md={6}>


<TextField
  fullWidth
  label="Article Name"
  name="articleName"
  value={formData.articleName}
  onChange={handleChange}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Category color="action" />
      </InputAdornment>
    ),
  }}
/>


</Grid>




<Grid item xs={12} md={6}>


<TextField
  fullWidth
  label="Size"
  name="size"
  value={formData.size}
  onChange={handleChange}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Straighten color="action" />
      </InputAdornment>
    ),
  }}
/>
</Grid>




<Grid item xs={12} md={6}>


<TextField
  fullWidth
  label="Destination"
  name="destination"
  value={formData.destination}
  onChange={handleChange}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Place color="action" />
      </InputAdornment>
    ),
  }}
/>

</Grid>

<Grid item xs={12}>
  <TextField
  fullWidth
  multiline
  rows={4}
  label="Description"
  name="description"
  value={formData.description}
  onChange={handleChange}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Description color="action" />
      </InputAdornment>
    ),
  }}
/>
</Grid>



<Grid item xs={12}>


<Button
  startIcon={<Save />}
  variant="contained"
  onClick={handleSave}
  sx={{
    mt: 2,
    px: 5,
    height: 52,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 700,
    background: "linear-gradient(135deg,#0F2E20,#0B2F22)",
    "&:hover": {
      background: "linear-gradient(135deg,#081F16,#0B2F22)",
    },
  }}
>
  Save Article
</Button>


</Grid>



</Grid>


</CardContent>


</Card>


</Box>


)

}















