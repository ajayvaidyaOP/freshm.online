




//import React from "react";


//
// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
//import axios from "axios";
import api from "../../../services/api";
// import {
//     Box,
//     Typography,
//     Card,
//     CardContent,
//     Grid,
//     TextField,
//     Button,
//     Stack,
//     Divider,
//     InputAdornment,
// } from "@mui/material";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    Stack,
    Divider,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {
    Person,
    Phone,
    CreditCard,
    Home,
    UploadFile,
    Save,
    Agriculture,
} from "@mui/icons-material";

const palette = {
    forestDeep: "#0B2F22",
    forest: "#0F2E20",
    gold: "#C9A24B",
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

export default function AddFarmer() {
    

    const [formData, setFormData] = useState({
        farmerName: "",
        mobile: "",
        email: "",
        address: "",
        aadharNumber: "",
        panNumber: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        vendorId: null,
    });

    const [aadharFile, setAadharFile] = useState(null);
    const [panFile, setPanFile] = useState(null);
    const [bankPassbookFile, setBankPassbookFile] = useState(null);
    const [vendors, setVendors] = useState([]);
useEffect(() => {
    const loadVendors = async () => {
        try {
            const response = await api.get("/vendors");
            setVendors(response.data);
        } catch (error) {
            console.error("Vendor Load Error:", error);
        }
    };

    loadVendors();
}, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData();

            data.append(
                "farmer",
                new Blob([JSON.stringify(formData)], {
                    type: "application/json",
                })
            );

            if (aadharFile) {
                data.append("aadharFile", aadharFile);
            }

            if (panFile) {
                data.append("panFile", panFile);
            }

            if (bankPassbookFile) {
                data.append("bankPassbookFile", bankPassbookFile);
            }

            const response = await api.post(
    "/farmers",
    data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
);

            alert("Farmer Added Successfully");
            console.log(response.data);

        } catch (error) {
            console.error(error);
            alert("Failed to Add Farmer");
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
            {/* Header */}

            <Typography
                sx={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 34,
                    fontWeight: 600,
                    color: palette.ink,
                }}
            >
                Add Farmer
            </Typography>

            <Typography
                sx={{
                    color: palette.inkSoft,
                    mt: 1,
                    mb: 4,
                }}
            >
                Register a new farmer and upload the required documents.
            </Typography>

            {/* Card */}

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
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                        <Agriculture sx={{ color: palette.gold }} />

                        <Typography
                            sx={{
                                fontFamily: "'Fraunces', serif",
                                fontSize: 24,
                            }}
                        >
                            Farmer Information
                        </Typography>
                    </Stack>

                    <Divider sx={{ mb: 4 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Farmer Name"
                             name="farmerName"
                            value={formData.farmerName}
                            onChange={handleChange}
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
    <FormControl fullWidth>
        <InputLabel>Vendor</InputLabel>

        <Select
            name="vendorId"
            value={formData.vendorId}
            label="Vendor"
            onChange={handleChange}
        >
            {vendors.map((vendor) => (
                <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.vendorName}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
</Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
    fullWidth
    label="Mobile Number"
    name="mobile"
    value={formData.mobile}
    onChange={handleChange}
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
    fullWidth
    label="Aadhar Number"
    name="aadharNumber"
    value={formData.aadharNumber}
    onChange={handleChange}
    sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCard color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
    fullWidth
    label="PAN Number"
    name="panNumber"
    value={formData.panNumber}
    onChange={handleChange}
    sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CreditCard color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
    fullWidth
    multiline
    rows={3}
    label="Address"
    name="address"
    value={formData.address}
    onChange={handleChange}
    sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Home color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: palette.ink,
                                }}
                            >
                                Upload Documents
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                component="label"
                                startIcon={<UploadFile />}
                                variant="outlined"
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
                                Upload Aadhaar
                                <input
    hidden
    type="file"
    onChange={(e) => setAadharFile(e.target.files[0])}
/>
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                component="label"
                                startIcon={<UploadFile />}
                                variant="outlined"
                                sx={{
                                    height: 56,
                                    borderRadius: 2,
                                    borderColor: palette.forest,
                                    color: palette.forest,
                                    textTransform: "none",
                                    fontWeight: 700,
                                }}
                            >
                                Upload PAN
                                <input
    hidden
    type="file"
    onChange={(e) => setPanFile(e.target.files[0])}
/>
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                component="label"
                                startIcon={<UploadFile />}
                                variant="outlined"
                                sx={{
                                    height: 56,
                                    borderRadius: 2,
                                    borderColor: palette.forest,
                                    color: palette.forest,
                                    textTransform: "none",
                                    fontWeight: 700,
                                }}
                            >
                                Upload Bank Statement
                               <input
    hidden
    type="file"
    onChange={(e) => setBankPassbookFile(e.target.files[0])}
/>
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                           <Button
    startIcon={<Save />}
    variant="contained"
    onClick={handleSubmit}
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
                                Generate Farmer Code & Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}