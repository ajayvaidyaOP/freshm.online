// import React, { useEffect, useState } from "react";

// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// import { useNavigate } from "react-router-dom";

// import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";

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
//   headBg: "rgba(15,46,32,0.035)",
// };

// export default function Vendors() {
//   const navigate = useNavigate();

//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [togglingId, setTogglingId] = useState(null);

//   const loadVendors = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await api.get("/vendors");
//       setVendors(res.data || []);
//     } catch (err) {
//       console.log(err);
//       setError(
//         err.response?.data?.message || "Could not load vendors."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadVendors();
//   }, []);

//   const handleToggleStatus = async (vendor) => {
//     const nextStatus = !vendor.active;

//     try {
//       setTogglingId(vendor.id);

//       await api.put(
//         `/vendors/${vendor.id}/status?status=${nextStatus}`
//       );

//       setVendors((prev) =>
//         prev.map((v) =>
//           v.id === vendor.id ? { ...v, active: nextStatus } : v
//         )
//       );
//     } catch (err) {
//       console.log(err);
//       setError(
//         err.response?.data?.message || "Could not update vendor status."
//       );
//     } finally {
//       setTogglingId(null);
//     }
//   };

//   return (
//     <Box>
//       <Box
//         display="flex"
//         flexDirection={{ xs: "column", sm: "row" }}
//         justifyContent="space-between"
//         alignItems={{ xs: "stretch", sm: "center" }}
//         gap={2}
//         mb={3}
//       >
//         <Box>
//           <Typography
//             sx={{
//               fontSize: 11.5,
//               letterSpacing: 2.2,
//               fontWeight: 700,
//               color: palette.rust,
//               mb: 0.5,
//             }}
//           >
//             PARTNERS
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: "'Fraunces', serif",
//               fontWeight: 600,
//               fontSize: { xs: 26, sm: 30 },
//               color: palette.ink,
//             }}
//           >
//             Vendors
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<AddBusinessRoundedIcon />}
//           onClick={() => navigate("/admin/vendors/add")}
//           sx={{
//             textTransform: "none",
//             fontWeight: 700,
//             borderRadius: 2,
//             px: 2.5,
//             py: 1.2,
//             background: `linear-gradient(135deg, ${palette.forest}, #081f16)`,
//             boxShadow: "0 14px 26px -14px rgba(15,46,32,0.5)",
//             "&:hover": {
//               background: `linear-gradient(135deg, #081f16, #051309)`,
//             },
//           }}
//         >
//           Add Vendor
//         </Button>
//       </Box>

//       {error && (
//         <Alert
//           severity="error"
//           sx={{ mb: 3, borderRadius: 2 }}
//           onClose={() => setError("")}
//         >
//           {error}
//         </Alert>
//       )}

//       <Card
//         elevation={0}
//         sx={{ borderRadius: 3, border: `1px solid ${palette.line}` }}
//       >
//         <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
//           {loading ? (
//             <Box display="flex" justifyContent="center" py={6}>
//               <CircularProgress size={28} sx={{ color: palette.forest }} />
//             </Box>
//           ) : vendors.length === 0 ? (
//             <Box textAlign="center" py={6}>
//               <Typography sx={{ color: palette.inkSoft, fontSize: 14 }}>
//                 No vendors yet. Click "Add Vendor" to create the first one.
//               </Typography>
//             </Box>
//           ) : (
//             <TableContainer component={Paper} elevation={0}>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ background: palette.headBg }}>
//                     <TableCell sx={headCellSx}>Vendor Code</TableCell>
//                     <TableCell sx={headCellSx}>Vendor Name</TableCell>
//                     <TableCell sx={headCellSx}>Mobile</TableCell>
//                     <TableCell sx={headCellSx}>Email</TableCell>
//                     <TableCell sx={headCellSx}>Status</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {vendors.map((vendor) => (
//                     <TableRow
//                       key={vendor.id}
//                       sx={{
//                         "&:hover": { background: "rgba(15,46,32,0.02)" },
//                         "&:last-child td": { border: 0 },
//                       }}
//                     >
//                       <TableCell sx={bodyCellSx}>
//                         <Typography
//                           sx={{
//                             fontFamily: "'IBM Plex Mono', monospace",
//                             fontSize: 12.5,
//                             fontWeight: 600,
//                             color: palette.inkSoft,
//                           }}
//                         >
//                           {vendor.vendorCode}
//                         </Typography>
//                       </TableCell>

//                       <TableCell sx={bodyCellSx}>
//                         <Typography
//                           sx={{ fontWeight: 600, fontSize: 13.5, color: palette.ink }}
//                         >
//                           {vendor.vendorName}
//                         </Typography>
//                       </TableCell>

//                       <TableCell sx={bodyCellSx}>{vendor.mobile}</TableCell>

//                       <TableCell sx={bodyCellSx}>{vendor.email || "—"}</TableCell>

