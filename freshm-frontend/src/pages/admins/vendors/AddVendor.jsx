// import React, { useState } from "react";

// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Alert,
//   CircularProgress,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";

// import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// import api from "../../../services/api";

// // ============================================================
// // DESIGN TOKENS — same palette used across the app.
// // ============================================================
// const palette = {
//   forest: "#0F2E20",
//   gold: "#C9A24B",
//   rust: "#B5533C",
//   ink: "#17231C",
//   inkSoft: "#5C6B61",
//   line: "rgba(15,46,32,0.08)",
// };

// const fieldSx = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: 2,
//     fontSize: 14,
//     "&:hover fieldset": { borderColor: "#7E9A88" },
//     "&.Mui-focused fieldset": { borderColor: palette.forest, borderWidth: "1.5px" },
//   },
// };

// const emptyForm = {
//   vendorName: "",
//   mobile: "",
//   email: "",
//   address: "",
//   aadharNumber: "",
//   panNumber: "",
//   bankName: "",
//   accountNumber: "",
//   ifscCode: "",
// };

// export default function AddVendor() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState(emptyForm);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(null); // { vendorCode }

//   const handleChange = (field) => (e) => {
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));
//   };

//   const handleSubmit = async () => {
//     setError("");
//     setSuccess(null);

//     if (!form.vendorName.trim()) {
//       setError("Vendor name is required.");
//       return;
//     }

//     if (!form.mobile.trim()) {
//       setError("Mobile number is required.");
//       return;
//     }

//     if (!form.aadharNumber.trim()) {
//       setError("Aadhar number is required.");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const res = await api.post("/vendors", form);

//       setSuccess({ vendorCode: res.data.vendorCode });

//       setForm(emptyForm);
//     } catch (err) {
//       console.log(err);
//       setError(
//         err.response?.data?.message || "Could not save the vendor."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography
//         sx={{
//           fontSize: 11.5,
//           letterSpacing: 2.2,
//           fontWeight: 700,
//           color: palette.rust,
//           mb: 0.5,
//         }}
//       >
//         PARTNERS
//       </Typography>

//       <Typography
//         sx={{
//           fontFamily: "'Fraunces', serif",
//           fontWeight: 600,
//           fontSize: { xs: 26, sm: 30 },
//           color: palette.ink,
//           mb: 3,
//         }}
//       >
//         Add Vendor
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
//           {error}
//         </Alert>
//       )}

//       {success && (
//         <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccess(null)}>
//           Vendor saved — code <strong>{success.vendorCode}</strong>.{" "}
//           <Box
//             component="span"
//             onClick={() => navigate("/admin/vendors")}
//             sx={{ textDecoration: "underline", cursor: "pointer", fontWeight: 700 }}
//           >
//             Go to Vendors list
//           </Box>
//         </Alert>
//       )}

//       <Card
//         elevation={0}
//         sx={{ borderRadius: 3, border: `1px solid ${palette.line}` }}
//       >
//         <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
//           <Grid container spacing={2.5}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Vendor Name"
//                 value={form.vendorName}
//                 onChange={handleChange("vendorName")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Mobile Number"
//                 value={form.mobile}
//                 onChange={handleChange("mobile")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange("email")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 required
//                 label="Aadhar Number"
//                 value={form.aadharNumber}
//                 onChange={handleChange("aadharNumber")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 multiline
//                 rows={2}
//                 value={form.address}
//                 onChange={handleChange("address")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="PAN Number"
//                 value={form.panNumber}
//                 onChange={handleChange("panNumber")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Bank Name"
//                 value={form.bankName}
//                 onChange={handleChange("bankName")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Account Number"
//                 value={form.accountNumber}
//                 onChange={handleChange("accountNumber")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="IFSC Code"
//                 value={form.ifscCode}
//                 onChange={handleChange("ifscCode")}
//                 sx={fieldSx}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Typography sx={{ fontSize: 12.5, color: palette.inkSoft, mb: 2 }}>
//                 The vendor code is generated automatically once saved.
//               </Typography>

//               <Button
//                 variant="contained"
//                 disabled={submitting}
//                 startIcon={submitting ? null : <SaveRoundedIcon />}
//                 onClick={handleSubmit}
//                 sx={{
//                   textTransform: "none",
//                   fontWeight: 700,
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1.2,
//                   background: `linear-gradient(135deg, ${palette.forest}, #081f16)`,
//                   boxShadow: "0 14px 26px -14px rgba(15,46,32,0.5)",
//                   "&:hover": {
//                     background: `linear-gradient(135deg, #081f16, #051309)`,
//                   },
//                 }}
//               >
//                 {submitting ? (
//                   <CircularProgress size={22} sx={{ color: "#fff" }} />
//                 ) : (
//                   "Save Vendor"
//                 )}
//               </Button>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }







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

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(null);

    if (!form.vendorName.trim()) {
      setError("Vendor name is required.");
      return;
    }

    if (!form.mobile.trim()) {
      setError("Mobile number is required.");
      return;
    }

    if (!form.aadharNumber.trim()) {
      setError("Aadhar number is required.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await api.post("/vendors", form);

      setSuccess({ vendorCode: res.data.vendorCode });

      setForm(emptyForm);
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
                onChange={handleChange("vendorName")}
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
                onChange={handleChange("mobile")}
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
                onChange={handleChange("email")}
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
                onChange={handleChange("aadharNumber")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={form.address}
                onChange={handleChange("address")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PAN Number"
                value={form.panNumber}
                onChange={handleChange("panNumber")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bank Name"
                value={form.bankName}
                onChange={handleChange("bankName")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={form.accountNumber}
                onChange={handleChange("accountNumber")}
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={form.ifscCode}
                onChange={handleChange("ifscCode")}
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
