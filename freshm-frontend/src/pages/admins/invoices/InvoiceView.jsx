import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import {
  ReceiptLong,
  Download,
  Print,
  
} from "@mui/icons-material";

const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  line: "rgba(201,162,75,.35)",
};

export default function InvoiceView() {
  const navigate = useNavigate();

  const invoice = {
    invoiceNo: "INV-1001",
    date: "22-07-2026",
    vendor: "ABC Traders",
    mobile: "9876543210",
    address: "Pune, Maharashtra",
    status: "Paid",
    items: [
      {
        item: "Tomato",
        qty: 50,
        rate: 20,
        total: 1000,
      },
      {
        item: "Onion",
        qty: 40,
        rate: 30,
        total: 1200,
      },
    ],
  };

  const grandTotal = invoice.items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: palette.paperDim,
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 28, md: 36 },
          fontWeight: 700,
          color: palette.ink,
          mb: 1,
        }}
      >
        View Invoice
      </Typography>

      <Typography
        sx={{
          color: palette.inkSoft,
          mb: 4,
        }}
      >
        Purchase Invoice Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/invoices")}
          sx={{
            borderColor: palette.forest,
            color: palette.forest,
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Back
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: 4,
          border: `1px solid ${palette.line}`,
          background: palette.paper,
          boxShadow: "none",
        }}
      >
        <CardContent>

          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
            mb={3}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <ReceiptLong
                sx={{
                  color: palette.gold,
                  fontSize: 36,
                }}
              />

              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                Purchase Invoice
              </Typography>
            </Stack>

            <Chip
              label={invoice.status}
              color={
                invoice.status === "Paid"
                  ? "success"
                  : "warning"
              }
            />
          </Stack>

          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={4}>

            {/* Company Details */}

            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: palette.forest,
                  mb: 2,
                }}
              >
                Company Details
              </Typography>

              <Typography><b>Company :</b> FreshM ERP Pvt. Ltd.</Typography>
              <Typography><b>Email :</b> support@freshm.com</Typography>
              <Typography><b>Phone :</b> +91 9876543210</Typography>
              <Typography><b>GST No :</b> 27ABCDE1234F1Z5</Typography>
              <Typography><b>Address :</b> Pune, Maharashtra</Typography>
            </Grid>

            {/* Vendor Details */}

            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: palette.forest,
                  mb: 2,
                }}
              >
                Vendor Details
              </Typography>

              <Typography>
                <b>Name :</b> {invoice.vendor}
              </Typography>

              <Typography>
                <b>Mobile :</b> {invoice.mobile}
              </Typography>

              <Typography>
                <b>Address :</b> {invoice.address}
              </Typography>
            </Grid>

            {/* Invoice Information */}

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: palette.forest,
                  mb: 2,
                }}
              >
                Invoice Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <b>Invoice Number :</b>
              </Typography>

              <Typography color="text.secondary">
                {invoice.invoiceNo}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <b>Invoice Date :</b>
              </Typography>

              <Typography color="text.secondary">
                {invoice.date}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <b>Status :</b>
              </Typography>

              <Chip
                sx={{ mt: 1 }}
                label={invoice.status}
                color={invoice.status === "Paid" ? "success" : "warning"}
              />
            </Grid>

          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              color: palette.forest,
              mb: 3,
            }}
          >
            Purchased Items
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              overflowX: "auto",
              boxShadow: "none",
              border: `1px solid ${palette.line}`,
            }}
          >
            <Table>

              <TableHead>
                <TableRow
                  sx={{
                    background: palette.forest,
                  }}
                >
                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Item
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Quantity
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Rate
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index} hover>

                    <TableCell>
                      {item.item}
                    </TableCell>

                    <TableCell>
                      {item.qty}
                    </TableCell>

                    <TableCell>
                      ₹ {item.rate}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      ₹ {item.total}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Card
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 350,
                },
                borderRadius: 3,
                border: `1px solid ${palette.line}`,
                boxShadow: "none",
              }}
            >
              <CardContent>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography>Subtotal</Typography>

                  <Typography>
                    ₹ {grandTotal}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography>GST (18%)</Typography>

                  <Typography>
                    ₹ {(grandTotal * 0.18).toFixed(2)}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 20,
                    }}
                  >
                    Grand Total
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: palette.forest,
                    }}
                  >
                    ₹ {(grandTotal * 1.18).toFixed(2)}
                  </Typography>
                </Stack>

              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}