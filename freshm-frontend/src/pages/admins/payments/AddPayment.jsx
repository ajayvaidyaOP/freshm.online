import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, Grid, Stack, Typography, TextField, MenuItem,
  Button, InputAdornment, Divider, Snackbar, Alert, CircularProgress, Chip,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { savePayment, getAllPurchases, getPaymentsByPurchase } from "../../../services/paymentService";

const forest = "#0F2E20";
const gold = "#C9A24B";

const MODES = [
  { value: "CASH", label: "Cash" },
  { value: "UPI", label: "UPI" },
  { value: "CHEQUE", label: "Cheque" },
  { value: "NET_BANKING", label: "Net Banking" },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function AddPayment() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  const [purchases, setPurchases] = useState([]);
  const [selected, setSelected] = useState(null);
  const [paid, setPaid] = useState(0);
  const [pending, setPending] = useState(0);
  const [loadingParty, setLoadingParty] = useState(false);

  const [form, setForm] = useState({
    purchaseId: "", amount: "", paymentMode: "CASH", transactionNumber: "", paymentDate: today,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const loadPurchases = async () => {
    try {
      const data = await getAllPurchases();
      // Only show purchases that still owe money. Fully-paid ones drop off the list.
      const open = (data || []).filter((p) => p.pendingAmount == null || Number(p.pendingAmount) > 0);
      setPurchases([...open].reverse());
    } catch { setPurchases([]); }
  };
  useEffect(() => { loadPurchases(); }, []);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const computePending = async (purchaseId, p) => {
    setLoadingParty(true);
    const total = Number(p?.totalAmount) || 0;
    let paidSum;
    // Prefer the backend-computed paid amount (reliable). Fall back to summing payments.
    if (p && p.paidAmount != null) {
      paidSum = Number(p.paidAmount) || 0;
    } else {
      try {
        const pays = await getPaymentsByPurchase(purchaseId);
        paidSum = (pays || []).reduce((s, x) => s + (Number(x.amount) || 0), 0);
      } catch { paidSum = 0; }
    }
    const due = (p && p.pendingAmount != null) ? Math.max(Number(p.pendingAmount), 0) : Math.max(total - paidSum, 0);
    setPaid(paidSum);
    setPending(due);
    setLoadingParty(false);
    return due;
  };

  const onPickPurchase = async (e) => {
    const id = e.target.value;
    setErrors((er) => ({ ...er, purchaseId: "" }));
    const p = purchases.find((x) => String(x.id) === String(id)) || null;
    setSelected(p);
    setForm((f) => ({ ...f, purchaseId: id }));
    if (!p) { setPaid(0); setPending(0); return; }
    const due = await computePending(id, p);
    setForm((f) => ({ ...f, purchaseId: id, amount: due ? String(due) : "" }));
  };

  const partyName = selected ? (selected.vendorName || selected.farmerName || "—") : "—";
  const partyType = selected ? (selected.vendorName ? "Vendor" : selected.farmerName ? "Farmer" : "—") : "—";

  const statusColor = (s) =>
    s === "PAID" ? { bg: "rgba(46,125,50,.14)", fg: "#2e7d32" }
    : s === "PARTIAL" ? { bg: "rgba(201,162,75,.18)", fg: "#8a6d1f" }
    : { bg: "rgba(178,59,59,.12)", fg: "#b23b3b" };

  const validate = () => {
    const er = {};
    if (!form.purchaseId) er.purchaseId = "Select a purchase";
    if (!form.amount) er.amount = "Amount is required";
    else if (Number(form.amount) <= 0) er.amount = "Amount must be greater than 0";
    else if (pending > 0 && Number(form.amount) > pending) er.amount = `Cannot exceed pending ${inr(pending)}`;
    if (!form.paymentMode) er.paymentMode = "Select a mode";
    if (!form.paymentDate) er.paymentDate = "Date is required";
    // transaction number is OPTIONAL
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await savePayment({
        purchaseId: Number(form.purchaseId),
        amount: Number(form.amount),
        paymentMode: form.paymentMode,
        transactionNumber: form.transactionNumber || "",
        paymentDate: form.paymentDate,
      });
      // refresh so the new status + pending reflect immediately
      const fresh = await getAllPurchases().then((d) => [...(d || [])]).catch(() => []);
      const openFresh = fresh.filter((p) => p.pendingAmount == null || Number(p.pendingAmount) > 0);
      setPurchases([...openFresh].reverse());
      const updated = fresh.find((x) => String(x.id) === String(form.purchaseId)) || selected;
      setSelected(updated);
      const stillDue = await computePending(form.purchaseId, updated);
      setToast({ t: "success", m: stillDue > 0 ? `Payment saved. Pending now ${inr(stillDue)}.` : "Payment saved. Purchase fully PAID." });
      setForm((f) => ({ ...f, amount: "", transactionNumber: "" }));
    } catch (e) {
      setToast({ t: "error", m: e?.response?.data?.message || "Couldn't save the payment." });
    } finally { setSaving(false); }
  };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate("/admin/payments")} sx={{ color: forest, mb: 1 }}>
        Back to payments
      </Button>
      <Typography variant="overline" sx={{ color: gold }}>Payments</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest, mb: 0.5 }}>Add Payment</Typography>
      <Typography variant="body2" sx={{ color: "#5b6b60", mb: 3 }}>
        Pick a purchase — the party and pending amount fill in automatically.
      </Typography>

      <Card sx={{ borderRadius: 4, maxWidth: 860, boxShadow: "0 25px 50px rgba(0,0,0,.08)" }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Grid container spacing={2.5}>
            {/* Purchase number — first */}
            <Grid item xs={12}>
              <TextField
                select fullWidth label="Purchase Number" value={form.purchaseId}
                onChange={onPickPurchase} error={!!errors.purchaseId} helperText={errors.purchaseId}
                sx={fieldSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><ReceiptLongRoundedIcon sx={{ color: gold }} /></InputAdornment> }}
              >
                {purchases.length === 0 && <MenuItem disabled value="">No purchases found</MenuItem>}
                {purchases.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.purchaseNumber} · {p.vendorName || p.farmerName || "—"} · {inr(p.totalAmount)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Auto-filled party + pending panel */}
            {selected && (
              <Grid item xs={12}>
                <Box sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(201,162,75,.35)", background: "#FAF6EC" }}>
                  {loadingParty ? (
                    <Stack direction="row" spacing={1.5} alignItems="center"><CircularProgress size={18} sx={{ color: gold }} /><Typography variant="body2">Loading payment details…</Typography></Stack>
                  ) : (
                    <Grid container spacing={2}>
                      <Info label="Party" value={partyName} sub={partyType} strong />
                      <Info label="Total" value={inr(selected.totalAmount)} />
                      <Info label="Paid" value={inr(paid)} color="#2e7d32" />
                      <Info label="Pending" value={inr(pending)} color={pending > 0 ? "#b23b3b" : "#2e7d32"} strong />
                      <Grid item xs={6} sm={2.4}>
                        <Typography variant="caption" sx={{ color: "#5b6b60" }}>Status</Typography>
                        <Box>
                          <Chip size="small" label={selected.paymentStatus || "—"}
                            sx={{ mt: 0.3, fontWeight: 700, background: statusColor(selected.paymentStatus).bg, color: statusColor(selected.paymentStatus).fg }} />
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}><Divider sx={{ borderColor: "rgba(201,162,75,.25)" }} /></Grid>

            {/* Amount */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth type="number" label="Amount" value={form.amount} onChange={set("amount")}
                error={!!errors.amount} helperText={errors.amount || (pending > 0 ? `Pending: ${inr(pending)}` : "")}
                sx={fieldSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupeeRoundedIcon sx={{ color: gold }} /></InputAdornment> }}
              />
            </Grid>

            {/* Payment mode dropdown */}
            <Grid item xs={12} sm={6}>
              <TextField
                select fullWidth label="Payment Mode" value={form.paymentMode} onChange={set("paymentMode")}
                error={!!errors.paymentMode} helperText={errors.paymentMode} sx={fieldSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccountBalanceWalletRoundedIcon sx={{ color: gold }} /></InputAdornment> }}
              >
                {MODES.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
              </TextField>
            </Grid>

            {/* Transaction number — optional */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Transaction Number (optional)" value={form.transactionNumber}
                onChange={set("transactionNumber")} sx={fieldSx}
                helperText={form.paymentMode === "CASH" ? "Not needed for cash" : "UTR / cheque / reference no."}
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth type="date" label="Payment Date" value={form.paymentDate} onChange={set("paymentDate")}
                error={!!errors.paymentDate} helperText={errors.paymentDate}
                InputLabelProps={{ shrink: true }} sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth size="large" onClick={handleSave} disabled={saving} startIcon={!saving && <SaveRoundedIcon />}
                sx={{ mt: 1, height: 52, borderRadius: 2, textTransform: "none", fontWeight: 700, color: "#fff",
                  background: "linear-gradient(135deg,#0F2E20,#0B2F22)", "&:hover": { background: "linear-gradient(135deg,#081F16,#0B2F22)" } }}>
                {saving ? <CircularProgress size={22} color="inherit" /> : "Save Payment"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar open={!!toast} autoHideDuration={3800} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}

function Info({ label, value, sub, color, strong }) {
  return (
    <Grid item xs={6} sm={2.4}>
      <Typography variant="caption" sx={{ color: "#5b6b60" }}>{label}</Typography>
      <Typography sx={{ fontWeight: strong ? 800 : 700, color: color || "#0F2E20" }}>{value}</Typography>
      {sub && <Typography variant="caption" sx={{ color: "#8a9a90" }}>{sub}</Typography>}
    </Grid>
  );
}
