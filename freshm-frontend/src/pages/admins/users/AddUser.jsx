import React, { useState } from "react";

import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Stack,
  Divider,
  InputAdornment,
} from "@mui/material";

import {
  Person,
  Email,
  Phone,
  Lock,
  Badge,
  Autorenew,
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

export default function AddUser() {
  const [userCode, setUserCode] = useState("");

  const generateCode = () => {
    const code = "USR" + Math.floor(1000 + Math.random() * 9000);
    setUserCode(code);
  };

  return (
    <Box
      sx={{
        p: 4,
        background: palette.paperDim,
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontSize: 34,
          fontWeight: 600,
          color: palette.ink,
        }}
      >
        Create User
      </Typography>

      <Typography
        sx={{
          color: palette.inkSoft,
          mt: 1,
          mb: 4,
        }}
      >
        Add a new employee to the FreshM ERP platform.
      </Typography>

      {/* Form Card */}

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
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            mb={3}
          >
            <Badge sx={{ color: palette.gold }} />

            <Typography
              sx={{
                fontFamily: "'Fraunces', serif",
                fontSize: 24,
              }}
            >
              User Information
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Role"
                sx={fieldSx}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Autorenew />}
                onClick={generateCode}
                sx={{
                  height: 56,
                  borderRadius: 2,
                  borderColor: palette.forest,
                  color: palette.forest,
                  textTransform: "none",
                  fontWeight: 700,

                  "&:hover": {
                    borderColor: palette.forestDeep,
                    background: "#f8f8f8",
                  },
                }}
              >
                Generate User Code
              </Button>

              {userCode && (
                <Typography
                  sx={{
                    mt: 2,
                    color: palette.rust,
                    fontWeight: 700,
                  }}
                >
                  User Code : {userCode}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                startIcon={<Save />}
                variant="contained"
                sx={{
                  mt: 2,
                  px: 5,
                  height: 52,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg,#0F2E20,#0B2F22)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#081F16,#0B2F22)",
                  },
                }}
              >
                Save User
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}