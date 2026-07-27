import React, { useEffect, useState } from "react";
import { Grid, Stack, Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../../services/api";
import { palette } from "../../theme/theme";
import { StatTile, SectionCard, PageHeader, MiniBar, GradeChip, EmptyState } from "../../components/ui/kit";

async function safeGet(url) {
  try { const r = await api.get(url); return r.data?.data ?? r.data ?? []; }
  catch { return []; }
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    (async () => {
      setStock(await safeGet("/inventory"));       // article-wise available stock
      setReceipts(await safeGet("/receipts"));      // recent crate intakes
      setBoxes(await safeGet("/boxes/pending"));    // pending empty boxes per farmer
    })();
  }, []);

  const totalStock = stock.reduce((s, a) => s + (Number(a.availableQuantity) || 0), 0);
  const maxStock = Math.max(1, ...stock.map((a) => Number(a.availableQuantity) || 0));
  const receivedToday = receipts.reduce((s, r) => s + (Number(r.netWeight) || 0), 0);
  const cratesIn = receipts.reduce((s, r) => s + (Number(r.totalCrates) || 0), 0);
  const pendingBoxes = boxes.reduce((s, b) => s + (Number(b.pending) || 0), 0);

  return (
    <Box>
      <PageHeader
        eyebrow="Packhouse · today"
        title="Operations overview"
        subtitle="Everything received, sorted and ready to dispatch — scoped to your company."
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate("/user/material")}>
            New receipt
          </Button>
        }
      />

      {/* Weigh-readout tiles */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <StatTile label="Received today" value={receivedToday.toLocaleString("en-IN")} unit="kg net" icon={<ScaleRoundedIcon />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatTile label="Crates in" value={cratesIn} unit="crates" icon={<GrassRoundedIcon />} tone="lime" />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatTile label="Available stock" value={totalStock.toLocaleString("en-IN")} unit="kg" icon={<Inventory2RoundedIcon />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatTile label="Boxes pending" value={pendingBoxes} unit="with farmers" icon={<LocalShippingRoundedIcon />} tone="stamp" />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        {/* Article-wise stock */}
        <Grid item xs={12} md={7}>
          <SectionCard eyebrow="Sorted & graded" title="Available stock by article">
            {stock.length === 0 ? (
              <EmptyState
                icon={<Inventory2RoundedIcon />}
                title="No stock recorded yet"
                hint="Once material is received and sorted by size, graded quantities appear here article by article."
                action={<Button variant="outlined" onClick={() => navigate("/user/material")}>Record a receipt</Button>}
              />
            ) : (
              stock.map((a, i) => (
                <MiniBar
                  key={i}
                  label={a.productName || a.articleName || "Article"}
                  value={Number(a.availableQuantity) || 0}
                  max={maxStock}
                  sub={a.size ? `${a.size} · ${a.destination || ""}` : undefined}
                />
              ))
            )}
          </SectionCard>
        </Grid>

        {/* Recent receipts + pending boxes */}
        <Grid item xs={12} md={5}>
          <Stack spacing={2.5}>
            <SectionCard eyebrow="Latest intake" title="Recent receipts">
              {receipts.length === 0 ? (
                <EmptyState icon={<ScaleRoundedIcon />} title="Nothing received today" hint="New crate intakes will stream in here." />
              ) : (
                <Stack divider={<Divider />} spacing={1.25}>
                  {receipts.slice(0, 6).map((r, i) => (
                    <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" sx={{ color: palette.ink, fontWeight: 600 }}>
                          {r.farmerName || r.vendorName || "Supplier"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: palette.slate }}>
                          {r.productName || "Material"} · {r.totalCrates || 0} crates
                        </Typography>
                      </Box>
                      <GradeChip label={`${Number(r.netWeight || 0).toLocaleString("en-IN")} kg`} />
                    </Stack>
                  ))}
                </Stack>
              )}
            </SectionCard>

            <SectionCard eyebrow="Empty-box ledger" title="Boxes pending return">
              {boxes.length === 0 ? (
                <EmptyState icon={<LocalShippingRoundedIcon />} title="All boxes accounted for" hint="Farmers with outstanding empty boxes will be flagged here." />
              ) : (
                <Stack divider={<Divider />} spacing={1.25}>
                  {boxes.slice(0, 5).map((b, i) => (
                    <Stack key={i} direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{b.farmerName}</Typography>
                      <Typography sx={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: palette.stamp }}>
                        {b.pending} pending
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </SectionCard>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
