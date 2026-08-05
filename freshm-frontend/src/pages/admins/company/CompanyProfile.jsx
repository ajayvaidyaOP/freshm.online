






// //import React from "react";
// import React, { useState, useEffect } from "react";
// //import api from "../services/api";
// import api from "../../../services/api";
// import {

//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid

// } from "@mui/material";


// const palette = {
//   forest: "#0F2E20",
//   paper: "#FAF6EC",
//   paperDim: "#F3EDDF",
//   ink: "#17231C",
//   inkSoft: "#4B5A50",
//   line: "rgba(201,162,75,0.35)",
// };


// export default function CompanyProfile() {
// const [company, setCompany] = useState({
//   companyName: "",
//   gstNumber: "",
//   panNumber: "",
//   mobile: "",
//   email: "",
//   address: "",
// });
// const [errors, setErrors] = useState({
//   companyName: "",
//   gstNumber: "",
//   panNumber: "",
//   mobile: "",
//   email: "",
//   address: "",
// });
// useEffect(() => {
//   loadCompany();
// }, []);

// const loadCompany = async () => {
//   try {
//     const res = await api.get("/company/1");
//     setCompany(res.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleChange = (e) => {
//   setCompany({
//     ...company,
//     [e.target.name]: e.target.value,
//   });
// };

// const handleSave = async () => {
//   const newErrors = {};

// if (!company.companyName.trim()) {
//   newErrors.companyName = "Company Name is required";
// }

// if (!company.gstNumber.trim()) {
//   newErrors.gstNumber = "GST Number is required";
// }

// if (!company.panNumber.trim()) {
//   newErrors.panNumber = "PAN Number is required";
// }

// if (!company.mobile.trim()) {
//   newErrors.mobile = "Mobile Number is required";
// } else if (!/^[0-9]{10}$/.test(company.mobile)) {
//   newErrors.mobile = "Enter valid Mobile Number";
// }

// if (!company.email.trim()) {
//   newErrors.email = "Email is required";
// } else if (
//   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(company.email)
// ) {
//   newErrors.email = "Enter valid Email";
// }

// if (!company.address.trim()) {
//   newErrors.address = "Address is required";
// }

// setErrors(newErrors);

// if (Object.keys(newErrors).length > 0) {
//   return;
// }
//   try {
//     await api.put("/company/1", company);
//     setErrors({
//   companyName: "",
//   gstNumber: "",
//   panNumber: "",
//   mobile: "",
//   email: "",
//   address: "",
// });
//     alert("Company details updated successfully.");
//   } catch (error) {
//     console.error(error);
//     alert("Failed to update company.");
//   }
// };

//   return (

//     <Box
//       sx={{
//         p: 4,
//         background: palette.paperDim,
//         minHeight: "100vh",
//       }}
//     >

//       <Typography
//         sx={{
//           fontFamily: "'Fraunces', serif",
//           fontSize: 34,
//           fontWeight: 600,
//           color: palette.ink,
//         }}
//       >
//         Company Profile
//       </Typography>



//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: 4,
//           background: palette.paper,
//           border: `1px solid ${palette.line}`,
//           boxShadow: "0 25px 50px rgba(0,0,0,.08)",
//         }}
//       >

//         <CardContent sx={{ p: 4 }}>


//           <Typography
//             sx={{
//               fontFamily: "'Fraunces', serif",
//               fontSize: 24,
//               mb: 3,
//             }}
//           >
//             Company Details
//           </Typography>

//           <Grid container spacing={3}>


//             <Grid item xs={12} md={6}>


// <TextField
//   fullWidth
//   label="Company Name"
//   name="companyName"
//   value={company.companyName}
//   required
//   error={!!errors.companyName}
//   helperText={errors.companyName}
//   onChange={(e) => {
//     handleChange(e);

//     setErrors({
//       ...errors,
//       companyName: "",
//     });
//   }}
// />

//             </Grid>


//             <Grid item xs={12} md={6}>


//               <TextField
//   fullWidth
//   label="GST Number"
//   name="gstNumber"
//   value={company.gstNumber}
//   required
// error={!!errors.gstNumber}
// helperText={errors.gstNumber}
// onChange={(e) => {
//   handleChange(e);
// setErrors({
//   ...errors,
//   gstNumber: "",
// });
  
