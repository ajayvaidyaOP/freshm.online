import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, MenuItem, Button, ToggleButtonGroup,
  ToggleButton, Chip, Divider, Snackbar, Alert, InputAdornment, CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import api from "../../../services/api";
import { palette } from "../../../theme/theme";
import { httpError } from "../../../utils/httpError";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}

const MODES = ["CASH", "BANK", "UPI", "CHEQUE"];

export default function AddPayment() {
  const navigate = useNavigate();

  const [payTo, setPayTo] = useState("VENDOR");           // VENDOR | FARMER
  const [vendors, setVendors] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [partyId, setPartyId] = useState("");
  const [purchaseId, setPurchaseId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [remarks, setRemarks] = useState("");

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      setVendors(await safeGet("/vendors"));
      setFarmers(await safeGet("/farmers"));
      setPurchases(await safeGet("/purchases"));
    })();
  }, []);

  // the parties for the chosen "pay to" type
  const parties = payTo === "VENDOR" ? vendors : farmers;
  const nameOf = (p) => p?.vendorName || p?.farmerName || p?.name || "";
  const codeOf = (p) => p?.vendorCode || p?.farmerCode || "";
  const selectedParty = parties.find((p) => String(p.id) === String(partyId));

  // purchases belonging to the selected party (matched by name, since the
  // purchase response carries vendorName / farmerName)
  const partyPurchases = useMemo(() => {
    if (!selectedParty) return [];
    const nm = nameOf(selectedParty);
    return purchases.filter((pu) =>
      payTo === "VENDOR" ? pu.vendorName === nm : pu.farmerName === nm
    );
  }, [selectedParty, purchases, payTo]);

  const selectedPurchase = partyPurchases.find((p) => String(p.id) === String(purchaseId));

  const resetParty = (type) => {
    setPayTo(type); setPartyId(""); setPurchaseId(""); setAmount("");
  };

  const save = async () => {
    if (!partyId) return setToast({ t: "error", m: "Choose who you're paying." });
    if (!purchaseId) return setToast({ t: "error", m: "Select the purchase this payment is against." });
    if (!amount || Number(amount) <= 0) return setToast({ t: "error", m: "Enter a valid amount." });

    setSaving(true);
    try {
      await api.post("/payments", {
        purchaseId: Number(purchaseId),
        amount: Number(amount),
        paymentMode,
        transactionNumber: transactionNumber || null,
        paymentDate,
        remarks: remarks || null,
      });
      setToast({ t: "success", m: "Payment recorded." });
      setTimeout(() => navigate("/admin/payments"), 700);
    } catch (err) {
      setToast({ t: "error", m: httpError(err, "Could not record the payment.") });
    } finally { setSaving(false); }
  };

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: palette.leaf || palette.gold }}>Payments</Typography>
          <Typography variant="h4" sx={{ color: palette.ink }}>Record a payment</Typography>
          <Typography variant="body2" sx={{ color: palette.inkSoft || palette.slate }}>
            Pick who you're paying, choose the purchase it settles, and enter the amount.
          </Typography>
        </Box>
        <Button variant="text" onClick={() => navigate("/admin/payments")}>Back</Button>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: { xs: 2, md: 3 } }}>
            {/* 1. Pay to */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>1 · Pay to</Typography>
            <ToggleButtonGroup
              exclusive value={payTo} onChange={(_, v) => v && resetParty(v)}
              sx={{ mb: 3, "& .MuiToggleButton-root": { px: 2.5, textTransform: "none", fontWeight: 600 } }}
            >
              <ToggleButton value="VENDOR"><PersonRoundedIcon sx={{ mr: 1, fontSize: 18 }} /> Vendor</ToggleButton>
              <ToggleButton value="FARMER"><AgricultureRoundedIcon sx={{ mr: 1, fontSize: 18 }} /> Farmer</ToggleButton>
            </ToggleButtonGroup>

            {/* 2. Party dropdown (names from DB) */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>2 · {payTo === "VENDOR" ? "Vendor" : "Farmer"} name</Typography>
            <TextField
              select fullWidth label={`Select ${payTo.toLowerCase()}`} value={partyId}
              onChange={(e) => { setPartyId(e.target.value); setPurchaseId(""); }}
              sx={{ mb: 1 }}
            >
              {parties.length === 0 && <MenuItem disabled value="">No {payTo.toLowerCase()}s found — add one first</MenuItem>}
              {parties.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {nameOf(p)}{codeOf(p) ? ` · ${codeOf(p)}` : ""}
                </MenuItem>
              ))}
            </TextField>

            {selectedParty && (
              <Box sx={{ mb: 3, p: 1.5, borderRadius: 2, background: "rgba(46,139,78,0.06)", border: `1px solid ${palette.line}` }}>
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                  <Chip size="small" label={nameOf(selectedParty)} sx={{ fontWeight: 700 }} />
                  {selectedParty.mobile && <Typography variant="caption" sx={{ color: palette.slate }}>📞 {selectedParty.mobile}</Typography>}
                  {selectedParty.bankName && <Typography variant="caption" sx={{ color: palette.slate }}>🏦 {selectedParty.bankName}</Typography>}
                </Stack>
              </Box>
            )}

            {/* 3. Purchase to settle */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>3 · Against purchase</Typography>
            <TextField
              select fullWidth label="Select purchase" value={purchaseId}
              onChange={(e) => setPurchaseId(e.target.value)} disabled={!selectedParty} sx={{ mb: 3 }}
            >
              {partyPurchases.length === 0 && <MenuItem disabled value="">No purchases for this party</MenuItem>}
              {partyPurchases.map((pu) => (
                <MenuItem key={pu.id} value={pu.id}>
                  {pu.purchaseNumber} · ₹{Number(pu.totalAmount || 0).toLocaleString("en-IN")} · {pu.paymentStatus || "PENDING"}
                </MenuItem>
              ))}
            </TextField>

            <Divider sx={{ mb: 3 }} />

            {/* 4. Amount + details */}
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>4 · Payment details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth type="number" label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupeeRoundedIcon fontSize="small" /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Mode" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                  {MODES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }}
                  value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Txn / cheque no. (optional)" value={transactionNumber}
                  onChange={(e) => setTransactionNumber(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Remarks (optional)" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: "sticky", top: 88 }}>
            <Typography variant="overline" sx={{ color: palette.slate }}>Summary</Typography>
            <Stack spacing={1.25} sx={{ mt: 1.5, mb: 3 }}>
              <Row k="Paying" v={selectedParty ? nameOf(selectedParty) : "—"} />
              <Row k="Type" v={payTo} />
              <Row k="Purchase" v={selectedPurchase?.purchaseNumber || "—"} />
              <Row k="Purchase total" v={selectedPurchase ? `₹ ${Number(selectedPurchase.totalAmount || 0).toLocaleString("en-IN")}` : "—"} />
            </Stack>
            <Box sx={{ p: 2, borderRadius: 3, background: palette.forestDeep || palette.forest, color: "#fff", mb: 2 }}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>Amount to pay</Typography>
              <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 30, fontWeight: 600 }}>
                ₹ {Number(amount || 0).toLocaleString("en-IN")}
              </Typography>
            </Box>
            <Button fullWidth size="large" variant="contained" onClick={save} disabled={saving}>
              {saving ? <CircularProgress size={22} color="inherit" /> : "Record payment"}
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={!!toast} autoHideDuration={4500} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}

function Row({ k, v }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" sx={{ color: palette.slate }}>{k}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: palette.ink, textAlign: "right", maxWidth: 160 }}>{v}</Typography>
    </Stack>
  );
}