//                       <TableCell sx={bodyCellSx}>
//                         <Chip
//                           label={vendor.active ? "Active" : "Inactive"}
//                           size="small"
//                           onClick={() => handleToggleStatus(vendor)}
//                           disabled={togglingId === vendor.id}
//                           sx={{
//                             fontSize: 11.5,
//                             fontWeight: 700,
//                             cursor: "pointer",
//                             background: vendor.active
//                               ? "rgba(15,46,32,0.1)"
//                               : "rgba(181,83,60,0.12)",
//                             color: vendor.active ? palette.forest : palette.rust,
//                             "&:hover": {
//                               background: vendor.active
//                                 ? "rgba(15,46,32,0.18)"
//                                 : "rgba(181,83,60,0.2)",
//                             },
//                           }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// const headCellSx = {
//   fontSize: 12,
//   fontWeight: 700,
//   letterSpacing: 0.4,
//   color: "#0F2E20",
//   textTransform: "uppercase",
//   borderBottom: "none",
// };

// const bodyCellSx = {
//   fontSize: 13.5,
//   color: "#3A453E",
//   borderBottom: "1px solid rgba(15,46,32,0.06)",
// };










import React, { useEffect, useState } from "react";

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
  CircularProgress,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";

import api from "../../../services/api";

// ============================================================
// DESIGN TOKENS — same palette used across the app.
// ============================================================
const palette = {
  forest: "#0F2E20",
  gold: "#C9A24B",
  rust: "#B5533C",
  ink: "#17231C",
  inkSoft: "#5C6B61",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  line: "rgba(201,162,75,0.35)",
  headBg: "rgba(15,46,32,0.035)",
};

export default function Vendors() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const loadVendors = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/vendors");
      setVendors(res.data || []);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Could not load vendors."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleToggleStatus = async (vendor) => {
    const nextStatus = !vendor.active;

    try {
      setTogglingId(vendor.id);

      await api.put(
        `/vendors/${vendor.id}/status?status=${nextStatus}`
      );

      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendor.id ? { ...v, active: nextStatus } : v
        )
      );
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Could not update vendor status."
      );
    } finally {
      setTogglingId(null);
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
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
        mb={3}
      >
        <Box>
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
            }}
          >
            Vendors
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddBusinessRoundedIcon />}
          onClick={() => navigate("/admin/vendors/add")}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2,
            px: 2.5,
            py: 1.2,
            background: `linear-gradient(135deg, ${palette.forest}, #081f16)`,
            boxShadow: "0 14px 26px -14px rgba(15,46,32,0.5)",
            "&:hover": {
              background: `linear-gradient(135deg, #081f16, #051309)`,
            },
          }}
        >
          Add Vendor
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: palette.paper,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 25px 50px rgba(0,0,0,.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress size={28} sx={{ color: palette.forest }} />
            </Box>
          ) : vendors.length === 0 ? (
            <Box textAlign="center" py={6}>
              <Typography sx={{ color: palette.inkSoft, fontSize: 14 }}>
                No vendors yet. Click "Add Vendor" to create the first one.
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{
              borderRadius: 3, border: "1px solid rgba(0,0,0,.08)",
            }}
            >              <Table>
                <TableHead>
                  <TableRow sx={{ background: palette.paperDim, }}>
                    <TableCell sx={headCellSx}>Vendor Code</TableCell>
                    <TableCell sx={headCellSx}>Vendor Name</TableCell>
                    <TableCell sx={headCellSx}>Mobile</TableCell>
                    <TableCell sx={headCellSx}>Email</TableCell>
                    <TableCell sx={headCellSx}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow
                      key={vendor.id}
                      sx={{
                        "&:hover": { background: "rgba(15,46,32,0.02)" },
                        "&:last-child td": { border: 0 },
                      }}
                    >
                      <TableCell sx={bodyCellSx}>
                        <Typography
                          sx={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: palette.inkSoft,
                          }}
                        >
                          {vendor.vendorCode}
                        </Typography>
                      </TableCell>

                      <TableCell sx={bodyCellSx}>
                        <Typography
                          sx={{ fontWeight: 600, fontSize: 13.5, color: palette.ink }}
                        >
                          {vendor.vendorName}
                        </Typography>
                      </TableCell>

                      <TableCell sx={bodyCellSx}>{vendor.mobile}</TableCell>

                      <TableCell sx={bodyCellSx}>{vendor.email || "—"}</TableCell>

                      <TableCell sx={bodyCellSx}>
                        <Chip
                          label={vendor.active ? "Active" : "Inactive"}
                          size="small"
                          onClick={() => handleToggleStatus(vendor)}
                          disabled={togglingId === vendor.id}
                          sx={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            cursor: "pointer",
                            background: vendor.active
                              ? "rgba(15,46,32,0.1)"
                              : "rgba(181,83,60,0.12)",
                            color: vendor.active ? palette.forest : palette.rust,
                            "&:hover": {
                              background: vendor.active
                                ? "rgba(15,46,32,0.18)"
                                : "rgba(181,83,60,0.2)",
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

const headCellSx = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0.4,
  color: "#0F2E20",
  textTransform: "uppercase",
  borderBottom: "none",
};

const bodyCellSx = {
  fontSize: 13.5,
  color: "#3A453E",
  borderBottom: "1px solid rgba(15,46,32,0.06)",
};

