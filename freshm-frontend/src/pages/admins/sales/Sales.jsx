
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

import { getAllSales, getSale } from "../../../services/saleService";
import InvoiceBill from "../../../components/bill/InvoiceBill";
import logo from "../../../assets/logo.png";

const forest = "#0F2E20";
const gold = "#C9A24B";

export default function Sales() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setRows(await getAllSales());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const open = async (id) => {
  const s = await getSale(id);

  console.log("SALE DATA =>", s);

  setView({
    letterHeadName: s.letterHeadName,
    invoiceNumber: s.saleNumber,
    date: s.saleDate,

    partyLabel: "Buyer",
    partyName: s.buyerName || "--",
    partyAddress: s.buyerAddress || "--",

    transportName: s.transportName || "--",
    vehicleNumber: s.vehicleNumber || "--",
    partyMobile:
      s.transportMobile ||
      s.transportContact ||
      s.mobileNumber ||
      "--",

    items: (s.items || []).map((it) => ({
      desc: it.description,
      unit: it.unit,
      quantity: it.quantity,
      weight: it.weightKg,
      rate: it.price,
      amount: it.amount,
    })),

    charges: [
      { label: "Hamali", amount: s.hamali },
      { label: "Commission", amount: s.commission },
      { label: "Transport Advance", amount: s.transportAdvance },
    ].filter((c) => c.amount > 0),

    grandTotal: s.grandTotal,
    amountInWords: s.amountInWords,
  });
};
  return (
    <Box
      sx={{
        backgroundColor: "#F5EFE1",
        minHeight: "calc(100vh - 72px)",
        p: 3,
      }}
    >
      {/* Header */}
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3,
  }}
>
  <Typography
    variant="overline"
    sx={{
      color: gold,
      letterSpacing: 2,
    }}
  >
    SELLING
  </Typography>

  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      color: forest,
      mb: 2,
    }}
  >
    Sale Invoices
  </Typography>

  <Button
    variant="contained"
    startIcon={<AddRoundedIcon />}
    onClick={() => navigate("/admin/sales/add")}
    sx={{
      background: forest,
      borderRadius: 3,
      px: 4,
      textTransform: "none",
      "&:hover": {
        background: "#0b241a",
      },
    }}
  >
    New Sale
  </Button>
</Box>
      {/* Card */}
      <Card sx={{ p: 2.5, borderRadius: 4 }}>
        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress size={26} sx={{ color: gold }} />
          </Stack>
        ) : rows.length === 0 ? (
          <Stack
            alignItems="center"
            spacing={1.5}
            sx={{ py: 6, textAlign: "center" }}
          >
            <ReceiptLongRoundedIcon
              sx={{
                fontSize: 40,
                color: gold,
              }}
            />

            <Typography
              sx={{
                fontWeight: 700,
                color: forest,
              }}
            >
              No sales yet
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#5b6b60",
              }}
            >
              Create your first sale invoice to a buyer.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/admin/sales/add")}
              sx={{
                background: forest,
              }}
            >
              New Sale
            </Button>
          </Stack>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Bill No.</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Grand Total</TableCell>
                <TableCell align="right">Bill</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 600,
                    }}
                  >
                    {s.saleNumber}
                  </TableCell>

                  <TableCell>
                    {s.buyerName || "--"}
                  </TableCell>

                  <TableCell>
                    {s.saleDate}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontFamily: "monospace",
                    }}
                  >
                    ₹ {Number(s.grandTotal || 0).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => open(s.id)}
                    >
                      <VisibilityRoundedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog
        open={!!view}
        onClose={() => setView(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        {view && (
          <InvoiceBill
            type="SALE"
            data={view}
            logoSrc={logo}
          />
        )}
      </Dialog>
    </Box>
  );
}