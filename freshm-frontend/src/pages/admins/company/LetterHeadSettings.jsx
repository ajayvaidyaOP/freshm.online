


// import React from "react";


// import {

//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button

// } from "@mui/material";

// const palette = {
//   forest: "#0F2E20",
//   paper: "#FAF6EC",
//   paperDim: "#F3EDDF",
//   ink: "#17231C",
//   inkSoft: "#4B5A50",
//   line: "rgba(201,162,75,0.35)",
// };
import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  getLetterHeads,
  createLetterHead,
  updateLetterHead,
} from "../../../services/letterHeadService";

const palette = {
  forest: "#0F2E20",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  line: "rgba(201,162,75,0.35)",
};

export default function LetterHeadSettings() {

  const [letterHeadId, setLetterHeadId] = useState(null);

  const [formData, setFormData] = useState({
    companyLogoUrl: "",
    headerTitle: "",
    footerText: "",
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadLetterHead = async () => {

    
    try {
      setLoading(true);

      const response = await getLetterHeads();

      if (response.data) {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        if (data) {
          setLetterHeadId(data.id);

          setFormData({
            companyLogoUrl: data.companyLogoUrl || "",
            headerTitle: data.headerTitle || "",
            footerText: data.footerText || "",
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 


const handleSave = async () => {
  try {
    setLoading(true);

    if (letterHeadId) {
      await updateLetterHead(letterHeadId, formData);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Letter Head updated successfully",
      });
    } else {
      const response = await createLetterHead(formData);

      if (response.data?.id) {
        setLetterHeadId(response.data.id);
      }

      setSnackbar({
        open: true,
        severity: "success",
        message: "Letter Head saved successfully",
      });
    }
  } catch (error) {
    console.error(error);

    setSnackbar({
      open: true,
      severity: "error",
      message: "Failed to save Letter Head",
    });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadLetterHead();
}, []);

  

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
        Letter Head Settings
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
            Company Header
          </Typography>



          <TextField
  fullWidth
  label="Company Logo URL"
  name="companyLogoUrl"
  value={formData.companyLogoUrl}
  onChange={handleChange}
  margin="normal"
/>




          <TextField
  fullWidth
  label="Header Title"
  name="headerTitle"
  value={formData.headerTitle}
  onChange={handleChange}
  margin="normal"
/>


          <TextField
  fullWidth
  label="Footer Text"
  name="footerText"
  value={formData.footerText}
  onChange={handleChange}
  margin="normal"
/>




         <Button
  variant="contained"
  onClick={handleSave}
  disabled={loading}

            sx={{
              mt: 2,
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

            Save Letter Head

          </Button>



        </CardContent>


      </Card>




      <Box mt={4}>


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
                mb: 2,
              }}
            >
              Preview
            </Typography>

            <hr />


            <Typography

              variant="h5"

              fontWeight={700}

            >

              GREEN AGRO PVT LTD

            </Typography>


            <Typography>

              GST: XXXXXXXX

            </Typography>


            <Typography>

              Nagpur Maharashtra

            </Typography>



          </CardContent>


        </Card>


      </Box>

<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() =>
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }
>
  <Alert
    severity={snackbar.severity}
    onClose={() =>
      setSnackbar({
        ...snackbar,
        open: false,
      })
    }
  >
    {snackbar.message}
  </Alert>
</Snackbar>

    </Box>


  )

}