import React, { useEffect, useState } from "react";
import {
  Box, Grid, Card, Stack, Typography, Divider, Chip, Button, CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { sa, sprout, mono, display } from "../../superadmin/saTokens";
import { getAllCompanies } from "../../services/companyService";

function Tile({ label, value, unit, icon, tone }) {
  const accent = tone === "warn" ? sa.stamp : sa.forest;
  return (
    <Card sx={{ p: 2.25, borderRadius: 4.5, border: `1px solid ${sa.line}`, height: "100%", boxShadow: "0 18px 40px -28px rgba(14,51,32,0.3)" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: sa.slate }}>{label}</Typography>
        <Box sx={{ width: 34, height: 34, borderRadius: 2.5, display: "grid", placeItems: "center", color: accent, background: "rgba(46,139,78,0.10)" }}>{icon}</Box>
      </Stack>
      <Stack direction="row" alignItems="baseline" spacing={0.75} sx={{ mt: 1.25 }}>
        <Typography sx={{ fontFamily: mono, fontWeight: 600, fontSize: 32, color: sa.ink }}>{value}</Typography>
        {unit && <Typography sx={{ fontFamily: mono, fontSize: 13, color: sa.slate }}>{unit}</Typography>}
      </Stack>
      <Box sx={{ mt: 1.25, height: 3, borderRadius: 3, width: "42%", background: sprout }} />
    </Card>
  );
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setCompanies(await getAllCompanies()); } catch { setCompanies([]); }
      finally { setLoading(false); }
    })();
  }, []);

  const total = companies.length;
  const active = companies.filter((c) => c.active !== false).length;
  const inactive = total - active;
  const recent = [...companies].slice(-6).reverse();

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography sx={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", color: sa.leaf, textTransform: "uppercase" }}>
            MandiPrime · Platform
          </Typography>
          <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 30, color: sa.ink, mt: 0.25 }}>
            Platform overview
          </Typography>
          <Typography variant="body2" sx={{ color: sa.slate, mt: 0.5 }}>
            Every company running FreshM. Each tenant's data stays fully isolated from the others.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate("/super-admin/companies")}
          sx={{ background: sa.forest, height: 44, borderRadius: 2.75, "&:hover": { background: sa.forestDeep } }}>
          New company
        </Button>
      </Stack>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}><Tile label="Companies" value={total} unit="tenants" icon={<BusinessRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Tile label="Active" value={active} unit="live" icon={<CheckCircleRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Tile label="Disabled" value={inactive} unit="off" tone="warn" icon={<BlockRoundedIcon />} /></Grid>
        <Grid item xs={6} md={3}><Tile label="Admin logins" value={active} unit="can sign in" icon={<AdminPanelSettingsRoundedIcon />} /></Grid>
      </Grid>

      <Card sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 4.5, border: `1px solid ${sa.line}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: sa.ink }}>Recent companies</Typography>
          <Button size="small" onClick={() => navigate("/super-admin/companies")} sx={{ color: sa.forest }}>Manage all</Button>
        </Stack>

        {loading ? (
          <Stack alignItems="center" sx={{ py: 5 }}><CircularProgress size={26} sx={{ color: sa.leaf }} /></Stack>
        ) : recent.length === 0 ? (
          <Stack alignItems="center" spacing={1.5} sx={{ py: 5, textAlign: "center" }}>
            <Box sx={{ width: 54, height: 54, borderRadius: 4, display: "grid", placeItems: "center", color: sa.leaf, background: "rgba(46,139,78,0.10)" }}>
              <BusinessRoundedIcon />
            </Box>
            <Typography sx={{ fontFamily: display, fontWeight: 700, color: sa.ink }}>No companies onboarded yet</Typography>
            <Typography variant="body2" sx={{ color: sa.slate, maxWidth: 380 }}>
              Add your first company to issue it an admin login and start selling the platform.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/super-admin/companies")}
              sx={{ background: sa.forest, borderRadius: 2.5, "&:hover": { background: sa.forestDeep } }}>Add company</Button>
          </Stack>
        ) : (
          <Stack divider={<Divider />}>
            {recent.map((c) => (
              <Stack key={c.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.25 }}>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: sa.ink }}>{c.companyName}</Typography>
                  <Typography sx={{ fontFamily: mono, fontSize: 12, color: sa.slate }}>{c.companyCode} · {c.email || c.mobile || "—"}</Typography>
                </Box>
                <Chip size="small" label={c.active === false ? "Disabled" : "Active"}
                  sx={{
                    fontWeight: 600,
                    color: c.active === false ? sa.stamp : sa.forestDeep,
                    background: c.active === false ? "rgba(194,65,12,0.12)" : "rgba(46,139,78,0.14)",
                    border: `1px solid ${c.active === false ? sa.stamp : sa.leaf}`,
                  }} />
              </Stack>
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
}
