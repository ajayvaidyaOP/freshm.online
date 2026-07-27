









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";

import {
  Add,
  Visibility,
  Download,
  Delete,
  Person,
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
  line: "rgba(201,162,75,0.35)",
};

export default function Invoices() {

  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      invoice: "INV001",
      vendor: "ABC Traders",
      amount: "₹25,000",
      status: "Paid",
    },
    {
      id: 2,
      invoice: "INV002",
      vendor: "Fresh Vegetables",
      amount: "₹18,000",
      status: "Pending",
    },
  ]);

  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >

      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontSize: 34,
          fontWeight: 600,
          color: palette.ink,
        }}
      >
        Purchase Invoices
      </Typography>


      <Typography
        sx={{
          color: palette.inkSoft,
          mt: 1,
        }}
      >
        Manage all purchase invoices from one place.
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        mt={3}
        mb={4}
      >

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/admin/invoices/create")}
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
          Create Invoice
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
            Invoice Directory
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
                  <TableCell>Invoice No</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      "&:hover": {
                        background: "#FCFAF4",
                      },
                    }}
                  >
                    {/* Invoice Number */}

                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#16231C",
                      }}
                    >
                      {row.invoice}
                    </TableCell>

                    {/* Vendor */}

                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{
                            bgcolor: palette.forest,
                          }}
                        >
                          <Person />
                        </Avatar>

                        <Typography fontWeight={600}>
                          {row.vendor}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* Amount */}

                    <TableCell>
                      <Typography
                        sx={{
                          color: palette.forest,
                          fontWeight: 700,
                        }}
                      >
                        {row.amount}
                      </Typography>
                    </TableCell>


                    {/* Status */}

                    <TableCell>
                      <Chip
                        label={row.status}
                        color={row.status === "Paid" ? "success" : "warning"}
                        variant="outlined"
                      />
                    </TableCell>


                    {/* Actions */}

                    <TableCell align="center">

                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/admin/invoices/view/${row.id}`)}
                      >
                        <Visibility />
                      </IconButton>

                      <IconButton
                        color="success"
                        onClick={() => console.log("Download", row.id)}
                      >
                        <Download />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => console.log("Delete", row.id)}
                      >
                        <Delete />
                      </IconButton>

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