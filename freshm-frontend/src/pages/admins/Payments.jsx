// import React from "react";


// import {

// Box,
// Typography,
// Button,
// Card,
// CardContent,
// Table,
// TableBody,
// TableCell,
// TableContainer,
// TableHead,
// TableRow,
// Paper

// } from "@mui/material";


// import {
// useNavigate
// } from "react-router-dom";



// const payments=[


// {
// id:1,
// party:"ABC Traders",
// type:"Vendor",
// amount:"₹50,000",
// status:"Pending"
// },


// {
// id:2,
// party:"Ramesh Farmer",
// type:"Farmer",
// amount:"₹25,000",
// status:"Paid"
// }


// ];



// export default function Payments(){


// const navigate=useNavigate();


// return(

// <Box>


// <Box

// display="flex"

// justifyContent="space-between"

// mb={3}

// >


// <Typography

// variant="h4"

// fontWeight={700}

// >

// Payments

// </Typography>



// <Button

// variant="contained"

// onClick={()=>navigate("/admin/payments/add")}

// >

// + Add Payment

// </Button>


// </Box>




// <Card>


// <CardContent>


// <TableContainer component={Paper}>


// <Table>


// <TableHead>


// <TableRow>


// <TableCell>
// Party Name
// </TableCell>


// <TableCell>
// Type
// </TableCell>


// <TableCell>
// Amount
// </TableCell>


// <TableCell>
// Status
// </TableCell>


// </TableRow>


// </TableHead>



// <TableBody>


// {

// payments.map((payment)=>(


// <TableRow key={payment.id}>


// <TableCell>
// {payment.party}
// </TableCell>


// <TableCell>
// {payment.type}
// </TableCell>


// <TableCell>
// {payment.amount}
// </TableCell>


// <TableCell>
// {payment.status}
// </TableCell>


// </TableRow>


// ))


// }



// </TableBody>


// </Table>


// </TableContainer>


// </CardContent>


// </Card>


// </Box>


// )

// }










import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../../services/paymentService";

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
    Chip,
    Avatar,
    Stack,
} from "@mui/material";

import {
    Add,
    Person,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

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

const payments = [
    {
        id: 1,
        party: "ABC Traders",
        type: "Vendor",
        amount: "₹50,000",
        status: "Pending",
    },
    {
        id: 2,
        party: "Ramesh Farmer",
        type: "Farmer",
        amount: "₹25,000",
        status: "Paid",
    },
];

export default function Payments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            const data = await getAllPayments();
            setPayments(data);
        } catch (error) {
            console.error("Error loading payments:", error);
        }
    };
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 4,
                background: palette.paperDim,
                minHeight: "100vh",
            }}
        >
            {/* Header */}

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
                        Payments
                    </Typography>

                    <Typography
                        sx={{
                            color: palette.inkSoft,
                            mt: 1,
                        }}
                    >
                        Manage all payment records from one place.
                    </Typography>
                </Box>

                <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => navigate("/admin/payments/add")}
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
                    Add Payment
                </Button>
            </Box>

            {/* Card */}

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
                        Payment Directory
                    </Typography>

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
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Payment Mode</TableCell>
                                            <TableCell>Transaction Number</TableCell>
                                            <TableCell>Payment Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>{payment.id}</TableCell>

                                        <TableCell>{payment.amount}</TableCell>

                                        <TableCell>{payment.paymentMode}</TableCell>

                                        <TableCell>{payment.transactionNumber}</TableCell>

                                        <TableCell>{payment.paymentDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}