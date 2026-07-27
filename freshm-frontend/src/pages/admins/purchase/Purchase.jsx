import React, { useEffect, useState } from "react";
import { getAllPurchases } from "../../../services/purchaseService";

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
  Person,
  Add,
} from "@mui/icons-material";

import {
  useNavigate
} from "react-router-dom";

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

const purchases = [


  {
    id: 1,
    purchaseCode: "PUR001",
    vendor: "Shree Traders",
    article: "Wheat",
    qty: "500 Kg",
    amount: "₹25000",
    status: "Pending"
  },


  {
    id: 2,
    purchaseCode: "PUR002",
    vendor: "Green Agro",
    article: "Soybean",
    qty: "300 Kg",
    amount: "₹18000",
    status: "Paid"
  }


];



export default function Purchase() {


  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    loadPurchases();
  }, []);
  const loadPurchases = async () => {
    try {
      const data = await getAllPurchases();
      console.log("Purchase Data:", data);
      setPurchases(data);
    } catch (error) {
      console.error("Error loading purchases:", error);
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
            Purchase
          </Typography>

          <Typography
            sx={{
              color: palette.inkSoft,
              mt: 1,
            }}
          >
            Manage all purchase records from one place.
          </Typography>
        </Box>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/admin/purchase/add")}
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
          Receive Material
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
          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontSize: 24,
              mb: 3,
            }}
          >
            Purchase Directory
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
                  <TableCell>Purchase Number</TableCell>
                  <TableCell>Vendor / Farmer</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Total Quantity</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {purchases.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      "&:hover": {
                        background: "#FCFBF7",
                      },
                    }}
                  >
                    <TableCell>
                      <Typography fontWeight={600}>
                        {item.purchaseNumber}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: palette.forest,
                          }}
                        >
                          <Person />
                        </Avatar>

                        <Typography fontWeight={600}>
                          {item.vendorName || item.farmerName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {item.items?.[0]?.productName}
                    </TableCell>

                    <TableCell>
                      {item.totalQuantity}
                    </TableCell>

                    <TableCell>
                      ₹{item.totalAmount}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.paymentStatus}
                        color={
                          item.paymentStatus === "PAID"
                            ? "success"
                            : "warning"
                        }
                        variant="outlined"
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
  );
}