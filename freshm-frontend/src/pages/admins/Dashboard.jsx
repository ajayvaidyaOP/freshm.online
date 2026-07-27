import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Stack, Typography, Divider, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import api from "../../services/api";
import { palette } from "../../theme/theme";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; } catch { return []; }
}
const today = () => new Date().toISOString().slice(0, 10);

// self-contained stat card (no external kit dependency)
function Stat({ label, value, unit, icon, tone }) {
  const accent = tone === "warn" ? (palette.stamp || "#C2410C") : (palette.forest || "#14432C");
  return (
    <Card sx={{ p: 2.25, height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="overline" sx={{ color: palette.slate || palette.inkSoft, letterSpacing: "0.12em" }}>{label}</Typography>
        <Box sx={{ width: 34, height: 34, borderRadius: 2, display: "grid", placeItems: "center", color: accent, background: "rgba(46,139,78,0.10)" }}>{icon}</Box>
      </Stack>
      <Stack direction="row" alignItems="baseline" spacing={0.75} sx={{ mt: 1.25 }}>
        <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 30, color: palette.ink }}>{value}</Typography>
        {unit && <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: palette.slate || palette.inkSoft }}>{unit}</Typography>}
      </Stack>
      <Box sx={{ mt: 1.25, height: 3, borderRadius: 3, width: "42%", background: `linear-gradient(135deg, ${palette.canopy || palette.forest}, ${palette.lime || "#7DBE3C"})` }} />
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    (async () => {
      setVendors(await safeGet("/vendors"));
      setFarmers(await safeGet("/farmers"));
      setPurchases(await safeGet("/purchases"));
    })();
  }, []);

  const t = today();
  const todaysPurchaseAmt = purchases
    .filter((p) => String(p.purchaseDate) === t)
    .reduce((s, p) => s + (Number(p.totalAmount) || 0), 0);
  const pendingAmt = purchases
    .filter((p) => (p.paymentStatus || "PENDING") !== "PAID")
    .reduce((s, p) => s + (Number(p.totalAmount) || 0), 0);

  const recent = [...purchases]
    .sort((a, b) => String(b.purchaseDate).localeCompare(String(a.purchaseDate)))
    .slice(0, 6);

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="overline" sx={{ color: palette.leaf || palette.gold }}>Company workspace</Typography>
          <Typography variant="h4" sx={{ color: palette.ink }}>Dashboard</Typography>
          <Typography variant="body2" sx={{ color: palette.slate || palette.inkSoft }}>
            Live figures for your company only — vendors, farmers, purchases and outstanding payments.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => navigate("/admin/purchase/add")}>New purchase</Button>
          <Button variant="contained" onClick={() => navigate("/admin/payments/add")}>Add payment</Button>
        </Stack>
      </Stack>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><Stat label="Total vendors" value={vendors.length} unit="active" icon={<PeopleRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Stat label="Total farmers" value={farmers.length} unit="active" icon={<AgricultureRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Stat label="Today's purchase" value={`₹${todaysPurchaseAmt.toLocaleString("en-IN")}`} icon={<ShoppingCartRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Stat label="Pending payment" value={`₹${pendingAmt.toLocaleString("en-IN")}`} tone="warn" icon={<PendingActionsRoundedIcon />} /></Grid>
      </Grid>

      <Card sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: palette.ink }}>Recent purchases</Typography>
          <Button size="small" onClick={() => navigate("/admin/purchase")}>View all</Button>
        </Stack>
        {recent.length === 0 ? (
          <Typography variant="body2" sx={{ color: palette.slate || palette.inkSoft, py: 4, textAlign: "center" }}>
            No purchases yet. Record your first purchase to see it here.
          </Typography>
        ) : (
          <Stack divider={<Divider />} spacing={0}>
            {recent.map((p) => (
              <Stack key={p.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: palette.ink }}>
                    {p.vendorName || p.farmerName || "Supplier"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.slate || palette.inkSoft }}>
                    {p.purchaseNumber} · {p.purchaseDate}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>
                    ₹ {Number(p.totalAmount || 0).toLocaleString("en-IN")}
                  </Typography>
                  <Chip size="small" label={p.paymentStatus || "PENDING"}
                    sx={{
                      fontWeight: 600,
                      color: (p.paymentStatus === "PAID") ? (palette.forestDeep || palette.forest) : (palette.stamp || "#C2410C"),
                      background: (p.paymentStatus === "PAID") ? "rgba(46,139,78,0.14)" : "rgba(194,65,12,0.12)",
                      border: `1px solid ${(p.paymentStatus === "PAID") ? (palette.leaf || palette.forest) : (palette.stamp || "#C2410C")}`,
                    }} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
}
