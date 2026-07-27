

import React, { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Stack,
  Divider,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Badge,
  Person,
  Phone,
  Email,
} from "@mui/icons-material";

import api from "../../../services/api";

// ============================================================
// DESIGN TOKENS — same palette used across the app.
// ============================================================
const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  sage: "#7E9A88",
  rust: "#B5533C",
  line: "rgba(201,162,75,0.35)",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fff",

    "& fieldset": {
      borderColor: "rgba(0,0,0,.12)",
    },

    "&:hover fieldset": {
      borderColor: palette.sage,
    },

    "&.Mui-focused fieldset": {
      borderColor: palette.forest,
      borderWidth: 1.5,
    },
  },
};

const emptyForm = {
  vendorName: "",
  mobile: "",
  email: "",
  address: "",
  aadharNumber: "",
  panNumber: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
};

export default function AddVendor() {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null); // { vendorCode }
const [errors, setErrors] = useState({
  vendorName: "",
  mobile: "",
  email: "",
  address: "",
  aadharNumber: "",
  panNumber: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
});
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {

    setError("");
setSuccess(null);


const newErrors = {};

if (!form.vendorName.trim()) {
  newErrors.vendorName = "Vendor Name is required";
}

if (!form.mobile.trim()) {
  newErrors.mobile = "Mobile Number is required";
} else if (!/^\d{10}$/.test(form.mobile)) {
  newErrors.mobile = "Mobile Number must be 10 digits";
}

if (!form.email.trim()) {
  newErrors.email = "Email is required";
} else if (!/\S+@\S+\.\S+/.test(form.email)) {
  newErrors.email = "Please enter a valid Email Address";
}

if (!form.address.trim()) {
  newErrors.address = "Address is required";
}

if (!form.aadharNumber.trim()) {
  newErrors.aadharNumber = "Aadhar Number is required";
} else if (!/^\d{12}$/.test(form.aadharNumber)) {
  newErrors.aadharNumber = "Aadhar Number must be 12 digits";
}

if (!form.panNumber.trim()) {
  newErrors.panNumber = "PAN Number is required";
} else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase())) {
  newErrors.panNumber = "Invalid PAN Number";
}

if (!form.bankName.trim()) {
  newErrors.bankName = "Bank Name is required";
}

if (!form.accountNumber.trim()) {
  newErrors.accountNumber = "Account Number is required";
}

if (!form.ifscCode.trim()) {
  newErrors.ifscCode = "IFSC Code is required";
} else if (
  !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase())
) {
  newErrors.ifscCode = "Invalid IFSC Code";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}

    try {
      setSubmitting(true);

      const res = await api.post("/vendors", form);

      setSuccess({ vendorCode: res.data.vendorCode });

      setForm(emptyForm);
      setErrors({
  vendorName: "",
  mobile: "",
  email: "",
  address: "",
  aadharNumber: "",
  panNumber: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
});
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Could not save the vendor."
      );
    } finally {
      setSubmitting(false);
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

      <Typography
        sx={{
          fontSize: 11.5,
          letterSpacing: 2.2,
          fontWeight: 700,
          color: palette.rust,
          mb: 0.5,
        }}
      >
        PARTNERS
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: { xs: 26, sm: 30 },
          color: palette.ink,
          mb: 3,
        }}
      >
        Add Vendor
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccess(null)}>
          Vendor saved — code <strong>{success.vendorCode}</strong>.{" "}
          <Box
            component="span"
            onClick={() => navigate("/admin/vendors")}
            sx={{ textDecoration: "underline", cursor: "pointer", fontWeight: 700 }}
          >
            Go to Vendors list
          </Box>
        </Alert>
      )}

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: palette.paper,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 20px 50px rgba(11,47,34,.08)",
        }}
      >

        <CardContent sx={{ p: 4 }}>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            mb={3}
          >
            <Badge sx={{ color: palette.gold }} />

            <Typography
              sx={{
                fontFamily: "'Fraunces', serif",
                fontSize: 24,
              }}
            >
              Vendor Information
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />




          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="Vendor Name"
  value={form.vendorName}
  error={!!errors.vendorName}
  helperText={errors.vendorName}
  onChange={(e) => {
    setForm({ ...form, vendorName: e.target.value });

    setErrors({
      ...errors,
      vendorName: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Person color="action" />
      </InputAdornment>
    ),
  }}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="Mobile Number"
  value={form.mobile}
  error={!!errors.mobile}
  helperText={errors.mobile}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setForm({
      ...form,
      mobile: value,
    });

    setErrors({
      ...errors,
      mobile: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Phone color="action" />
      </InputAdornment>
    ),
  }}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  label="Email"
  type="email"
  value={form.email}
  error={!!errors.email}
  helperText={errors.email}
  onChange={(e) => {
    setForm({
      ...form,
      email: e.target.value,
    });

    setErrors({
      ...errors,
      email: "",
    });
  }}
  sx={fieldSx}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Email color="action" />
      </InputAdornment>
    ),
  }}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="Aadhar Number"
  value={form.aadharNumber}
  error={!!errors.aadharNumber}
  helperText={errors.aadharNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);

    setForm({
      ...form,
      aadharNumber: value,
    });

    setErrors({
      ...errors,
      aadharNumber: "",
    });
  }}
  sx={fieldSx}
/>
            </Grid>

            <Grid item xs={12}>
              <TextField
  fullWidth
  required
  label="Address"
  multiline
  rows={2}
  value={form.address}
  error={!!errors.address}
  helperText={errors.address}
  onChange={(e) => {
    setForm((prev) => ({
      ...prev,
      address: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      address: "",
    }));
  }}
  sx={fieldSx}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="PAN Number"
  value={form.panNumber}
  error={!!errors.panNumber}
  helperText={errors.panNumber}
  onChange={(e) => {
    setForm((prev) => ({
      ...prev,
      panNumber: e.target.value.toUpperCase(),
    }));

    setErrors((prev) => ({
      ...prev,
      panNumber: "",
    }));
  }}
  sx={fieldSx}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="Bank Name"
  value={form.bankName}
  error={!!errors.bankName}
  helperText={errors.bankName}
  onChange={(e) => {
    setForm((prev) => ({
      ...prev,
      bankName: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      bankName: "",
    }));
  }}
  sx={fieldSx}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="Account Number"
  value={form.accountNumber}
  error={!!errors.accountNumber}
  helperText={errors.accountNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");

    setForm((prev) => ({
      ...prev,
      accountNumber: value,
    }));

    setErrors((prev) => ({
      ...prev,
      accountNumber: "",
    }));
  }}
  sx={fieldSx}
/>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
  fullWidth
  required
  label="IFSC Code"
  value={form.ifscCode}
  error={!!errors.ifscCode}
  helperText={errors.ifscCode}
  onChange={(e) => {
    setForm((prev) => ({
      ...prev,
      ifscCode: e.target.value.toUpperCase(),
    }));

    setErrors((prev) => ({
      ...prev,
      ifscCode: "",
    }));
  }}
  sx={fieldSx}
/>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ fontSize: 12.5, color: palette.inkSoft, mb: 2 }}>
                The vendor code is generated automatically once saved.
              </Typography>

              <Button
                variant="contained"
                disabled={submitting}
                startIcon={submitting ? null : <SaveRoundedIcon />}
                onClick={handleSubmit}
                sx={{
                  mt: 2,
                  px: 5,
                  height: 52,
                  borderRadius: 2,
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
                {submitting ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  "Save Vendor"
                )}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
