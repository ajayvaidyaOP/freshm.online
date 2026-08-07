import React, { useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField, Button, Snackbar, Alert, CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { createBuyer } from "../../../services/buyerService";

const forest = "#0F2E20";
const gold = "#C9A24B";

export default function AddBuyer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    buyerName: "", contactPerson: "", mobile: "", email: "",
    address: "", destination: "", gstNumber: "", panNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.buyerName.trim()) err.buyerName = "Buyer name is required";
    if (form.mobile.trim() && !/^\d{10}$/.test(form.mobile.trim())) err.mobile = "Mobile must be 10 digits";
    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email.trim())) err.email = "Enter a valid email";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await createBuyer({
        ...form,
        panNumber: form.panNumber ? form.panNumber.trim().toUpperCase() : "",
      });
      setToast({ t: "success", m: "Buyer added." });
      setTimeout(() => navigate("/admin/buyers"), 700);
    } catch (e) {
      setToast({ t: "error", m: e?.response?.data?.message || "Couldn't save the buyer." });
    } finally { setSaving(false); }
  };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: 2 } };

  return (
    <Box>
      <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate("/admin/buyers")} sx={{ color: forest, mb: 1 }}>
        Back to buyers
      </Button>
      <Typography variant="overline" sx={{ color: gold }}>Selling</Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: forest, mb: 3 }}>Add Buyer</Typography>

      <Card sx={{ p: 3, borderRadius: 4, maxWidth: 720 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Buyer name *" value={form.buyerName} onChange={set("buyerName")}
              error={!!errors.buyerName} helperText={errors.buyerName} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Contact person" value={form.contactPerson} onChange={set("contactPerson")} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Mobile" value={form.mobile} onChange={set("mobile")}
              error={!!errors.mobile} helperText={errors.mobile} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth size="small" label="Email" value={form.email} onChange={set("email")}
              error={!!errors.email} helperText={errors.email} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth size="small" label="Address" value={form.address} onChange={set("address")} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="Destination (e.g. Dubai)" value={form.destination} onChange={set("destination")} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="GST number" value={form.gstNumber} onChange={set("gstNumber")} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth size="small" label="PAN number" value={form.panNumber} onChange={set("panNumber")} sx={fieldSx} />
          </Grid>
        </Grid>

        <Button fullWidth size="large" variant="contained" onClick={submit} disabled={saving}
          sx={{ mt: 3, background: forest, "&:hover": { background: "#0b241a" } }}>
          {saving ? <CircularProgress size={22} color="inherit" /> : "Save buyer"}
        </Button>
      </Card>

      <Snackbar open={!!toast} autoHideDuration={3500} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && <Alert severity={toast.t} variant="filled" onClose={() => setToast(null)}>{toast.m}</Alert>}
      </Snackbar>
    </Box>
  );
}