// }}
// />
//             </Grid>



//             <Grid item xs={12} md={6}>


//               <TextField
//   fullWidth
//   label="PAN Number"
//   name="panNumber"
//   value={company.panNumber}
//   required
// error={!!errors.panNumber}
// helperText={errors.panNumber}
//   onChange={(e) => {
//   handleChange(e);

//   setErrors({
//     ...errors,
//     panNumber: "",
//   });
// }}
// />
//             </Grid>




//             <Grid item xs={12} md={6}>
//   <TextField
//     fullWidth
//     label="Mobile Number"
//     name="mobile"
//     value={company.mobile}
//     required
// error={!!errors.mobile}
// helperText={errors.mobile}
// onChange={(e) => {
//   handleChange(e);

//   setErrors({
//     ...errors,
//     mobile: "",
//   });
// }}
    
//   />
// </Grid>

// <Grid item xs={12} md={6}>
//   <TextField
//     fullWidth
//     label="Email"
//     name="email"
//     value={company.email}
//     required
// error={!!errors.email}
// helperText={errors.email}
// onChange={(e) => {
//   handleChange(e);

//   setErrors({
//     ...errors,
//     email: "",
//   });
// }}
//   />
// </Grid>

            



//             <Grid item xs={12}>


//               <TextField
//   fullWidth
//   multiline
//   rows={3}
//   label="Company Address"
//   name="address"
//   value={company.address}
//   required
//   error={!!errors.address}
//   helperText={errors.address}
//   onChange={(e) => {
//     handleChange(e);

//     setErrors({
//       ...errors,
//       address: "",
//     });
//   }}
// />
// </Grid>


            



//             <Grid item xs={12}>


//               <Button
//   variant="contained"
//   onClick={handleSave}
//                 sx={{
//                   px: 3,
//                   height: 50,
//                   borderRadius: 3,
//                   textTransform: "none",
//                   fontWeight: 700,
//                   background: "linear-gradient(135deg,#0F2E20,#0B2F22)",

//                   "&:hover": {
//                     background: "linear-gradient(135deg,#081F16,#0B2F22)",
//                   },
//                 }}
//               >
//                 Save Company Details
//               </Button>


//             </Grid>


//           </Grid>


//         </CardContent>


//       </Card>


//     </Box>


//   )

// }












import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


const palette = {
  forest: "#0F2E20",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  line: "rgba(201,162,75,0.35)",
};


export default function CompanyProfile() {
const [company, setCompany] = useState({
  companyName: "",
  gstNumber: "",
  panNumber: "",
  mobile: "",
  email: "",
  address: "",
});
const [errors, setErrors] = useState({
  
  companyName: "",
  gstNumber: "",
  panNumber: "",
  mobile: "",
  email: "",
  address: "",
});
const [companies, setCompanies] = useState([]);

const loadCompanies = async () => {
  try {
    const response = await api.get("/company");
    
    setCompanies(response.data);
  } catch (error) {
    console.error(error);
  }
};
const handleChange = (e) => {
  setCompany({
    ...company,
    [e.target.name]: e.target.value,
  });
};
useEffect(() => {
  loadCompanies();
}, []);
const handleSave = async () => {
  const newErrors = {};

if (!company.companyName.trim()) {
  newErrors.companyName = "Company Name is required";
}

if (!company.gstNumber.trim()) {
  newErrors.gstNumber = "GST Number is required";
}

if (!company.panNumber.trim()) {
  newErrors.panNumber = "PAN Number is required";
}

if (!company.mobile.trim()) {
  newErrors.mobile = "Mobile Number is required";
} else if (!/^[0-9]{10}$/.test(company.mobile)) {
  newErrors.mobile = "Enter valid Mobile Number";
}

if (!company.email.trim()) {
  newErrors.email = "Email is required";
} else if (
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(company.email)
) {
  newErrors.email = "Enter valid Email";
}

if (!company.address.trim()) {
  newErrors.address = "Address is required";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}
  try {
    await api.post("/company", company);
    await loadCompanies();
    setErrors({
  companyName: "",
  gstNumber: "",
  panNumber: "",
  mobile: "",
  email: "",
  address: "",
});
setCompany({
  companyName: "",
  gstNumber: "",
  panNumber: "",
  mobile: "",
  email: "",
  address: "",
});
    alert("Company details updated successfully.");
  } catch (error) {
  console.error("Error:", error);
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);

  alert("Failed to update company.");
}
};

  return (

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
        Company Profile
      </Typography>



      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: palette.paper,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 25px 50px rgba(0,0,0,.08)",
        }}
      >

        <CardContent sx={{ p: 4 }}>


          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontSize: 24,
              mb: 3,
            }}
          >
            Company Details
          </Typography>

          <Grid container spacing={3}>


            <Grid item xs={12} md={6}>


