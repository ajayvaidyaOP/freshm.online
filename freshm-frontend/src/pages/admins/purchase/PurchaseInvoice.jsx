import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, MenuItem,
} from "@mui/material";
import { getAllPurchases, getPurchaseById } from "../../../services/purchaseService";
import PurchaseBill from "../../../components/bill/PurchaseBill";

const forest = "#0F2E20";
const gold = "#C9A24B";

export default function PurchaseInvoice() {
  const [purchases, setPurchases] = useState([]);
  const [purchaseId, setPurchaseId] = useState("");
  const [purchase, setPurchase] = useState(null);

  // transport / party details aren't stored on the purchase yet, so they're
  // entered here at print time (see README for making them persist).
  const [partyLocation, setPartyLocation] = useState("");
  const [transportName, setTransportName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const me = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPurchases();
        setPurchases(res?.data ?? res ?? []);
      } catch { setPurchases([]); }
    })();
  }, []);

  useEffect(() => {
    if (!purchaseId) { setPurchase(null); return; }
    (async () => {
      try {
        const res = await getPurchaseById(purchaseId);
        setPurchase(res?.data ?? res);
      } catch { setPurchase(null); }
    })();
  }, [purchaseId]);

  const fmtDate = (d) => {
    if (!d) return "";
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }).replace(/ /g, "-");
    } catch { return d; }
  };

  const billData = purchase ? {
    letterHeadName: me.companyName || "COMPANY NAME",
    invoiceNo: purchase.purchaseNumber,
    date: fmtDate(purchase.purchaseDate),
    partyName: purchase.vendorName || purchase.farmerName || "--",
    partyLocation, transportName, vehicleNo, mobileNo,
    items: (purchase.items || []).map((it) => ({
      particulars: it.productName,
      unit: it.crateCount ?? "",
      quantity: it.quantity,
      rate: it.rate,
      amount: it.amount,
    })),
    totalAmount: purchase.totalAmount,
  } : null;

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: gold }}>Purchasing</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest }}>Purchase Invoice</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>
        Pick a saved purchase, add transport details, and print the bill.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <TextField select fullWidth size="small" label="Select purchase" value={purchaseId}
              onChange={(e) => setPurchaseId(e.target.value)} sx={{ ...fieldSx, mb: 2 }}>
              {purchases.length === 0 && <MenuItem disabled value="">No purchases found</MenuItem>}
              {purchases.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.purchaseNumber} · {p.vendorName || p.farmerName || "—"} · ₹{Number(p.totalAmount || 0).toLocaleString("en-IN")}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle2" sx={{ mb: 1, mt: 1 }}>Transport details</Typography>
            <Stack spacing={2}>
              <TextField fullWidth size="small" label="Party location (e.g. TASGOAN / SANGLI)" value={partyLocation} onChange={(e) => setPartyLocation(e.target.value)} sx={fieldSx} />
              <TextField fullWidth size="small" label="Transport name" value={transportName} onChange={(e) => setTransportName(e.target.value)} sx={fieldSx} />
              <TextField fullWidth size="small" label="Vehicle number" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} sx={fieldSx} />
              <TextField fullWidth size="small" label="Mobile number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} sx={fieldSx} />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          {billData ? (
            <PurchaseBill data={billData} />
          ) : (
            <Card sx={{ p: 6, borderRadius: 4, textAlign: "center", color: "#5b6b60" }}>
              Select a purchase to preview its bill.
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
