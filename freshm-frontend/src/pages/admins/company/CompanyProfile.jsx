






//import React from "react";
import React, { useState, useEffect } from "react";
//import api from "../services/api";
import api from "../../../services/api";
import {

  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid

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

useEffect(() => {
  loadCompany();
}, []);

const loadCompany = async () => {
  try {
    const res = await api.get("/company/1");
    setCompany(res.data);
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

const handleSave = async () => {
  try {
    await api.put("/company/1", company);
    alert("Company details updated successfully.");
  } catch (error) {
    console.error(error);
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
  onChange={handleChange}
/>

            </Grid>


            <Grid item xs={12} md={6}>


              <TextField
  fullWidth
  label="GST Number"
  name="gstNumber"
  value={company.gstNumber}
  onChange={handleChange}
/>
            </Grid>



            <Grid item xs={12} md={6}>


              <TextField
  fullWidth
  label="PAN Number"
  name="panNumber"
  value={company.panNumber}
  onChange={handleChange}
/>
            </Grid>




            <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Mobile Number"
    name="mobile"
    value={company.mobile}
    onChange={handleChange}
  />
</Grid>

<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Email"
    name="email"
    value={company.email}
    onChange={handleChange}
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
  onChange={handleChange}
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


    </Box>


  )

}