<TextField
  fullWidth
  label="Company Name"
  name="companyName"
  value={company.companyName}
  required
  error={!!errors.companyName}
  helperText={errors.companyName}
  onChange={(e) => {
    handleChange(e);

    setErrors({
      ...errors,
      companyName: "",
    });
  }}
/>

            </Grid>


            <Grid item xs={12} md={6}>


              <TextField
  fullWidth
  label="GST Number"
  name="gstNumber"
  value={company.gstNumber}
  required
error={!!errors.gstNumber}
helperText={errors.gstNumber}
onChange={(e) => {
  handleChange(e);
setErrors({
  ...errors,
  gstNumber: "",
});
  
}}
/>
            </Grid>



            <Grid item xs={12} md={6}>


              <TextField
  fullWidth
  label="PAN Number"
  name="panNumber"
  value={company.panNumber}
  required
error={!!errors.panNumber}
helperText={errors.panNumber}
  onChange={(e) => {
  handleChange(e);

  setErrors({
    ...errors,
    panNumber: "",
  });
}}
/>
            </Grid>




            <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Mobile Number"
    name="mobile"
    value={company.mobile}
    required
error={!!errors.mobile}
helperText={errors.mobile}
onChange={(e) => {
  handleChange(e);

  setErrors({
    ...errors,
    mobile: "",
  });
}}
    
  />
</Grid>

<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Email"
    name="email"
    value={company.email}
    required
error={!!errors.email}
helperText={errors.email}
onChange={(e) => {
  handleChange(e);

  setErrors({
    ...errors,
    email: "",
  });
}}
  />
</Grid>

            



            <Grid item xs={12}>


              <TextField
  fullWidth
  multiline
  rows={3}
  label="Company Address"
  name="address"
  value={company.address}
  required
  error={!!errors.address}
  helperText={errors.address}
  onChange={(e) => {
    handleChange(e);

    setErrors({
      ...errors,
      address: "",
    });
  }}
/>
</Grid>


            



            <Grid item xs={12}>


              <Button
  variant="contained"
  onClick={handleSave}
                sx={{
                  px: 3,
                  height: 50,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  background: "linear-gradient(135deg,#0F2E20,#0B2F22)",

                  "&:hover": {
                    background: "linear-gradient(135deg,#081F16,#0B2F22)",
                  },
                }}
              >
                Save Company Details
              </Button>


            </Grid>


          </Grid>


        </CardContent>


      </Card>

<Card
  elevation={0}
  sx={{
    mt: 4,
    borderRadius: 4,
    background: palette.paper,
    border: `1px solid ${palette.line}`,
    boxShadow: "0 25px 50px rgba(0,0,0,.08)",
  }}
>
  <CardContent>
    <Typography
      sx={{
        fontSize: 24,
        fontWeight: 600,
        mb: 3,
      }}
    >
      Company List
    </Typography>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Company Name</b></TableCell>
            <TableCell><b>GST</b></TableCell>
            <TableCell><b>PAN</b></TableCell>
            <TableCell><b>Mobile</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Address</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {companies.length > 0 ? (
            companies.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.companyName}</TableCell>
                <TableCell>{item.gstNumber}</TableCell>
                <TableCell>{item.panNumber}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Company Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>
</Card>
    </Box>


  )

}