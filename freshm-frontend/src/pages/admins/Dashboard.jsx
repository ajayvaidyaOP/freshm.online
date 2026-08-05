import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Stack, Typography, Divider, Chip, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import api from "../../services/api";

const forest = "#0F2E20";
const forestDeep = "#0B2F22";
const gold = "#C9A24B";
const ink = "#17231C";
const slate = "#5b6b60";
const rust = "#B5533C";
const paperDim = "#F3EDDF";
async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}
const today = () => new Date().toISOString().slice(0, 10);

function Stat({ label, value, unit, icon, warn }) {
  const accent = warn ? rust : forest;
  return (
    <Card sx={{ p: 2.25, borderRadius: 3, border: "1px solid rgba(201,162,75,.3)", height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="overline" sx={{ color: slate, letterSpacing: ".1em" }}>{label}</Typography>
        <Box sx={{ width: 34, height: 34, borderRadius: 2, display: "grid", placeItems: "center", color: accent, background: "rgba(201,162,75,.14)" }}>{icon}</Box>
      </Stack>
      <Stack direction="row" alignItems="baseline" spacing={0.75} sx={{ mt: 1.25 }}>
        <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: 28, color: ink }}>{value}</Typography>
        {unit && <Typography sx={{ fontFamily: "monospace", fontSize: 12.5, color: slate }}>{unit}</Typography>}
      </Stack>
      <Box sx={{ mt: 1.25, height: 3, borderRadius: 3, width: "42%", background: `linear-gradient(90deg, ${forest}, ${gold})` }} />
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [v, f, p] = await Promise.all([safeGet("/vendors"), safeGet("/farmers"), safeGet("/purchases")]);
      setVendors(v); setFarmers(f); setPurchases(p);
      setLoading(false);
    })();
  }, []);

  const t = today();
  const todaysPurchase = purchases
    .filter((p) => String(p.purchaseDate) === t)
    .reduce((s, p) => s + (Number(p.totalAmount) || 0), 0);
  const pending = purchases
    .filter((p) => (p.paymentStatus || "PENDING") !== "PAID")
    .reduce((s, p) => s + (Number(p.totalAmount) || 0), 0);
  const recent = [...purchases].sort((a, b) => String(b.purchaseDate).localeCompare(String(a.purchaseDate))).slice(0, 6);

  if (loading) {
    return <Box sx={{ display: "grid", placeItems: "center", minHeight: 300 }}><CircularProgress sx={{ color: gold }} /></Box>;
  }

  return (
    
  
  <Box
    sx={{
      p: 4,
      background: paperDim,
      minHeight: "100vh",
    }}
  >
      <Box
  sx={{
    position: "relative",
    mb: 4,
    minHeight: 120,
  }}
>
  {/* Center Title */}
  <Box
    sx={{
      textAlign: "center",
    }}
  >
    <Typography
      variant="overline"
      sx={{
        color: gold,
        letterSpacing: 2,
      }}
    >
      COMPANY WORKSPACE
    </Typography>

    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        color: forest,
      }}
    >
      Dashboard
    </Typography>

    <Typography
      variant="body2"
      sx={{
        color: slate,
      }}
    >
      Live figures for your company only.
    </Typography>
  </Box>

  {/* Right Side Buttons */}
  <Stack
    direction="row"
    spacing={2}
    sx={{
      position: "absolute",
      top: 15,
      right: -10,
    }}
  >
    <Button
      variant="outlined"
      onClick={() => navigate("/admin/purchase/add")}
    >
      New purchase
    </Button>

    <Button
      variant="contained"
      onClick={() => navigate("/admin/sales/add")}
      sx={{
        background: forest,
        "&:hover": {
          background: forestDeep,
        },
      }}
    >
      New sale
    </Button>
  </Stack>
</Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><Stat label="Total vendors" value={vendors.length} unit="active" icon={<PeopleRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Stat label="Total farmers" value={farmers.length} unit="active" icon={<AgricultureRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Stat label="Today's purchase" value={`₹${todaysPurchase.toLocaleString("en-IN")}`} icon={<ShoppingCartRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Stat label="Pending payment" value={`₹${pending.toLocaleString("en-IN")}`} warn icon={<PendingActionsRoundedIcon />} /></Grid>
      </Grid>

      <Card
  sx={{
    p: { xs: 2, md: 2.5 },
    borderRadius: 3,
    backgroundColor: "#F6F4EC",
    border: "1px solid rgba(201,162,75,.3)",
  }}
>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: ink }}>Recent purchases</Typography>
          <Button size="small" onClick={() => navigate("/admin/purchase")}>View all</Button>
        </Stack>
        {recent.length === 0 ? (
          <Typography variant="body2" sx={{ color: slate, py: 4, textAlign: "center" }}>
            No purchases yet. Record your first purchase to see it here.
          </Typography>
        ) : (
          <Stack divider={<Divider />}>
            {recent.map((p) => (
              <Stack key={p.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: ink }}>{p.vendorName || p.farmerName || "Supplier"}</Typography>
                  <Typography variant="caption" sx={{ color: slate }}>{p.purchaseNumber} · {p.purchaseDate}</Typography>
                </Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography sx={{ fontFamily: "monospace", fontWeight: 600 }}>₹ {Number(p.totalAmount || 0).toLocaleString("en-IN")}</Typography>
                  <Chip size="small" label={p.paymentStatus || "PENDING"}
                    sx={{ fontWeight: 600, color: p.paymentStatus === "PAID" ? forest : rust,
                      background: p.paymentStatus === "PAID" ? "rgba(46,139,78,.14)" : "rgba(181,83,60,.12)" }} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
}
