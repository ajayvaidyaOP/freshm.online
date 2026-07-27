








// import React from "react";
import { getAllFarmers } from "../../../services/farmerService";


import {

    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

    Paper,
    Avatar,
    Chip,
    Stack,

} from "@mui/material";


import {
    Agriculture,
    Add,
    Phone,
    LocationOn,
} from "@mui/icons-material";




import {
    useNavigate
} from "react-router-dom";



import React, { useEffect, useState } from "react";

const palette = {
    forestDeep: "#0B2F22",
    forest: "#0F2E20",
    gold: "#C9A24B",
    goldLight: "#E7CD8B",
    paper: "#FAF6EC",
    paperDim: "#F3EDDF",
    ink: "#17231C",
    inkSoft: "#4B5A50",
    line: "rgba(201,162,75,0.35)",
};


export default function Farmers() {


    const navigate = useNavigate();

    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        loadFarmers();
    }, []);

    const loadFarmers = async () => {
        try {
            const data = await getAllFarmers();
            console.log(data);
            setFarmers(data);
        } catch (err) {
            console.error(err);
        }
    };



    // Dummmy Data

    // const [farmers, setFarmers] = useState([
    //   {
    //     id: 1,
    //     code: "F001",
    //     name: "Ramesh Patil",
    //     mobile: "9876543210",
    //     village: "Pune",
    //     status: "ACTIVE",
    //   },
    //   {
    //     id: 2,
    //     code: "F002",
    //     name: "Suresh Shinde",
    //     mobile: "9988776655",
    //     village: "Nashik",
    //     status: "ACTIVE",
    //   },
    //   {
    //     id: 3,
    //     code: "F003",
    //     name: "Mahesh Jadhav",
    //     mobile: "9123456789",
    //     village: "Satara",
    //     status: "INACTIVE",
    //   },
    // ]);




    return (

        <Box
            sx={{
                p: 4,
                background: palette.paperDim,
                minHeight: "100vh",
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "'Fraunces', serif",
                            fontSize: 34,
                            fontWeight: 600,
                            color: palette.ink,
                        }}
                    >
                        Farmers
                    </Typography>

                    <Typography
                        sx={{
                            color: palette.inkSoft,
                            mt: 1,
                        }}
                    >
                        Manage all registered farmers.
                    </Typography>
                </Box>

                <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => navigate("/admin/farmers/add")}
                    sx={{
                        px: 3,
                        height: 50,
                        borderRadius: 3,
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
                    Add Farmer
                </Button>
            </Box>



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



                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: "1px solid rgba(0,0,0,.08)",
                        }}
                    >

                        <Table>


                            <TableHead>


                                <TableRow
                                    sx={{
                                        background: palette.paperDim,
                                    }}
                                >

                                    <TableCell>
                                        Farmer Code
                                    </TableCell>


                                    <TableCell>
                                        Name
                                    </TableCell>


                                    <TableCell>
                                        Mobile
                                    </TableCell>


                                    <TableCell>
                                        Address
                                    </TableCell>


                                    <TableCell>
                                        Status
                                    </TableCell>


                                </TableRow>


                            </TableHead>



                            <TableBody>
                                {farmers.map((farmer) => (
                                    <TableRow
                                        key={farmer.id}
                                        hover
                                        sx={{
                                            "&:hover": {
                                                background: "#FCFBF7",
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar
                                                    sx={{
                                                        bgcolor: palette.forest,
                                                    }}
                                                >
                                                    <Agriculture />
                                                </Avatar>

                                                <Box>


                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {farmer.farmerCode}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <Stack direction="row" spacing={2} alignItems="center">


                                                <Typography fontWeight={600}>
                                                    {farmer.farmerName}
                                                </Typography>
                                            </Stack>
                                        </TableCell>



                                        <TableCell>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Phone sx={{ fontSize: 18 }} />
                                                {farmer.mobile}
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <LocationOn sx={{ fontSize: 18 }} />
                                                {farmer.address}
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <Chip
    label={farmer.active ? "ACTIVE" : "INACTIVE"}
    color={farmer.active ? "success" : "error"}
    variant="filled"
/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>


                        </Table>


                    </TableContainer>


                </CardContent>


            </Card>



        </Box>

    )

}
